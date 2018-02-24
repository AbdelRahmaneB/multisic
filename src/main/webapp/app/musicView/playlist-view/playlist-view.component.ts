import { Component, OnInit, Input } from '@angular/core';
import { PlayList } from '../music-sidebar/play-list.model';

@Component({
    selector: 'jhi-playlist-view',
    templateUrl: './playlist-view.component.html',
    styleUrls: ['playlist-view.css'],
})
export class PlaylistViewComponent implements OnInit {
    @Input() playlist: PlayList;
    constructor() {}

    ngOnInit() {}
}
