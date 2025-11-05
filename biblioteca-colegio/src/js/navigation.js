function navigateToLevel(level) {
    window.location.href = `pages/${level}.html`;
}

function navigateToCourse(level, grade) {
    window.location.href = `curso.html?nivel=${level}&grado=${grade}`;
}

function navigateToSubject(level, grade, subject) {
    const subjectEncoded = encodeURIComponent(subject);
    window.location.href = `materia.html?nivel=${level}&grado=${grade}&materia=${subjectEncoded}`;
}

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        nivel: params.get('nivel'),
        grado: params.get('grado'),
        materia: params.get('materia')
    };
}

function createBreadcrumb(items) {
    const breadcrumbContainer = document.querySelector('.breadcrumb .container');
    if (!breadcrumbContainer) return;
    
    let html = '<a href="../index.html">Inicio</a>';
    
    items.forEach((item, index) => {
        if (index < items.length - 1) {
            html += ` > <a href="${item.url}">${item.text}</a>`;
        } else {
            html += ` > <span>${item.text}</span>`;
        }
    });
    
    breadcrumbContainer.innerHTML = html;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}