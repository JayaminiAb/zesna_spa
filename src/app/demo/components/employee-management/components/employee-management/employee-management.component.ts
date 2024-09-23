import { Component } from '@angular/core';
import { Company } from '../../../petty_cash/core/petty-cash';
import { Employee } from '../../core/employee';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { EmployeeAttendanceComponent } from '../employee-attendance/employee-attendance.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
  providers: [DialogService, MessageService]
})
export class EmployeeManagementComponent {
  ref: DynamicDialogRef | undefined;
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  employees: Employee[] = [
    { id: 1, name: 'John Doe', companyId: 1, role: 'Manager', department: 'Sales', salary: 5000, contactDetails: { email: 'john@example.com', phone: '123-456-7890' }, joinDate: new Date('2020-01-15') },
    { id: 2, name: 'Jane Smith', companyId: 2, role: 'Developer', department: 'IT', salary: 4000, contactDetails: { email: 'jane@example.com', phone: '098-765-4321' }, joinDate: new Date('2021-03-22') }
  ];
  selectedCompany: Company;
  selectedEmployee: Employee;
  newEmployee: Employee = { id: 0, name: '', role: '', companyId: 0, department: '', salary: 0, contactDetails: { email: '', phone: '' }, joinDate: new Date() };

  
  constructor(public dialogService: DialogService, public messageService: MessageService){}
  onEmployeeSelect(employee: Employee){
    this.selectedEmployee = employee;
    this.showEmployeeAttendance(employee);
  }
  onCompanyChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    
    this.filterHistory();
  }


  filterHistory() {
   
  }

  showEmployeeAttendance(employee: Employee){
    this.ref = this.dialogService.open(EmployeeAttendanceComponent, {
      header: 'View Attendance',
      width: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: employee
  });

  this.ref.onClose.subscribe((event: any) => {
      if (event) {
          
      }
  });
  }


  displayEmployeeSlider: boolean = false;
  editingEmployee: boolean = false;


  ngOnInit(): void {}

  
  addNewEmployee(): void {
    this.displayEmployeeSlider = true;
    this.editingEmployee = false;
    this.newEmployee = { id: 0, name: '', role: '', companyId: 0, department: '', salary: 0, contactDetails: { email: '', phone: '' }, joinDate: new Date() };
  }

  hideEmployeeSlider(): void {
    this.displayEmployeeSlider = false;
  }

  saveEmployee(): void {
    if (this.editingEmployee) {
      // Update existing employee
      const index = this.employees.findIndex(e => e.id === this.newEmployee.id);
      if (index !== -1) {
        this.employees[index] = { ...this.newEmployee };
      }
    } else {
      // Add new employee
      this.newEmployee.id = this.employees.length + 1;
      this.employees.push({ ...this.newEmployee });
    }
    this.hideEmployeeSlider();
  }

  viewEmployee(employee: Employee): void {
    this.editingEmployee = false;
    this.selectedEmployee = employee;
    this.newEmployee = { ...employee };
    this.displayEmployeeSlider = true;
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = true;
    this.newEmployee = { ...employee };
    this.displayEmployeeSlider = true;
  }

  deleteEmployee(employee: Employee): void {
    this.employees = this.employees.filter(e => e.id !== employee.id);
  }
}



