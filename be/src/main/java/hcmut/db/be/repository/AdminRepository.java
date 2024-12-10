package hcmut.db.be.repository;

import hcmut.db.be.entity.Admin;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Admin (id, level) VALUES (:userId, :level)", nativeQuery = true)
    void insertAdmin(@Param("userId") Integer userId, @Param("level") String level);

}
