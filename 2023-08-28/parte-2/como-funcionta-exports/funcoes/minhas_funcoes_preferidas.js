function somenteNumeros(texto){
    return texto.replace(/[^0-9]/g, '');
}

function formataCpf(cpf){
    return somenteNumeros(cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

module.exports = {
    somenteNumeros,
    formataCpf
}