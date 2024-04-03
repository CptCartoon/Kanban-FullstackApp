import { Injectable } from '@angular/core';
import { Task } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  taskChange = new Subject<Task[]>();

  constructor() {}

  public get _getTasks() {
    return this.tasks.slice();
  }

  public set _setTasks(arr: Task[]) {
    this.tasks = [...arr];
    this.taskChange.next(this._getTasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.taskId !== id);
    this.taskChange.next(this._getTasks);
  }
}
