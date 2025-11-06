let resourcesData = null;


const subjectInfo = {
    'Texto de Aprendizaje': {
        icon: '📚',
        description: 'Material integral de aprendizaje oficial del MINEDU',
        color: '#6366f1'
    },
    'Lenguaje': {
        icon: '📚',
        description: 'Desarrollo de habilidades de lectura, escritura y comprensión lectora',
        color: '#8b5cf6'
    },
    'Matemática': {
        icon: '🔢',
        description: 'Razonamiento lógico, operaciones y resolución de problemas matemáticos',
        color: '#3b82f6'
    },
    'Ciencias Naturales': {
        icon: '🔬',
        description: 'Exploración del mundo natural, experimentos y conocimiento científico',
        color: '#10b981'
    },
    'Ciencias Sociales': {
        icon: '🌍',
        description: 'Historia, geografía y comprensión de la sociedad y cultura',
        color: '#f59e0b'
    },
    'Inglés': {
        icon: '🗣️',
        description: 'Aprendizaje del idioma inglés: vocabulario, gramática y conversación',
        color: '#ef4444'
    },
    'Música': {
        icon: '🎵',
        description: 'Educación musical, ritmo, melodía y apreciación artística',
        color: '#ec4899'
    },
    'Artes Plásticas y Visuales': {
        icon: '🎨',
        description: 'Expresión artística, técnicas plásticas y visuales',
        color: '#f97316'
    },
    'Filosofía y Psicología': {
        icon: '🧠',
        description: 'Pensamiento crítico, reflexión filosófica y psicología',
        color: '#8b5cf6'
    },
    'Psicología y Filosofía': {
        icon: '🧠',
        description: 'Pensamiento crítico, reflexión filosófica y psicología',
        color: '#8b5cf6'
    },
    'Valores y Religiones': {
        icon: '✨',
        description: 'Valores, espiritualidad y educación religiosa',
        color: '#14b8a6'
    },
    'Técnica Tecnológica General': {
        icon: '⚙️',
        description: 'Fundamentos técnicos y tecnológicos aplicados',
        color: '#64748b'
    },
    'Tecnología y Producción': {
        icon: '🛠️',
        description: 'Tecnología, producción y desarrollo técnico',
        color: '#06b6d4'
    },
    'Cosmos y Pensamiento': {
        icon: '🌌',
        description: 'Cosmovisión, pensamiento y cultura',
        color: '#a855f7'
    }
};


async function loadResources() {
    try {
        const response = await fetch('../src/data/resources.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        console.log('JSON cargado:', text.substring(0, 200));
        resourcesData = JSON.parse(text);
        console.log('Recursos parseados:', resourcesData);
        return resourcesData;
    } catch (error) {
        console.error('Error al cargar recursos:', error);
        alert('Error al cargar los recursos: ' + error.message);
        return null;
    }
}

function getSubjects(level, grade) {
    if (!resourcesData || !resourcesData[level] || !resourcesData[level][grade]) {
        return null;
    }
    return Object.keys(resourcesData[level][grade]);
}

function getSubjectInfo(subjectName) {
    return subjectInfo[subjectName] || {
        icon: '📖',
        description: 'Material educativo de calidad',
        color: '#64748b'
    };
}

function getMaterials(level, grade, subject) {
    if (!resourcesData || !resourcesData[level] || !resourcesData[level][grade] || !resourcesData[level][grade][subject]) {
        return null;
    }
    return resourcesData[level][grade][subject].materiales;
}

// Contar materiales de una materia
function countMaterials(level, grade, subject) {
    const materials = getMaterials(level, grade, subject);
    return materials ? materials.length : 0;
}

function filterMaterials(materials, searchTerm) {
    if (!searchTerm) return materials;
    
    const term = searchTerm.toLowerCase();
    return materials.filter(material => {
        return material.titulo.toLowerCase().includes(term) ||
               material.autor.toLowerCase().includes(term) ||
               material.descripcion.toLowerCase().includes(term) ||
               material.grado.toString().includes(term);
    });
}

function renderMaterialCards(materials, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!materials || materials.length === 0) {
        container.innerHTML = '<div class="no-results"><p>No se encontraron materiales que coincidan con tu búsqueda.</p></div>';
        return;
    }
    
    container.innerHTML = materials.map(material => `
        <div class="material-card" data-id="${material.id}">
            <div class="material-header">
                <h3>${material.titulo}</h3>
                <span class="material-type">${formatMaterialType(material.tipo)}</span>
            </div>
            <div class="material-body">
                <p class="material-description">${material.descripcion}</p>
                <div class="material-info">
                    <span><strong>Autor:</strong> ${material.autor}</span>
                    <span><strong>Formato:</strong> ${material.formato}</span>
                    <span><strong>Tamaño:</strong> ${material.tamaño}</span>
                    <span><strong>Grado:</strong> ${material.grado}°</span>
                </div>
            </div>
            <div class="material-footer">
                <button class="btn btn-download" onclick="downloadMaterial('${material.url}', '${material.titulo}')">
                    <span>⬇</span> Descargar
                </button>
            </div>
        </div>
    `).join('');
}

function formatMaterialType(type) {
    const types = {
        'libro_texto': 'Libro de Texto',
        'cuaderno_trabajo': 'Cuaderno de Trabajo',
        'guia': 'Guía Didáctica',
        'complementario': 'Material Complementario',
        'multimedia': 'Multimedia'
    };
    return types[type] || type;
}

function downloadMaterial(url, title) {
    if (url === '#') {
        showAlert('El enlace de descarga aún no está disponible para: ' + title, 'warning');
        return;
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.download = title + '.pdf';
    link.target = '_blank'; // Abrir en nueva pestaña
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (typeof showAlert === 'function') {
        showAlert('Descargando: ' + title, 'success');
    } else {
        console.log('Descargando:', title);
    }
}