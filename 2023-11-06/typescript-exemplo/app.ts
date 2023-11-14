console.log('Hello World')

import { Model } from './model';
import { Aluno } from './aluno';
import { Turma } from './turma';

const aluno = new Aluno();
aluno.id = 15;
aluno.nome = 'João';
aluno.idade = 123;
aluno.turma = 'A';

const turma = new Turma();
turma.id = 1;
turma.nome = 'Turma 1';
turma.ano = 2019;
turma.sala = 'A';



aluno.salvar();
aluno.carregar();


turma.salvar();
turma.carregar();

console.log(turma.toString());