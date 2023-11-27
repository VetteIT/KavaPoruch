const carousel = document.querySelector('.carousel__items');
const carouselItems = Array.from(carousel.children);
const carouselNum = document.querySelector('.carousel__num');
const prevSlide = document.querySelector('.prev_slide');
const nextSlide = document.querySelector('.next_slide');

let pos = 0, leftDis = 320, leftDis2 = 960;
let number = 1;

const moveSlide = function() {
    carouselItems[pos].style.transform = 'translateX(1280px)';
    // Переносим всі крім активного слайда(вище) вліво на 1 позицію
    for(let i = pos + 1; i < carouselItems.length; i++) {
        carouselItems[i].style.transform = `translateX(-${leftDis}px)`;
    }
    // Переносим всі слайди до активного на 1 позицію вліво
    if(pos > 1) {
        for(let i = 0; i < pos + 1; i++) {
            carouselItems[i].style.transform = `translateX(${leftDis2}px)`;
        }
        
        leftDis2 -= 320;
    }

    leftDis += 320;
    pos++;
}


nextSlide.addEventListener('click', () => {
    if(pos == 6) {
        pos = 0;
        leftDis = 320;
        leftDis2 = 960;
    }
    if(pos == 5) {
        number = 0;
    }

    moveSlide();
    
    number++;
    carouselNum.textContent = `0${number}/06`;
});

prevSlide.addEventListener('click', () => {
    if(pos == 6) {
        pos = 0;
        leftDis = 320;
        leftDis2 = 960;
    }
    if(pos == 5) {
        number = 0;
    }

    while(pos < 6) {
        moveSlide();
    }
    number = 1;
    carouselNum.textContent = `0${number}/06`;
});

const validate = function (evt){
    let charCode = (evt.which) ? evt.which : evt.keyCode
    if(charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

const showMediaButtons = function() {
    const mediaItems = document.querySelectorAll('.media__item');

    setTimeout(() => {
        for(let i = 0; i < mediaItems.length; i++) {
            mediaItems[i].style.transform = 'translateX(0px)';
        }
    }, 200);
}




const burgerMenu = function() {
    const burgerButton = document.querySelector('.burger__button');
    const headerBurger = document.querySelector('.header_burger');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    openIcon.addEventListener('click', () => {
        headerBurger.style.transform = 'translate(0px)';
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        burgerButton.style.position = 'fixed';
    });

    closeIcon.addEventListener('click', () => {
        headerBurger.style.transform = 'translateY(-100%)';
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        burgerButton.style.position = 'absolute';
    });
}

const repairPricesCalculator = function() {
    const reduceValue = document.querySelector('.lower__area');
    const increaseValue = document.querySelector('.higher__area');
    const areaBlock = document.querySelector('.area__block');
    const sumPrice = document.querySelector('.price__apr');
    const mainPrice = document.querySelector('.main__price');

    reduceValue.onclick = () => {
        if(areaBlock.textContent != 0) {
            areaBlock.textContent = parseInt(areaBlock.textContent) - 5;
            mainPrice.textContent = parseInt(mainPrice.textContent) - 1000;
            sumPrice.textContent = mainPrice.textContent - (20 * mainPrice.textContent / 100);
        }
    }

    increaseValue.onclick = () => {
        if(areaBlock.textContent != 1000) {
            areaBlock.textContent = parseInt(areaBlock.textContent) + 5;
            mainPrice.textContent = parseInt(mainPrice.textContent) + 1000;
            sumPrice.textContent = mainPrice.textContent - (20 * mainPrice.textContent / 100);
        }
    }

    const toRepairSection = Array.from(document.querySelectorAll('.price__link'));

    toRepairSection.forEach((item) => {
        item.onclick = () => {
            if(document.documentElement.scrollWidth >= 992) {
                document.body.scrollTop = 3000;
                document.documentElement.scrollTop = 3000;
            }else if(document.documentElement.scrollWidth >= 773 && document.documentElement.scrollWidth < 992){
                document.body.scrollTop = 5100;
                document.documentElement.scrollTop = 5100;
            }else if(document.documentElement.scrollWidth >= 576 && document.documentElement.scrollWidth < 773) {
                document.body.scrollTop = 7000;
                document.documentElement.scrollTop = 7000;
            }else if(document.documentElement.scrollWidth >= 0 && document.documentElement.scrollWidth < 576) {
                document.body.scrollTop = 7200;
                document.documentElement.scrollTop = 7200;
            }
        }
    });
}

const setCheckBox = function() {
    const startSendBtn = document.querySelector('.start_send');
    const checkBox = document.querySelector('#check-1');
    const spanCheckBox = document.querySelector('.validate__checkbox');

    startSendBtn.onclick = () => {
        if(checkBox.checked == false) {
            spanCheckBox.style.display = 'block';
        }else if(checkBox.checked == true) {
            spanCheckBox.style.display = 'none';
        }
    }
}

const setAccordion = function() {
    const accordionBlock = document.querySelector('.accordion__block');
    const accordion = Array.from(document.querySelectorAll('.accordion'));

    accordion.forEach((item) => {
        item.addEventListener('click', () => {
            if(item.nextElementSibling.style.overflow == 'visible') {
                item.nextElementSibling.style.overflow = 'hidden';
                item.nextElementSibling.style.padding = '0px';
            }else {
                for(let i = 0; i < accordion.length; i++) {
                    if(accordion[i].nextElementSibling.style.overflow == 'visible') {
                        accordion[i].nextElementSibling.style.overflow = 'hidden';
                        accordion[i].nextElementSibling.style.padding = '0px';
                    }
                }
                item.nextElementSibling.style.overflow = 'visible';
                let height = item.nextElementSibling.style.height;
                accordionBlock.style.height = height + 'px';
                item.nextElementSibling.style.padding = '5px';
            }
        });
    });
}

let t;
const up = function() {
	const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	if(top > 0) {
		window.scrollBy(0, -100);
		t = setTimeout('up()', 5);
	}else clearTimeout(t);
	return false;
}

const numberPhones = document.querySelectorAll('.phone__number');
for(let i = 0; i < numberPhones.length; i++) {
    numberPhones[i].addEventListener('click', () => {
        numberPhones[i].value = '+38';
    });
}

const repairButtons = Array.from(document.querySelectorAll('.repair__btn'));

repairButtons.forEach((button) => {
    button.addEventListener('click', () => {
        for(let i = 0; i < repairButtons.length; i++) {
            if(repairButtons[i].classList.contains('active__btn')) {
                repairButtons[i].classList.remove('active__btn');
            }
        }
        if(button.classList.contains('active__btn') == false) {
            button.classList.add('active__btn');
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll('.projects__button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            var modalId = this.getAttribute('data-modal-target');
            var modal = document.querySelector(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('carousel-modal')) {
            event.target.classList.remove('active');
        }
    });

    // Close modal when pressing the escape key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            var modals = document.querySelectorAll('.carousel-modal.active');
            modals.forEach(function(modal) {
                modal.classList.remove('active');
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var priceLinks = document.querySelectorAll('.price__link');
    var form = document.getElementById('consultation-form');
    var closeButton = document.querySelector('.modal-close');
    
    priceLinks.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            form.classList.add('active');
        });
    });

    closeButton.addEventListener('click', function() {
        form.classList.remove('active');
    });

    // Optional: Close the form when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === form) {
            form.classList.remove('active');
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const reviews = document.querySelectorAll('.review');
    let delay = 0.3;
    reviews.forEach(review => {
        review.style.opacity = 0;
        review.style.transform = "translateY(20px)";
        setTimeout(() => {
            review.style.opacity = 1;
            review.style.transform = "translateY(0)";
            review.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        }, delay * 1000);
        delay += 0.3;
    });
});
// Функція для додавання відгуку
function addReview(name, review, rating) {
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review');
    let starHtml = '';
    for (let i = 0; i < 5; i++) {
        starHtml += i < rating ? '<span class="star filled">&#9733;</span>' : '<span class="star">&#9734;</span>';
    }
    reviewContainer.innerHTML = `
        <h3 class="review-title">${name}</h3>
        <p class="review-text">${review}</p>
        <div class="star-rating">${starHtml}</div>
    `;

    document.querySelector('.reviews-container').appendChild(reviewContainer);
}


// Обробка відправлення форми
const reviewForm = document.querySelector('.review-form form');
reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const review = this.querySelector('textarea').value;
    const rating = parseInt(this.querySelector('input[name="rating"]').value); // Використовуємо збережений рейтинг

    addReview(name, review, rating);

    // Очистити форму після відправлення
    this.reset();
    this.querySelectorAll('.star-rating .star').forEach(star => star.innerHTML = '&#9734;'); // Reset stars
});

// Обробка кліків на зірочках
document.querySelectorAll('.star-rating .star').forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        const allStars = star.parentElement.querySelectorAll('.star');
        allStars.forEach(s => {
            s.innerHTML = s.dataset.rating <= rating ? '&#9733;' : '&#9734;';
        });
        // Зберігаємо вибраний рейтинг у формі
        star.closest('.review-form').querySelector('input[name="rating"]').value = rating;
    });
});
window.addEventListener('load', function() {
    var loader = document.querySelector('.loader');
    loader.style.opacity = 0;
    loader.style.display = 'none';

    // Optional: Add fade-out effect
     loader.style.transition = 'opacity 0.5s';
     setTimeout(() => { loader.style.display = 'none'; }, 500);
});

showMediaButtons();
showModalWindow();
burgerMenu();
repairPricesCalculator();
setCheckBox();
setAccordion();
