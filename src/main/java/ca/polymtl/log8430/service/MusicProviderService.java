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
import java.util.stream.Collectors;

/**
 * Service class for managing music providers.
 */
@Service
@Transactional
public class MusicProviderService {

    private final Logger log = LoggerFactory.getLogger(MusicProviderService.class);

    private final List<APIProviderService> providers;

    public MusicProviderService(List<APIProviderService> providers) {
        this.providers = providers;
    }

    @Transactional(readOnly = true)
    public List<String> getAllMusicProviders() {
        return providers.stream()
            .map(APIProviderService::getProviderName)
            .collect(Collectors.toList());
    }

    public List<Track> search(String query, String providerName) {
        return providers.stream()
            .filter(p -> p.getProviderName().equals(providerName))
            .findFirst()
            .get()
            .search(query);
    }


}
