package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FullBoardRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<FullBoard> getAll() {
        return jdbcTemplate.query("select * from board join boardColumn using(board_id) join task using(column_id) join subtask using(task_id)",
                BeanPropertyRowMapper.newInstance(FullBoard.class));
    }
}


