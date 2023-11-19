"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Campo = void 0;
var typeorm_1 = require("typeorm");
var Base_1 = require("./Base");
var Tabela_1 = require("./Tabela");
var Campo = /** @class */ (function (_super) {
    __extends(Campo, _super);
    function Campo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Campo.prototype, "nome", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: ['int', 'float', 'datetime', 'bool', 'text']
        }),
        __metadata("design:type", String)
    ], Campo.prototype, "tipo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Campo.prototype, "permite_nulo", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tabela_1.Tabela; }, function (tabela) { return tabela.campos; }, {
            nullable: false,
            onDelete: 'CASCADE'
        }),
        __metadata("design:type", Tabela_1.Tabela)
    ], Campo.prototype, "tabela", void 0);
    Campo = __decorate([
        (0, typeorm_1.Entity)()
    ], Campo);
    return Campo;
}(Base_1.Base));
exports.Campo = Campo;
