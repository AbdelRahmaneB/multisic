import {
    Component,
    OnInit,
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
export class SearchMusicViewComponent implements OnInit {
    @Output() newTrack = new EventEmitter<Track>();
    @Output() playNewTrackEvent = new EventEmitter<Track>();
    @Output() playTrackEvent = new EventEmitter<any>();
    @Output() pauseTrackEvent = new EventEmitter<any>();
    playlists: PlayList[];
    searchResults: any = {};
    currentAccount: any;
    playingTrackId: number = null;
    searchField: FormControl;
    loading: boolean = false;
    availableProviders: string[];
    selectedTrackId: number = null;
    eventSubscriber: Subscription;
    showPlaylistDropdown: boolean = false;
    elementRef;

    constructor(
        private playListService: PlayListService,
        private trackService: TrackService,
        private searchMusicService: SearchMusicService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private myElement: ElementRef
    ) {
        this.elementRef = myElement;
    }

    handleClick(event) {
        if (this.showPlaylistDropdown) {
            this.showPlaylistDropdown = false;
        }
    }

    loadAll() {
        this.searchMusicService.queryProviders().then(res => {
            this.availableProviders = res.body;
            this.initSearch();
        });
    }

    loadAllPlaylists() {
        this.playListService.query().subscribe(
            (res: HttpResponse<PlayList[]>) => {
                console.log(res.body);
                this.playlists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    initSearch() {
        this.availableProviders.forEach(provider => {
            this.searchResults[provider] = [];
        });
    }

    ngOnInit() {
        this.loadAll();
        this.loadAllPlaylists();
        this.registerChangeInPlayLists();
        this.searchField = new FormControl();
        this.searchField.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .do(() => (this.loading = true))
            .map(term => {
                if (term) {
                    this.availableProviders.map(provider => {
                        this.searchMusicService
                            .query({
                                query: term,
                                provider: provider,
                            })
                            .do(() => (this.loading = false))
                            .subscribe(results => {
                                console.log(provider);
                                console.log(results);
                                this.searchResults[provider] = results;
                                this.loading = false;
                            });
                    });
                } else {
                    this.availableProviders.map(provider => {
                        this.searchResults[provider] = [];
                    });
                }
            })
            .subscribe();
    }

    registerChangeInPlayLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playListListModification',
            response => this.loadAllPlaylists()
        );
    }

    changeTrack(track) {
        if (this.selectedTrackId !== track.id) {
            this.selectedTrackId = track.id;
            this.playingTrackId = null;
            this.newTrack.emit(track);
        }
    }

    playTrack(e, track) {
        if (this.playingTrackId === track.id) {
            this.pauseTrackEvent.emit(track);
        } else if (this.selectedTrackId === track.id && !this.playingTrackId) {
            this.playTrackEvent.emit(track);
        } else {
            this.selectedTrackId = track.id;
            this.playingTrackId = track.id;
            this.playNewTrackEvent.emit(track);
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

    addToPlaylist(playlist, track) {
        this.showPlaylistDropdown = false;

        if (!playlist.tracks.find(t => t.id === track.id)) {
            //Create own unique id
            delete track.id;
            console.log(track);
            this.subscribeToTrackResponse(
                this.trackService.create(track),
                playlist
            );
        }
    }

    private subscribeToTrackResponse(
        result: Observable<HttpResponse<Track>>,
        playlist: PlayList
    ) {
        result.subscribe((res: HttpResponse<Track>) =>
            this.onSaveTrackSuccess(res.body, playlist)
        );
    }

    onSaveTrackSuccess(track: Track, playlist: PlayList) {
        //Update playlist
        playlist.tracks.push(track);
        console.log(playlist);
        this.subscribeToPlaylistResponse(this.playListService.update(playlist));
    }

    private subscribeToPlaylistResponse(
        result: Observable<HttpResponse<PlayList>>
    ) {
        result.subscribe((res: HttpResponse<PlayList>) =>
            this.eventManager.broadcast({
                name: 'playListListModification',
                content: 'OK',
            })
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
