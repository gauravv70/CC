interface TimeTableRow {
  teacher: string;
  subject: string;
  time: string;
  teacherId?: number;
  id: string;
  isLab?: boolean;
}

interface TeacherRequest {
  today: string;
  tomorrow: string;
  teacherId: number;
}

export { TimeTableRow, TeacherRequest };
