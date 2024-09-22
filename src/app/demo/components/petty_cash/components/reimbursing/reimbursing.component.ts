import { Component } from '@angular/core';
import { Company, CompanyDetails, PettyCashHistory } from "../../core/petty-cash";

@Component({
  selector: 'app-reimbursing',
  templateUrl: './reimbursing.component.html',
  styleUrl: './reimbursing.component.scss'
})
export class ReimbursingComponent {
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  selectedCompany: Company;
  selectedCompanyDetails: CompanyDetails;
  pettyCashHistory: PettyCashHistory[] = [];
  filteredPettyCashHistory: PettyCashHistory[] = [];
  selectedDate: Date = new Date;
  reimbursementAmount: number;

  constructor() { }

  ngOnInit(): void {
    // Initialize with mock data or fetch from a service
    this.pettyCashHistory = [
      {
        reimbursedUser: 'John Doe',
        
        amount: 50,
      
        date: new Date()
      },
      // Add more mock data or load from API
    ];

    // Initially filter by the last month
    this.filterHistory();
  }

  onCompanyChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedCompanyDetails = {Id: this.selectedCompany.value, Name: this.selectedCompany.label, RemainingPettyCashAmount: 100};
    this.filterHistory();
  }

  onDateRangeChange(event: any) {
    // Filter petty cash history based on selected date range
    this.filterHistory();
  }

  filterHistory() {
   
  }

  reimbursePettyCash() {
    if (this.reimbursementAmount && this.selectedCompany) {
      this.selectedCompanyDetails.RemainingPettyCashAmount += this.reimbursementAmount;
      const newRecord: PettyCashHistory = {
        reimbursedUser: 'Admin', // System admin or logged-in user
        
        amount: -this.reimbursementAmount, // Negative to show as reimbursement
        date: new Date()
      };

      this.pettyCashHistory.push(newRecord);
      this.reimbursementAmount = 0;
      this.filterHistory();
    }
  }


}
