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
        return 'id: ' + this.id + '';
    }
}