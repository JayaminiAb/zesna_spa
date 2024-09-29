import { Component } from '@angular/core';
import { Company, CompanyDetails } from '../../../petty_cash/core/petty-cash';
import { Employee, EmployeePayment, employeePayments, newPayment } from '../../core/employee';


import { EmployeeAttendanceComponent } from '../employee-attendance/employee-attendance.component';

@Component({
  selector: 'app-employee-paysheet',
  templateUrl: './employee-paysheet.component.html',
  styleUrl: './employee-paysheet.component.scss'
})
export class EmployeePaysheetComponent {
  selectedDate: Date = new Date();
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
 

  selectedCompanyDetails: CompanyDetails;
 
  selectedCompany: Company;

  employeePayments: EmployeePayment[] = employeePayments;
  newPayment: EmployeePayment = this.deep(newPayment);
  
  constructor(){}
  
  onCompanyChange(event: any) {
     // Fetch and filter petty cash history based on the selected company
     this.selectedCompanyDetails = { Id: this.selectedCompany.value, Name: this.selectedCompany.label, RemainingPettyCashAmount: 100 };
    this.filterHistory();
  }


  filterHistory() {
   
  }

  removeItem(index: number){
    this.employeePayments.splice(index, 1)
  }
  onDateRangeChange(event: any){
    
  }

  clickCallBack(event: any){}

  displayEmployeeSlider: boolean = false;
  editingEmployee: boolean = false;


  ngOnInit(): void {}

  
  addNewPayment(){
    this.employeePayments.push(this.deep(this.newPayment))
  }

  getTotalAmount(){
    let totalAmount = 0;
     this.employeePayments.forEach(element => {
      totalAmount = totalAmount + ((element.OTHours * element.OTRate) + element.DayPayment)
    });
    return totalAmount;
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
