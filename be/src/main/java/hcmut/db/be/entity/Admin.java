package hcmut.db.be.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "ADMIN")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id")
    private User user; // Liên kết với bảng User

    @Column(name = "Level", nullable = false)
    private String level;
}
