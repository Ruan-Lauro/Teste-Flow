$(document).ready(function () {
    let productCount = 1;
    const sectionProduct = $('#sectionProduct');
    
    $('#buttonProduct').click(function () {
        const productHtml = `
            <div class="allProcutDiv" data-product-id="${productCount}">
                <div class="delete">
                    <img src="../assents/lixo.png" alt="lixo">
                </div>
                <div class="procutDiv">
                    <div class="numberProduct">
                        <p id="valueP">Produto - ${productCount}</p>
                    </div>
                    <div class="inforProduct">
                        <div class="imgInforProduct">
                            <img src="../assents/box.png" alt="caixa">
                        </div>
                        <div class="registerInforProduct">
                            <div class="col-12">
                                <label for="inputProduct" class="form-label">Produto</label>
                                <input type="text" class="form-control inputProduct" id="inputProduct" >
                            </div>
                            <div class="detailRegisterInforProduct">
                                <div class="col-product-one">
                                    <label for="measurement" class="form-label">UND.Medida</label>
                                    <div class="divMeasurement">
                                        <select class="measurement" id="measurement">
                                            <option value="unidade">Unidade</option>
                                            <option value="grama">Grama</option>
                                            <option value="kg">Quilograma</option>
                                            <option value="ml">Mililitro</option>
                                            <option value="litro">Litro</option>
                                            <option value="caixa">Caixa</option>
                                            <option value="Palete">Palete</option>
                                        </select>
                                        <div class="triangle" id="triangle">
                                            <img src="../assents/triangulo.png" alt="Triângulo">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-product-two">
                                    <label for="inputQS" class="form-label">QDTDE. em Estoque</label>
                                    <input type="text" class="form-control inputQE" id="inputQS">
                                </div>
                                <div class="col-product-three">
                                    <label for="inputUV" class="form-label">Valor Unitário</label>
                                    <input type="text" class="form-control inputVU" id="inputUV">
                                </div>
                                <div class="col-product-four">
                                    <p class="inforTotal" >Valor Total</p>
                                    <p class="inforTT" id="total">0.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $(productHtml).insertBefore('#buttonProduct').closest('.d-grid');
        productCount++;
    });

   
    sectionProduct.on('input', '.inputQE, .inputVU', function () {
        updateProductValues();
    });

    
    function updateProductValues() {
        $('.allProcutDiv').each(function (index) {
            const quantity = parseFloat($(this).find('.inputQE').val()) || 0;
            const unitPrice = parseFloat($(this).find('.inputVU').val()) || 0;
            const totalValue = (quantity * unitPrice).toFixed(2);
            $(this).find('.inforTT').text(totalValue);
        });
    }

    function updateIndex(idDe){

        let maxId = 0;
        let value = 0;

        $('.allProcutDiv').each(function (index) {
            var a = 0
            const valueP = $(this).closest('.allProcutDiv').find('#valueP').text();
            const productNumber = parseInt(valueP.split(' - ')[1]);
           if(idDe < productNumber){
            $(this).closest('.allProcutDiv').find('#valueP').text(`Produto - ${productNumber - 1}`);
            value = 1;
           }

           if (productNumber > maxId) {
            maxId = productNumber;
           }
           
        });

        productCount = maxId + 1 - value;
   

    }

    
    sectionProduct.on('click', '.delete', function () {
        const valueP = $(this).closest('.allProcutDiv').find('#valueP').text();
        const productNumber = valueP.split(' - ')[1];
        $(this).closest('.allProcutDiv').remove();
        updateIndex(parseInt(productNumber))
    });

   

    $('#buttonAnnex').on('click', function() {
        $('#fileInput').click(); 
    });

    $('#fileInput').on('change', function(event) {
        var files = event.target.files; 
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.onload = function(e) {
               
                var base64String = btoa(e.target.result); 
                var fileName = file.name;
                
                const productHtmlA = `
                 <div class="sectionPostAnnex">
                        <div class="deleteAnnex">
                            <img src="../assents/lixo.png" alt="lixo">
                        </div>
                        <div class="eyeAnnex" id="eyeAnnex">
                            <img src="../assents/Eye.png" alt="eye">
                        </div>
                        <div class="inforAnnex">
                            <p id="nameAnnex" id="nameAnnex">${fileName}</p>
                            <p style="display: none;" id="base64Annex">${base64String}</p>
                              <a id="downloadLink" style="display:none;">Download</a>
                        </div>`;
    
            $(productHtmlA).insertBefore('#fileInput').closest('.d-grid');
            
            };
            reader.readAsBinaryString(file);
            
        }
    });

    $('#sectionProductA').on('click', '.deleteAnnex', function () {
        $(this).closest('.sectionPostAnnex').remove();
    });

    $('#sectionProductA').on('click', '#eyeAnnex', function () {
       
        const valueD = $(this).closest('.sectionPostAnnex').find('#base64Annex').text();
        const fileName = $(this).closest('.sectionPostAnnex').find('#nameAnnex').text();
        const dataUri = 'data:application/octet-stream;base64,' + valueD;
        $('#downloadLink').attr('href', dataUri);
        $('#downloadLink').attr('download', fileName);
        $('#downloadLink').text('Baixar ' + fileName);
        $('#downloadLink')[0].click();
    });

   
    $('#buttonSave').click(function (){
        $("#loadingModal").fadeIn();
        const Supplier = {
            razaoSocial: $('#inputRZ').val(),
            nomeFantasia: $('#inputNameF').val(),
            cnpj: $('#inputCNPJ').val(),
            inscricaoEstadual: $('#inputIState').val(),
            inscricaoMunicipal: $('#inputICounty').val(),
            cep: $('#inputCEP').val(),
            endereco: $('#inputAddress').val(),
            complemento: $('#inputComplement').val(),
            bairro:  $('#inputNeighborhood').val(),
            municipio:  $('#inputCounty').val(),
            estado:  $('#inputState').val(),
            nomeContato: $('#inputNamePC').val(),
            telefoneContato: $('#inputPhone').val(),
            emailContato: $('#inputEmail').val(),
            produtos: [

            ],
            anexos: [

            ]
        };

        const list = [];

        $('.allProcutDiv').each(function (index) {

          const products = {
            indice: $(this).closest('.allProcutDiv').find('#valueP').text().split(' - ')[1],
			descricaoProduto:  $(this).find('#inputProduct').val(),
			unidadeMedida: $(this).find('#measurement').val(),
			qtdeEstoque: $(this).find('#inputQS').val(),
			valorUnitario: $(this).find('#inputUV').val(),
			valorTotal: $(this).find('#total').text(),	
          };

          list.push(products);
        });

        Supplier.produtos = list;
        var value = 1;
        const listAnnex = []
        $('.sectionPostAnnex').each(function (index) {

            const annex = {
                indice: value,
				nomeArquivo: $(this).find('#nameAnnex').text(),
				blobArquivo: $(this).find('#base64Annex').text(),
            };
  
            listAnnex.push(annex);

            value += 1;
          });

          Supplier.anexos = listAnnex;

        for (let y in Supplier) {
           if(Supplier[y] === "" || Supplier[y] === undefined){
          
            $('#errorP').text("Dados do fornecedor incompletos")
            $('#errorP').css({
                "color": "red",
                "font-size": "20px",
                "font-weight":"500"
            })
           }else{
            if(Supplier.produtos.length == 0){
                $("#loadingModal").fadeOut(); 
                $('#errorP').text("Sem nenhum produto cadastrado")
                $('#errorP').css({
                    "color": "red",
                    "font-size": "20px",
                    "font-weight":"500"
                })
            }else{

                if(Supplier.anexos.length == 0){
                    $("#loadingModal").fadeOut(); 
                    $('#errorP').text("Está faltando anexar arquivo")
                    $('#errorP').css({
                        "color": "red",
                        "font-size": "20px",
                        "font-weight":"500"
                    })
                }else{
                    Supplier.produtos.map(valueN=>{
                        for(let j in valueN){
                            if(valueN[j] == "" || valueN[j] == undefined){
                                $("#loadingModal").fadeOut(); 
                                $('#errorP').text("Está faltando informação nos produtos")
                                $('#errorP').css({
                                    "color": "red",
                                    "font-size": "20px",
                                    "font-weight":"500"
                                })
                                return
                            }else{
                                $("#loadingModal").fadeOut(); 
                                $('#errorP').text("Arquivos salvos")
                                    $('#errorP').css({
                                        "color": "black",
                                        "font-size": "20px",
                                        "font-weight":"500"
                                    })
                            }
                        }

                        const jsonString = JSON.stringify(Supplier, null, 2);
                        const blob = new Blob([jsonString], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);

                        $('#downloadLink').attr('href', url);
                        $('#downloadLink').attr('download', "Fornecedor");
                        $('#downloadLink').text('Baixar ' + "Fornecedor");
                        $('#downloadLink')[0].click();
                        
                    })
                }


                

             
            }
           }
        }

    });

});
