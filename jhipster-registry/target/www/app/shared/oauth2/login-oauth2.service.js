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
var principal_service_1 = require("../auth/principal.service");
var auth_session_service_1 = require("../auth/auth-session.service");
var LoginOAuth2Service = (function () {
    function LoginOAuth2Service(principal, authServerProvider) {
        this.principal = principal;
        this.authServerProvider = authServerProvider;
    }
    LoginOAuth2Service.prototype.login = function () {
        var port = (location.port ? ':' + location.port : '');
        if (port === ':9000') {
            port = ':8761';
        }
        location.href = '//' + location.hostname + port + '/login';
    };
    LoginOAuth2Service.prototype.logout = function () {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    };
    return LoginOAuth2Service;
}());
LoginOAuth2Service = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [principal_service_1.Principal,
        auth_session_service_1.AuthSessionServerProvider])
], LoginOAuth2Service);
exports.LoginOAuth2Service = LoginOAuth2Service;
//# sourceMappingURL=login-oauth2.service.js.map