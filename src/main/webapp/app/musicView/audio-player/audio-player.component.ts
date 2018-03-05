import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    ViewChild,
    EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PlayList } from '../music-sidebar/play-list.model';
import { Track } from '../track/track.model';
import { MusicViewService } from '../musicView.service';

// ex : http://static.videogular.com/assets/audios/videogular.mp3
@Component({
    selector: 'jhi-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['audio-player.css'],
})
export class AudioPlayerComponent implements OnInit {
    subscribers: any = {};
    audioPlayerTrack: Track;

    @ViewChild('audio') player: any;
    @Input() selectedPlaylist: PlayList;
    @Output() playNextSongEvent = new EventEmitter();
    @Output() playTrackEvent = new EventEmitter<any>();
    @Output() pauseTrackEvent = new EventEmitter<any>();

    constructor(private musicViewService: MusicViewService) {
        this.subscribers.selectTrack = musicViewService
            .getSelectTrackEvent()
            .subscribe(track => {
                this.selectTrack(track);
            });

        this.subscribers.playNewTrack = musicViewService
            .getPlayNewTrackTrackEvent()
            .subscribe(track => {
                this.selectTrack(track);
                this.playNewTrack(track);
            });

        this.subscribers.playPauseTrack = musicViewService
            .getPlayingTrackIdEvent()
            .subscribe(id => {
                if (id) {
                    this.play();
                } else {
                    this.pause();
                }
            });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscribers.selectTrack.unsubscribe();
        this.subscribers.playNewTrack.unsubscribe();
        this.subscribers.playPauseTrack.unsubscribe();
    }

    playNewTrack(track: Track) {
        this.player.nativeElement.load();
        this.onPlay();
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
        this.audioPlayerTrack = track;
        this.player.nativeElement.src = track.previewurl;
    }

    play() {
        this.player.nativeElement.play();
    }

    pause() {
        this.player.nativeElement.pause();
    }

    onPlay() {
        //this.playTrackEvent.emit(this.playingTrack);
        this.musicViewService.playTrack(this.audioPlayerTrack.id);
        this.play();
    }

    onPause() {
        //this.pauseTrackEvent.emit(this.playingTrack);
        this.musicViewService.pauseTrack();
        this.pause();
    }
}
