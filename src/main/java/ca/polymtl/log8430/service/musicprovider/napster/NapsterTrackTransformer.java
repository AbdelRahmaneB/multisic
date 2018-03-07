package ca.polymtl.log8430.service.musicprovider.napster;

import ca.polymtl.log8430.domain.Track;
import org.json.simple.JSONObject;

public class NapsterTrackTransformer {

  @Override
  public Track transform(JSONObject fromTrack) {
    Track toTrack = new Track();
    toTrack.setName(fromTrack.get("name"));
    toTrack.setArtist(fromTrack.get("artistName"));
    toTrack.setAlbum(fromTrack.get("albumName"));
    toTrack.setPreviewurl(fromTrack.get("previewURL")); 
    toTrack.setImagesurl(fromTrack.get("name")); // get from api ie:http://direct.napster.com/imageserver/v2/albums/{album_id}/images/{size}.{extension}
    return toTrack;
  }

}