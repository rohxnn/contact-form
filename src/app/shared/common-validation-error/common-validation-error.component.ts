import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-common-validation-error',
  template: `@if (control.invalid && (control.dirty || control.touched)) {
             <ng-container class="">
              @if (control.errors?.required || control.hasError('whitespace')) {
                <small class="text-danger">{{key}} is required</small>
              }
                @if (control.errors?.pattern) {
                  <small class="text-danger">{{key}} is invalid</small>
                  }
             </ng-container>
            }`
})
export class CommonValidationErrorComponent {
  @Input()
  control: any;
  @Input()
  key: string;
}
