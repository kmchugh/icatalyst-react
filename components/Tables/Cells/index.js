import DefaultCell from './DefaultCell';
import DateTimeCell from './DateTimeCell';
import CustomCell from './CustomCell';

export {default as DefaultCell} from './DefaultCell';

const cellMap = {
  datetime : DateTimeCell,
  string : DefaultCell,
  custom : CustomCell
};

export function getCellComponent(type) {
  return cellMap[type] || DefaultCell;
}
