package ca.polymtl.log8430.service;

import ca.polymtl.log8430.domain.Track;

import java.util.List;

public interface APIProviderService {
    List<Track> search(String query);
    String getProviderName();
}
