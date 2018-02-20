package ca.polymtl.log8430.service;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.impl.DeezerProviderService;
import ca.polymtl.log8430.service.impl.NapsterProviderService;
import ca.polymtl.log8430.service.impl.SpotifyProviderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final HashMap<String, APIProviderService> providersService;

    public MusicProviderService(SpotifyProviderService spotify, NapsterProviderService napster, DeezerProviderService deezer) {
        this.providersService = new HashMap<>();
        this.providersService.put(spotify.getProviderName(), spotify);
        this.providersService.put(napster.getProviderName(), napster);
        this.providersService.put(deezer.getProviderName(), deezer);

    }

    @Transactional(readOnly = true)
    public List<String> getAllMusicProviders() {
        return new ArrayList(providersService.keySet());
    }

    public List<Track> search(String query, String provider) {
        return providersService.get(provider).search(query);
    }


}
