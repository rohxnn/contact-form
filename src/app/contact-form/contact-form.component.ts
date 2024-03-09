import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ContactModel } from '../model/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contactIds: number[] = [1];
  contacts: ContactModel[] = [];
  selectedContact: number;
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

  onClickAddContact() {
    this.contactIds.push(this.contactIds.length + 1);
    this.contacts.push(this.contactForm.value);
  }

  onClickSelectContact(index: number) {
    this.selectedContact = index;
    if(this.contacts[index]) {
      this.contactForm.patchValue(this.contacts[index]);
    } else {
      this.contactForm.reset();
    }
  }
}
