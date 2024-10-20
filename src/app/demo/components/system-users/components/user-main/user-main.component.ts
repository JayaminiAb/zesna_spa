import { Component } from '@angular/core';
import { User } from '../../core/user';
import { Company } from '../../../petty_cash/core/petty-cash';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.scss'
})
export class UserMainComponent {
  
  
  displayUserSlider: boolean = false;
  editingUser: boolean = false;
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  estateList: EstateDetails[] = [];
  selectedEstate: EstateDetails = {};
  
  constructor(private _zesnaCommonService: ZesnaCommonService) { 
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
    
  }

  ngOnInit(): void {
    this.getEstateListByUserId();
  }

  getEstateListByUserId(){
    this.zesnaEstateModel.GetAllEstateDetails(this.loggedUserId).then(
      (data) => {
        if(data){
          this.estateList = data;
          this.getEstateSystemUsersPG();
        }
      }
    );
  }

  onCompanyChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    
    this.filterHistory();
  }


  filterHistory() {
   
  }

  hideUserSlider(): void {
    this.displayUserSlider = false;
  }

  saveUser(): void {
    if (this.editingUser) {
      // Implement edit logic here
    } else {
      this.newUser.id = this.users.length + 1;
      // this.userService.addUser(this.newUser);
    }
    this.hideUserSlider();
  }
  showSlider(): void {
    this.displayUserSlider = true;
    this.editingUser = false;
   
  }
  
  addNewUser(){
    this.editingUser = true;
   this.newUser = { id: 0, username: '',  email: '', role: '', status: '' };
   this.showSlider();
  }
  viewUser(user: User): void {
    this.editingUser = true;
    this.newUser = user;
    // Implement view logic here
    this.showSlider();
  }

  editUser(user: User): void {
    this.editingUser = true;
    this.newUser = { ...user };
    this.displayUserSlider = true;
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(u => u.id !== user.id);
  }
}
