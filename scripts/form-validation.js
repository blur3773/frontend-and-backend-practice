document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        });
    }
});