import { Model } from "./model";

export class Turma extends Model {
    public nome?: string;
    
    public ano?: number;

    public sala?: string;

    public turno?: string;
}