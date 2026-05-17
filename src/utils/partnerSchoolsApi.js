// API for partner schools and colleges
import { fetchData } from '../utils/api';

export const getPartnerSchoolsAndColleges = () => fetchData('/partner-schools?populate=*');
