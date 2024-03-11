import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//model
import { ContactModel } from '../model/contact.model';
//component
import { CommonValidationErrorComponent } from '../shared/common-validation-error/common-validation-error.component';
//validator
import { noWhitespaceValidator } from '../shared/custom-validator/nowhitespace.validators';
//third party
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CommonValidationErrorComponent, NgxMaskDirective],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  providers: [provideNgxMask()]
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contactIds: number[] = [1];
  contacts: ContactModel[] = [];
  selectedContact: number;
  isSaveClicked: boolean;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initContactRegistration();
  }

  initContactRegistration() {
    this.contactForm = this.fb.group({
      'first_name': ['', [Validators.required, noWhitespaceValidator]],
      'last_name': [''],
      'email': ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), noWhitespaceValidator]],
      'phone': ['']
    });
  }

  onClickAddContact() {
    if (this.contactForm.valid) {
      this.contactIds.push(this.contactIds.length + 1);
      if (!this.isSaveClicked) {
        this.contacts.push(this.contactForm.value)
      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  onClickSelectContact(index: number) {
    this.selectedContact = index;
    if (this.contacts[index]) {
      this.contactForm.patchValue(this.contacts[index]);
    } else {
      this.contactForm.reset();
    }
  }

  onClickDelete(index: number) {
    if(this.contactIds.length >1) {
      this.contactIds.splice(index - 1, 1);
    }
    this.contacts.splice(index, 1);
    if(this.contacts.length === 0){
      this.contactForm.reset();
    }
  }

  saveContacts() {
    this.isSaveClicked = true;
    const existingObject = this.contacts.some(data => data.email === this.contactForm.get('email').value);
    if (this.contactForm.valid && !existingObject) {
      this.contacts.push(this.contactForm.value);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  onClickSave() {
    this.saveContacts();
    console.log("Contacts:", this.contacts);
  }
}
