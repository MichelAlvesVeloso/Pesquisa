// Simulação de dados em JSON
const data = {
    "estados": [
        {
            "nome": "São Paulo",
            "cidades": [
                {
                    "nome": "São Paulo",
                    "municipios": [
                        {
                            "nome": "São Paulo",
                            "bairros": ["Centro", "Pinheiros", "Vila Madalena"]
                        },
                        {
                            "nome": "Campinas",
                            "bairros": ["Cambuí", "Jardim Guanabara", "Centro"]
                        }
                    ]
                },
                
                {
                    "nome": "Santos",
                    "municipios": [
                        {
                            "nome": "Santos",
                            "bairros": ["Boqueirão", "Gonzaga", "Embaré"]
                        }
                    ]
                }
            ]
        },
        {
            "nome": "Minas Gerais",
            "cidades": [
                {
                    "nome": "Minas Gerais",
                    "municipios": [
                        {
                            "nome": "Belo Horizonte",
                            "bairros": ["Belo Horizonte", "Confins", "Nova Lima"]
                        },
                       
                    ]
                },
                {
                    "nome": "Vaca Morta",
                    "municipios": [
                        {
                            "nome": "Montes Claros",
                            "bairros": ["Vaca morta", "Santa Rosa de Lima", "Nova Esperança"]
                        },
                       
                    ]
                },
                
                {
                    "nome": "Montes Claros", 
                    "municipios": [
                        {
                            "nome": "Montes Claros",
                            "bairros": ["Canelas", "Interlagos", "Santos Reis"]
                        }
                    ]
                }
            ]
        },
        {
            "nome": "Rio de Janeiro",
            "cidades": [
                {
                    "nome": "Rio de Janeiro",
                    "municipios": [
                        {
                            "nome": "Rio de Janeiro",
                            "bairros": ["Copacabana", "Botafogo", "Barra da Tijuca"]
                        },
                        {
                            "nome": "Niterói",
                            "bairros": ["Icaraí", "Santa Rosa", "Centro"]
                        }
                    ]
                },
                {
                    "nome": "Petrópolis",
                    "municipios": [
                        {
                            "nome": "Petrópolis",
                            "bairros": ["Centro", "Quitandinha", "Valparaíso"]
                        }
                    ]
                }
            ]
        }
    ]
};

function loadEstados() {
    const estadoSelect = document.getElementById("estado");
    data.estados.forEach(estado => {
        let option = document.createElement("option");
        option.value = estado.nome;
        option.text = estado.nome;
        estadoSelect.add(option);
    });
}

function loadCidades() {
    const cidadeSelect = document.getElementById("cidade");
    const estadoSelect = document.getElementById("estado").value;
    cidadeSelect.innerHTML = "<option>Selecione a cidade</option>";

    const estado = data.estados.find(e => e.nome === estadoSelect);
    if (estado) {
        estado.cidades.forEach(cidade => {
            let option = document.createElement("option");
            option.value = cidade.nome;
            option.text = cidade.nome;
            cidadeSelect.add(option);
        });
    }
    clearMunicipios();
    clearBairros();
}

function loadMunicipios() {
    const municipioSelect = document.getElementById("municipio");
    const estadoSelect = document.getElementById("estado").value;
    const cidadeSelect = document.getElementById("cidade").value;
    municipioSelect.innerHTML = "<option>Selecione o município</option>";

    const estado = data.estados.find(e => e.nome === estadoSelect);
    const cidade = estado.cidades.find(c => c.nome === cidadeSelect);

    if (cidade) {
        cidade.municipios.forEach(municipio => {
            let option = document.createElement("option");
            option.value = municipio.nome;
            option.text = municipio.nome;
            municipioSelect.add(option);
        });
    }
    clearBairros();
}

function loadBairros() {
    const bairroSelect = document.getElementById("bairro");
    const estadoSelect = document.getElementById("estado").value;
    const cidadeSelect = document.getElementById("cidade").value;
    const municipioSelect = document.getElementById("municipio").value;
    bairroSelect.innerHTML = "<option>Selecione o bairro</option>";

    const estado = data.estados.find(e => e.nome === estadoSelect);
    const cidade = estado.cidades.find(c => c.nome === cidadeSelect);
    const municipio = cidade.municipios.find(m => m.nome === municipioSelect);

    if (municipio && municipio.bairros.length > 0) {
        municipio.bairros.forEach(bairro => {
            let option = document.createElement("option");
            option.value = bairro;
            option.text = bairro;
            bairroSelect.add(option);
        });
    } else {
        alert("Nenhum bairro encontrado para este município.");
    }
}

function clearMunicipios() {
    const municipioSelect = document.getElementById("municipio");
    municipioSelect.innerHTML = "<option>Selecione o município</option>";
}

function clearBairros() {
    const bairroSelect = document.getElementById("bairro");
    bairroSelect.innerHTML = "<option>Selecione o bairro</option>";
}

function validateForm(event) {
    event.preventDefault(); // Impede o envio do formulário para que possamos processar os dados
    const estadoSelect = document.getElementById("estado").value;
    const cidadeSelect = document.getElementById("cidade").value;
    const municipioSelect = document.getElementById("municipio").value;
    const bairroSelect = document.getElementById("bairro").value;

    if (estadoSelect === "Selecione o estado" || 
        cidadeSelect === "Selecione a cidade" || 
        municipioSelect === "Selecione o município" || 
        bairroSelect === "Selecione o bairro") {
        alert("Por favor, selecione estado, cidade, município e bairro antes de pesquisar.");
    } else {
        // Exibir os resultados
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `<h2>Resultados da Pesquisa:</h2>
                                  <p>Estado: ${estadoSelect}</p>
                                  <p>Cidade: ${cidadeSelect}</p>
                                  <p>Município: ${municipioSelect}</p>
                                  <p>Bairro: ${bairroSelect}</p>`;
    }
}

window.onload = loadEstados;
