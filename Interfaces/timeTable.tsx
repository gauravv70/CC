export default interface TimeTableRow {
  teacher: string;
  subject: string;
  time: string;
  teacherId?: number;
  id: string;
  isLab?: boolean;
}
