"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Hello World');
const aluno_1 = require("./aluno");
const aluno = new aluno_1.Aluno();
aluno.id = 15;
aluno.nome = 'João';
aluno.salvar();
aluno.carregar();
