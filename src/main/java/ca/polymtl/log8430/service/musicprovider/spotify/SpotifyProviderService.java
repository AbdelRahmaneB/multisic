package ca.polymtl.log8430.service.musicprovider.spotify;

import ca.polymtl.log8430.domain.Track;
import ca.polymtl.log8430.service.musicprovider.MusicProviderService;
import com.neovisionaries.i18n.CountryCode;
import com.wrapper.spotify.SpotifyApi;

import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchTracksRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

@Service
@Transactional
class SpotifyProviderService implements MusicProviderService {

    private final Logger log = LoggerFactory.getLogger(SpotifyProviderService.class);
    private static final String MUSIC_PROVIDER_NAME = "spotify";

    private static final String clientId = "22e646a7995548b99c0288315abf7fa5";
    private static final String clientSecret = "2356b09d4aa44490a5ef50bf03d269e2";

    private static final SpotifyTrackTransformer spotifyTrackTransformer = new SpotifyTrackTransformer();
    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
        .setClientId(clientId)
        .setClientSecret(clientSecret)
        .build();

    private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
        .build();

    @Override
    public List<Track> search(String query) {
        if(spotifyApi.getAccessToken() == null){
            setAccessToken();
        }

        try {
            final SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(query)
                .market(CountryCode.CA)
                .limit(10)
                .offset(0)
                .build();

            final Future<Paging<com.wrapper.spotify.model_objects.specification.Track>> pagingFuture = searchTracksRequest.executeAsync();

            return Arrays.stream(pagingFuture.get().getItems())
                .map(spotifyTrackTransformer::transform)
                .filter(t -> t.getPreviewurl() != null)
                .collect(Collectors.<Track> toList());
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("Error: " + e.getCause().getMessage());
        }
        return null;
    }

    public void setAccessToken() {
        try {
            final Future<ClientCredentials> clientCredentialsFuture = clientCredentialsRequest.executeAsync();

            final ClientCredentials clientCredentials = clientCredentialsFuture.get();

            // Set access token for further "spotifyApi" object usage
            spotifyApi.setAccessToken(clientCredentials.getAccessToken());

            System.out.println("Expires in: " + clientCredentials.getExpiresIn());
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("Error: " + e.getCause().getMessage());
        }
    }

    @Override
    public String getProviderName() {
        return MUSIC_PROVIDER_NAME;
    }
}
