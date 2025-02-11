// Tour management using localStorage
const tours = JSON.parse(localStorage.getItem('tours')) || [
    {
        id: 1,
        name: 'Beach Paradise',
        price: 599,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        description: 'Enjoy pristine beaches and crystal-clear waters.'
    },
    {
        id: 2,
        name: 'Mountain Adventure',
        price: 799,
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
        description: 'Experience thrilling mountain adventures.'
    },
    {
        id: 3,
        name: 'City Explorer',
        price: 499,
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
        description: 'Discover urban culture and architecture.'
    }
];

// Initialize tours in localStorage if not exists
if (!localStorage.getItem('tours')) {
    localStorage.setItem('tours', JSON.stringify(tours));
}

function renderTours() {
    const tourList = document.getElementById('tourList');
    const tours = JSON.parse(localStorage.getItem('tours'));
    
    tourList.innerHTML = tours.map(tour => `
        <div class="tour-item">
            <img src="${tour.image}" alt="${tour.name}" class="admin-tour-image">
            <div class="tour-details">
                <h3>${tour.name}</h3>
                <p>Price: $${tour.price}</p>
                <p>${tour.description}</p>
                <div class="tour-actions">
                    <button onclick="editTour(${tour.id})">Edit</button>
                    <button onclick="deleteTour(${tour.id})" class="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addTour(event) {
    event.preventDefault();
    const tours = JSON.parse(localStorage.getItem('tours'));
    const newTour = {
        id: Date.now(),
        name: document.getElementById('tourName').value,
        price: parseInt(document.getElementById('tourPrice').value),
        image: document.getElementById('tourImage').value,
        description: document.getElementById('tourDescription').value
    };
    
    tours.push(newTour);
    localStorage.setItem('tours', JSON.stringify(tours));
    renderTours();
    document.getElementById('addTourForm').reset();
}

function editTour(id) {
    const tours = JSON.parse(localStorage.getItem('tours'));
    const tour = tours.find(t => t.id === id);
    
    document.getElementById('tourName').value = tour.name;
    document.getElementById('tourPrice').value = tour.price;
    document.getElementById('tourImage').value = tour.image;
    document.getElementById('tourDescription').value = tour.description;
    
    const addForm = document.getElementById('addTourForm');
    addForm.onsubmit = (e) => {
        e.preventDefault();
        tour.name = document.getElementById('tourName').value;
        tour.price = parseInt(document.getElementById('tourPrice').value);
        tour.image = document.getElementById('tourImage').value;
        tour.description = document.getElementById('tourDescription').value;
        
        localStorage.setItem('tours', JSON.stringify(tours));
        renderTours();
        addForm.reset();
        addForm.onsubmit = addTour;
    };
}

function deleteTour(id) {
    if (confirm('Are you sure you want to delete this tour?')) {
        const tours = JSON.parse(localStorage.getItem('tours'));
        const filteredTours = tours.filter(t => t.id !== id);
        localStorage.setItem('tours', JSON.stringify(filteredTours));
        renderTours();
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    renderTours();
    document.getElementById('addTourForm').addEventListener('submit', addTour);
});