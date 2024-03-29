package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class KanbanController {

    @Autowired
    BoardRepository boardRepository;

    @GetMapping("/boards")
    public List<Board> getBoards() {
        return boardRepository.getBoards();
    }

    @Autowired
    ColumnRepository columnRepository;
    @GetMapping("/columns")
    public List<Column> getColumns() {
        return columnRepository.getColumns();
    }

    @GetMapping("/columns/byboard/{id}")
    public Column getColumnsByBoardId(@PathVariable("id") int id) { return columnRepository.getColumnsByBoardId(id); }

    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/tasks")
    public List<Task> getTask() {
        return taskRepository.getTasks();
    }

    @Autowired
    SubtaskRepository subtaskRepository;
    @GetMapping("/subtasks")
    public List<Subtask> getSubtasks() {
        return subtaskRepository.getSubtasks();
    }

   // @Autowired
   // FullBoardRepository fullboardRepository;

   // @GetMapping("/all")
   // public List<FullBoard> getAll() {
   //     return fullboardRepository.getAll();
   // }

}
