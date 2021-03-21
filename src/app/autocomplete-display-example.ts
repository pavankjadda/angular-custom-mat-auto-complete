import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

export interface User {
  name: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'autocomplete-display-example',
  templateUrl: 'autocomplete-display-example.html',
  styleUrls: ['autocomplete-display-example.css']
})
export class AutocompleteDisplayExample implements OnInit {
  @ViewChild('inputAutoComplete') inputAutoComplete: any;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');
  myControl = new FormControl();
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;


  constructor() {
  }

  ngOnInit() {
    this.filteredOptions=this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.name),
        map(name => (name ? this._filter(name) : this.options.slice()))
      );
  }

  clearInput(evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    this.myControl?.reset();
    trigger.openPanel();
    this.inputAutoComplete?.nativeElement.focus();
  }


  openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    if(trigger.panelOpen)
      trigger.closePanel();
    else
      trigger.openPanel();
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }


  private _filter(name: string): User[] {
    return this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
