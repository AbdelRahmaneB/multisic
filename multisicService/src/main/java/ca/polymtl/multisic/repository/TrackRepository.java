package ca.polymtl.multisic.repository;

import ca.polymtl.multisic.domain.Track;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Track entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {

}
