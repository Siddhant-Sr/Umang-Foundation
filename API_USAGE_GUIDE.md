# API Utility Usage Guide

>This guide explains how to use the reusable API utility (`src/utils/api.js`) for fetching data from Strapi in any page or component. It covers best practices, error handling, and fallback usage.

## Overview

The API utility provides a set of functions to fetch data from your Strapi backend. It automatically tries the Render API, then localhost, and finally uses dummy data in development if both fail. This makes it robust for both production and development environments.

## How to Use in Your Page/Component

### 1. Import the API function you need

For example, to fetch projects:

```js
import { getProjects } from '../utils/api';
```

To fetch partners:

```js
import { getPartners } from '../utils/api';
```

### 2. Use the function inside a React component

Use the function inside a `useEffect` to fetch data when the component mounts. Handle loading and error states for a good user experience.

```js
import React, { useState, useEffect } from 'react';
import { getProjects } from '../utils/api';

function MyComponent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjects();
        if (data && data.data) {
          setProjects(data.data);
        } else {
          setError('No data found.');
        }
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Render your data here */}
      {projects.map(project => (
        <div key={project.id}>{project.attributes?.title || project.title}</div>
      ))}
    </div>
  );
}
```

### 3. Add New API Functions (Optional)

If you need to fetch a new collection, add a function in `src/utils/api.js`:

```js
export const getMyCollection = () => fetchData('/my-collection?populate=*');
```

Then import and use it as shown above.

## Best Practices

- Always check for `data && data.data` before mapping.
- Use loading and error states for better UX.
- Use dummy data fallback only in development (already handled by the utility).
- For custom endpoints, add a new function in the API utility.

## Error Handling

- If both APIs fail, dummy data is returned in development (if provided).
- In production, `null` is returned if the API is unreachable.

## Example: Fetching Board Members

```js
import { getBoardMembers } from '../utils/api';
// ...use as shown above
```

## Extending the Utility

To add more robust error handling, logging, or support for authentication, update the `fetchData` function in `src/utils/api.js`.

---
For any questions, check the code comments in `src/utils/api.js` or ask the project maintainer.
