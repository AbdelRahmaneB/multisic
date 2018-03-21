import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import {
    MultisicGatewaySharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        MultisicGatewaySharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        MultisicGatewaySharedLibsModule,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class MultisicGatewaySharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
