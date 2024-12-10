package hcmut.db.be.repository;

import hcmut.db.be.entity.course.Section;
import hcmut.db.be.entity.course.SectionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, SectionId> {
}
