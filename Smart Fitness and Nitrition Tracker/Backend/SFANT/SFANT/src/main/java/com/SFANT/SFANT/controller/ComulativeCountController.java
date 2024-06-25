package com.SFANT.SFANT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SFANT.SFANT.services.CumulativeCountService;

@RestController
@RequestMapping("/api/comulativecount")
public class ComulativeCountController {

    @Autowired
    private CumulativeCountService cumulativeCountService;
    
    @GetMapping("/{category}/{userId}")
    public ResponseEntity<Integer> getCumulativeCountByCategoryAndUser(
            @PathVariable String category, @PathVariable Long userId) {
   
            int count = cumulativeCountService.getCategoryCount(userId , category);

        return ResponseEntity.ok(count);
    }
}
