package ca.polymtl.log8430.repository;

import ca.polymtl.log8430.domain.PlayList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;



/**
 * Spring Data JPA repository for the PlayList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayListRepository extends JpaRepository<PlayList, Long> {

}
