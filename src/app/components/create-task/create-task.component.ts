import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TaskQuery } from 'src/state/task/task.query';
import { TaskService } from 'src/state/task/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @ViewChild('upload') upload!: any;
  @ViewChild('rangePicker') rangePicker!: any;
  layout = [{
    title: 'Hình ảnh',
    value: 'image'
  },
  {
    title: 'Link',
    value: 'link'
  }];

  taskForm = this.fb.group({
    id: '',
    name: ['', Validators.required],
    link: '',
    image_urls: [],
    layout_type: ['', Validators.required],
    duration: this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    }),
    description: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    private taskQuery: TaskQuery,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
  ) { }

  ngOnInit(): void {
    let activeTask = this.taskQuery.getActive();
    if (activeTask?.id) {
      this.taskForm.patchValue(activeTask);
      if (activeTask.link) {
        this.taskForm.patchValue({
          layout_type: 'link'
        });
      } else {
        this.taskForm.patchValue({
          layout_type: 'image'
        });
      }
    }
  }
  
  async createTask() {
    this.taskService.setActive();
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    try {
      if (this.taskForm.invalid) {
        this.snackBar.open('Vui lòng điền đầy đủ thông tin', '', config)
        return;
      } 
      if (this.taskForm.controls['layout_type'].value == 'link' && this.taskForm.controls['link'].value == '') {
        this.snackBar.open('Link đang bị trống', '', config)
        return;
      }
      if (this.taskForm.controls['layout_type'].value == 'image') {
        if (this.upload.files.length) {
          this.taskForm.patchValue({
            image_urls: this.upload.files.map((file : any) => file.name)
          })
          let _files = this.upload.files.filter((file: any) => file.size > 8*1024*1024) 
          if (_files?.length) {
            this.snackBar.open('Hình upload không được quá 8MB!', '', config)
          }
        } else {
          this.snackBar.open('Chưa có hình ảnh', '', config)
          return;
        }
      }
      if (this.taskQuery.getActive()) {
        await this.taskService.updateTask(this.taskForm.value);
        this.snackBar.open('Cập nhật công việc thành công', '', config);
      } else {
        await this.taskService.createTask({...this.taskForm.value, id: (+new Date()).toString()});
        this.snackBar.open('Thêm công việc thành công', '', config);
      }
      
      this.dialogRef.close();
    } catch (e) {
      this.snackBar.open(e.message, '', config)
    }
  }
}
