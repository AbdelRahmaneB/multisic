package ca.polymtl.log8430.service.musicprovider.napster;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.musicprovider.MusicProviderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


/**
 * Service class for managing Napster API.
 */
@Service
@Transactional
class NapsterProviderService implements MusicProviderService {

    private final String API_KEY = "YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4";
    private final String BASE_URL = "https://api.napster.com/v2.2/search";
    private final String LIMIT = "10";
    private final Logger log = LoggerFactory.getLogger(NapsterProviderService.class);
    private static final String MUSIC_PROVIDER_NAME = "napster";
    private NapsterTrackTransformer trackTrans;

    @Override
    public List<Track> search(String query) {
        List<Track> tracks = new ArrayList<>();

        try {
            // source: https://www.mkyong.com/java/how-to-send-http-request-getpost-in-java/
            String url = BASE_URL + "?query=" + query + "&type=track" + "&per_type_limit=" + LIMIT + "&apikey="
                    + API_KEY;
            URL obj = new URL(url);

            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            con.setRequestMethod("GET");
            int responseCode = con.getResponseCode();
            System.out.println("\nSending 'GET' request to URL : " + url);
            System.out.println("Response Code : " + responseCode);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONParser jp = new JSONParser();
            JSONObject json = (JSONObject) jp.parse(response.toString());
            JSONObject searchResults = (JSONObject) jp.parse(json.get("search").toString());
            JSONObject dataResults = (JSONObject) jp.parse(searchResults.get("data").toString());
            JSONArray tracksJson = (JSONArray) dataResults.get("tracks");

            // devrait ce faire avec le NapsterTrackTransformer mais une raison obsure recoit un objet null
            for(int i=0; i<tracksJson.size(); i++){
                Track toTrack = new Track();
                JSONObject track = (JSONObject) jp.parse(tracksJson.get(i).toString());
                //toTrack.setId(track.get("id").toString()); // les id devraient etre String mais sont Long.
                toTrack.setName(track.get("name").toString());
                toTrack.setArtist(track.get("artistName").toString());
                toTrack.setAlbum(track.get("albumName").toString());
                toTrack.setPreviewurl(track.get("previewURL").toString()); 
                toTrack.setImagesurl(track.get("name").toString());
                tracks.add(toTrack);
            }
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getCause().getMessage());
        }
        return tracks;
    }

    @Override
    public String getProviderName() {
        return MUSIC_PROVIDER_NAME;
    }
}
