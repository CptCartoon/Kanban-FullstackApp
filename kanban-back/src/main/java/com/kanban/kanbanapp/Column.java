package com.kanban.kanbanapp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Column {

    private int column_id;
    private int board_id;
    private String column_name;

}
