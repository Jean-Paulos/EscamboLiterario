// Variável global para armazenar a chave da API
let googleBooksApiKey = null;

// Função para buscar a chave API do backend
async function getGoogleBooksApiKey() {
    try {
        const response = await fetch('/api/google-books-key');
        const data = await response.json();
        return data.key;
    } catch (error) {
        console.error('Erro ao buscar a chave da API:', error);
        return null;
    }
}

async function buscarCapaLivro(titulo) {
    if (!googleBooksApiKey) {
        console.error('Chave da API não carregada.');
        return null;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(titulo)}&key=${googleBooksApiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            return data.items[0].volumeInfo.imageLinks.thumbnail || 
                   data.items[0].volumeInfo.imageLinks.smallThumbnail || 
                   null;
        }
    } catch (error) {
        console.error('Erro ao buscar capa do livro:', error);
    }

    return null;
}


// Função para exibir os resultados de busca
async function pesquisar() {
    const titulo = document.getElementById('campo-pesquisa').value;

    try {
        const response = await fetch(`/buscar-livro?titulo=${titulo}`);
        const livros = await response.json();

        const resultadosDiv = document.getElementById('resultados-pesquisa');
        resultadosDiv.innerHTML = ''; // Limpa resultados anteriores

        if (livros.length === 0) {
            resultadosDiv.innerHTML = '<p>Nenhum livro encontrado.</p>';
            return;
        }

        for (const livro of livros) {
            const itemResultado = document.createElement('div');
            itemResultado.classList.add('item-resultado');

            // Título
            const h2 = document.createElement('h2');
            h2.innerHTML = livro.titulo;
            itemResultado.appendChild(h2);

            // Autor
            const autor = document.createElement('h5');
            autor.textContent = `Autor: ${livro.autor || 'Desconhecido'}`;
            itemResultado.appendChild(autor);

            // Avaliação
            const avaliacao = document.createElement('p');
            avaliacao.classList.add('avaliacao');
            avaliacao.textContent = `Avaliação: ${livro.avaliacao || 0} ⭐`;
            itemResultado.appendChild(avaliacao);

            // Capa do Livro
            const capaPequena = await buscarCapaLivro(livro.titulo);
            if (capaPequena) {
                const img = document.createElement('img');
                img.src = capaPequena;
                img.alt = `Capa de ${livro.titulo}`;
                img.classList.add('livro-imagem');
                itemResultado.appendChild(img);
            }

            // Descrição
            const descricao = document.createElement('p');
            descricao.classList.add('descricao');
            descricao.textContent = livro.sinopse || 'Sem sinopse disponível.';
            itemResultado.appendChild(descricao);

            // Detalhes (Ano, Editora)
            const detalhes = document.createElement('p');
            detalhes.classList.add('detalhes');
            detalhes.innerHTML = `
                Ano: ${livro.ano_publicacao || 'N/A'} <br>
                Editora: ${livro.editora || 'N/A'}
            `;
            itemResultado.appendChild(detalhes);


            // Botão "Como adquirir"
            const botaoMaisInfo = document.createElement('button');
            botaoMaisInfo.textContent = "Como adquirir";
            botaoMaisInfo.onclick = () => openModal(livro.titulo, livro.localizacao || 'Local não definido');
            itemResultado.appendChild(botaoMaisInfo);

            resultadosDiv.appendChild(itemResultado);
        }
    } catch (err) {
        console.error("Erro ao buscar livros:", err);
    }
}

// Inicializar a chave da API e configurar a busca
(async function() {
    googleBooksApiKey = await getGoogleBooksApiKey();
})();


// Função para abrir o modal
async function openModal(titulo, localizacao) {
    console.log(`Abrindo modal para o livro: ${titulo}`); 
    const modal = document.getElementById('bookModal');
    document.getElementById("bookTitle").innerText = titulo;
    document.getElementById("exchangeLocation").innerText = localizacao;
    atualizarMapa(localizacao);

    const capaGrande = await buscarCapaLivro(titulo);
    const imagemCapaModal = document.getElementById('imagemCapaModal');
    if (capaGrande) {
        imagemCapaModal.src = capaGrande;
        imagemCapaModal.alt = `Capa de ${titulo}`;
        imagemCapaModal.style.display = 'block'; // Mostrar a imagem
    } else {
        imagemCapaModal.style.display = 'none'; // Ocultar se não houver capa
    }

    modal.classList.add('visible');
}

// Fechar o modal
const closeModal = document.querySelector('.close');  // Seleciona o botão de fechar pelo seletor de classe
closeModal.onclick = function() {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('visible');
}

// Fechar o modal clicando fora dele
window.onclick = function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        modal.classList.remove('visible');
    }
}

// Função para atualizar o mapa com a localização do livro
function atualizarMapa(localizacao) {
    const iframe = document.getElementById('mapsIframe');

    if (localizacao) {
        const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(localizacao)}&output=embed`;
        iframe.src = googleMapsUrl;
    } else {
        iframe.src = "";
        alert('Localização não definida para este livro.');
    }
}
