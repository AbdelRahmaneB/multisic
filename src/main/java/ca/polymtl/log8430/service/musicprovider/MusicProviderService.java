package ca.polymtl.log8430.service.musicprovider;

import ca.polymtl.log8430.domain.Track;

import java.util.List;

/**
 * ..
 *
 */
public interface MusicProviderService {
	
	/**
	 * ..
	 * 
	 * @param query ..
	 * @return
	 */
    List<Track> search(String query);
    
    /**
     * ..
     * 
     * @return ..
     */
    String getProviderName();
}
