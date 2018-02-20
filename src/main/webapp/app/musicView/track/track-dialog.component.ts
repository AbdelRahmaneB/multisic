import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Track } from './track.model';
import { TrackPopupService } from './track-popup.service';
import { TrackService } from './track.service';

@Component({
    selector: 'jhi-track-dialog',
    templateUrl: './track-dialog.component.html'
})
export class TrackDialogComponent implements OnInit {

    track: Track;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private trackService: TrackService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.track.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trackService.update(this.track));
        } else {
            this.subscribeToSaveResponse(
                this.trackService.create(this.track));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Track>>) {
        result.subscribe((res: HttpResponse<Track>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Track) {
        this.eventManager.broadcast({ name: 'trackListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-track-popup',
    template: ''
})
export class TrackPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trackPopupService: TrackPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trackPopupService
                    .open(TrackDialogComponent as Component, params['id']);
            } else {
                this.trackPopupService
                    .open(TrackDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
