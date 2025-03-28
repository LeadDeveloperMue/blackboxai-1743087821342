// Theme toggle functionality
function setupThemeToggle() {
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(toggleBtn);

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  });
}

// Currency Converter
function setupCurrencyConverter() {
  const currencySelect = document.getElementById('currency-select');
  const conversionRate = document.getElementById('conversion-rate');
  const rates = {
    usd: { rate: 1, symbol: '$' },
    zwl: { rate: 322, symbol: 'Z$' },
    eur: { rate: 0.85, symbol: '€' }
  };

  if (currencySelect && conversionRate) {
    currencySelect.addEventListener('change', (e) => {
      const currency = e.target.value;
      const rate = rates[currency];
      conversionRate.textContent = `1 USD = ${rate.rate} ${currency.toUpperCase()}`;
      
      document.querySelectorAll('[data-price]').forEach(el => {
        const usdPrice = parseFloat(el.dataset.price);
        const convertedPrice = (usdPrice * rate.rate).toFixed(2);
        el.textContent = `${rate.symbol}${convertedPrice}`;
      });
    });
  }
}

// Language Toggle (English/Shona)
function setupLanguageToggle() {
  const languageToggle = document.getElementById('language-toggle');
  const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
  let currentLang = 'en';

  const translations = {
    en: {
      search: "Search",
      special: "Zimbabwe Special:",
      featured: "Featured Zimbabwe Destinations",
      experiences: "Local Zimbabwe Experiences"
    },
    sn: {
      search: "Tsvaga",
      special: "Zimbabwe Yakakosha:",
      featured: "Nzvimbo DzeZimbabwe Dzakasarudzwa",
      experiences: "Zviitiko ZveMunharaunda"
    }
  };

  function updateLanguage() {
    const lang = translations[currentLang];
    document.querySelector('[data-translate="search"]').textContent = lang.search;
    document.querySelector('[data-translate="special"]').textContent = lang.special;
    document.querySelector('[data-translate="featured"]').textContent = lang.featured;
    document.querySelector('[data-translate="experiences"]').textContent = lang.experiences;
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'sn' : 'en';
      updateLanguage();
      languageToggle.innerHTML = currentLang === 'en' 
        ? '<i class="fas fa-language mr-1"></i>Shona' 
        : '<i class="fas fa-language mr-1"></i>English';
    });
  }

  if (mobileLanguageToggle) {
    mobileLanguageToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'sn' : 'en';
      updateLanguage();
      mobileLanguageToggle.innerHTML = currentLang === 'en' 
        ? '<i class="fas fa-language mr-1"></i>Shona' 
        : '<i class="fas fa-language mr-1"></i>English';
    });
  }
}

// Enhanced Search Functionality
function setupSearchFunctionality() {
  const searchForm = document.getElementById('search-form');
  const propertyCards = document.querySelectorAll('.property-card');

  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const location = document.getElementById('search-location').value.toLowerCase();
      const checkIn = document.getElementById('check-in').value;
      const checkOut = document.getElementById('check-out').value;
      const guests = document.getElementById('guests').value;

      propertyCards.forEach(card => {
        const cardLocation = card.querySelector('p').textContent.toLowerCase();
        card.style.display = cardLocation.includes(location) ? 'block' : 'none';
      });
    });
  }
}

// Booking Process
function setupBookingProcess() {
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const checkIn = document.getElementById('booking-check-in').value;
      const checkOut = document.getElementById('booking-check-out').value;
      const guests = document.getElementById('booking-guests').value;
      
      // Show confirmation message
      const confirmation = document.createElement('div');
      confirmation.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
      confirmation.innerHTML = `
        <strong class="font-bold">Booking confirmed!</strong>
        <span class="block sm:inline">Your stay from ${checkIn} to ${checkOut} for ${guests} has been booked.</span>
      `;
      bookingForm.parentNode.insertBefore(confirmation, bookingForm.nextSibling);
      
      // Reset form
      bookingForm.reset();
    });
  }
}

// Map Initialization
function initPropertyMap() {
    if (document.getElementById('property-map')) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
        
        const map = new mapboxgl.Map({
            container: 'property-map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [25.8290, -17.9243], // Victoria Falls coordinates
            zoom: 12
        });

        // Add marker
        new mapboxgl.Marker({ color: '#EF4444' })
            .setLngLat([25.8290, -17.9243])
            .setPopup(new mapboxgl.Popup().setHTML("<h3 class='font-bold'>Victoria Falls Lodge</h3>"))
            .addTo(map);
    }
}

// Booking Calendar Logic
function setupBookingCalendar() {
    const checkInInput = document.getElementById('booking-check-in');
    const checkOutInput = document.getElementById('booking-check-out');
    
    if (checkInInput && checkOutInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;

        // Enable check-out when check-in is selected
        checkInInput.addEventListener('change', function() {
            checkOutInput.disabled = false;
            checkOutInput.min = this.value;
            
            // Calculate minimum check-out date (next day)
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOutInput.min = nextDay.toISOString().split('T')[0];
        });

        // Validate date range
        checkOutInput.addEventListener('change', function() {
            if (new Date(this.value) <= new Date(checkInInput.value)) {
                this.value = '';
                alert('Check-out date must be after check-in date');
            }
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupBookingCalendar();
    initPropertyMap();
  setupThemeToggle();
  setupCurrencyConverter();
  setupLanguageToggle();
  setupSearchFunctionality();
  setupBookingProcess();

  // Favorite button functionality
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('text-gray-400');
      this.classList.toggle('text-red-500');
      const propertyId = this.dataset.propertyId;
      console.log('Favorite toggled for property:', propertyId);
    });
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    });
  }
});

// Zimbabwe property data
const zimProperties = [
  {
    id: 1,
    title: 'Victoria Falls Lodge',
    location: 'Victoria Falls, Zimbabwe',
    price: 350,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1584116831289-9c5d7e0b3e1a'
  },
  {
    id: 2,
    title: 'Matopos Rock Retreat',
    location: 'Matobo Hills, Zimbabwe',
    price: 280,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00'
  },
  {
    id: 3,
    title: 'Great Zimbabwe Ruins View',
    location: 'Masvingo, Zimbabwe',
    price: 220,
    rating: 4.82,
    image: 'https://images.unsplash.com/photo-1573995108248-9b799c3d5e28'
  }
];