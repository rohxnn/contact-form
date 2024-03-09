import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contact-form', pathMatch: 'full'},
  { path: 'contact-form', component: ContactFormComponent}
];
