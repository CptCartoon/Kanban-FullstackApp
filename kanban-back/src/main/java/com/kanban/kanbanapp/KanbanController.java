package com.kanban.kanbanapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class KanbanController {

    @Autowired
    BoardRepository boardRepository;

    @GetMapping("/test")
    public int test() {
        return 1;
    }

    @GetMapping("/boards")
    public List<Board> getBoards() {
        return boardRepository.getBoards();
    }
}
