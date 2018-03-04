import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayList } from './music-sidebar/play-list.model';
import { Track } from './track/track.model';
import { PlayListService } from './music-sidebar/play-list.service';
import { SearchMusicService } from './search-music-view/search-music.service';
import { Principal } from '../shared';

import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { SearchMusicViewComponent } from './search-music-view/search-music-view.component';

@Component({
    selector: 'jhi-music-view',
    templateUrl: './musicView.component.html',
    styleUrls: ['musicView.css'],
})
export class MusicViewComponent implements OnInit, OnDestroy {
    @ViewChild(AudioPlayerComponent) audioPlayer: AudioPlayerComponent;
    @ViewChild(PlaylistViewComponent) playlistView: PlaylistViewComponent;
    @ViewChild(SearchMusicViewComponent)
    searchMusicView: SearchMusicViewComponent;

    playLists: PlayList[];
    currentAccount: any;
    eventSubscriber: Subscription;
    selectedPlaylist: PlayList;
    isSearchMusicSelected: boolean = true;
    selectedTrack: Track;
    availableProviders: string[];

    constructor(
        private playListService: PlayListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private searchMusicService: SearchMusicService
    ) {}

    loadAll() {
        this.playListService.query().subscribe(
            (res: HttpResponse<PlayList[]>) => {
                this.playLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlayLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PlayList) {
        return item.id;
    }
    registerChangeInPlayLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playListListModification',
            response => this.loadAll()
        );
    }

    changePlaylist(playlistId) {
        if (this.isSearchMusicSelected) {
            this.isSearchMusicSelected = false;
        }

        this.selectedPlaylist = this.playLists.find(
            item => item.id === playlistId
        );
    }

    changeTrack(track) {
        this.selectTrack(track);
        this.audioPlayer.selectTrack(track);
    }

    playNewTrack(track) {
        this.selectTrack(track);
        this.audioPlayer.playNewTrack(track);
    }

    playTrack(track) {
        this.searchMusicView.playingTrackId = track.id;
        this.audioPlayer.play();
    }

    pauseTrack(track) {
        this.searchMusicView.playingTrackId = null;
        this.audioPlayer.pause();
    }

    stopTrack() {
        this.searchMusicView.stopTrack();
    }

    selectTrack(track) {
        if (this.isSearchMusicSelected) {
            this.playlistView.selectedTrackId = null;
        } else {
            this.searchMusicView.playingTrackId = null;
            this.searchMusicView.selectedTrackId = null;
        }
        this.selectedTrack = track;
    }

    browseMusic(searchMusic) {
        this.selectedPlaylist = null;
        this.isSearchMusicSelected = searchMusic;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
