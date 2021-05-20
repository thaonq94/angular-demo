import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { User } from 'src/models/User';
import { UserQuery } from 'src/state/user/user.query';
import { UserService } from 'src/state/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user?: User;
  userForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    position: ['', Validators.required],
    status: ['', Validators.required]
  });
  loading?: boolean;

  listStatus = [{
    title: 'enable',
    value: 'enable'
  },
  {
    title: 'disable',
    value: 'disable'
  }]

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private userQuery: UserQuery,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.user = this.userQuery.getActive();
    this.userForm.patchValue({...this.user});
  }

  async updateUser() {
    this.loading = true;
    this.cdr.detectChanges();
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    try {
      if (this.userForm.invalid) {
        this.loading = false;
        this.snackBar.open('Vui lòng nhập đầy đủ thông tin', '', config);
        return;
      }
      setTimeout(async (_: any) => {
        await this.userService.updateUser(this.userForm.value);
        this.loading = false;
        this.snackBar.open('Cập nhật thông tin thành công', '', config);
        this.dialogRef.close();
      }, 2000)
      
    } catch (e) {
      this.loading = false;
      this.snackBar.open(e?.message, '', config);
    }
    console.log('loading', this.loading)
  }

}
