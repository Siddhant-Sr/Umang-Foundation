import React, { useEffect, useState } from 'react';
import { getResourceManagers } from '../utils/api';
import '../styles/ResourceManager.css';

const preferredHeadingOrder = [
	'resource center',
	'account',
	'fcra annual',
	'fcra quarterly'
];

const normalizeHeadingKey = (heading = '') => heading.trim().toLowerCase();

const getDisplayHeading = (heading = '') => {
	const key = normalizeHeadingKey(heading);
	if (key === 'resource center') return 'Resource Center';
	if (key === 'account') return 'Account';
	if (key === 'fcra annual') return 'FCRA Annual';
	if (key === 'fcra quarterly' || key === 'fcra quarterly') return 'FCRA Quarterly';
	return heading || 'Other Resources';
};

function ResourceManager() {
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const loadResources = async () => {
			setLoading(true);
			setError('');

			try {
				const response = await getResourceManagers();
				const baseUrl = response?._baseUrl || process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
				const items = Array.isArray(response?.data) ? response.data : [];

				const groupedMap = new Map();

				items.forEach((rawItem) => {
					const item = rawItem?.attributes || rawItem;
					const heading = getDisplayHeading(item?.heading || 'Other Resources');
					const headingKey = normalizeHeadingKey(heading);

					const documentObj = item?.documents?.data?.attributes || item?.documents;
					const documentUrl = documentObj?.url
						? (documentObj.url.startsWith('/') ? `${baseUrl}${documentObj.url}` : documentObj.url)
						: '';

					if (!groupedMap.has(headingKey)) {
						groupedMap.set(headingKey, { heading, items: [] });
					}

					groupedMap.get(headingKey).items.push({
						id: rawItem?.id || rawItem?.documentId || `${headingKey}-${item?.name || 'resource'}`,
						name: item?.name || 'Untitled',
						documentUrl
					});
				});

				const sortedGroups = Array.from(groupedMap.entries())
					.sort(([a], [b]) => {
						const indexA = preferredHeadingOrder.indexOf(a);
						const indexB = preferredHeadingOrder.indexOf(b);
						const rankA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
						const rankB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
						if (rankA !== rankB) return rankA - rankB;
						return a.localeCompare(b);
					})
					.map(([, value]) => ({
						heading: value.heading,
						items: value.items.sort((x, y) => x.name.localeCompare(y.name, undefined, { numeric: true }))
					}));

				setGroups(sortedGroups);
			} catch {
				setError('Unable to load resources right now.');
			} finally {
				setLoading(false);
			}
		};

		loadResources();
	}, []);

	if (loading) {
		return (
			<section className="resource-manager-page">
				<div className="resource-manager-inner">
					<div className="resource-loading">Loading resources...</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="resource-manager-page">
				<div className="resource-manager-inner">
					<div className="resource-error">{error}</div>
				</div>
			</section>
		);
	}

	if (!groups.length) {
		return (
			<section className="resource-manager-page">
				<div className="resource-manager-inner">
					<div className="resource-empty">No resources available.</div>
				</div>
			</section>
		);
	}

	return (
		<section className="resource-manager-page">
			<div className="resource-manager-inner">
				<div className="resource-columns">
					{groups.map((group) => (
						<div className="resource-column" key={group.heading}>
							<h2>{group.heading}</h2>
							<p className="resource-subtitle">{group.heading}</p>
							<ol>
								{group.items.map((resource) => (
									<li key={resource.id}>
										{resource.documentUrl ? (
											<a href={resource.documentUrl} target="_blank" rel="noopener noreferrer">
												{resource.name}
											</a>
										) : (
											<span>{resource.name}</span>
										)}
									</li>
								))}
							</ol>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ResourceManager;
