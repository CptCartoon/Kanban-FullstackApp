package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SubtaskRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Subtask> getSubtasks() {
        return jdbcTemplate.query("select * from subtask",
                BeanPropertyRowMapper.newInstance(Subtask.class));
    }
}
