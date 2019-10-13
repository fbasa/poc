import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private usersUrl = 'api/users';  

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError<User>('updateUser', user))
      );
  }

  addUser(user: User): Observable<User> {
    user.id = null;
    return this.http.post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError<User>('addUser', user))
      );
  }

  deleteUser (id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError<User>('deleteUser', null))
    );
  }
}
