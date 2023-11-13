import { Request, Response } from "express";
import { Aluno } from "../models/aluno";
import { Telefone } from "../models/telefone";

class AlunosController {

    public async buscarAlunos(req: Request, res: Response) {
        res.send('Alunos')
    }

    public async salvarAluno(req: Request, res: Response) {
        const aluno = new Aluno(req.body.nome, req.body.idade, req.body.email, [])
        aluno.telefones.push(new Telefone(req.body.telefone.numero, req.body.telefone.tipo))
        aluno.salvar()
        aluno.buscar('')
        res.json(aluno)
    }
}