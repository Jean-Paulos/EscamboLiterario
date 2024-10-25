// Função para carregar os livros
async function carregarLivros() {
    try {
        const response = await fetch('/livros');
        const livros = await response.json();
        
        console.log(livros);  // Verifica o que está retornando do backend

        const tabelaLivros = document.getElementById('livros-lista');
        tabelaLivros.innerHTML = '';  // Limpa a tabela antes de preenchê-la novamente

        // Itera pelos livros recebidos e insere linhas na tabela
        livros.forEach(livro => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>
                    <button class="excluir" onclick="excluirLivro(${livro.id})">Excluir</button>
                    <button class="editar" onclick="editarLivro(${livro.id})">Editar</button>
                </td>
            `;

            tabelaLivros.appendChild(tr);  // Adiciona a linha na tabela
        });
    } catch (err) {
        console.error("Erro ao carregar livros:", err);
    }
}

// Função para excluir um livro
async function excluirLivro(id) {
    try {
        const response = await fetch(`/livros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Livro excluído com sucesso!");
            carregarLivros();  // Recarrega a lista de livros
        } else {
            alert("Erro ao excluir livro.");
        }
    } catch (err) {
        console.error("Erro ao excluir livro:", err);
    }
}

// Função para abrir o modal e editar o livro
function editarLivro(id) {
    const modal = document.getElementById('modal-editar');

    // Preenche o modal com os dados do livro
    fetch(`/livros/${id}`)
        .then(response => response.json())
        .then(livro => {
            document.getElementById('livroId').value = livro.id;
            document.getElementById('editar-titulo').value = livro.titulo;
            document.getElementById('editar-autor').value = livro.autor;
            modal.style.display = 'block';  // Exibe o modal
        })
        .catch(err => console.error("Erro ao buscar livro:", err));
}

// Evento para fechar o modal
document.getElementById('fechar-modal').addEventListener('click', function() {
    const modal = document.getElementById('modal-editar');
    modal.style.display = 'none';
});

// Fecha o modal se clicar fora da área do modal
window.onclick = function(event) {
    const modal = document.getElementById('modal-editar');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Função para salvar as alterações no livro
document.getElementById('form-editar-livro').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    const id = document.getElementById('livroId').value;
    const titulo = document.getElementById('editar-titulo').value;
    const autor = document.getElementById('editar-autor').value;

    fetch(`/livros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor })
    })
    .then(response => {
        if (response.ok) {
            alert("Livro atualizado com sucesso!");
            carregarLivros();  // Recarrega a lista de livros
            document.getElementById('modal-editar').style.display = 'none';  // Fecha o modal
        } else {
            alert("Erro ao atualizar o livro.");
        }
    })
    .catch(err => console.error("Erro ao atualizar livro:", err));
});

// Chama a função carregarLivros ao carregar a página
document.addEventListener('DOMContentLoaded', carregarLivros);
