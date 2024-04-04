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

    public List<Subtask> getSubtasks(int id) {
        return jdbcTemplate.query("select * from subtask where task_id = ?",
                BeanPropertyRowMapper.newInstance(Subtask.class), id);
    }

    public List<Subtask> getSubtasksByBoard(int id) {
        return jdbcTemplate.query("select * from subtask where board_id = ?",
                BeanPropertyRowMapper.newInstance(Subtask.class), id);
    }
    public int deleteSubtask(int id) {
        return jdbcTemplate.update("DELETE FROM subtask where subtask_id = ?", id);
    }
}
