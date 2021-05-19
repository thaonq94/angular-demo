import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  layout = [{
    title: 'Hình ảnh',
    value: 'image'
  },
  {
    title: 'Link',
    value: 'link'
  }];

  taskForm = this.fb.group({
    name: ['', Validators.required],
    created_at: ['', Validators.required],
    link: '',
    image_urls: [],
    layout_type: '',
    duration: this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
    }),
    description: ['', Validators.required]
  })

  campaignTwo?: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.taskForm.controls['duration'] = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }

}
