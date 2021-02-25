import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import validate = WebAssembly.validate;

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
     private formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id:[''],
      fullName: new FormControl([Validators.required, Validators.maxLength(255), Validators.minLength(1)]),
      address: new FormControl([Validators.maxLength(200)]),
      country: new FormControl([Validators.required]),
      city: new FormControl([Validators.required]),
      job: new FormControl([Validators.required]),
      audience: new FormControl([Validators.required]),
      accountDescribe: new FormControl([Validators.maxLength(2000)])
    })
  }

}
