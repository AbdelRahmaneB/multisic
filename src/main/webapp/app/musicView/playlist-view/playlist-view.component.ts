import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

import { MusicViewService } from '../musicView.service';
import { PlayListService } from '../music-sidebar/play-list.service';
import { PlayList } from '../music-sidebar/play-list.model';
import { Track } from '../track/track.model';

@Component({
    selector: 'jhi-playlist-view',
    templateUrl: './playlist-view.component.html',
    styleUrls: ['playlist-view.css'],
})
export class PlaylistViewComponent implements OnInit, OnDestroy {
    @Input() playlist: PlayList;
    @Output() newTrack = new EventEmitter<Track>();

    subscribers: any = {};
    selectedTrackId: number = null;
    playingTrackId: number = null;

    constructor(
        private musicViewService: MusicViewService,
        private playListService: PlayListService
    ) {
        this.subscribers.playPauseTrack = musicViewService
            .getPlayingTrackIdEvent()
            .subscribe((id) => {
                if (id) {
                    this.selectedTrackId = id;
                }
                if (this.playlist) {
                    this.playingTrackId = id;
                }
            });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscribers.playPauseTrack.unsubscribe();
    }

    changeSong(track) {
        // Verify if already selected
        if (this.selectedTrackId !== track.id) {
            this.selectedTrackId = track.id;
            this.playingTrackId = null;
            this.newTrack.emit(track);
        }
    }

    playTrack(e, track) {
        if (this.playingTrackId === track.id) {
            this.musicViewService.pauseTrack();
        } else if (this.selectedTrackId === track.id && !this.playingTrackId) {
            this.musicViewService.playTrack(track.id);
        } else {
            this.changeSong(track);
            this.musicViewService.playNewTrack(track);
        }
        e.stopPropagation();
    }

    removeFromPlaylist(e, track) {
        if (this.selectedTrackId === track.id) {
            this.selectedTrackId = null;
            this.playingTrackId = null;
            this.musicViewService.removeTrack();
        }

        this.playlist.tracks = this.playlist.tracks.filter(
            (t) => t.id !== track.id
        );

        // TODO fix foreign key constraint
        // this.playListService.update(this.playlist);
        e.stopPropagation();
    }
}
