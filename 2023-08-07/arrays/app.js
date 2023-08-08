const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const palavras = ['palavra1', 'palavra2', 'palavra3'];
const objetos = [{ id: 1, nome: 'joao' }, { id: 2, nome: 'maria' }, { id: 3, nome: 'isaque' }];

const numerosFiltrados = numeros.find((numero) => numero > 5) ; 

objetos.filter((item) => {
    return item.id > 1;
}); 

const objeto = objetos.find((item) => {
    return item.id > 1;
})
//console.log(objeto);
 console.log(numerosFiltrados);
