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
        return jdbcTemplate.query("select * from board",
                BeanPropertyRowMapper.newInstance(Board.class));
    }

    public Board getBoardId(int id) {
        return jdbcTemplate.queryForObject("select * from board where board_id = ?",
                BeanPropertyRowMapper.newInstance(Board.class), id);
    }

    public int deleteBoard(int id) {
        return jdbcTemplate.update("DELETE FROM board where board_id = ?", id);
    }

}
