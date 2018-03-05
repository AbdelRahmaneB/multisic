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
    private removeTrackSubject: Subject<any>;

    constructor() {
        this.updateTrackSubject = new Subject<Track>();
        this.selectedTrackSubject = new Subject<Track>();
        this.playingTrackIdSubject = new Subject<number>();
        this.playNewTrackSubject = new Subject<Track>();
        this.removeTrackSubject = new Subject<any>();
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

    removeTrack() {
        this.removeTrackSubject.next();
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

    getRemoveTrackEvent(): Observable<any> {
        return this.removeTrackSubject.asObservable();
    }
}
