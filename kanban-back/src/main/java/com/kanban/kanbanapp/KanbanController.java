package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class KanbanController {

    // ############ BOARD
    @Autowired
    BoardRepository boardRepository;

    @GetMapping("/boards")
    public List<Board> getBoards() {
        return boardRepository.getBoards();
    }

    @GetMapping("/boards/{id}")
    public Board getBoardId(@PathVariable("id") int id) { return boardRepository.getBoardId(id); }

    @PostMapping("/board")
    public Board addBoard(@RequestBody Board board) {return boardRepository.addBoard(board); }

    @DeleteMapping("/boards/{id}")
    public int deleteBoard(@PathVariable("id") int id) {return boardRepository.deleteBoard(id); }


    // ############ COLUMN
    @Autowired
    ColumnRepository columnRepository;
    @GetMapping("/columns")
    public List<Column> getColumns() {
        return columnRepository.getColumns();
    }

    @GetMapping("/columns/byboard/{id}")
    public List<Column> getColumnsByBoardId(@PathVariable("id") int id) { return columnRepository.getColumnsByBoardId(id); }

    @PostMapping("/column")
    public Column addColumn(@RequestBody Column column) {return columnRepository.addColumn(column); }

    @DeleteMapping("/columns/{id}")
    public int deleteColumn(@PathVariable("id") int id) {return columnRepository.deleteColumn(id); }


    // ############ TASK
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

    @PostMapping("/task")
    public Task addTask(@RequestBody Task task) {return taskRepository.addTask(task); }

    @DeleteMapping("/tasks/{id}")
    public int deleteTask(@PathVariable("id") int id) {return taskRepository.deleteTask(id); }


    // ############ SUBTASK
    @Autowired
    SubtaskRepository subtaskRepository;

    @GetMapping("/subtasks")
    public List<Subtask> getAllSubtasks() {
        return subtaskRepository.getAllSubtasks();
    }
    @GetMapping("/subtasks/bytask/{id}")
    public List<Subtask> getSubtasks(@PathVariable("id") int id) {
        return subtaskRepository.getSubtasks(id);
    }

    @GetMapping("/subtask/{id}")
    public Subtask getSubtaskById(@PathVariable("id") int id) {
        return subtaskRepository.getSubtasksById(id);
    }

    @GetMapping("/subtasks/byboard/{id}")
    public List<Subtask> getSubtasksByBoard(@PathVariable("id") int id) {
        return subtaskRepository.getSubtasksByBoard(id);
    }

    @PostMapping("/subtask")
    public Subtask addSubtask(@RequestBody Subtask subtask) {return subtaskRepository.addSubtask(subtask); }

    @PatchMapping("/subtask/{id}")
    public int updateSubtask(@PathVariable("id") int id, @RequestBody Subtask updateSubtask) {

        Subtask subtask = subtaskRepository.getSubtasksById(id);

            subtask.setSubtaskTitle(updateSubtask.getSubtaskTitle());
            subtask.setSubtaskIscomplete(updateSubtask.getSubtaskIscomplete());
            subtaskRepository.updateSubtask(subtask);

        return 1;
    }

    @DeleteMapping("/subtask/{id}")
    public int deleteSubtask(@PathVariable("id") int id) {return subtaskRepository.deleteSubtask(id); }

}
