/**
 * Возвращает дату в формате "17 июля 2025" с возможностью вычесть указанное количество дней
 * @param {number} antiquity - Количество дней для вычитания из текущей даты (по умолчанию 0)
 * @returns {string} Отформатированная дата
 */
function getFormattedDate(antiquity = 0) {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    // Получаем текущую дату и вычитаем нужное количество дней
    const date = new Date();
    date.setDate(date.getDate() - antiquity);
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

/**
 * Обновляет все элементы с классом full-updated-date, подставляя отформатированную дату
 */
function updateDateElements() {
    const dateElements = document.querySelectorAll('.full-updated-date');
    dateElements.forEach(element => {
        const antiquity = parseInt(element.textContent) || 0;
        element.textContent = getFormattedDate(antiquity);
    });
}

// DOM Content Loaded
// Initialize policy popups
function initPolicyPopups() {
    // Get all policy links
    const privacyLink = document.querySelector('a[href="politika-konfidentsialnosti.html"]');
    const termsLink = document.querySelector('a[href="usloviya-ispolzovaniya.html"]');
    const cookiesLink = document.querySelector('a[href="cookies.html"]');
    
    // Get all popups and close buttons
    const popups = document.querySelectorAll('.policy-popup');
    const closeButtons = document.querySelectorAll('.close-policy');
    
    // Prevent default link behavior and show corresponding popup
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('privacy-policy-popup').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('terms-policy-popup').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (cookiesLink) {
        cookiesLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('cookies-policy-popup').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close popup when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.policy-popup');
            if (popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close popup when clicking outside content
    popups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            popups.forEach(popup => {
                if (popup.classList.contains('active')) {
                    popup.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initDateTime();
    initMobileMenu();
    initSearch();
    initNewsletterForm();
    initScrollEffects();
    initBreakingNews();
    initLazyLoading();
    initMobileOptimizations();
    initTouchGestures();
    initSubscribeButton();
    initPolicyPopups();
    
    // Update all date elements
    updateDateElements();
});

// Subscribe button functionality
function initSubscribeButton() {
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('input[type="email"]');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            emailInput.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            // Small timeout to ensure scrolling is complete before focusing
            setTimeout(() => {
                emailInput.focus();
            }, 500);
        });
    }
}

// Date and Time Display
function initDateTime() {
    const dateElement = document.getElementById('current-date');
    
    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        dateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }
    
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuBtn && mainNav) {
        // Toggle menu on button click
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            
            // Change icon
            const icon = menuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = 'auto';
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

articles_list_json = `
[
  {
    "url": "articles/alex-lesly-zaderjanie.html",
    "title": "Алекс Лесли задержан",
    "description": "Александр Кириллов (Алекс Лесли) стал фигурантом уголовного дела, возбужденного Следственным комитетом по Москве. Его подозревают в склонении к изнасилованию.",
    "date": "17 июля 2025",
    "tags": ["общество", "пикап", "криминал", "Алекс Лесли"]
  },

  {
    "url": "articles/budushchee-energetiki-perehod-k-vozobnovlyaemym-istochnikam.html",
    "title": "Будущее энергетики: переход к возобновляемым источникам",
    "description": "Анализ перспектив перехода на возобновляемые источники энергии и их влияние на экономику и экологию.",
    "date": "17 июля 2025",
    "tags": ["энергетика", "экология", "технологии"]
  },
  {
    "url": "articles/eksklyuzivnoe-intervyu-s-laureatom-nobelevskoy-premii.html",
    "title": "Эксклюзивное интервью с лауреатом Нобелевской премии",
    "description": "Беседа с выдающимся ученым о его открытиях и их значении для современной науки.",
    "date": "16 июля 2025",
    "tags": ["наука", "интервью", "нобелевская премия"]
  },
  {
    "url": "articles/inflyaciya-i-ee-vliyanie-na-povsednevnuyu-zhizn-grazhdan.html",
    "title": "Инфляция и ее влияние на повседневную жизнь граждан",
    "description": "Подробный разбор экономической ситуации и прогнозы на ближайшее будущее.",
    "date": "17 июля 2025",
    "tags": ["экономика", "инфляция", "финансы"]
  },
  {
    "url": "articles/iskusstvennyy-intellekt-vozmozhnosti-i-riski.html",
    "title": "Искусственный интеллект: возможности и риски",
    "description": "Взгляд эксперта на развитие ИИ и его влияние на различные сферы жизни.",
    "date": "17 июля 2025",
    "tags": ["искусственный интеллект", "технологии", "будущее"]
  },
  {
    "url": "articles/kak-izmenilas-zhizn-posle-pandemii.html",
    "title": "Как изменилась жизнь людей после пандемии: большое исследование",
    "description": "Подробный анализ социальных и экономических последствий пандемии на основе опроса тысяч респондентов.",
    "date": "16 июля 2025",
    "tags": ["пандемия", "исследование", "общество"]
  },
  {
    "url": "articles/krupneyshaya-it-kompaniya-obyavila-o-novyh-investiciyah.html",
    "title": "Крупнейшая IT-компания объявила о новых инвестициях в искусственный интеллект",
    "description": "Ведущая технологическая компания объявила о масштабных инвестициях в развитие искусственного интеллекта и машинного обучения.",
    "date": "15 июля 2025",
    "tags": ["технологии", "искусственный интеллект", "инвестиции"]
  },
  {
    "url": "articles/novyy-film-rossiyskogo-rezhissera-poluchil-priznanie.html",
    "title": "Новый фильм российского режиссера получил признание на международном кинофестивале",
    "description": "Кинолента удостоилась специального приза жюри и восторженных отзывов критиков.",
    "date": "16 июля 2025",
    "tags": ["кино", "культура", "фестиваль"]
  },
  {
    "url": "articles/pochemu-novye-reformy-mogut-izmenit-politicheskiy-landshaft.html",
    "title": "Почему новые реформы могут изменить политический ландшафт",
    "description": "Анализ последних политических изменений и их влияние на будущее страны.",
    "date": "16 июля 2025",
    "tags": ["политика", "реформы", "аналитика"]
  },
  {
    "url": "articles/sbornaya-strany-gotovitsya-k-chempionatu-mira.html",
    "title": "Сборная страны готовится к чемпионату мира по футболу",
    "description": "Тренерский штаб объявил расширенный состав на предстоящий турнир.",
    "date": "15 июля 2025",
    "tags": ["футбол", "спорт", "чемпионат мира"]
  },
  {
    "url": "articles/uchenye-otkryli-novyy-metod-lecheniya-raka.html",
    "title": "Ученые открыли новый метод лечения рака",
    "description": "Исследователи представили революционный подход к терапии онкологических заболеваний.",
    "date": "14 июля 2025",
    "tags": ["медицина", "рак", "исследование"]
  }
]

`

// Article data cache
let articleCache = [];
let isCacheLoaded = false;

// Load articles data
async function loadArticles() {
    if (isCacheLoaded) return articleCache;
    
    // try {
    //     const response = articles_list_json; //await fetch('../../pages/articles-list.json');
    //     if (!response.ok) throw new Error('Failed to load articles');
    //     articleCache = await response.json();
    //     isCacheLoaded = true;
    //     return articleCache;
    // } catch (error) {
    //     console.error('Error loading articles:', error);
    //     return [];
    // }
    articleCache = JSON.parse(articles_list_json);
    isCacheLoaded = true;
    return articleCache;
}

// Search articles
async function searchArticles(query) {
    const articles = await loadArticles();
    if (!query.trim()) return [];
    
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
    if (queryTerms.length === 0) return [];
    
    return articles.filter(article => {
        const text = `${article.title} ${article.description} ${article.tags?.join(' ') || ''}`.toLowerCase();
        return queryTerms.every(term => text.includes(term));
    }).sort((a, b) => {
        // Simple relevance scoring
        const aScore = queryTerms.reduce((score, term) => 
            score + (a.title.toLowerCase().includes(term) ? 2 : 0) + 
                   (a.description.toLowerCase().includes(term) ? 1 : 0), 0);
        const bScore = queryTerms.reduce((score, term) => 
            score + (b.title.toLowerCase().includes(term) ? 2 : 0) + 
                   (b.description.toLowerCase().includes(term) ? 1 : 0), 0);
        return bScore - aScore;
    });
}

function trimToLastChar(str, char) {
    const lastIndex = str.lastIndexOf(char);
    if (lastIndex === -1) {
        return str;
    }
    return str.slice(0, lastIndex);
}

// const str = "example.com/path/to/file";
// const char = "/";
// const result = trimToLastChar(str, char);
// console.log(result); // "example.com/path/to"


// Render search results
function renderResults(results, container) {
    if (!results || results.length === 0) {
        container.innerHTML = '<p class="no-results">По вашему запросу ничего не найдено</p>';
        return;
    }
    
    // Helper function to ensure the URL is absolute from the site root
    const getAbsoluteUrl = (url) => {
        // If the URL is already absolute or starts with http, return as is
        if (url.startsWith('http') || url.startsWith('//') || url.startsWith('www')) {
            return url;
        }
        start_url = trimToLastChar(document.URL, "/")
        start_url = trimToLastChar(start_url, "/articles")
        // If the URL starts with ./, remove the leading .
        if (url.startsWith('./')) {
            return start_url + url.substring(1);
        }
        // If the URL doesn't start with /, add it
        if (!url.startsWith('/')) {
            return start_url + '/' + url;
        }
        return start_url + url;
    };
    
    const resultsHtml = results.map(article => {
        const articleUrl = getAbsoluteUrl(article.url);
        return `
            <a href="${articleUrl}" class="search-result-item">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <div class="search-meta">
                    <span class="search-date">${article.date}</span>
                    ${article.tags && article.tags.length > 0 ? 
                        `<div class="search-tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>` : ''
                    }
                </div>
            </a>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="search-results-list">
            ${resultsHtml}
        </div>
    `;
}

// Search Functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', async function() {
            // Preload articles
            await loadArticles();
            
            // Create search overlay
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'search-overlay';
            searchOverlay.innerHTML = `
                <div class="search-container">
                    <div class="search-header">
                        <h2>Поиск новостей</h2>
                        <button class="close-search" aria-label="Закрыть поиск"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="search-form">
                        <input type="text" placeholder="Введите ключевые слова..." class="search-input" autocomplete="off">
                        <button class="search-submit" aria-label="Искать"><i class="fas fa-search"></i></button>
                    </div>
                    <div class="search-results">
                        <p class="search-hint">Введите не менее 3 символов для поиска</p>
                    </div>
                    <div class="search-loading" style="display: none;">
                        <div class="spinner"></div>
                        <p>Идет поиск...</p>
                    </div>
                </div>
            `;
            
            // Add overlay to the DOM
            document.body.appendChild(searchOverlay);
            document.body.style.overflow = 'hidden';
            
            // Get DOM elements
            const searchInput = searchOverlay.querySelector('.search-input');
            const searchResults = searchOverlay.querySelector('.search-results');
            const searchForm = searchOverlay.querySelector('.search-form');
            const searchLoading = searchOverlay.querySelector('.search-loading');
            
            // Show overlay with animation
            setTimeout(() => {
                searchOverlay.style.opacity = '1';
                searchOverlay.style.visibility = 'visible';
                searchOverlay.querySelector('.search-container').style.transform = 'translateY(0)';
                searchInput.focus();
            }, 10);
            
            let searchTimeout;
            let isSearching = false;
            
            // Handle search input
            const handleSearch = async () => {
                const query = searchInput.value.trim();
                
                if (query.length < 3) {
                    searchResults.innerHTML = query.length > 0 
                        ? '<p class="search-hint">Введите не менее 3 символов</p>'
                        : '<p class="search-hint">Введите не менее 3 символов для поиска</p>';
                    return;
                }
                
                if (isSearching) return;
                isSearching = true;
                searchLoading.style.display = 'flex';
                searchResults.style.opacity = '0.5';
                
                try {
                    // Simulate network delay for better UX
                    await new Promise(resolve => setTimeout(resolve, 300));
                    const results = await searchArticles(query);
                    renderResults(results, searchResults);
                } catch (error) {
                    console.error('Search error:', error);
                    searchResults.innerHTML = '<p class="error">Произошла ошибка при поиске. Пожалуйста, попробуйте еще раз.</p>';
                } finally {
                    searchLoading.style.display = 'none';
                    searchResults.style.opacity = '1';
                    isSearching = false;
                }
            };
            
            // Close search overlay
            const closeSearch = () => {
                searchOverlay.style.opacity = '0';
                searchOverlay.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
                
                // Remove overlay after animation
                setTimeout(() => {
                    if (searchOverlay.parentNode) {
                        searchOverlay.parentNode.removeChild(searchOverlay);
                    }
                }, 300);
            };
            
            // Close on ESC key
            document.addEventListener('keydown', function onEscKey(e) {
                if (e.key === 'Escape') {
                    closeSearch();
                    document.removeEventListener('keydown', onEscKey);
                }
            });
            
            // Close on overlay click (outside content)
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    closeSearch();
                }
            });
            
            // Debounced search on input
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(handleSearch, 300);
            });
            
            // Search on form submit
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                clearTimeout(searchTimeout);
                handleSearch();
            });
            
            // Close search button
            const closeBtn = searchOverlay.querySelector('.close-search');
            closeBtn.addEventListener('click', closeSearch);
            
            // Handle form submission
            searchForm.addEventListener('submit', (e) => {
                document.body.removeChild(searchOverlay);
            });
            
            // Search functionality
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                const resultsContainer = searchOverlay.querySelector('.search-results');
                
                if (query.length > 2) {
                    // Simulate search results
                    resultsContainer.innerHTML = `
                        <div class="search-result">
                            <h4>Найдено результатов для "${query}"</h4>
                            <div class="result-item">
                                <h5>Пример новости 1</h5>
                                <p>Краткое описание новости, содержащей ключевые слова...</p>
                                <span class="result-date">2 часа назад</span>
                            </div>
                            <div class="result-item">
                                <h5>Пример новости 2</h5>
                                <p>Еще одна новость с релевантным содержанием...</p>
                                <span class="result-date">5 часов назад</span>
                            </div>
                        </div>
                    `;
                } else if (query.length === 0) {
                    resultsContainer.innerHTML = '<p>Начните вводить для поиска...</p>';
                }
            });
            
            // Close on escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.querySelector('.search-overlay')) {
                    document.body.removeChild(searchOverlay);
                }
            });
        });
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter');
    
    if (newsletterForm) {
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = input.value.trim();
            
            if (validateEmail(email)) {
                // Simulate subscription
                button.textContent = 'Подписан!';
                button.style.backgroundColor = '#10b981';
                input.value = '';
                
                setTimeout(() => {
                    button.textContent = 'Подписаться';
                    button.style.backgroundColor = '#dc2626';
                }, 3000);
            } else {
                // Show error
                input.style.borderColor = '#dc2626';
                input.placeholder = 'Введите корректный email';
                
                setTimeout(() => {
                    input.style.borderColor = '#444';
                    input.placeholder = 'Ваш email';
                }, 3000);
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header-main');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header on scroll
        // if (scrollTop > lastScrollTop && scrollTop > 100) {
        //     header.style.transform = 'translateY(-100%)';
        // } else {
        //     header.style.transform = 'translateY(0)';
        // }
        
        lastScrollTop = scrollTop;
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.story-card, .feature-card, .opinion-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Breaking News Rotation
function initBreakingNews() {
    const breakingTexts = [
        'Правительство объявило о новых мерах поддержки экономики',
        'Международный саммит по климату принял важные решения',
        'Ученые открыли новый метод лечения рака',
        'Крупнейшая IT-компания объявила о новых инвестициях'
    ];
    
    const breakingTextElement = document.querySelector('.breaking-text span');
    let currentIndex = 0;
    
    if (breakingTextElement) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % breakingTexts.length;
            breakingTextElement.textContent = breakingTexts[currentIndex];
        }, 10000); // Change every 10 seconds
    }
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for interactive elements
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Simulate article loading
function loadArticle(articleId) {
    const article = document.querySelector(`[data-article-id="${articleId}"]`);
    
    if (article) {
        showLoading(article);
        
        // Simulate API call
        setTimeout(() => {
            hideLoading(article);
            // Update article content
        }, 1000);
    }
}

// Add CSS for search overlay and animations
const additionalStyles = `
    .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }
    
    .search-container {
        background: white;
        border-radius: 10px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .close-search {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }
    
    .search-form {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .search-input {
        flex: 1;
        padding: 12px;
        border: 2px solid #e5e5e5;
        border-radius: 5px;
        font-size: 16px;
    }
    
    .search-submit {
        background-color: #dc2626;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .result-item {
        padding: 15px 0;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .result-item h5 {
        color: #dc2626;
        margin-bottom: 5px;
    }
    
    .result-date {
        color: #666;
        font-size: 12px;
    }
    
    .animate {
        animation: slideInUp 0.6s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    /* Improved touch targets */
    .header-actions button {
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .main-nav ul li a {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    /* Smooth scrolling for mobile */
    html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
    }
    
    /* Prevent horizontal scroll */
    body {
        overflow-x: hidden;
    }
    
    /* Better focus states for accessibility */
    button:focus,
    input:focus,
    a:focus {
        outline: 2px solid #dc2626;
        outline-offset: 2px;
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Mobile Device Detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Mobile Optimizations
function initMobileOptimizations() {
    if (isMobileDevice()) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
        
        // Reduce animation complexity on mobile
        const animatedElements = document.querySelectorAll('.story-card, .feature-card, .opinion-card');
        animatedElements.forEach(element => {
            element.style.transition = 'transform 0.2s ease';
        });
        
        // Optimize scroll performance
        let ticking = false;
        function optimizedScroll() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    // Reduced scroll effects for mobile
                    const scrollTop = window.pageYOffset;
                    const header = document.querySelector('.header-main');
                    
                    // if (scrollTop > 100) {
                    //     header.style.transform = 'translateY(-100%)';
                    // } else {
                    //     header.style.transform = 'translateY(0)';
                    // }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }
}

// Touch Gestures
function initTouchGestures() {
    if (isMobileDevice()) {
        let startX = 0;
        let startY = 0;
        
        // Swipe to close mobile menu
        const mainNav = document.querySelector('.main-nav');
        if (mainNav) {
            mainNav.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });
            
            mainNav.addEventListener('touchend', function(e) {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = startX - endX;
                const diffY = startY - endY;
                
                // Swipe up to close menu
                if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
                    mainNav.classList.remove('active');
                    const menuBtn = document.querySelector('.menu-btn');
                    const icon = menuBtn.querySelector('i');
                    icon.className = 'fas fa-bars';
                    document.body.style.overflow = 'auto';
                }
            }, { passive: true });
        }
        
        // Pull to refresh simulation
        let startTouchY = 0;
        let pullDistance = 0;
        const pullThreshold = 100;
        
        document.addEventListener('touchstart', function(e) {
            if (window.scrollY === 0) {
                startTouchY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            if (window.scrollY === 0 && startTouchY) {
                pullDistance = e.touches[0].clientY - startTouchY;
                if (pullDistance > 0) {
                    // Visual feedback for pull to refresh
                    const header = document.querySelector('.header');
                    if (pullDistance > pullThreshold) {
                        header.style.transform = `translateY(${Math.min(pullDistance / 3, 30)}px)`;
                    }
                }
            }
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            if (pullDistance > pullThreshold) {
                // Simulate refresh
                const header = document.querySelector('.header');
                header.style.transform = 'translateY(0)';
                
                // Show refresh indicator
                showRefreshIndicator();
            }
            startTouchY = 0;
            pullDistance = 0;
        }, { passive: true });
    }
}

// Show refresh indicator
function showRefreshIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'refresh-indicator';
    indicator.innerHTML = '<i class="fas fa-sync-alt"></i> Обновление...';
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #dc2626;
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        z-index: 1001;
        font-size: 14px;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(indicator);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-100%); }
            to { transform: translateX(-50%) translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.removeChild(indicator);
        document.head.removeChild(style);
    }, 2000);
}

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Update viewport height on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
setViewportHeight();

// Prevent zoom on double tap for specific elements
if (isMobileDevice()) {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}
