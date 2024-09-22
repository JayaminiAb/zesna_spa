import { Component } from '@angular/core';
import { Company, CompanyDetails, DATA13, EmptyMainExpense } from '../../core/petty-cash';
import { TreeNode } from 'primeng/api';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  selectedCompany: Company;
  selectedCompanyDetails: CompanyDetails;
  dailyReport: any;
  selectedDate: Date = new Date;
  cols!: Column[];
  files: TreeNode[] = DATA13;
  emptyMainExpense: TreeNode = EmptyMainExpense;
  ngOnInit() {

    this.cols = [
      { field: 'description', header: 'Description' },
      { field: 'amount', header: 'Amount' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'unitPrice', header: 'Unit Price' },
      { field: 'totalAmount', header: 'Item Total' },
      { field: 'action', header: 'Action' },


    ];
    this.generateRowNumbers(this.files); 
  }
 // Method to generate hierarchical numbering for rows
generateRowNumbers(nodes: TreeNode[], parentNumber: string = ''): void {
  nodes.forEach((node, index) => {
      // Generate the current node's number by combining the parent's number and the node's position
      const currentNumber = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;
      
      // Store the number in a custom property (you can choose the property name)
      node.data['rowNumber'] = currentNumber;

      // If the node has children, recursively assign numbers to them
      if (node.children && node.children.length > 0) {
          this.generateRowNumbers(node.children, currentNumber);
      }
  });
}



  addNewExpense() {
    this.files = [...this.files, this.deep(this.emptyMainExpense)];
    this.generateRowNumbers(this.files); 
    console.log(this.files)
  }
 //Add expense to top
 addExpenseTop(indexStr: string){
  debugger
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0]-1;
  this.files.splice(insertIndex, 0, this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files); 
 }
 //Add expense to bottom
 addExpenseBottom(indexStr: string){
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0];
  this.files.splice(insertIndex, 0, this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files); 
 }

 addSubExpenseTop(indexStr: string){
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0];
  this.files[insertIndex-1].children.splice(+indexList[1]-1, 0,this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files); 
 }

 addSubExpenseBottom(indexStr: string){
  
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0];
  this.files[insertIndex-1].children.splice(+indexList[1], 0,this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files); 
 }

 //Add sub expense
 addSubExpenseFromMain(indexStr: string){
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0];
  this.files[insertIndex-1].children.push(this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files); 
 }

 addThirdLevelExpenseBottom(indexStr: string){
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0];
  this.files[insertIndex-1].children[+indexList[1]-1].children.splice(+indexList[2], 0, this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files);
 }

 addThirdLevelExpenseTop(indexStr: string){
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0];
  this.files[insertIndex-1].children[+indexList[1]-1].children.splice(+indexList[2]-1, 0, this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files);
 }

 addThirdLevelExpenseFromSub(indexStr: string){
  let indexList : string[] = indexStr.split('.');
  let insertIndex = +indexList[0];
  this.files[insertIndex-1].children[+indexList[1]-1].children.push(this.deep(this.emptyMainExpense));
  this.files = [...this.files]
  this.generateRowNumbers(this.files);
 }

  onCompanyChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedCompanyDetails = { Id: this.selectedCompany.value, Name: this.selectedCompany.label, RemainingPettyCashAmount: 100 };

  }
  onDateRangeChange(event: any) {
    // Filter petty cash history based on selected date range
    console.log(event)
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }

}
