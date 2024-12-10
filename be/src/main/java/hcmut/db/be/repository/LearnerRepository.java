package hcmut.db.be.repository;

import hcmut.db.be.entity.Learner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LearnerRepository extends JpaRepository<Learner, Integer> {
}
