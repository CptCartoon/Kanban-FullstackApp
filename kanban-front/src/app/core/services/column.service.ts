import { Injectable } from '@angular/core';
import { Column } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private columns: Column[] = [];
  columnChange = new Subject<Column[]>();

  constructor() {}

  public get _getColumns() {
    return this.columns.slice();
  }

  public set _setColumns(arr: Column[]) {
    this.columns = [...arr];
    this.columnChange.next(this._getColumns);
  }

  addColumn(column: Column) {
    this.columns.push(column);
    this.columnChange.next(this._getColumns);
  }
}
