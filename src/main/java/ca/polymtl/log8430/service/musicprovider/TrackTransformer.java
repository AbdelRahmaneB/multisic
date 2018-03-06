package ca.polymtl.log8430.service.musicprovider;

import ca.polymtl.log8430.domain.Track;

/** 
 * ..
 *
 * @param <F> ..
 */
public interface TrackTransformer<F> {

	/**
	 * ..
	 * 
	 * @param fromTrack ..
	 * @return ..
	 */
	Track transform(F fromTrack);
}
