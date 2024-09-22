export interface Employee{
    id: number;
  name: string;
  companyId: number;
  role: string;
  department: string;
  salary: number;
  contactDetails: {
    email: string;
    phone: string;
  };
  joinDate: Date;
}