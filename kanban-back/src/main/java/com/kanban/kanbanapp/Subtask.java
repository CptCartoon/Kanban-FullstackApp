package com.kanban.kanbanapp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subtask {
    private int subtaskId;
    private int taskId;
    private int boardId;
    private String subtaskTitle;
    private boolean subtaskIscomplete;
}
