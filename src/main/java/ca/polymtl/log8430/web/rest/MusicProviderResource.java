package ca.polymtl.log8430.web.rest;

import com.codahale.metrics.annotation.Timed;
import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.MusicProviderService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * REST controller for managing Music Provider API calls.
 * <p>
 * This class accesses the Music Provider entities, and needs to fetch their respective API.
 * </p>
 */
@RestController
@RequestMapping("/api")
public class MusicProviderResource {

    private final Logger log = LoggerFactory.getLogger(MusicProviderResource.class);

    private final MusicProviderService musicProviderService;

    public MusicProviderResource(MusicProviderService musicProviderService) {

        this.musicProviderService = musicProviderService;
    }

    /**
     * GET /music-providers : get all music providers.
     *
     * @return a string list of all the music providers
     */
    @GetMapping("/music-providers")
    @Timed
    public List<String> getAllMusicProviders() {
        return musicProviderService.getAllMusicProviders();
    }

    /**
     * GET /music-providers/search : get music corresponding to search query
     *
     * @return a list of Track
     */
    @GetMapping("/music-providers/search")
    @Timed
    public List<Track> search(@RequestParam(required = false) String query, @RequestParam String provider) {
        return musicProviderService.search(query, provider);
    }
}
