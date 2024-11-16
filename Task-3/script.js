class CarouselElement extends HTMLElement {
  constructor() {
    super();
    this.swiperInstance = null;
    this.isActive = false; // Track if the Swiper is active
    this.lastWidth = window.innerWidth;
  }

  connectedCallback() {
    this.render();
    this.setupToggleButton();
    this.setupResizeListener();
  }

  // Renders the HTML structure of the carousel
  render() {
    this.innerHTML = `
      <div class="button-container">
        <button id="toggle-swiper" class="toggle-btn">Activate Carousel</button>
      </div>
      <div class="swiper-container" style="display: none;">
        <div class="swiper">
          <div class="swiper-wrapper">
            ${this.renderSlides()}
          </div>
          <div class="swiper-button-prev custom-prev">
            <img src="assets/left-arrow.png" alt="Previous slide arrow" width="64" height="64" />
          </div>
          <div class="swiper-button-next custom-next">
            <img src="assets/right-arrow.png" alt="Next slide arrow" width="64" height="64" />
          </div>
        </div>
      </div>
    `;
  }

  // Renders slides based on the `images` attribute
  renderSlides() {
    const images = this.getAttribute('images').split(',');
    return images
      .map(
        (img) => `
        <div class="swiper-slide">
            <img src="${img.trim()}" />
        </div>`
      )
      .join('');
  }

  // Initializes the Swiper instance with dynamic configuration
  initializeCarousel() {
    let config = this.getSwiperConfig();

    this.swiperInstance = new Swiper(this.querySelector('.swiper'), config);

    this.swiperInstance.on('slideChange', () => {
      console.log('Active slide index:', this.swiperInstance.activeIndex);
    });

    this.isActive = true;
    this.updateToggleButton();
  }

  // Adjusts configuration based on screen width
  getSwiperConfig() {
    // Desktop layout configuration
    let config = {
      slidesPerView: 3,
      spaceBetween: 8,
      slidesOffsetBefore: 64,
      slidesOffsetAfter: 64,
      grabCursor: true,
      navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    };

    // Mobile layout configuration
    if (window.innerWidth <= 425) {
      config = {
        slidesPerView: 1,
        spaceBetween: 8,
        slidesOffsetBefore: 16,
        slidesOffsetAfter: 16,
        centeredSlides: true,
        grabCursor: true,
        navigation: {
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      };
    }

    return config;
  }

  // Destroys the Swiper instance
  destroyCarousel() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
      this.isActive = false;
      this.updateToggleButton();
    }
  }

  // Sets up the toggle button functionality
  setupToggleButton() {
    const toggleButton = this.querySelector('#toggle-swiper');
    toggleButton.addEventListener('click', () => {
      if (this.isActive) {
        this.destroyCarousel();
        this.querySelector('.swiper-container').style.display = 'none';
      } else {
        this.querySelector('.swiper-container').style.display = 'block';
        this.initializeCarousel();
      }
    });
  }

  // Updates the toggle button text based on the Swiper's state
  updateToggleButton() {
    const toggleButton = this.querySelector('#toggle-swiper');
    toggleButton.textContent = this.isActive ? 'Deactivate Carousel' : 'Activate Carousel';
  }

  // Re-initializes Swiper if the width crosses 425px threshold
  setupResizeListener() {
    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth;
      if ((this.lastWidth <= 425 && currentWidth > 425) || (this.lastWidth > 425 && currentWidth <= 425)) {
        if (this.isActive) {
          this.destroyCarousel();
          this.querySelector('.swiper-container').style.display = 'none';
          this.querySelector('.swiper-container').style.display = 'block';
          this.initializeCarousel();
        }
      }
      this.lastWidth = currentWidth;
    });
  }
}

// Initialize carousel
customElements.define('custom-carousel', CarouselElement);
