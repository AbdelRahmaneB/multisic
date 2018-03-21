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
var http_1 = require("@angular/http");
var JhiMetricsService = (function () {
    function JhiMetricsService(http) {
        this.http = http;
    }
    // get the Registry's metrics
    JhiMetricsService.prototype.getMetrics = function () {
        return this.http.get('management/metrics').map(function (res) { return res.json(); });
    };
    // get the instance's metrics
    JhiMetricsService.prototype.getInstanceMetrics = function (instance) {
        if (instance && instance.prefix && instance.prefix.length > 0) {
            return this.http.get((instance.prefix + '/management/metrics')).map(function (res) { return res.json(); });
        }
        return this.getMetrics();
    };
    JhiMetricsService.prototype.threadDump = function () {
        return this.http.get('management/dump').map(function (res) { return res.json(); });
    };
    JhiMetricsService.prototype.instanceThreadDump = function (instance) {
        if (instance && instance.prefix && instance.prefix.length > 0) {
            return this.http.get((instance.prefix + '/management/dump')).map(function (res) { return res.json(); });
        }
        return this.threadDump();
    };
    return JhiMetricsService;
}());
JhiMetricsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], JhiMetricsService);
exports.JhiMetricsService = JhiMetricsService;
//# sourceMappingURL=metrics.service.js.map