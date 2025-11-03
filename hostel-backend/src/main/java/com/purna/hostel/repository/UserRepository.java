package com.purna.hostel.repository;

import com.purna.hostel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    // ✅ Get all users by role name (Student/Warden/Admin)
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :roleName")
    List<User> findByRoleName(@Param("roleName") String roleName);

    // ✅ Search students by keyword (used in Manage Student page)
    @Query("SELECT u FROM User u JOIN u.roles r " +
           "WHERE r.name = 'ROLE_USER' AND " +
           "(LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<User> searchStudents(@Param("keyword") String keyword);

    // ✅ NEW: Generic search by role (used for WARDEN search)
    @Query("SELECT u FROM User u JOIN u.roles r " +
           "WHERE r.name = :roleName AND " +
           "(LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<User> findByRoleNameAndKeyword(@Param("roleName") String roleName,
                                        @Param("keyword") String keyword);
}
