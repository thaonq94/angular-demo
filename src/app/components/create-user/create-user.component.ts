import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'rxjs';
import { User } from 'src/models/User';

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
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    position: ['', Validators.required]
  });
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user?: User},
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
   
  }

  currentView(view: View) {
    return this._currentView == view;
  }

  infoStep() {
    this._currentView = this.view.INFO
  }

  taskStep() {
    if (this.userInfoForm.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = 2000;
      this.snackBar.open('Vui lòng điền đầy đủ thông tin', '', config)
    } else {
      this._currentView = this.view.TASK
    }
  }

}
