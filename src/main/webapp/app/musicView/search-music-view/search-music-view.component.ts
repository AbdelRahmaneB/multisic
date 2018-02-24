import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-search-music-view',
    templateUrl: './search-music-view.component.html',
    styleUrls: ['search-music-view.css'],
})
export class SearchMusicViewComponent implements OnInit {
    napsterResults = ['test', 'test2'];

    constructor() {}

    ngOnInit() {}
}
