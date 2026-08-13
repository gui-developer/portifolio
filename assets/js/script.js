// Selecionar a Seção About
const about = document.querySelector("#about")

// Selecionar a Seção Projects
const swiperWrapper = document.querySelector(".swiper-wrapper")

const formulario = document.querySelector('#formulario');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;

// Função para construir a seção about
async function getAboutGithub() {
    try {

        const resposta = await fetch('https://api.github.com/users/gui-developer')

        const perfil = await resposta.json()

        //console.log(perfil)

        about.innerHTML = ''

        about.innerHTML = `
        
            <!-- Imagem da Seção Sobre Mim -->
            <figure class="about-image">
                <img 
                src="${perfil.avatar_url}" 
                alt="${perfil.name}"
                >
            </figure>

            <!-- Conteúdo da Seção Sobre Mim -->
            <article class="about-content">

                <h2>Sobre Mim</h2>

                <p>
                    Desenvolvedor Full Stack Java em formação, no último semestre de Análise e Desenvolvimento de Sistemas. Já levei um projeto do zero até o deploy: API REST com autenticação JWT e documentação em Swagger. Antes disso, passei por mais de 3 anos em suporte técnico, o que me deu disciplina para resolver problemas sob pressão, hoje aplicada ao código. Gosto de aprender rápido e estou sempre em busca do próximo desafio.
                </p>

        
                <!-- Links (GitHub + Currículo) e Dados do GitHub -->
                <div class="about-buttons-data">

                    <!-- Links -->
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">
                            GitHub
                        </a>

                        <a href="./Currículo Novo -" target="_blank" class="botao-outline">
                            Currículo
                        </a>
                    </div>

                    <!-- Dados do Repositório GitHub -->
                    <div class="data-container">

                        <!-- Número de Seguidores -->
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <!-- Número de Repositórios -->
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>

                    </div>
                </div>

            </article>
        
        `




    } catch (error) {
        console.error("Erro ao buscar dados no GitHub", error)
    }

}

// Função para construção do Carrossel com o Swipper
async function getProjectsGitHub() {
    try {

        const resposta = await fetch('https://api.github.com/users/gui-developer/repos?sort=update&per_page=6')

        const respositorios = await resposta.json()

        swiperWrapper.innerHTML = ''

        // Ícones das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        respositorios.forEach((repositorio) => {

            // Seleciona o nome da linguagem padrão do repositório
            const linguagem = repositorio.language || 'GitHub'

            // Seleciona o icone da linguagem padrão
            const icone = linguagens[linguagem] ?? linguagens['GitHub']

            // Construir o icone do link
            const urlIcone = `./assets/icons/languages/${icone}.svg`;

            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+t[a-z0-9]+$/i, '')
                .toUpperCase();

            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto;

            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub';

            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`;

            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : '';

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <figure class="project-image">
                            <img src="${urlIcone}" alt="Ícone ${linguagem}">
                        </figure>
                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            <div class="project-buttons">
                                <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">GitHub</a>
                                ${botaoDeploy}
                            </div>
                        </div>
                         
                    </article>
                </div>
            `;
        });

        iniciarSwiper();

    } catch (error) {
        console.error('Erro ao buscar os dados dos projetos no GitHub:', error);
    }
}

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        loop: true,
        watchOverflow: true,
        breakpoints: {
            0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 40 },
            769: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 40 },
            1025: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 54 },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        grabCursor: true,
    }); 
}

getAboutGithub()
getProjectsGitHub();