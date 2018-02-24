import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PlayList } from '../music-sidebar/play-list.model';
import { Track } from '../track/track.model';
// ex : http://static.videogular.com/assets/audios/videogular.mp3
@Component({
    selector: 'jhi-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['audio-player.css'],
})
export class AudioPlayerComponent implements OnInit {
    @ViewChild('audio') player: any;
    @Input() playingTrack: Track;
    @Input() selectedPlaylist: PlayList;

    constructor() {}

    ngOnInit() {}

    playTrack(track: Track) {
        this.selectTrack(track);
        this.player.nativeElement.load();
        this.player.nativeElement.play();
    }

    playNextSong() {
        //TODO play next song
        console.log('PLAY NEXT SONG');
        if (this.selectedPlaylist) {
            //TODO play next song in playlist
        } else {
            this.player.nativeElement.load();
        }
    }

    selectTrack(track) {
        this.player.nativeElement.src = track.previewurl;
    }

    play() {
        //TODO
        console.log('PLAY');
    }

    pause() {
        //TODO
        console.log('PAUSE');
    }
}
