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

    public List<Subtask> getAllSubtasks() {
        return jdbcTemplate.query("select * from subtask",
                BeanPropertyRowMapper.newInstance(Subtask.class));
    }

    public Subtask getSubtasksById(int id) {
        return jdbcTemplate.queryForObject("select * from subtask where subtask_id = ?",
                BeanPropertyRowMapper.newInstance(Subtask.class), id);
    }

    public List<Subtask> getSubtasks(int id) {
        return jdbcTemplate.query("select * from subtask where task_id = ?",
                BeanPropertyRowMapper.newInstance(Subtask.class), id);
    }

    public List<Subtask> getSubtasksByBoard(int id) {
        return jdbcTemplate.query("select * from subtask where board_id = ?",
                BeanPropertyRowMapper.newInstance(Subtask.class), id);
    }

    public Subtask addSubtask(Subtask subtask) {
        jdbcTemplate.update("INSERT INTO subtask(subtask_id, task_id, board_id, subtask_title, subtask_iscomplete) VALUES(?, ?, ?, ?, ?)", subtask.getSubtaskId(), subtask.getTaskId(), subtask.getBoardId(), subtask.getSubtaskTitle(), subtask.getSubtaskIscomplete());
        return subtask;
    }

    public int updateSubtask(Subtask subtask) {
        return jdbcTemplate.update("UPDATE subtask SET subtask_title=?, subtask_iscomplete=? WHERE subtask_id=?", subtask.getSubtaskTitle(), subtask.getSubtaskIscomplete(), subtask.getSubtaskId());
    }
    public int deleteSubtask(int id) {
        return jdbcTemplate.update("DELETE FROM subtask where subtask_id = ?", id);
    }
}
