interface TimeTableRow {
  teacher: string;
  subject: string;
  time: string;
  teacherId?: number;
  tableId?: string;
  id: string;
  isLab?: boolean;
  selectedDay?: string;
  isCancelled?: boolean;
}

interface TeacherRequest {
  today: string;
  tomorrow: string;
  teacherId: number;
}

export { TimeTableRow, TeacherRequest };
