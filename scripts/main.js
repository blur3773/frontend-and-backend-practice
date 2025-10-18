document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен с Bootstrap!');
    
    // Добавляем интерактивность для карточек товаров
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const addButton = card.querySelector('.btn');
        
        if (addButton) {
            addButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = card.querySelector('.card-title').textContent;
                const productPrice = card.querySelector('.text-danger').textContent;
                
                // Визуальная обратная связь
                const originalText = this.textContent;
                this.textContent = 'Добавлено!';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                }, 2000);
                
                console.log(`Товар "${productName}" - ${productPrice} добавлен в корзину`);
            });
        }
        
        // Анимация при наведении
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Инициализация tooltips Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});