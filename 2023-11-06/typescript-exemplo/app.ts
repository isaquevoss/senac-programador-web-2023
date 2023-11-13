console.log('Hello World')

import { Model } from './model';
import { Aluno } from './aluno';

const aluno = new Aluno();
aluno.id = 15;
aluno.nome = 'João';

aluno.salvar();
aluno.carregar();