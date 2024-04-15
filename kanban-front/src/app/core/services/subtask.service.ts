import { Injectable } from '@angular/core';
import { Subtask } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubtaskService {
  private subtasks: Subtask[] = [];
  subtaskChange = new Subject<Subtask[]>();

  private allSubtasks: Subtask[] = [];
  allSubtaskChange = new Subject<Subtask[]>();

  constructor() {}

  public get _getAllSubtasks() {
    return this.allSubtasks.slice();
  }

  public set _setAllSubtasks(arr: Subtask[]) {
    this.allSubtasks = [...arr];
    this.allSubtaskChange.next(this._getAllSubtasks);
  }

  public get _getSubtasks() {
    return this.subtasks.slice();
  }

  public set _setSubtasks(arr: Subtask[]) {
    this.subtasks = [...arr];
    this.subtaskChange.next(this._getSubtasks);
  }

  addSubtask(subtask: Subtask) {
    this.subtasks.push(subtask);
    this.subtaskChange.next(this._getSubtasks);
  }

  deleteSubtask(id: number): void {
    this.subtasks = this.subtasks.filter((subtask) => subtask.subtaskId !== id);
    this.subtaskChange.next(this._getSubtasks);
  }
}
