package ca.polymtl.log8430.service.musicprovider.napster;

import ca.polymtl.log8430.domain.Track;
import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;

public class NapsterTrackTransformer {
  public Track transform(JSONObject fromTrack) {
    //JSONParser jp = new JSONParser();
    Track toTrack = new Track();

    // toTrack.setName(jp.parse(fromTrack.get("name").toString()));
    // toTrack.setArtist(jp.parse(fromTrack.get("artistName").toString()));
    // toTrack.setAlbum(jp.parse(fromTrack.get("albumName").toString()));
    // toTrack.setPreviewurl(jp.parse(fromTrack.get("previewURL").toString())); 
    // toTrack.setImagesurl(jp.parse(fromTrack.get("name").toString())); // get from api ie:http://direct.napster.com/imageserver/v2/albums/{album_id}/images/{size}.{extension}
    return toTrack;
  }

}