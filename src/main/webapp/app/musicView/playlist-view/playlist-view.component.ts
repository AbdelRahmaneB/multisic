import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayList } from '../music-sidebar/play-list.model';

@Component({
    selector: 'jhi-playlist-view',
    templateUrl: './playlist-view.component.html',
    styleUrls: ['playlist-view.css'],
})
export class PlaylistViewComponent implements OnInit {
    @Input() playlist: PlayList;
    @Output() newTrackId = new EventEmitter<number>();
    selectedTrackId: number;
    constructor() {}

    ngOnInit() {}

    changeSong(trackId) {
        this.selectedTrackId = trackId;
        this.newTrackId.emit(trackId);
    }
}
