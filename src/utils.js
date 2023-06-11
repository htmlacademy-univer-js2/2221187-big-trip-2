import dayjs from 'dayjs';
import { FILTERS_TYPE, SORTED_TYPE } from './const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date, form) => dayjs(date).format(form);
const humanizeTime = (date) => dayjs(date).format('HH:mm');
const getDifference = (date1, date2, param) => dayjs(date2).diff(date1, param);
const isPointExpired = (date) => date && dayjs().isAfter(date, 'D');

const filter = {
  [FILTERS_TYPE.EVERYTHING]: (points) => points,
  [FILTERS_TYPE.FUTURE]: (points) => points.filter((point) => !isPointExpired(point.dateFrom)),
  [FILTERS_TYPE.PAST]: (points) => points.filter((point) => isPointExpired(point.dateTo)),
};

const sorting = {
  [SORTED_TYPE.DAY]: (points) => points.sort((prev, next) => getDifference(next.dateFrom, prev.dateFrom, '')),
  [SORTED_TYPE.EVENT]: (_points) => null,
  [SORTED_TYPE.TIME]: (points) => points.sort((prev, next) => getDifference(prev.dateFrom, prev.dateTo, 'minute') - getDifference(next.dateFrom, next.dateTo, 'minute')),
  [SORTED_TYPE.PRICE]: (points) => points.sort((prev, next) => prev.basePrice - next.basePrice),
  [SORTED_TYPE.OFFERS]: (_points) => null
};

export { getRandomInteger, humanizeDate, humanizeTime, getDifference, filter, sorting };
