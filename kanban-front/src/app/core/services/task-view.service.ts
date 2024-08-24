import { Injectable } from '@angular/core';
import { TaskView } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskViewService {
  private taskView: TaskView = {} as TaskView;
  taskViewChange = new Subject<TaskView>();

  constructor() {}

  public get _getTaskView() {
    return this.taskView;
  }

  public set _setTaskView(taskView: TaskView) {
    this.taskView = taskView;
    this.taskViewChange.next(this._getTaskView);
  }
}
