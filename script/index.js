document.addEventListener('DOMContentLoaded', () => {
    // Botão de saudação
    const buttonSaudacao = document.getElementById('saudacao');
    if (buttonSaudacao) {
        buttonSaudacao.addEventListener('click', () => {
            const hours = new Date().getHours();
            const greeting = hours < 12 ? "Bom dia" : hours < 18 ? "Boa tarde" : "Boa noite";
            alert(`${greeting}! Bem-vindo à nossa apostila web!`);
        });
    }
	});
async function fetchGitHubUser(username) {
	const response = await fetch(`https://api.github.com/users/${username}`);
	if (!response.ok) {
		throw new Error(`Erro ao buscar usuário ${username}`);
	}
	const data = await response.json();
	return {
		name: data.name || data.login,
		avatarUrl: data.avatar_url,
		profileUrl: data.html_url,
	};
}

async function showProfiles() {
	const usernames = ['bielgennaro', 'thiagoyonekura'];
	const profilesContainer = document.getElementById('profilesContainer');
	profilesContainer.innerHTML = '';

	try {
		const users = await Promise.all(
			usernames.map((username) => fetchGitHubUser(username)),
		);
		for (const user of users) {
			const profileDiv = document.createElement('div');
			profileDiv.className = 'profile';
			profileDiv.innerHTML = `
          <img src="${user.avatarUrl}" alt="${user.name}'s avatar">
          <a href="${user.profileUrl}" target="_blank">${user.name}</a>
        `;
			profilesContainer.appendChild(profileDiv);
		}
	} catch (error) {
		console.error(error);
		profilesContainer.innerHTML = '<p>Erro ao carregar perfis.</p>';
	}
}

document
	.getElementById('showProfilesButton')
	.addEventListener('click', showProfiles);

async function fetchAPOD() {
	const apiKey = 'fp8ID1PFQ6KzgCf2R0IslAwlPPhkcWr5MaJk1Wvx';
	const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
	const apodContainer = document.getElementById('apodContainer');

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Erro ao buscar dados da API APOD');
		}
		const data = await response.json();

		// Limpa o container antes de adicionar novo conteúdo
		apodContainer.innerHTML = `
        <h2>${data.title}</h2>
        ${
					data.media_type === 'image'
						? `<img id="apodImage" src="${data.url}" alt="${data.title}">`
						: `<iframe id="apodVideo" src="${data.url}" frameborder="0" allowfullscreen></iframe>`
				}
        <p><strong>Data:</strong> ${data.date}</p>
      `;
	} catch (error) {
		console.error(error);
		apodContainer.innerHTML = '<p>Erro ao carregar a APOD.</p>';
	}
}

function validateForm(event) {
    // Impede o envio do formulário
    event.preventDefault();

    // Obter os campos do formulário
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    // Elementos de erro
    const errorNome = document.getElementById("errorNome");
    const errorEmail = document.getElementById("errorEmail");
    const errorAssunto = document.getElementById("errorAssunto");
    const errorMensagem = document.getElementById("errorMensagem");

    // Limpar mensagens de erro anteriores
    errorNome.textContent = "";
    errorEmail.textContent = "";
    errorAssunto.textContent = "";
    errorMensagem.textContent = "";

    // Flag para rastrear erros
    let isValid = true;

    // Validação do nome
    if (!nome) {
        errorNome.textContent = "O nome é obrigatório.";
        isValid = false;
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errorEmail.textContent = "O email é obrigatório.";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        errorEmail.textContent = "Digite um email válido.";
        isValid = false;
    }

    // Validação do assunto
    if (!assunto) {
        errorAssunto.textContent = "Selecione um assunto.";
        isValid = false;
    }

    // Validação da mensagem
    if (!mensagem) {
        errorMensagem.textContent = "A mensagem é obrigatória.";
        isValid = false;
    }

    // Se for válido, mostrar o alert de sucesso
    if (isValid) {
        alert("Formulário enviado com sucesso!");

        // Mostrar as respostas após o alert (quando o usuário clicar em "OK")
        setTimeout(function() {
            // Atualizar os valores exibidos
            document.getElementById('respostaNome').textContent = nome;
            document.getElementById('respostaEmail').textContent = email;
            document.getElementById('respostaAssunto').textContent = assunto;
            document.getElementById('respostaMensagem').textContent = mensagem;

            // Mostrar a div com as respostas
            document.getElementById('respostas').style.display = 'block';

            // Limpar o formulário
            document.getElementById('contactForm').reset();
        }, 100);  // O setTimeout ajuda a garantir que as respostas apareçam após o alert
    } else {
        alert("Por favor, corrija os erros antes de enviar o formulário.");
    }

    // Retornar false para impedir o envio se houver erros
    return false;
}


document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('addItemButton');
    const dynamicList = document.getElementById('dynamicList');

    if (addItemButton) {
        addItemButton.addEventListener('click', () => {
            const newItem = document.createElement('li');
            newItem.textContent = `Item ${dynamicList.children.length + 1}`;
            dynamicList.appendChild(newItem);
        });
    }
});
