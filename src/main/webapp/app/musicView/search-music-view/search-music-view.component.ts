import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { JhiAlertService } from 'ng-jhipster';
import { Track } from '../track/track.model';
import { SearchMusicService } from './search-music.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'jhi-search-music-view',
    templateUrl: './search-music-view.component.html',
    styleUrls: ['search-music-view.css'],
})
export class SearchMusicViewComponent implements OnInit {
    @Output() newTrack = new EventEmitter<Track>();
    @Output() playTrackEvent = new EventEmitter<Track>();
    searchResults: any = {};
    currentAccount: any;
    playingTrackId: number;
    searchField: FormControl;
    loading: boolean = false;
    availableProviders: string[];

    constructor(
        private searchMusicService: SearchMusicService,
        private jhiAlertService: JhiAlertService
    ) {}

    loadAll() {
        this.searchMusicService.queryProviders().then(res => {
            this.availableProviders = res.body;
            this.initSearch();
        });
    }

    initSearch() {
        this.availableProviders.forEach(provider => {
            this.searchResults[provider] = [];
        });
    }

    ngOnInit() {
        this.loadAll();
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

    changeTrack(track) {
        this.playingTrackId = track.id;
        this.newTrack.emit(track);
    }

    playTrack(e, track) {
        this.playingTrackId = track.id;
        this.playTrackEvent.emit(track);
        e.stopPropagation();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
