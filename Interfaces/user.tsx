interface user {
  name: String;
  username: String;
  password: String;
  email: String;
  teacher?: boolean;
  teacherId?: number;
  tableId?: string;
}

export { user };
