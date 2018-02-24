import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { Track } from '../track/track.model';
import { SearchMusicService } from './search-music.service';

@Component({
    selector: 'jhi-search-music-view',
    templateUrl: './search-music-view.component.html',
    styleUrls: ['search-music-view.css'],
})
export class SearchMusicViewComponent implements OnInit {
    @Output() newTrack = new EventEmitter<Track>();
    availableProviders: string[];
    searchResults: any = {};
    currentAccount: any;
    playingTrackId: number;

    constructor(
        private searchMusicService: SearchMusicService,
        private jhiAlertService: JhiAlertService
    ) {}

    loadAll() {
        this.searchMusicService.queryProviders().subscribe(
            (res: HttpResponse<string[]>) => {
                this.availableProviders = res.body;
                this.search();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search() {
        this.availableProviders.forEach(provider => {
            this.searchMusicService.query({ provider: provider }).subscribe(
                (res: HttpResponse<Track[]>) => {
                    this.searchResults[provider] = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        });
    }

    ngOnInit() {
        this.loadAll();
    }

    playTrack(track) {
        this.playingTrackId = track.id;
        this.newTrack.emit(track);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
