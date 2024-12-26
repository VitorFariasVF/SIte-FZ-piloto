const config = {
    quantidadeServicos: 6, // Quantidade de caixas de serviços
    opacidadeHover: 0.9 // Opacidade dos itens ao passar o mouse
};

const servicos = [
    { img: 'servico1.jpg', titulo: 'Desenvolvimento de Obras', desc: 'Projetos e execução de obras civis.', detalhes: 'Detalhes sobre o desenvolvimento de obras.' },
    { img: 'servico2.jpg', titulo: 'Consultoria', desc: 'Consultoria especializada em engenharia.', detalhes: 'Detalhes sobre consultoria.' },
    { img: 'servico3.jpg', titulo: 'Manutenção', desc: 'Serviços de manutenção predial.', detalhes: 'Detalhes sobre manutenção predial.' }
];

function criarServicos() {
    const servicesContainer = document.querySelector('.service-container');
    servicesContainer.innerHTML = ''; // Reseta o conteúdo

    for (let i = 0; i < config.quantidadeServicos; i++) {
        const servico = servicos[i % servicos.length]; // Reutiliza serviços se necessário
        const service = document.createElement('div');
        service.className = 'service';
        service.dataset.index = i;
        service.innerHTML = `
            <img src="${servico.img}" alt="${servico.titulo}">
            <h3>${servico.titulo}</h3>
            <p>${servico.desc}</p>
        `;
        service.addEventListener('click', () => mostrarDetalhes(i));
        servicesContainer.appendChild(service);
    }

    adicionarEventosHover();
}

function adicionarEventosHover() {
    const services = document.querySelectorAll('.service');

    services.forEach(service => {
        service.addEventListener('mouseenter', () => {
            services.forEach(s => {
                if (s !== service) {
                    s.style.transform = 'scale(0.98)';
                    s.style.opacity = config.opacidadeHover.toString();
                } else {
                    s.style.transform = 'scale(1.02)';
                }
            });
        });

        service.addEventListener('mouseleave', () => {
            services.forEach(s => {
                s.style.transform = 'scale(1)';
                s.style.opacity = '1';
            });
        });
    });
}

function mostrarDetalhes(index) {
    const serviceDetails = document.getElementById('service-details');
    const detailsContent = serviceDetails.querySelector('.details-content');
    const toolbar = serviceDetails.querySelector('.toolbar');
    const servico = servicos[index % servicos.length];

    detailsContent.innerHTML = `
        <img src="${servico.img}" alt="${servico.titulo}">
        <h3>${servico.titulo}</h3>
        <p>${servico.detalhes}</p>
    `;

    toolbar.innerHTML = '';
    servicos.forEach((serv, i) => {
        const button = document.createElement('button');
        button.textContent = serv.titulo;
        button.addEventListener('click', () => mostrarDetalhes(i));
        toolbar.appendChild(button);
    });

    document.getElementById('services').style.display = 'none';
    serviceDetails.style.display = 'block';
}

function voltar() {
    document.getElementById('service-details').style.display = 'none';
    document.getElementById('services').style.display = 'block';
}

function mostrarSobreNos() {
    document.getElementById('services').style.display = 'none';
    document.getElementById('about-us').style.display = 'block';
}

function voltarSobreNos() {
    document.getElementById('about-us').style.display = 'none';
    document.getElementById('services').style.display = 'block';
}

// Cria os serviços ao carregar a página
document.addEventListener('DOMContentLoaded', criarServicos);
