import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    selectedTrackId: number;
    constructor() {}

    ngOnInit() {}

    changeSong(track) {
        this.selectedTrackId = track.id;
        this.newTrack.emit(track);
    }
}
