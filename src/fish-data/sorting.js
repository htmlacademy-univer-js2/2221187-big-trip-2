import { sortings_list } from '../utils';

const generate_sorting = (points) => Object.entries(sortings_list).map(s => ({ name: s[0], sequence: s[1](points) }));

export default generate_sorting;
