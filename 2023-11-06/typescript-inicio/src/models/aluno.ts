import { Model } from "./model";
import { Telefone } from "./telefone";

export class Aluno extends Model {
    public nome: string;
    public idade: number;
    public email: string; 
    public telefones: Telefone[]

    constructor(nome: string, idade: number, email: string, telefones: Telefone[]){
        super();
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.telefones = telefones;
    }
}