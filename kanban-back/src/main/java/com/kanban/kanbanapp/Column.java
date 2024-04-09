package com.kanban.kanbanapp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Column {

    private int columnId;
    private int boardId;
    private String columnName;

    public int getColumnId() {
        return columnId;
    }
    public int getBoardId() {
        return boardId;
    }

    public String getColumnName() {
        return columnName;
    }
}
