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
}
