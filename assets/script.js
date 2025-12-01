window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('theme-loaded');
});
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => {item.classList.remove('active');});
    if (!isActive) {faqItem.classList.add('active');}
}
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const body = document.body;
function toggleMobileMenu() {
    const isOpen = navMenu.classList.contains('nav-open');
    if (isOpen) {
        navMenu.classList.remove('nav-open');
        hamburgerBtn.classList.remove('hamburger-open');
        body.classList.remove('nav-open');
    } else {
        navMenu.classList.add('nav-open');
        hamburgerBtn.classList.add('hamburger-open');
        body.classList.add('nav-open');
    }
}
hamburgerBtn.addEventListener('click', toggleMobileMenu);
navOverlay.addEventListener('click', toggleMobileMenu);
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            toggleMobileMenu();
        }
    });
});
function initScrollAnimations() {
    const observerOptions = {threshold: 0.1,rootMargin: '0px 0px -10% 0px'};
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                const animateItems = entry.target.querySelectorAll('.animate-item');
                animateItems.forEach((item, index) => {
                    setTimeout(() => {item.classList.add('animate-visible');}, index * 100);
                });
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach(section => {observer.observe(section);});
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {console.warn('Invalid selector for smooth scrolling:', href);}
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {initScrollAnimations();});
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        navMenu.classList.remove('nav-open');
        hamburgerBtn.classList.remove('hamburger-open');
        body.classList.remove('nav-open');
    }
});
let ticking = false;
function updateOnScroll() {ticking = false;}
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});
(function() {
    emailjs.init("xLk9hvLQW6-8Q849j");
})();
const openModalBtns = document.querySelectorAll('[data-open-modal]');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');
let scrollPosition = 0;
openModalBtns.forEach(btn => { 
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        modalOverlay.classList.add('active');
    });
});
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
}
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});
function closeModalAndReset() {
    contactForm.reset();
    contactForm.style.display = 'block';
    document.getElementById('modalMessage').classList.remove('active');
    closeModal();
}
function showFormAgain() {
    contactForm.style.display = 'block';
    document.getElementById('modalMessage').classList.remove('active');
}
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.classList.add('active');
    modalMessage.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="message-title">Надсилання...</div>
        <div class="message-text">Будь ласка, зачекайте</div>
    `;
    const templateParams = {
        from_name: document.getElementById('name').value,
        reply_to: document.getElementById('email').value,
        subject: document.getElementById('subject1').value,
        category: document.getElementById('subject2').selectedOptions[0].text,
        message: document.getElementById('message').value
    };
    emailjs.send('service_gx2uvoa', 'template_ilp15z5', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            modalMessage.innerHTML = `
                <div class="success-icon"></div>
                <div class="message-title">Успішно надіслано!</div>
                <div class="message-text">Дякуємо за ваше звернення. Ми зв'яжемося з вами найближчим часом.</div>
                <button class="message-btn" onclick="closeModalAndReset()">Закрити</button>
            `;
        }, function(error) {
            console.error('FAILED...', error);
            modalMessage.innerHTML = `
                <div class="error-icon"></div>
                <div class="message-title">Помилка відправки</div>
                <div class="message-text">Щось пішло не так. Спробуйте ще раз або напишіть нам на email: smushakbohdan@gmail.com</div>
                <button class="message-btn" onclick="showFormAgain()">Спробувати знову</button>
            `;
        });
});
const contactFormSection = document.getElementById('contactFormSection');
const contactIntro = document.querySelector('.contact-intro');
let originalIntroHTML = ''; 
if (contactFormSection && contactIntro) {
    originalIntroHTML = contactIntro.innerHTML;
    contactFormSection.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sectionName').value;
        const email = document.getElementById('sectionEmail').value;
        const figma = document.getElementById('sectionFigma').value;
        contactIntro.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="message-title">Надсилання...</div>
            <div class="message-text">Будь ласка, зачекайте</div>
        `;
        contactIntro.style.textAlign = 'center';
        const templateParams = {
            from_name: name,
            reply_to: email,
            figma_link: figma || 'Не вказано',
            message: `Запит від ${name}. Email: ${email}. Figma: ${figma || 'Не вказано'}`
        };
        emailjs.send('service_gx2uvoa', 'template_ifwogad', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                contactIntro.innerHTML = `
                    <div class="success-icon">✓</div>
                    <div class="message-title">Успішно надіслано!</div>
                    <div class="message-text">Дякуємо за ваш запит, ${name}! Ми зв'яжемося з вами найближчим часом.</div>
                `;
                contactIntro.style.textAlign = 'center';
                contactFormSection.reset();
                setTimeout(() => {
                    contactIntro.innerHTML = originalIntroHTML;
                    contactIntro.style.textAlign = ''; 
                }, 5000);
            }, function(error) {
                console.error('FAILED...', error);
                contactIntro.innerHTML = `
                    <div class="error-icon">✕</div>
                    <div class="message-title">Помилка відправки</div>
                    <div class="message-text">Щось пішло не так. Спробуйте ще раз або напишіть нам на email: smushakbohdan@gmail.com</div>
                `;
                contactIntro.style.textAlign = 'center';
                setTimeout(() => {
                    contactIntro.innerHTML = originalIntroHTML;
                    contactIntro.style.textAlign = ''; 
                }, 7000);
            });
    });
}
    window.closeModalAndReset = function() {
      contactForm.reset();
      contactForm.style.display = 'block';
      document.getElementById('modalMessage').classList.remove('active');
      closeModal();
    };
    window.showFormAgain = function() {
      contactForm.style.display = 'block';
      document.getElementById('modalMessage').classList.remove('active');
    };
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const modalData = {
      landing: {
        title: 'Landing Page',
        price: '$299',
        badge: 'Per Design',
        featured: false,
        details: [
          {
            icon: '📋',
            title: 'Склад пакету:',
            type: 'list',
            items: [
              'Розробка односторінкового сайту',
              'До 5 секцій на сторінці',
              'Адаптивний дизайн (mobile, tablet, desktop)',
              'Базова SEO-оптимізація',
              'Підключення форми зворотного зв\'язку',
              'Інтеграція з Google Analytics'
            ]
          },
          {
            icon: '⏱️',
            title: 'Терміни виконання:',
            type: 'text',
            content: '<strong>5-7 робочих днів</strong> від затвердження дизайну'
          },
          {
            icon: '🎁',
            title: 'Бонуси:',
            type: 'list',
            items: [
              '1 місяць технічної підтримки',
              'Інструкція з адмініструванням',
              'Безкоштовні правки (до 3 ітерацій)'
            ]
          },
          {
            icon: '💼',
            title: 'Ідеально підходить для:',
            type: 'text',
            content: 'Стартапів, промо-сторінок, портфоліо, презентації продукту'
          }
        ]
      },
      website: {
        title: 'Website Page',
        price: '$399',
        badge: 'Multi Design',
        featured: true,
        details: [
          {
            icon: '📋',
            title: 'Склад пакету:',
            type: 'list',
            items: [
              'Багатосторінковий сайт (до 5 сторінок)',
              'Необмежена кількість секцій',
              'Повна адаптивність під всі пристрої',
              'Розширена SEO-оптимізація',
              'Інтеграція з CMS (за потребою)',
              'Форми зворотного зв\'язку з EmailJS',
              'Інтеграція з соцмережами',
              'Google Analytics + Facebook Pixel'
            ]
          },
          {
            icon: '⏱️',
            title: 'Терміни виконання:',
            type: 'text',
            content: '<strong>10-14 робочих днів</strong> від затвердження дизайну'
          },
          {
            icon: '🎁',
            title: 'Бонуси:',
            type: 'list',
            items: [
              '3 місяці технічної підтримки',
              'Повна документація проекту',
              'Безкоштовні правки (до 5 ітерацій)',
              'Навчання роботі з сайтом (1 година)',
              'Favicon та Open Graph налаштування'
            ]
          },
          {
            icon: '💼',
            title: 'Ідеально підходить для:',
            type: 'text',
            content: 'Малого бізнесу, корпоративних сайтів, інтернет-магазинів (до 50 товарів), блогів'
          }
        ]
      }
    };
    function openModalprice(planType) {
      const data = modalData[planType];
      if (!data) return;
      const modalContent = document.getElementById('modalContent');
      const modalHeader = document.getElementById('modalHeader');
      const modalBody = document.getElementById('modalBody');
      const modalOverlayprice = document.getElementById('modalOverlayprice');
      const modalContainer = document.getElementById('modalContainer');
      if (data.featured) {
        modalContent.classList.add('featured');
      } else {
        modalContent.classList.remove('featured');
      }
      modalHeader.innerHTML = `
        <div class="pricing-price">${data.price}</div>
        <span class="pricing-badge">${data.badge}</span>
        <h2>${data.title}</h2>
      `;
      let bodyHTML = '';
      data.details.forEach(block => {
        if (block.type === 'list') {
          bodyHTML += `
            <div class="detail-block">
              <h4>${block.icon} ${block.title}</h4>
              <ul>
                ${block.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `;
        } else if (block.type === 'text') {
          bodyHTML += `
            <div class="detail-block">
              <h4>${block.icon} ${block.title}</h4>
              <p>${block.content}</p>
            </div>
          `;
        }
      });
      modalBody.innerHTML = bodyHTML;
      modalOverlayprice.classList.add('active');
      modalContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeModalprice() {
      const modalOverlayprice = document.getElementById('modalOverlayprice');
      const modalContainer = document.getElementById('modalContainer');
      modalOverlayprice.classList.remove('active');
      modalContainer.classList.remove('active');
      document.body.style.overflow = '';
    }
closeModalBtn.addEventListener('click', closeModalprice);
    function closeModalOnOverlay(event) {
      if (event.target === event.currentTarget) {
        closeModalprice();
      }
    }
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeModalprice();
      }
    });
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}
const initialTheme = getInitialTheme();
htmlElement.setAttribute('data-theme', initialTheme);
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
themeToggle.addEventListener('click', toggleTheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
    }
});