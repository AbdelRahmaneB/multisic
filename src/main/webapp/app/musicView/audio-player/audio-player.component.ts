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
export class AudioPlayerComponent implements OnInit, OnDestroy {
    subscribers: any = {};
    audioPlayerTrack: Track;

    @ViewChild('audio') player: any;
    @Input() selectedPlaylist: PlayList;
    @Input() isPlaylistPlaying: boolean;
    @Output() playNextSongEvent = new EventEmitter();
    @Output() playTrackEvent = new EventEmitter<any>();
    @Output() pauseTrackEvent = new EventEmitter<any>();

    constructor(private musicViewService: MusicViewService) {
        this.subscribers.selectTrack = musicViewService
            .getSelectTrackEvent()
            .subscribe((track) => {
                this.selectTrack(track);
            });

        this.subscribers.playNewTrack = musicViewService
            .getPlayNewTrackTrackEvent()
            .subscribe((track) => {
                this.selectTrack(track);
                this.playNewTrack(track);
            });

        this.subscribers.playPauseTrack = musicViewService
            .getPlayingTrackIdEvent()
            .subscribe((id) => {
                if (id) {
                    this.play();
                } else {
                    this.pause();
                }
            });

        this.subscribers.removeTrack = musicViewService
            .getRemoveTrackEvent()
            .subscribe(() => {
                this.removeTrack();
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
        if (this.selectedPlaylist && this.isPlaylistPlaying) {
            const currentIndex = this.selectedPlaylist.tracks.findIndex(
                (track) => track.id === this.audioPlayerTrack.id
            );
            const nextIndex =
                (currentIndex + 1) % this.selectedPlaylist.tracks.length;
            const nextTrack = this.selectedPlaylist.tracks[nextIndex];
            this.player.nativeElement.src = nextTrack.previewurl;

            this.musicViewService.playNewTrack(nextTrack);

            this.player.nativeElement.play();
        } else {
            this.player.nativeElement.load(); // reset song
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
        this.musicViewService.playTrack(this.audioPlayerTrack.id);
        this.play();
    }

    onPause() {
        this.musicViewService.pauseTrack();
        this.pause();
    }

    removeTrack() {
        this.player.nativeElement.pause();
        this.player.nativeElement.src = '';
        this.audioPlayerTrack = null;
    }
}
