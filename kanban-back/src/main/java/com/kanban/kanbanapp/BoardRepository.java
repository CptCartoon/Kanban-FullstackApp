package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BoardRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;
    public List<Board> getBoards() {
        return jdbcTemplate.query("select board_name from board",
                BeanPropertyRowMapper.newInstance(Board.class));
    }
}
