import { Injectable } from '@angular/core';
import { TaskApi } from 'src/api/task.api';
import { Task } from 'src/models/Task';
import { TaskQuery } from './task.query';
import { TaskStore } from './task.store';

@Injectable({
    providedIn: 'root'
  })

  export class TaskService {
    constructor(
      private taskStore: TaskStore,
      private taskQuery: TaskQuery,
      private taskApi: TaskApi,
    ) {
    }

    async getTasks() {
      try {
        let tasks: Task[] = [];
        for (let index = 1; index < 50; index++) {
          tasks.push({
            id: index.toString(),
            name: `Task ${index}`,
            description: `Mô tả của task ${index}`,
            start: '',
            end: '',
            link: `${index}abc.com`,
            image_urls: []
          })
        }
        if (!this.taskQuery.getAll().length) {
          this.taskStore.set(tasks);
        }
      } catch (e) {
        console.log('ERROR in getTasks', e)
      }
      
    }

    setActive(task?: Task) {
      this.taskStore.setActive(task?.id!);
    }

    async createTask(task: Task) {
      try {
        this.taskStore.add(task, { prepend: true })
      } catch (e) {
        console.log('ERROR in createTask', e);
      }
    }

    async updateTask(task: Task) {
      try {
        this.taskStore.update(task.id!, task)
      } catch (e) {
        console.log('ERROR in createTask', e);
      }
    }

}