// Load tours from localStorage
function loadTours() {
    return JSON.parse(localStorage.getItem('tours')) || [];
}

// Render tours in the grid
function renderTours() {
    const tours = loadTours();
    const tourGrid = document.querySelector('.tour-grid');
    
    tourGrid.innerHTML = tours.map(tour => `
        <div class="tour-card">
            <img src="${tour.image}" alt="${tour.name}">
            <h3>${tour.name}</h3>
            <p class="price">Starting from $${tour.price}</p>
            <p class="description">${tour.description}</p>
            <button onclick="openBooking('${tour.name}', ${tour.price})">Book Now</button>
        </div>
    `).join('');
}

// Modal functionality
const modal = document.getElementById('booking-modal');
const closeBtn = document.getElementsByClassName('close')[0];
const bookingForm = document.getElementById('booking-form');

function openBooking(tourName, price) {
    modal.style.display = 'block';
    document.getElementById('tour-name').value = tourName;
    document.getElementById('tour-price').value = price;
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Form submission
bookingForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        tourName: document.getElementById('tour-name').value,
        price: document.getElementById('tour-price').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        guests: document.getElementById('guests').value
    };

    // Send booking to Telegram
    await sendToTelegram(formData);
    
    // Clear form and close modal
    bookingForm.reset();
    modal.style.display = 'none';
    
    alert('Thank you for your booking! We will contact you shortly.');
});

// Initialize tours on page load
document.addEventListener('DOMContentLoaded', renderTours);