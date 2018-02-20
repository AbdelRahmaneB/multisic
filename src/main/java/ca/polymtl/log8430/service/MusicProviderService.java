package ca.polymtl.log8430.service;

import ca.polymtl.log8430.domain.Track;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service class for managing music providers.
 */
@Service
@Transactional
public class MusicProviderService {

    private final Logger log = LoggerFactory.getLogger(MusicProviderService.class);

    public MusicProviderService() { }

    @Transactional(readOnly = true)
    public String[] getAllMusicProviders() {
        return new String[]{"spotify", "deezer", "napster"};
    }

    public List<Track> search(String query) {
        //TODO REMOVE MOCK AND DO ACTUAL CALLS HERE
        List<Track> tracks = new ArrayList<>();
        Track track = new Track();
        track.setId(1L);
        track.setName("All I Want");
        track.setArtist("Tania Bowra");
        track.setImagesurl("https://i.scdn.co/image/985cc10acdbbedb6a16d7c74f9e23553e2b28dbc");
        track.setAlbum("Place In The Sun");
        track.setPreviewurl("https://p.scdn.co/mp3-preview/12b8cee72118f995f5494e1b34251e4ac997445e?cid=22e646a7995548b99c0288315abf7fa5");
        tracks.add(track);
        return tracks;
    }
}
