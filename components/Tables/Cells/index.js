import DefaultCell from './DefaultCell';
import DateTimeCell from './DateTimeCell';
import CustomCell from './CustomCell';
import EntityCell from './EntityCell';

export {default as DefaultCell} from './DefaultCell';

const cellMap = {
  datetime : DateTimeCell,
  string : DefaultCell,
  entity : EntityCell,
  custom : CustomCell
};

export function getCellComponent(type) {
  return cellMap[type] || DefaultCell;
}
