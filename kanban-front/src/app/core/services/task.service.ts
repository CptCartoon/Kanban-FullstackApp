import { Injectable } from '@angular/core';
import { Task } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private allTasks: Task[] = [];

  taskChange = new Subject<Task[]>();
  allTasksChange = new Subject<Task[]>();
  constructor() {}

  public get _getAllTasks() {
    return this.allTasks.slice();
  }

  public set _setAllTasks(arr: Task[]) {
    this.allTasks = [...arr];
    this.allTasksChange.next(this._getAllTasks);
  }

  public get _getTasks() {
    return this.tasks.slice();
  }

  public set _setTasks(arr: Task[]) {
    this.tasks = [...arr];
    this.taskChange.next(this._getTasks);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.taskChange.next(this._getTasks);
    this.allTasks.push(task);
    this.allTasksChange.next(this._getAllTasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.taskId !== id);
    this.taskChange.next(this._getTasks);
    this.allTasks = this.allTasks.filter((task) => task.taskId !== id);
    this.allTasksChange.next(this._getAllTasks);
  }
}
