package ca.polymtl.log8430.service.musicprovider.napster;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.musicprovider.TrackTransformer;

public class NapsterTrackTransformer implements TrackTransformer<com.zeloon.deezer.domain.Track> {

  @Override
  public Track transform(com.zeloon.deezer.domain.Track fromTrack) {
    Track toTrack = new Track();
    toTrack.setName(fromTrack.getTitle());
    toTrack.setArtist(fromTrack.getArtist().getName());
    toTrack.setAlbum(fromTrack.getAlbum().getTitle());
    toTrack.setPreviewurl(fromTrack.getPreview());
    toTrack.setImagesurl(fromTrack.getAlbum().getCover());
    return toTrack;
  }

}