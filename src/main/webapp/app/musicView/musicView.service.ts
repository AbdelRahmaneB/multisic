import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { PlayList } from './music-sidebar/play-list.model';
import { Track } from './track/track.model';

@Injectable()
export class MusicViewService {
    private updateTrackSubject: Subject<Track>;
    private selectedTrackSubject: Subject<Track>;
    private playingTrackIdSubject: Subject<number>;
    private playNewTrackSubject: Subject<Track>;

    constructor() {
        this.updateTrackSubject = new Subject<Track>();
        this.selectedTrackSubject = new Subject<Track>();
        this.playingTrackIdSubject = new Subject<number>();
        this.playNewTrackSubject = new Subject<Track>();
    }

    playNewTrack(track) {
        this.playNewTrackSubject.next(track);
    }

    playTrack(trackId) {
        this.playingTrackIdSubject.next(trackId);
    }

    pauseTrack() {
        this.playingTrackIdSubject.next(null);
    }

    selectTrack(track) {
        this.selectedTrackSubject.next(track);
    }

    getSelectTrackEvent(): Observable<Track> {
        return this.selectedTrackSubject.asObservable();
    }

    getPlayNewTrackTrackEvent(): Observable<Track> {
        return this.playNewTrackSubject.asObservable();
    }

    getPlayingTrackIdEvent(): Observable<number> {
        return this.playingTrackIdSubject.asObservable();
    }
}
