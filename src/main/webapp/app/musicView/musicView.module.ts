import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultisicSharedModule } from '../shared';
import { MusicViewComponent, musicViewRoutes } from './';
import { PlayListService } from './music-sidebar/play-list.service';
import { PlayListPopupService } from './music-sidebar/play-list-popup.service';
import { MusicSidebarComponent } from './music-sidebar/music-sidebar.component';

import { MultisicMusicSidebarModule } from './music-sidebar/music-sidebar.module';
import { MultisicTrackModule } from './track/track.module';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { SearchMusicViewComponent } from './search-music-view/search-music-view.component';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

const MUSIC_STATES = [...musicViewRoutes];

@NgModule({
    imports: [
        MultisicSharedModule,
        MultisicMusicSidebarModule,
        MultisicTrackModule,
        RouterModule.forChild(MUSIC_STATES),
    ],
    declarations: [MusicViewComponent, MusicSidebarComponent, PlaylistViewComponent, SearchMusicViewComponent],
    entryComponents: [MusicViewComponent],
    providers: [PlayListService, PlayListPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultisicMusicViewModule {}
