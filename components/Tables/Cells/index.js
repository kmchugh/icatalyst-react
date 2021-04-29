import DefaultCell from './DefaultCell';
import DateTimeCell from './DateTimeCell';

export {default as DefaultCell} from './DefaultCell';

const cellMap = {
  datetime : DateTimeCell,
  string : DefaultCell,
};

export function getCellComponent(type) {
  return cellMap[type] || DefaultCell;
}
