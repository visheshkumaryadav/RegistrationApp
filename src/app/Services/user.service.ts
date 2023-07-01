import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_PATH: string = "http://localhost:4200/api/";

  constructor(private httpservice: HttpClient) { }
  getUsers() {
    return this.httpservice.get(this.API_BASE_PATH + "users")
  }
  getUser(userId: number) {
    return this.httpservice.get(`${this.API_BASE_PATH}users/${userId}`);
  }
  addUser(user: User) {
    return this.httpservice.post(`${this.API_BASE_PATH}users`, user);
  }
  updateUser(user: User) {
    return this.httpservice.put(`${this.API_BASE_PATH}users/${user.id}`, user);
  }
  deleteUser(userId: number) {
    return this.httpservice.delete(`${this.API_BASE_PATH}users/${userId}`);
  }

}
