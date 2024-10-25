document.getElementById('livroForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const titulo = document.getElementById('titulo').value;
    const sinopse = document.getElementById('sinopse').value;
    const autor = document.getElementById('autor').value;
    const ano_publicacao = document.getElementById('ano_publicacao').value;
    const editora = document.getElementById('editora').value;
    const avaliacao = document.getElementById('avaliacao').value;
    const genero = document.getElementById('genero').value;
    const paginas = document.getElementById('paginas').value;
    const idioma = document.getElementById('idioma').value;
    const condicao = document.getElementById('condicao').value;
    const localizacao = document.getElementById('localizacao').value;

    const livro = {
        titulo,
        sinopse,
        autor,
        ano_publicacao,
        editora,
        avaliacao,
        genero,
        paginas,
        idioma,
        condicao,
        localizacao
    };

    try {
        const response = await fetch('/adicionar-livro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        });

        const result = await response.json();
        document.getElementById('mensagem').textContent = result.message;
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        document.getElementById('mensagem').textContent = 'Erro ao cadastrar livro.';
    }
});
