"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
const model_1 = require("./model");
class Aluno extends model_1.Model {
    toString() {
        return 'Aluno: ' + super.toString() + ' nome: ' + this.nome;
    }
}
exports.Aluno = Aluno;
