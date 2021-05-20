import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  users$ = this.userQuery.selectAll();
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'position', 'status', 'action'];
  dataSource!: MatTableDataSource<User>;

  constructor(
    private userService: UserService,
    private matDialogController: MatDialogController,
    private userQuery: UserQuery
  ) {
  }

  async ngOnInit() {
    this.users$.subscribe(_ => {
      this.userService.getUsers().then(_ => {
        this.dataSource = new MatTableDataSource(this.userQuery.getAll());
        this.dataSource.paginator = this.paginator;
      });
    })
    
  }

  editUser(user: User) {
    this.userService.setActiveUser(user.id!);
    const dialog = this.matDialogController.create({
      component: EditUserComponent,
      afterClosedCb: () => {},
    });
    dialog.open();
  }

  createUser(user?: User) {
    this.userService.setActiveUser(user?.id);
    const dialog = this.matDialogController.create({
      component: CreateUserComponent,
      afterClosedCb: () => {},
    });
    dialog.open();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }

}
