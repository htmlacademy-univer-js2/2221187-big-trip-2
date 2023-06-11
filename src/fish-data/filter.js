import { filters_list } from '../utils';

const generate_filter = (points) => Object.entries(filters_list).map(f => ({name: f[0], sequence: f[1](points)}));

export default generate_filter;
