import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html'
})
export class personComponent {
  public _http: HttpClient;
  public _baseUrl: string;
  public form: FormGroup;

  public person: Person = {
    id: 0,
    first: '',
    last: '',
    email: '',
    phone: '',
    location: '',
    hobby: ''
  };

  public first: FormControl = new FormControl('', [Validators.required]);
  public last: FormControl = new FormControl('', [Validators.email]);
  public email: FormControl = new FormControl('', [Validators.required]);
  public phone: FormControl = new FormControl('', [Validators.required]);
  public location: FormControl = new FormControl('', [Validators.required]);
  public hobby: FormControl = new FormControl('', [Validators.required]);

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this._baseUrl = baseUrl;
    this._http = http;

    this.form = this.formBuilder.group({
      first: this.first,
      last: this.last,
      email: this.email,
      phone: this.phone,
      location: this.location,
      hobby: this.hobby
    });

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._http.get<Person>(this._baseUrl + 'api/persons/' + id).subscribe(result => {
        this.setPerson(result);
      }, error => console.error(error));
    }
  }

  public setPerson(person: Person): void {
    this.person = person;
    this.first.setValue(person.first);
    this.last.setValue(person.last);
    this.email.setValue(person.email);
    this.phone.setValue(person.phone);
    this.location.setValue(person.location);
    this.hobby.setValue(person.hobby);
  }

 
  public getpersonForm(): void {
    this.person = {
      id: this.person ? this.person.id : 0,
      first: this.first.value,
      last: this.last.value,
      email: this.email.value,
      phone: this.phone.value,
      location: this.location.value,
      hobby: this.hobby.value,
    };
  }

  
  public save(): void {
    this.getpersonForm();
    this._http.post<Person>(this._baseUrl + 'api/persons', this.person).subscribe(result => {
      if (result.id) {
        alert("salvo com sucesso!");
        this.router.navigate(['/person/', { id: result.id }]);
      }
    }, error => console.error(error));

  }

  public update(): void {
    this.getpersonForm();
    this._http.put<Person>(this._baseUrl + 'api/persons/' + this.person.id, this.person).subscribe(result => {
        alert("salvo com sucesso!");
    }, error => console.error(error));

  }

}

