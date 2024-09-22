import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstateMainComponent } from './components/estate-main/estate-main.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EstateMainComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EstateManagementRoutingModule { }
