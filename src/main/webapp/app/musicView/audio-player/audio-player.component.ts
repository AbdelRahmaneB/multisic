import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    EventEmitter,
} from '@angular/core';
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
    @Output() playNextSongEvent = new EventEmitter();
    @Output() playTrackEvent = new EventEmitter<any>();
    @Output() pauseTrackEvent = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    playNewTrack(track: Track) {
        this.selectTrack(track);
        this.player.nativeElement.load();
        this.play();
    }

    playNextSong() {
        //TODO play next song
        if (this.selectedPlaylist) {
            //TODO play next song in playlist
        } else {
            this.player.nativeElement.load(); //reset song
            this.playNextSongEvent.emit();
        }
    }

    selectTrack(track) {
        this.playingTrack = track;
        this.player.nativeElement.src = track.previewurl;
    }

    play() {
        this.player.nativeElement.play();
    }

    pause() {
        this.player.nativeElement.pause();
    }

    onPlay() {
        this.playTrackEvent.emit(this.playingTrack);
    }

    onPause() {
        this.pauseTrackEvent.emit(this.playingTrack);
    }
}
