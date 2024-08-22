package com.kanban.kanbanapp;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    private int taskId;
    private int columnId;
    private int boardId;
    private String taskTitle;
    private String taskDescription;

    public int getTaskId() {
        return taskId;
    }

    public int getColumnId() {
        return columnId;
    }

    public int getBoardId() {
        return boardId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setColumnId(int columnId) {
        this.columnId = columnId;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
}
