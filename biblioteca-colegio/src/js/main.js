
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.id = 'globalLoading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('globalLoading');
    if (loading) {
        loading.remove();
    }
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '250px';
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// Console log con estilo
console.log('%c Biblioteca Virtual MINEDU ', 'background: #1e40af; color: white; font-size: 16px; padding: 10px;');
console.log('%c Sistema cargado correctamente ', 'background: #10b981; color: white; font-size: 12px; padding: 5px;');