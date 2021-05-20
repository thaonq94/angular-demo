import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialogController } from 'src/app/shared/components/material-dialog/mat-dialog.controller';
import { User } from 'src/models/User';
import { UserQuery } from 'src/state/user/user.query';
import { UserService } from 'src/state/user/user.service';
import { CreateTaskComponent } from '../create-task/create-task.component';

enum View {
  NONE = 'none',
  INFO = 'info',
  TASK = 'task',
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  _currentView: View = View.INFO;
  view = View;
  isLinear = false;
  userInfoForm = this.fb.group({
    id: '',
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    position: ['', Validators.required],
    status: ['', Validators.required]
  });

  listStatus = [{
    title: 'enable',
    value: 'enable'
  },
  {
    title: 'disable',
    value: 'disable'
  }];

  tasks = [
    {
      name: 'Task 1',
      description: 'Mô tả task 1'
    },
    {
      name: 'Task 2',
      description: 'Mô tả task 2'
    },
    {
      name: 'Task 3',
      description: 'Mô tả task 3'
    }
  ]

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private userQuery: UserQuery,
    private matDialogController: MatDialogController,
  ) { }

  ngOnInit(): void {
    let userActive = this.userQuery.getActive();
    if (userActive?.id) {
      this.userInfoForm.patchValue({
        ...userActive
      })
    }
  }

  currentView(view: View) {
    return this._currentView == view;
  }

  infoStep() {
    this._currentView = this.view.INFO
  }

  async taskStep() {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    try {
      if (this.userInfoForm.controls['email'].value && this.userInfoForm.controls['email'].errors?.email) {
        this.snackBar.open('Email không đúng định dạng', '', config)
        return
      }
      if (this.userInfoForm.invalid) {
        this.snackBar.open('Vui lòng điền đầy đủ thông tin', '', config)
        return;
      } 
      this.loading = true;
      setTimeout(async (_: any) => {
        if (this.userInfoForm.controls['id'].value) {
          await this.userService.updateUser(this.userInfoForm.value);
        } else {
          this.userInfoForm.patchValue({
            id: (+new Date()).toString()
          })
          await this.userService.createUser(this.userInfoForm.value);
        }
        this.loading = false;
        this._currentView = this.view.TASK;
      }, 1500);
    } catch (e) {
      this.loading = false;
      this.snackBar.open('Vui lòng điền đầy đủ thông tin', '', config)
    }
  }

  createTask() {
    this.dialogRef.close();
    const dialog = this.matDialogController.create({
      component: CreateTaskComponent,
      afterClosedCb: () => {},
    });
    dialog.open();
  }

}
