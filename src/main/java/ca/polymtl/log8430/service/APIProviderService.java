package ca.polymtl.log8430.service;

import ca.polymtl.log8430.domain.Track;

import java.util.List;

public abstract class APIProviderService {
    public abstract List<Track> search(String query);
    public abstract String getProviderName();
}
