package com.kanban.kanbanapp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Task> getTasks() {
        return jdbcTemplate.query("select * from task",
                BeanPropertyRowMapper.newInstance(Task.class));
    }

    public Task getTaskById(int id) {
        return jdbcTemplate.queryForObject(" select * from task where task_id = ?", BeanPropertyRowMapper.newInstance(Task.class), id);
    }

    public List<Task> getTasksByBoardId(int id) {
        return jdbcTemplate.query(" select * from task where board_id = ?", BeanPropertyRowMapper.newInstance(Task.class), id);
    }

    public List<Task> getTasksByColumnId(int id) {
        return jdbcTemplate.query(" select * from task where column_id = ?", BeanPropertyRowMapper.newInstance(Task.class), id);
    }

    public Task addTask(Task task) {
        jdbcTemplate.update("INSERT INTO task(task_id, column_id, board_id, task_title, task_description) VALUES(?, ?, ?, ?, ?)", task.getTaskId(), task.getColumnId(), task.getBoardId(), task.getTaskTitle(), task.getTaskDescription());
        return task;
    }

    public int updateTask(Task task) {
        return jdbcTemplate.update("UPDATE task SET column_id=?, task_title=?, task_description=? WHERE task_id=?", task.getColumnId(), task.getTaskTitle(), task.getTaskDescription(), task.getTaskId());
    }

    public int deleteTask(int id) {
        return jdbcTemplate.update("DELETE FROM task where task_id = ?", id);
    }
}
