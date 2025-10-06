/**
 * Основной JavaScript файл
 * Практика 1-12 - Добавление интерактивности
 */

// Функция для инициализации сайта
function initSite() {
    console.log('Сайт инициализирован!');
    
    setActiveNavLink();
    initModal();
    addSmoothScrolling();
    initProductInteractions();
    addFormValidation();
}

// Установка активной ссылки в навигации
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('nav__link--active');
        } else {
            link.classList.remove('nav__link--active');
        }
    });
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('contactModal');
    const openButton = document.querySelector('.contact-button');
    const closeButton = document.querySelector('.btn--secondary');
    const form = document.getElementById('feedbackForm');
    
    if (openButton && modal) {
        openButton.addEventListener('click', () => {
            modal.showModal();
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.close();
        });
    }
    
    // Закрытие модального окна по клику на фон
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }
    
    // Обработка отправки формы
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Обработчик отправки формы
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };
    
    // Валидация формы
    if (validateForm(data)) {
        // В реальном приложении здесь был бы AJAX-запрос
        console.log('Данные формы:', data);
        
        // Показываем уведомление об успешной отправке
        showNotification('Спасибо! Ваше обращение отправлено.', 'success');
        
        // Закрываем модальное окно и очищаем форму
        const modal = document.getElementById('contactModal');
        if (modal) modal.close();
        event.target.reset();
    }
}

// Валидация формы
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Имя должно содержать минимум 2 символа');
    }
    
    if (!data.phone || !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(data.phone)) {
        errors.push('Введите корректный номер телефона');
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Введите корректный email');
    }
    
    if (!data.category) {
        errors.push('Выберите категорию обращения');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Сообщение должно содержать минимум 10 символов');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Показ уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            ${message}
        </div>
        <button class="notification__close">&times;</button>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
    `;
    
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    document.body.appendChild(notification);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Плавная прокрутка
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Взаимодействия с товарами
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('.product-card__name').textContent;
            const productPrice = this.querySelector('.product-card__price').textContent;
            
            showNotification(`Товар "${productName}" - ${productPrice} добавлен в корзину!`, 'success');
        });
        
        // Добавляем эффект при наведении
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Добавление CSS для анимаций
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
    `;
    document.head.appendChild(style);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    addDynamicStyles();
    initSite();
});

// Обработчики ошибок
window.addEventListener('error', function(event) {
    console.error('Произошла ошибка:', event.error);
});

// Экспорт функций для глобального использования
window.App = {
    initSite,
    showNotification,
    validateForm
};