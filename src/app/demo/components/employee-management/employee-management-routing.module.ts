import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeePaysheetComponent } from './components/employee-paysheet/employee-paysheet.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmployeeMainComponent , children: [
            { path: '',  redirectTo: 'pay_sheet', pathMatch: 'full' },
            { path: 'pay_sheet',  component: EmployeePaysheetComponent },
            { path: 'manage',  component: EmployeeManagementComponent },
        ]},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
