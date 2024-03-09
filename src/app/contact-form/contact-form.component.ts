import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  constructor( private fb: FormBuilder) {}

  ngOnInit() {
    this.initContactRegistration();
  }

  initContactRegistration() {
    this.contactForm = this.fb.group({
      'first_name': [''],
      'last_name': [''],
      'email': [''],
      'phone': ['']
    });
  }
}
