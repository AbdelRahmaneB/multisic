package ca.polymtl.log8430.service.musicprovider.spotify;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.musicprovider.TrackTransformer;

class SpotifyTrackTransformer implements TrackTransformer<com.wrapper.spotify.model_objects.specification.Track> {

	@Override
	public Track transform(com.wrapper.spotify.model_objects.specification.Track fromTrack) {
		Track toTrack = new Track()
			.name(fromTrack.getName())
			.artist(fromTrack.getArtists()[0].getName())
			.album(fromTrack.getAlbum().getName())
			.previewurl(fromTrack.getPreviewUrl())
			.imagesurl(fromTrack.getAlbum().getImages()[0].getUrl());
		return toTrack;
	}
}
