"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    salvar() {
        if (!this.id) {
            this.id = 1;
        }
        console.log("Salvando o " + this.toString() + "...");
    }
    carregar() {
        console.log("Carregando...");
    }
    toString() {
        return 'id: ' + this.id + '';
    }
}
exports.Model = Model;
