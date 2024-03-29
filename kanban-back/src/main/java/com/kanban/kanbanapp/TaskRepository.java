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

    public Task getTasksByColumnId(int id) {
        return jdbcTemplate.queryForObject(" select * from task where column_id = ?", BeanPropertyRowMapper.newInstance(Task.class), id);
    }
}
