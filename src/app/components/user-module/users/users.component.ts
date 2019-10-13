import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services';
import { User } from 'src/app/models';
import { of } from 'rxjs';
import { switchMap, flatMap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'poc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit, OnDestroy {

  users: User[] = [];
  user: User =  null;
  cols: any[];
  selectedUser: User;
  displayDialog: boolean;
  newUser: boolean;

  constructor(private userService: UserService) {
    super();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'dob', header: 'Date of Birth' },
      { field: 'email', header: 'E-mail' },
      { field: 'gender', header: 'Gender' },
      { field: 'hourlyRate', header: 'Hourly Rate' }
    ];
  }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  getUsers() {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(users => {
        this.users = users;
      });
  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = this.newUserData();
    this.displayDialog = true;
  }

  saveUser() {
    of(this.newUser)
    .pipe(
      switchMap(ifNew => ifNew 
        ? this.userService.addUser(this.user) 
        : this.userService.updateUser(this.user)),
      flatMap(p => this.userService.getUsers())
    ).subscribe(users => {
      this.users = users;
      this.displayDialog = false;
    })
  }

  deleteUser() {
    this.userService
    .deleteUser(this.selectedUser.id)
    .pipe(
      flatMap(u => this.userService.getUsers())
    ).subscribe(users => {
      this.displayDialog = false;
      this.users = users;
    });
  }

  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayDialog = true;
  }

  cloneUser(u: User): User {
    let user = this.newUserData();
    for (let prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }

  newUserData(): User {
    return {
      id: 0,
      name: '',
      dob: null,
      email: '',
      gender: '',
      hourlyRate: 0
    };
  }

}
