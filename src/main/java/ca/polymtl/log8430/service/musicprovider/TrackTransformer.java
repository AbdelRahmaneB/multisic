package ca.polymtl.log8430.service.musicprovider;

import ca.polymtl.log8430.domain.Track;

public interface TrackTransformer<F> {

	Track transform(F fromTrack);
}
