package ca.polymtl.log8430.service.musicprovider;

import ca.polymtl.log8430.domain.Track;

import java.util.List;

public interface MusicProviderService {
    List<Track> search(String query);
    String getProviderName();
}
