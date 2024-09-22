import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmployeeMainComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
