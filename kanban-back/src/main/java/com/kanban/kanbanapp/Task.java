package com.kanban.kanbanapp;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    private int task_id;
    private int column_id;
    private String task_title;
    private String task_description;
}
