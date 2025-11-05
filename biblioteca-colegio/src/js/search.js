document.addEventListener('DOMContentLoaded', async function() {
    await loadResources();
    
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('searchResults');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!searchInput) return;
    
    let debounceTimer;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(debounceTimer);
        
        const searchTerm = e.target.value.trim();
        
        if (searchTerm.length === 0) {
            searchResults.style.display = 'none';
            return;
        }
        
        if (searchTerm.length < 2) {
            return;
        }
        
        debounceTimer = setTimeout(() => {
            performGlobalSearch(searchTerm);
        }, 300);
    });
    
    function performGlobalSearch(searchTerm) {
        const results = searchAllResources(searchTerm);
        
        if (results.length === 0) {
            searchResultsGrid.innerHTML = '<div class="no-results"><p>No se encontraron recursos que coincidan con tu búsqueda.</p></div>';
        } else {
            renderGlobalSearchResults(results);
        }
        
        resultsCount.textContent = results.length;
        searchResults.style.display = 'block';
    }
});

function searchAllResources(searchTerm) {
    if (!resourcesData) return [];
    
    const results = [];
    const term = searchTerm.toLowerCase();
    
    for (const nivel in resourcesData) {
        for (const grado in resourcesData[nivel]) {
            for (const materia in resourcesData[nivel][grado]) {
                const materialesArray = resourcesData[nivel][grado][materia].materiales;
                
                materialesArray.forEach(material => {
                    const matchTitle = material.titulo && material.titulo.toLowerCase().includes(term);
                    const matchAutor = material.autor && material.autor.toLowerCase().includes(term);
                    const matchDescripcion = material.descripcion && material.descripcion.toLowerCase().includes(term);
                    const matchMateria = materia.toLowerCase().includes(term);
                    const matchNivel = nivel.toLowerCase().includes(term);
                    
                    if (matchTitle || matchAutor || matchDescripcion || matchMateria || matchNivel) {
                        results.push({
                            ...material,
                            nivel: nivel,
                            grado: grado,
                            materia: materia
                        });
                    }
                });
            }
        }
    }
    
    return results;
}

function renderGlobalSearchResults(results) {
    const container = document.getElementById('searchResultsGrid');
    if (!container) return;
    
    container.innerHTML = results.map(material => {
        const nivelCapitalized = material.nivel.charAt(0).toUpperCase() + material.nivel.slice(1);
        const subjectInfo = getSubjectInfo(material.materia);
        
        return `
            <div class="material-card" data-id="${material.id}">
                <div class="material-header">
                    <h3>${material.titulo}</h3>
                    <span class="material-type">${formatMaterialType(material.tipo)}</span>
                </div>
                <div class="material-body">
                    <div class="material-breadcrumb">
                        <span class="material-badge" style="background-color: ${subjectInfo.color}20; color: ${subjectInfo.color};">
                            ${subjectInfo.icon} ${material.materia}
                        </span>
                        <span class="material-badge" style="background-color: var(--primary-color)20; color: var(--primary-color);">
                            ${nivelCapitalized} - ${material.grado}°
                        </span>
                    </div>
                    <p class="material-description">${material.descripcion}</p>
                    <div class="material-info">
                        <span><strong>Autor:</strong> ${material.autor}</span>
                        <span><strong>Formato:</strong> ${material.formato}</span>
                        <span><strong>Tamaño:</strong> ${material.tamaño}</span>
                    </div>
                </div>
                <div class="material-footer">
                    <button class="btn btn-secondary btn-sm" onclick="navigateToMaterial('${material.nivel}', '${material.grado}', '${material.materia}')">
                        Ver materia
                    </button>
                    <button class="btn btn-download" onclick="downloadMaterial('${material.url}', '${material.titulo}')">
                        <span>⬇</span> Descargar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function navigateToMaterial(nivel, grado, materia) {
    const materiaEncoded = encodeURIComponent(materia);
    window.location.href = `pages/materia.html?nivel=${nivel}&grado=${grado}&materia=${materiaEncoded}`;
}