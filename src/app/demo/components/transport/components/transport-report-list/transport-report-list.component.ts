import { Component } from '@angular/core';
import { Company, CompanyDetails } from '../../../petty_cash/core/petty-cash';
import { transportDetails, emptyTransportFullDetails, TransportDetails, TransportFullDetails, transportFullDetails } from '../../core/transport';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeAttendanceComponent } from '../../../employee-management/components/employee-attendance/employee-attendance.component';
import { TransportReportComponent } from '../transport-report/transport-report.component';

@Component({
  selector: 'app-transport-report-list',
  templateUrl: './transport-report-list.component.html',
  styleUrl: './transport-report-list.component.scss',
  providers: [DialogService, MessageService]
})
export class TransportReportListComponent {
  selectedCompany: Company;
  selectedCompanyDetails: CompanyDetails;
  ref: DynamicDialogRef | undefined;
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  newTransportDetails: TransportFullDetails = this.deep(emptyTransportFullDetails);

  transportReports: TransportDetails[] = transportDetails;
  fullTransportReports: TransportFullDetails[] = this.deep(transportFullDetails);

  displayTransportSlider: boolean = false;

  constructor(public dialogService: DialogService, public messageService: MessageService){}

  onCompanyChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedCompanyDetails = { Id: this.selectedCompany.value, Name: this.selectedCompany.label, RemainingPettyCashAmount: 100 };
    this.filterHistory();
  }

  filterHistory() {

  }
  viewReport(report: TransportDetails) {
    
    this.showTransportReport(this.fullTransportReports.find(item => item.Id == report.Id));
   }
  editReport(report: TransportDetails) {
    this.displayTransportSlider = true;
   }
  deleteReport(report: TransportDetails) { }
  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
  addNewReport(): void {
    this.displayTransportSlider = true;

  }

  hideTransportSlider(): void {
    this.displayTransportSlider = false;
  }
  saveTransportDetails(){

  }
  showTransportReport(report: TransportFullDetails){
    this.ref = this.dialogService.open(TransportReportComponent, {
      header: 'Transport Report',
      width: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: report
  });

  this.ref.onClose.subscribe((event: any) => {
      if (event) {
          
      }
  });
  }

}
