import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../track/track.model';

@Component({
    selector: 'jhi-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['audio-player.css'],
})
export class AudioPlayerComponent implements OnInit {
    @Input() playingTrack: Track;
    constructor() {}

    ngOnInit() {}

    playNextSong() {
        //TODO play next song
        console.log('PLAY NEXT SONG');
    }
}
