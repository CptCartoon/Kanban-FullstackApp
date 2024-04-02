package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class KanbanController {

    @Autowired
    BoardRepository boardRepository;

    @GetMapping("/boards")
    public List<Board> getBoards() {
        return boardRepository.getBoards();
    }

    @GetMapping("/boards/{id}")
    public Board getBoardId(@PathVariable("id") int id) { return boardRepository.getBoardId(id); }

    @DeleteMapping("/boards/{id}")
    public int deleteBoard(@PathVariable("id") int id) {return boardRepository.deleteBoard(id); }

    @Autowired
    ColumnRepository columnRepository;
    @GetMapping("/columns")
    public List<Column> getColumns() {
        return columnRepository.getColumns();
    }

    @GetMapping("/columns/byboard/{id}")
    public List<Column> getColumnsByBoardId(@PathVariable("id") int id) { return columnRepository.getColumnsByBoardId(id); }

    @DeleteMapping("/columns/{id}")
    public int deleteColumn(@PathVariable("id") int id) {return columnRepository.deleteColumn(id); }

    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/tasks")
    public List<Task> getTask() {
        return taskRepository.getTasks();
    }

    @GetMapping("/tasks/byboard/{id}")
    public List<Task> getTasksByBoardId(@PathVariable("id") int id) { return taskRepository.getTasksByBoardId(id); }

    @GetMapping("/tasks/bycolumn/{id}")
    public List<Task> getTasksByColumnId(@PathVariable("id") int id) { return taskRepository.getTasksByColumnId(id); }

    @DeleteMapping("/tasks/{id}")
    public int deleteTask(@PathVariable("id") int id) {return taskRepository.deleteTask(id); }

    @Autowired
    SubtaskRepository subtaskRepository;
    @GetMapping("/subtasks/bytask/{id}")
    public List<Subtask> getSubtasks(@PathVariable("id") int id) {
        return subtaskRepository.getSubtasks(id);
    }

    @DeleteMapping("/subtask/{id}")
    public int deleteSubtask(@PathVariable("id") int id) {return subtaskRepository.deleteSubtask(id); }

}
