package com.kanban.kanbanapp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subtask {
    private int subtask_id;
    private int task_id;
    private String subtask_title;
    private boolean subtask_iscomplete;
}
