class CarouselElement extends HTMLElement {
  constructor() {
    super();
    this.swiperInstance = null;
    this.isActive = false; // Track if the Swiper is active
  }

  connectedCallback() {
    this.render();
    this.setupToggleButton();
  }

  // HTML elements for rendering
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

  // Swiper configuration
  initializeCarousel() {
    const config = {
      slidesPerView: 3,
      slidesOffsetBefore: 64,
      slidesOffsetAfter: 64,
      spaceBetween: 8,
      grabCursor: true,
      navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          direction: 'vertical',
        },
        769: {
          direction: 'horizontal',
        },
      },
    };

    this.swiperInstance = new Swiper(this.querySelector('.swiper'), config);
    this.isActive = true;
    this.updateToggleButton();
  }

  destroyCarousel() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
      this.swiperInstance = null;
      this.isActive = false;
      this.updateToggleButton();
    }
  }

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

  updateToggleButton() {
    const toggleButton = this.querySelector('#toggle-swiper');
    toggleButton.textContent = this.isActive ? 'Deactivate Carousel' : 'Activate Carousel';
  }
}

// Define the custom element
customElements.define('custom-carousel', CarouselElement);
