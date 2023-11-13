import { Model } from "./model";

export class Aluno extends Model {
    public nome?: string;

    toString(): string {
        return 'Aluno: '+super.toString() + ' nome: '  + this.nome;
    }
}