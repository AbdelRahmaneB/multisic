import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef,
} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Track } from '../track/track.model';
import { PlayList } from '../music-sidebar/play-list.model';
import { SearchMusicService } from './search-music.service';
import { PlayListService } from '../music-sidebar/play-list.service';
import { TrackService } from '../track/track.service';
import { MusicViewService } from '../musicView.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'jhi-search-music-view',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: './search-music-view.component.html',
    styleUrls: ['search-music-view.css'],
})
export class SearchMusicViewComponent implements OnInit, OnDestroy {
    @Output() newTrack = new EventEmitter<Track>();
    @Output() updatePlaylist = new EventEmitter<PlayList>();

    playingTrackId: string = null;
    selectedTrackId: string = null;

    @Input() playLists: PlayList[];
    searchResults: any = {};
    currentAccount: any;
    searchField: FormControl;
    loading = false;
    availableProviders: string[];
    subscribers: any = {};
    showPlaylistDropdown = false;
    elementRef;

    constructor(
        private playListService: PlayListService,
        private trackService: TrackService,
        private searchMusicService: SearchMusicService,
        private musicViewService: MusicViewService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private myElement: ElementRef
    ) {
        this.elementRef = myElement;

        this.subscribers.playPauseTrack = musicViewService
            .getPlayingTrackIdEvent()
            .subscribe((id) => {
                this.playingTrackId = id;
            });
    }

    ngOnInit() {
        this.loadAllProviders();
        this.searchField = new FormControl();
        this.searchField.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .do(() => (this.loading = true))
            .map((term) => {
                if (term) {
                    this.availableProviders.map((provider) => {
                        this.searchMusicService
                            .query({
                                query: term,
                                provider,
                            })
                            .do(() => (this.loading = false))
                            .subscribe((results) => {
                                this.searchResults[provider] = results;
                                this.loading = false;
                            });
                    });
                } else {
                    this.availableProviders.map((provider) => {
                        this.searchResults[provider] = [];
                    });
                }
            })
            .subscribe();
    }

    ngOnDestroy() {
        this.subscribers.playPauseTrack.unsubscribe();
        this.subscribers.eventManager.unsubscribe();
    }

    handleClick(event) {
        if (this.showPlaylistDropdown) {
            this.showPlaylistDropdown = false;
        }
    }

    loadAllProviders() {
        this.searchMusicService.queryProviders().then((res) => {
            this.availableProviders = res.body;
            this.initSearch();
        });
    }

    initSearch() {
        this.availableProviders.forEach((provider) => {
            this.searchResults[provider] = [];
        });
    }

    changeTrack(track) {
        // Verify if already selected
        if (this.selectedTrackId !== track.id) {
            this.selectedTrackId = track.id;
            this.playingTrackId = null;
            this.musicViewService.setIsSearchMusicPlaying(true);
            this.newTrack.emit(track);
        }
    }

    playTrack(e, track) {
        if (this.playingTrackId === track.id) {
            this.musicViewService.pauseTrack();
            this.musicViewService.setIsSearchMusicPlaying(true);
        } else if (this.selectedTrackId === track.id && !this.playingTrackId) {
            this.musicViewService.playTrack(track.id);
            this.musicViewService.setIsSearchMusicPlaying(true);
        } else {
            this.changeTrack(track);
            this.musicViewService.playNewTrack(track);
        }
        this.showPlaylistDropdown = false;
        e.stopPropagation();
    }

    stopTrack() {
        this.playingTrackId = null;
    }

    openDropdown(e, track) {
        this.changeTrack(track);
        this.showPlaylistDropdown = true;
        e.stopPropagation();
    }

    addToPlaylist(e, playlist, track) {
        this.showPlaylistDropdown = false;

        if (!playlist.tracks.find((t) => t.id === track.id)) {
            const updatedPlaylist = Object.assign({}, playlist, {...playlist, tracks: [...playlist.tracks, track]});
            this.subscribeToPlaylistResponse(this.playListService.update(updatedPlaylist));
        }
        e.stopPropagation();
    }

    private subscribeToPlaylistResponse(
        result: Observable<HttpResponse<PlayList>>
    ) {
        result.subscribe((res: HttpResponse<PlayList>) =>
            this.updatePlaylist.emit(res.body)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
