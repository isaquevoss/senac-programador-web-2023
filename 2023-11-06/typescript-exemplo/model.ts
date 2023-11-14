export class Model {
    public id?: number;
    
    salvar() {
        if (!this.id) {
            this.id = 1
        }
        console.log("Salvando o " + this.toString() + "...");
    }

    carregar() {
        console.log("Carregando...")
    }

    toString() {
        var string = "";
        for (let key in this) {
           string =string +" "+ key + ": " + this[key];
        }
        return string;
    }
}