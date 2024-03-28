package com.kanban.kanbanapp;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullBoard {

    private List<Board> board;
    private List<Column> columns;
    private List<Task> tasks;
    private List<Subtask> subtasks;
}
