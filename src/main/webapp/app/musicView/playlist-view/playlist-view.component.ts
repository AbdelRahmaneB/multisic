import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

import { MusicViewService } from '../musicView.service';
import { PlayList } from '../music-sidebar/play-list.model';
import { Track } from '../track/track.model';

@Component({
    selector: 'jhi-playlist-view',
    templateUrl: './playlist-view.component.html',
    styleUrls: ['playlist-view.css'],
})
export class PlaylistViewComponent implements OnInit {
    @Input() playlist: PlayList;
    @Output() newTrack = new EventEmitter<Track>();

    subscribers: any = {};
    selectedTrackId: number = null;
    playingTrackId: number = null;

    constructor(private musicViewService: MusicViewService) {
        this.subscribers.playPauseTrack = musicViewService
            .getPlayingTrackIdEvent()
            .subscribe(id => {
                this.selectedTrackId = id;
                this.playingTrackId = id;
            });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscribers.playPauseTrack.unsubscribe();
    }

    changeSong(track) {
        //Verify if already selected
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
}
