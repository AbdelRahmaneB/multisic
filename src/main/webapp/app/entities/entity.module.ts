import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MultisicPlayListModule } from './play-list/play-list.module';
import { MultisicTrackModule } from './track/track.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MultisicPlayListModule,
        MultisicTrackModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MultisicEntityModule {}
