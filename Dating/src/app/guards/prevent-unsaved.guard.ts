import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedGuard implements CanDeactivate<MemberEditComponent> {

  constructor() { }

  canDeactivate(component: MemberEditComponent): boolean {
    if (component.form.dirty) {
        return confirm('Are you sure you want to continue ? Any unsaved changes will be lost !!!');
    }
    return true;
  }

}
