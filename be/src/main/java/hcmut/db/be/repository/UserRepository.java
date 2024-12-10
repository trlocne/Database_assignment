package hcmut.db.be.repository;

import hcmut.db.be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT * FROM [USER]", nativeQuery = true)
    List<User> findAlls();

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO [USER] (full_name, user_name, password, dob, avatar, gender, phone_number, status) " +
            "VALUES (:fullName, :username, :password, :dob, :avatar, :gender, :phoneNumber, :status)", nativeQuery = true)
    void insertUser(@Param("fullName") String fullName,
                    @Param("username") String username,
                    @Param("password") String password,
                    @Param("dob") LocalDate dob,
                    @Param("avatar") String avatar,
                    @Param("gender") Character gender,
                    @Param("phoneNumber") String phoneNumber,
                    @Param("status") Character status);

    @Query(value = "SELECT id FROM [USER] WHERE user_name = :username", nativeQuery = true)
    Integer findUserIdByUsername(@Param("username") String username);
}
