import { Component, OnInit } from '@angular/core';
import { CreateUserComponent } from 'src/app/components/create-user/create-user.component';
import { EditUserComponent } from 'src/app/components/edit-user/edit-user.component';
import { MatDialogController } from 'src/app/shared/components/material-dialog/mat-dialog.controller';
import { User } from 'src/models/User';
import { UserQuery } from 'src/state/user/user.query';
import { UserService } from 'src/state/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  users: any;
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'action'];
  constructor(
    private userService: UserService,
    private matDialogController: MatDialogController,
    private userQuery: UserQuery
  ) { }

  async ngOnInit() {
    this.users = await this.userService.getUsers()
    console.log('users', this.userQuery.getAll())
  }

  editUser(user: User) {
    console.log('edit')
    const dialog = this.matDialogController.create({
      component: EditUserComponent,
      config: {
        data: { user }
      },
      afterClosedCb: () => {},
    });
    dialog.open();
  }

  createUser() {
    const dialog = this.matDialogController.create({
      component: CreateUserComponent,
      config: {
        data: { user: new User({}) }
      },
      afterClosedCb: () => {},
    });
    dialog.open();
  }

}
