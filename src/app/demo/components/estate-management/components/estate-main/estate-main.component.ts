import { Component } from '@angular/core';
import { State } from '../../state';

@Component({
  selector: 'app-estate-main',
  templateUrl: './estate-main.component.html',
  styleUrl: './estate-main.component.scss'
})
export class EstateMainComponent {

  displaySlider: boolean = false;
  editingState: boolean = false;
  newState: State = { id: 0, name: '', address: '', contactNumber: '', otherDetails: '' };
  states: State[] = [
    { id: 1, name: 'Estate 1', address: '123 Main St', contactNumber: '123-456-7890', otherDetails: 'Details 1' },
    { id: 2, name: 'Estate 2', address: '456 Elm St', contactNumber: '987-654-3210', otherDetails: 'Details 2' }
  ];
  constructor() { }

  ngOnInit(): void {
    
  }

  showSlider(): void {
    this.displaySlider = true;
    this.editingState = false;
   
  }

  hideSlider(): void {
    this.displaySlider = false;
  }

  saveState(): void {
    if (this.editingState) {
      // Handle editing logic here if needed
    } else {
      this.newState.id = this.states.length + 1;
      // this.stateService.addState(this.newState);
    }
    this.hideSlider();
  }

  addNewState(){
    this.editingState = true;
   this.newState = { id: 0, name: '', address: '', contactNumber: '', otherDetails: '' };
   this.showSlider();
  }
  viewState(state: State): void {
    this.editingState = true;
    this.newState = state;
    // Implement view logic here
    this.showSlider();
  }

  editState(state: State): void {
    this.editingState = true;
    this.newState = state;
    this.showSlider();
  }

  deleteState(state: State): void {
    this.states = this.states.filter(s => s.id !== state.id);
  }
}
