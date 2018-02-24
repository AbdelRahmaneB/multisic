import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Track } from '../track/track.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Track[]>;

@Injectable()
export class SearchMusicService {
    private resourceUrl = SERVER_API_URL + 'api/music-providers';
    private searchResourceUrl = SERVER_API_URL + this.resourceUrl + '/search';

    constructor(private http: HttpClient) {}

    queryProviders(req?: any): Observable<HttpResponse<String[]>> {
        const options = createRequestOption(req);
        return this.http.get<String[]>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    query(req?: any): Observable<HttpResponse<Track[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Track[]>(this.searchResourceUrl, {
                params: options,
                observe: 'response',
            })
            .map((res: HttpResponse<Track[]>) =>
                this.convertArrayResponse(res)
            );
    }

    private convertArrayResponse(
        res: HttpResponse<Track[]>
    ): HttpResponse<Track[]> {
        const jsonResponse: Track[] = res.body;
        const body: Track[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Track.
     */
    private convertItemFromServer(track: Track): Track {
        const copy: Track = Object.assign({}, track);
        return copy;
    }
}
