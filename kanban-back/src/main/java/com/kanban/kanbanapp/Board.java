package com.kanban.kanbanapp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    private int boardId;
    private String boardName;

    public int getBoardId() {
        return boardId;
    }
    public String getBoardName() {
        return boardName;
    }
}
