function buscarCep(cep) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.erro) {
                    reject(new Error('CEP não encontrado.'));
                } else {
                    resolve(data);
                }
            },
            error: function() {
                reject(new Error('Erro ao buscar o CEP.'));
            }
        });
    });
}

$(document).ready(function() {
    $('#inputCEP').on('input', function() {
        const cep = $(this).val();
        if (cep.length === 8) { 
            buscarCep(cep)
                .then(function(data) {
                    $('#inputAddress').val(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
                })
                .catch(function(error) {
                    alert(error.message);
                });
        }
    });
});