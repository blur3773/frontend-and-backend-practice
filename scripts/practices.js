document.addEventListener('DOMContentLoaded', function() {
    const practiceCards = document.querySelectorAll('.practice-card');
    
    practiceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Обработка клика по кнопке "Посмотреть работу"
        const viewButton = this.querySelector('.btn');
        if (viewButton && !viewButton.disabled) {
            viewButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const practiceTitle = card.querySelector('.card-title').textContent;
                alert(`Открывается работа: ${practiceTitle}`);
            });
        }
    });
    
    // Анимация прогресс-баров при скролле
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 100);
        });
    };
    setTimeout(animateProgressBars, 500);
    
    console.log('Страница практических работ загружена!');
});