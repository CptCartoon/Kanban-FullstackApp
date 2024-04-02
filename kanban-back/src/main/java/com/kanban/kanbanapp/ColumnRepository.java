package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ColumnRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Column> getColumns() {
        return jdbcTemplate.query("select * from boardColumn",
                BeanPropertyRowMapper.newInstance(Column.class));
    }

    public List<Column> getColumnsByBoardId(int id) {
        return jdbcTemplate.query("select * from boardColumn where board_id = ?",
                BeanPropertyRowMapper.newInstance(Column.class), id);
    }

    public int deleteColumn(int id) {
        return jdbcTemplate.update("DELETE FROM boardColumn where column_id = ?", id);
    }
}
