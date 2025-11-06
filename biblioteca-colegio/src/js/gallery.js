document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryContents = document.querySelectorAll('.gallery-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = this.dataset.level;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            galleryContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`gallery-${level}`).classList.add('active');
        });
    });
    
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentImages = [];
    let currentIndex = 0;
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const galleryContent = this.closest('.gallery-content');
            const allItems = galleryContent.querySelectorAll('.gallery-item');
            
            currentImages = Array.from(allItems).map(item => ({
                src: item.dataset.img,
                title: item.querySelector('h4').textContent,
                description: item.querySelector('p').textContent
            }));
            
            currentIndex = Array.from(allItems).indexOf(this);
            showModalImage(currentIndex);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showModalImage(currentIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showModalImage(currentIndex);
    });
    
    function showModalImage(index) {
        const image = currentImages[index];
        modalImage.src = image.src;
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
    }
    
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});