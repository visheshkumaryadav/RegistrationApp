import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { User } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    let users : User[] = [
      { id: 1, title: 'mr', firstName: "Vishesh kumar", lastName: "Yadav", email: "vishes2016yadav@gmail.com", dob: "1999-10-30", password: "123456", acceptTerms: true },
      { id: 2, title: 'mr', firstName: "Vikash", lastName: "kumar", email: "vikash@gmail.com", dob: "1999-05-30", password: "1234567", acceptTerms: true }
    ];
    return {users};
  }
}
