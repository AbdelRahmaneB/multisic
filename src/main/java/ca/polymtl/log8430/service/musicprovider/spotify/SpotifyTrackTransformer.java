package ca.polymtl.log8430.service.musicprovider.spotify;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.musicprovider.TrackTransformer;

import java.util.UUID;

public class SpotifyTrackTransformer implements TrackTransformer<com.wrapper.spotify.model_objects.specification.Track> {

	@Override
	public Track transform(com.wrapper.spotify.model_objects.specification.Track fromTrack) {
		Track toTrack = new Track();
        toTrack.setId(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
		toTrack.setName(fromTrack.getName());
		toTrack.setArtist(fromTrack.getArtists()[0].getName());
		toTrack.setAlbum(fromTrack.getAlbum().getName());
		toTrack.setPreviewurl(fromTrack.getPreviewUrl());
		toTrack.setImagesurl(fromTrack.getAlbum().getImages()[0].getUrl());
		return toTrack;
	}
}
