import { TimeTableRow } from "../Interfaces/timeTable";

export function compare(a: TimeTableRow, b: TimeTableRow) {
  if (Number(a.time) < Number(b.time)) {
    return -1;
  }
  if (Number(a.time) > Number(b.time)) {
    return 1;
  }
  return 0;
}
