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

    public int getSubtaskId() {
        return subtaskId;
    }

    public int getTaskId() {
        return taskId;
    }

    public int getBoardId() {
        return boardId;
    }

    public String getSubtaskTitle() {
        return subtaskTitle;
    }

    public boolean getSubtaskIscomplete() {
        return subtaskIscomplete;
    }

    public void setSubtaskTitle(String subtaskTitle) {
        this.subtaskTitle = subtaskTitle;
    }

    public void setSubtaskIscomplete(boolean subtaskIscomplete) {
        this.subtaskIscomplete = subtaskIscomplete;
    }
}
