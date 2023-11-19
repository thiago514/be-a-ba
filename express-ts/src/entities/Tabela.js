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
exports.Tabela = void 0;
var typeorm_1 = require("typeorm");
var Base_1 = require("./Base");
var Template_1 = require("./Template");
var Campo_1 = require("./Campo");
var Tabela = /** @class */ (function (_super) {
    __extends(Tabela, _super);
    function Tabela() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Tabela.prototype, "nome", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Template_1.Template; }, function (template) { return template.tabelas; }, {
            nullable: false,
            cascade: true,
            onDelete: 'CASCADE'
        }),
        __metadata("design:type", Template_1.Template)
    ], Tabela.prototype, "template", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Campo_1.Campo; }, function (campo) { return campo.tabela; }, {
            nullable: false,
        }),
        __metadata("design:type", Array)
    ], Tabela.prototype, "campos", void 0);
    Tabela = __decorate([
        (0, typeorm_1.Entity)()
    ], Tabela);
    return Tabela;
}(Base_1.Base));
exports.Tabela = Tabela;
