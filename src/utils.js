import dayjs from 'dayjs';
import { FILTERS_TYPE, SORTED_TYPE } from './const';

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date, form) => dayjs(date).format(form);
const humanizeTime = (date) => dayjs(date).format('HH:mm');
const getDateDiff = (date1, date2, param) => dayjs(date2).diff(date1, param);
const checkPointExpired = (date) => date && dayjs().isAfter(date, 'D');

const filtersList = {
  [FILTERS_TYPE.EVERYTHING]: (points) => points,
  [FILTERS_TYPE.FUTURE]: (points) => points.filter((point) => !checkPointExpired(point.dateFrom)),
  [FILTERS_TYPE.PAST]: (points) => points.filter((point) => checkPointExpired(point.dateTo)),
};

const sortingsList = {
  [SORTED_TYPE.DAY]: (points) => points.sort((prev, next) => getDateDiff(next.dateFrom, prev.dateFrom, '')),
  [SORTED_TYPE.EVENT]: (points) => points,
  [SORTED_TYPE.TIME]: (points) => points.sort((prev, next) => getDateDiff(prev.dateFrom, prev.dateTo, 'minute') - getDateDiff(next.dateFrom, next.dateTo, 'minute')),
  [SORTED_TYPE.PRICE]: (points) => points.sort((prev, next) => prev.basePrice - next.basePrice),
  [SORTED_TYPE.OFFERS]: (points) => points
};

const getFinalPrice = (currentOffers, point) => {
  let price = point.basePrice;
  
  if (point.offers.length === 0) {
    return price;
  }

  point.offers.forEach((id, index) => {
    price += currentOffers[index]['price'];
  });

  return price;
};

const sortByPrice = (pointsModel) => pointsModel.points.sort((prev, next) => {
  const prevp = getFinalPrice(pointsModel.getOffers(prev), prev)
  const nextp = getFinalPrice(pointsModel.getOffers(next), next)
  return prevp - nextp;
});

export {
  getRandomInt, humanizeDate, humanizeTime,
  getDateDiff, filtersList, sortingsList,
  sortByPrice, getFinalPrice
};
