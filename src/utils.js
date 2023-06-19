import dayjs from 'dayjs';
import { FILTERS_TYPE, SORTED_TYPE } from './const';

const get_random_int = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanize_date = (date, form) => dayjs(date).format(form);
const humanize_time = (date) => dayjs(date).format('HH:mm');
const get_date_diff = (date1, date2, param) => dayjs(date2).diff(date1, param);
const check_point_expired = (date) => date && dayjs().isAfter(date, 'D');

const filters_list = {
  [FILTERS_TYPE.EVERYTHING]: (points) => points,
  [FILTERS_TYPE.FUTURE]: (points) => points.filter((point) => !check_point_expired(point.dateFrom)),
  [FILTERS_TYPE.PAST]: (points) => points.filter((point) => check_point_expired(point.dateTo)),
};

const sortings_list = {
  [SORTED_TYPE.DAY]: (points) => points.sort((prev, next) => get_date_diff(next.dateFrom, prev.dateFrom, '')),
  [SORTED_TYPE.EVENT]: (points) => points,
  [SORTED_TYPE.TIME]: (points) => points.sort((prev, next) => get_date_diff(prev.dateFrom, prev.dateTo, 'minute') - get_date_diff(next.dateFrom, next.dateTo, 'minute')),
  [SORTED_TYPE.PRICE]: (points) => points.sort((prev, next) => prev.basePrice - next.basePrice),
  [SORTED_TYPE.OFFERS]: (points) => points
};

const update_item = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { get_random_int, humanize_date, humanize_time, get_date_diff, filters_list, sortings_list, update_item };
