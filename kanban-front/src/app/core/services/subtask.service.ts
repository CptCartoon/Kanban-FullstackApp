import { Injectable } from '@angular/core';
import { Subtask } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  private subtasks: Subtask[] = [];
  subtaskChange = new Subject<Subtask[]>();

  constructor() {}

  public get _getSubtasks() {
    return this.subtasks.slice();
  }

  public set _setSubtasks(arr: Subtask[]) {
    this.subtasks = [...arr];
    this.subtaskChange.next(this._getSubtasks);
  }
}
