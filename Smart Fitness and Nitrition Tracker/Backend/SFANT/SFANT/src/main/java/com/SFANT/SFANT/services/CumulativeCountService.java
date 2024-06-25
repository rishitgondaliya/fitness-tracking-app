package com.SFANT.SFANT.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SFANT.SFANT.model.CumulativeCountEntity;
import com.SFANT.SFANT.model.User;
import com.SFANT.SFANT.repository.CumulativeCountRepository;

@Service
public class CumulativeCountService {

    @Autowired
    private CumulativeCountRepository cumulativeCountRepository;

    @Transactional
    public void updateExerciseCount(User user, int incrementValue,String category) {
        CumulativeCountEntity cumulativeCount = cumulativeCountRepository.findByCategoryAndUser(category, user)
                .orElse(new CumulativeCountEntity(user, category, 0));

        cumulativeCount.setTotalCount(cumulativeCount.getTotalCount() + incrementValue);
        cumulativeCountRepository.save(cumulativeCount);
    }

    @Transactional(readOnly = true)
    public Integer getCategoryCount(Long userId, String category) {
        User user = new User();
        user.setId(userId);
        return cumulativeCountRepository.findByCategoryAndUser(category, user)
                .map(CumulativeCountEntity::getTotalCount)
                .orElse(0);
    }
}
