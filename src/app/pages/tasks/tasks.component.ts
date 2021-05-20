import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { MatDialogController } from 'src/app/shared/components/material-dialog/mat-dialog.controller';
import { Task } from 'src/models/Task';
import { TaskQuery } from 'src/state/task/task.query';
import { TaskService } from 'src/state/task/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  tasks$ = this.taskQuery.selectAll();
  displayedColumns: string[] = ['id', 'name', 'description', 'start', 'end', 'link', 'image_urls', 'action'];
  dataSource!: MatTableDataSource<Task>;

  constructor(
    private taskService: TaskService,
    private matDialogController: MatDialogController,
    private taskQuery: TaskQuery
  ) {
  }

  async ngOnInit() {
    this.tasks$.subscribe(_ => {
      this.taskService.getTasks().then(_ => {
        this.dataSource = new MatTableDataSource(this.taskQuery.getAll());
        this.dataSource.paginator = this.paginator;
      });
    })
  }

  ngOnDestroy() {
    // this.tasks$.unsubscribe()
  }

  editTask(task: Task) {
    this.taskService.setActive(task);
    const dialog = this.matDialogController.create({
      component: CreateTaskComponent,
      afterClosedCb: () => {},
    });
    dialog.open();
  }

  createTask() {
    const dialog = this.matDialogController.create({
      component: CreateTaskComponent,
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
