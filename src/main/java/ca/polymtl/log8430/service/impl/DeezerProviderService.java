package ca.polymtl.log8430.service.impl;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.APIProviderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DeezerProviderService extends APIProviderService {

    private final Logger log = LoggerFactory.getLogger(DeezerProviderService.class);

    @Override
    public List<Track> search(String query) {
        //TODO REMOVE MOCK AND DO ACTUAL CALLS HERE
        List<Track> tracks = new ArrayList<>();
        Track track = new Track();
        track.setId(1L);
        track.setName("All I Want Deezer");
        track.setArtist("Tania Bowra");
        track.setImagesurl("https://i.scdn.co/image/985cc10acdbbedb6a16d7c74f9e23553e2b28dbc");
        track.setAlbum("Place In The Sun");
        track.setPreviewurl("https://p.scdn.co/mp3-preview/12b8cee72118f995f5494e1b34251e4ac997445e?cid=22e646a7995548b99c0288315abf7fa5");
        tracks.add(track);
        return tracks;
    }

    @Override
    public String getProviderName() {
        return "deezer";
    }
}
