package com.SFANT.SFANT.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SFANT.SFANT.model.CumulativeCountEntity;
import com.SFANT.SFANT.model.User;

import java.util.Optional;

@Repository
public interface CumulativeCountRepository extends JpaRepository<CumulativeCountEntity, Long> {

    Optional<CumulativeCountEntity> findByCategoryAndUser(String category, User user);

}
