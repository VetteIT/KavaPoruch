import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
});

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

// const setCheckBox = function() {
//     const startSendBtn = document.querySelector('.start_send');
//     const checkBox = document.querySelector('#check-1');
//     const spanCheckBox = document.querySelector('.validate__checkbox');

//     startSendBtn.onclick = () => {
//         if(checkBox.checked == false) {
//             spanCheckBox.style.display = 'block';
//         }else if(checkBox.checked == true) {
//             spanCheckBox.style.display = 'none';
//         }
//     }
// }

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
document.querySelector('.carousel-close').addEventListener('click', function() {
    document.querySelector('.carousel-modal').classList.remove('active');
});
function closeModal() {
    var modal = document.querySelector('.carousel-modal.active');
    if(modal) {
      modal.classList.remove('active');
    }
  }

  let greetingMessageShown = false;

  document.getElementById('chat-now-button').addEventListener('click', function() {
      var chatApp = document.querySelector('.app');
      chatApp.classList.toggle('active');
  
      // Display the greeting message only if it has not been shown before
      if (chatApp.classList.contains('active') && !greetingMessageShown) {
          displayGreetingMessage();
          greetingMessageShown = true; // Set the flag to true after showing the message
      }
  });


  function displayGreetingMessage() {
    const greetingMessage = "Привіт, я AI асистент, напиши мені";
    renderMessage("other", { text: greetingMessage });
}

const fetchAIResponse = async (content) => {
    const params = {
        model: 'gpt-3.5-turbo-0613',
        messages: [{ role: 'user', content }],
        stream: true,
    };
    const stream = await openai.chat.completions.create(params);
    let response = '';
    for await (const chunk of stream) {
        if (chunk.choices && chunk.choices[0]?.delta?.content) {
            response += chunk.choices[0].delta.content;
        }
    }
    console.log(response);
    return response;
};



function renderMessage(type, message) {
    const app = document.querySelector(".app");
    let messageContainer = app.querySelector(".chat-screen .messages");
    let el = document.createElement("div");
    el.setAttribute("class", `message ${type}-message`);

    let nameEl = document.createElement("div");
    nameEl.className = "name";
    nameEl.innerText = type === "my" ? "You" : "AI";

    let textEl = document.createElement("div");
    textEl.className = "text";

    el.appendChild(nameEl);
    el.appendChild(textEl);
    messageContainer.appendChild(el);

    if (type === "other") {
        textEl.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>'; // Improved loading animation
        setTimeout(() => {
            textEl.innerHTML = ""; // Clear loading animation
            typeWriter(textEl, message.text);
        }, 1500); // Slightly longer wait before typing starts
    } else {
        textEl.innerText = message.text;
    }

    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
}

function typeWriter(element, text, i = 0, typingSpeed = 50) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i, typingSpeed), typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const app = document.querySelector(".app");
    const messageInput = app.querySelector(".chat-screen #message-input");
    const sendMessage = async () => {
        let message = messageInput.value.trim();
        if (message) {
            renderMessage("my", { text: message });
            const aiResponse = await fetchAIResponse(message);
            renderMessage("other", { text: aiResponse });
            messageInput.value = "";
        }
    };

    app.querySelector("#send-message").addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });
});

document.addEventListener('click', function(event) {
    var chatApp = document.querySelector('.app');
    var chatButton = document.getElementById('chat-now-button');

    // Check if the click is outside the chat app and not on the chat-now-button
    if (!chatApp.contains(event.target) && event.target !== chatButton) {
        chatApp.classList.remove('active');
    }
});
showMediaButtons();
burgerMenu();
setAccordion();