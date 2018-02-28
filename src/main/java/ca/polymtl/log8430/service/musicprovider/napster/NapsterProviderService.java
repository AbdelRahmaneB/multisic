package ca.polymtl.log8430.service.musicprovider.napster;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.musicprovider.MusicProviderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
@Transactional
class NapsterProviderService implements MusicProviderService {

    private final String API_KEY = "YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4";
    private final Logger log = LoggerFactory.getLogger(NapsterProviderService.class);
    private static final String MUSIC_PROVIDER_NAME = "napster";

    private final String baseUrl = "https://api.napster.com/v2.2/search?query=weezer&apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm";

    @Override
    public List<Track> search(String query) {
        //TODO REMOVE MOCK AND DO ACTUAL CALLS HERE
        List<Track> tracks = new ArrayList<>();
        Track track = new Track();

        try {
            URL obj = new URL(baseUrl);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // optional default is GET
            con.setRequestMethod("GET");

            //add request header
            // con.setRequestProperty("User-Agent", USER_AGENT);

            int responseCode = con.getResponseCode();
            System.out.println("\nSending 'GET' request to URL : " + baseUrl);
            System.out.println("Response Code : " + responseCode);
            System.out.println("===========================");

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            //print result
            System.out.println(response.toString());
            System.out.println("===========================");
        } catch (Exception e) {
            System.out.print(e);
        }

        // track.setId(1L);
        // track.setName("All I Want Napster");
        // track.setArtist("Tania Bowra");
        // track.setImagesurl("https://i.scdn.co/image/985cc10acdbbedb6a16d7c74f9e23553e2b28dbc");
        // track.setAlbum("Place In The Sun");
        // track.setPreviewurl(
        //         "https://p.scdn.co/mp3-preview/12b8cee72118f995f5494e1b34251e4ac997445e?cid=22e646a7995548b99c0288315abf7fa5");
        // tracks.add(track);
        return tracks;
    }

    @Override
    public String getProviderName() {
        return MUSIC_PROVIDER_NAME;
    }
}
