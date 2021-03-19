import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete/autocomplete-trigger';
import { Observable, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

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
  arrowIcon = 'arrow_drop_down';
  myControl = new FormControl();
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions: Observable<User[]>;
  autoCompleteForm= this.fb.group({
    myControl: ['']
  })
  filteredOptions2: User[]=[];


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
     this.myControl.valueChanges
    .pipe(tap(val => console.log('Value:' + val)),
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.name),
      tap(val => console.log('map1:' + val)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    ).forEach(value => this.filteredOptions2=value);
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  clearInput() {
    this.arrowIcon = 'arrow_drop_down';
    this.autoCompleteForm.controls['myControl'].patchValue(null, {emitEvent: true})
    this.filteredOptions2=this.options;
    //this.filteredOptions.forEach(value => console.log(value));
  }
}
