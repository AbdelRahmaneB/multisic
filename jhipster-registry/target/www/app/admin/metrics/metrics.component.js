"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var metrics_modal_component_1 = require("./metrics-modal.component");
var metrics_service_1 = require("./metrics.service");
var shared_1 = require("../../shared");
var JhiMetricsMonitoringComponent = (function () {
    function JhiMetricsMonitoringComponent(modalService, metricsService, routesService) {
        this.modalService = modalService;
        this.metricsService = metricsService;
        this.routesService = routesService;
        this.metrics = {};
        this.cachesStats = {};
        this.servicesStats = {};
        this.updatingMetrics = true;
        this.JCACHE_KEY = 'jcache.statistics';
    }
    JhiMetricsMonitoringComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.routesService.routeChanged$.subscribe(function (route) {
            _this.activeRoute = route;
            _this.displayActiveRouteMetrics();
        });
    };
    JhiMetricsMonitoringComponent.prototype.refresh = function () {
        this.routesService.reloadRoutes();
    };
    JhiMetricsMonitoringComponent.prototype.displayActiveRouteMetrics = function () {
        var _this = this;
        this.updatingMetrics = true;
        if (this.activeRoute && this.activeRoute.status !== 'DOWN') {
            this.metricsService.getInstanceMetrics(this.activeRoute).subscribe(function (metrics) {
                _this.metrics = metrics;
                _this.updatingMetrics = false;
                _this.servicesStats = {};
                _this.cachesStats = {};
                Object.keys(metrics.timers).forEach(function (key) {
                    var value = metrics.timers[key];
                    if (key.indexOf('web.rest') !== -1 || key.indexOf('service') !== -1) {
                        _this.servicesStats[key] = value;
                    }
                });
                Object.keys(metrics.gauges).forEach(function (key) {
                    if (key.indexOf('jcache.statistics') !== -1) {
                        var value = metrics.gauges[key].value;
                        // remove gets or puts
                        var index = key.lastIndexOf('.');
                        var newKey = key.substr(0, index);
                        // Keep the name of the domain
                        _this.cachesStats[newKey] = {
                            'name': _this.JCACHE_KEY.length,
                            'value': value
                        };
                    }
                });
            }, function (error) {
                if (error.status === 503 || error.status === 500 || error.status === 404) {
                    if (error.status === 500 || error.status === 404) {
                        _this.routesService.routeDown(_this.activeRoute);
                    }
                }
            });
        }
        else {
            this.routesService.routeDown(this.activeRoute);
        }
    };
    JhiMetricsMonitoringComponent.prototype.refreshThreadDumpData = function () {
        var _this = this;
        this.metricsService.instanceThreadDump(this.activeRoute).subscribe(function (data) {
            var modalRef = _this.modalService.open(metrics_modal_component_1.JhiMetricsMonitoringModalComponent, { size: 'lg' });
            modalRef.componentInstance.threadDump = data;
            modalRef.result.then(function (result) {
                // Left blank intentionally, nothing to do here
            }, function (reason) {
                // Left blank intentionally, nothing to do here
            });
        });
    };
    JhiMetricsMonitoringComponent.prototype.filterNaN = function (input) {
        if (isNaN(input)) {
            return 0;
        }
        return input;
    };
    return JhiMetricsMonitoringComponent;
}());
JhiMetricsMonitoringComponent = __decorate([
    core_1.Component({
        selector: 'jhi-metrics',
        templateUrl: './metrics.component.html',
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
        metrics_service_1.JhiMetricsService,
        shared_1.JhiRoutesService])
], JhiMetricsMonitoringComponent);
exports.JhiMetricsMonitoringComponent = JhiMetricsMonitoringComponent;
//# sourceMappingURL=metrics.component.js.map