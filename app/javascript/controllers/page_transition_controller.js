// app/javascript/controllers/page_transition_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
	static targets = ['title', 'filmItem'];

	connect() {
		// Check if we're on the films route
		if (window.location.pathname === '/films') {
			this.prepareForAnimation();
			this.waitForImages();
		}
	}

	prepareForAnimation() {
		// Hide each film item initially
		this.filmItemTargets.forEach((item) => {
			item.classList.add('opacity-0', 'translate-y-4');
		});
	}

	waitForImages() {
		// Find all images within the controller's element
		const images = this.element.querySelectorAll('img');

		if (images.length === 0) {
			// If no images, animate immediately
			this.animateIn();
			return;
		}

		let loadedImages = 0;
		const totalImages = images.length;

		// Create a promise that resolves when all images are loaded
		const allImagesLoaded = Array.from(images).map((img) => {
			return new Promise((resolve) => {
				if (img.complete) {
					loadedImages++;
					resolve();
				} else {
					img.addEventListener('load', () => {
						loadedImages++;
						resolve();
					});

					// Also handle errors, so we don't wait forever if an image fails
					img.addEventListener('error', () => {
						loadedImages++;
						resolve();
					});
				}
			});
		});

		// When all images are loaded, run the animation
		Promise.all(allImagesLoaded).then(() => {
			console.log(`All ${loadedImages} images loaded. Running animation.`);
			this.animateIn();
		});
	}

	animateIn() {
		// Animate the title first
		if (this.hasTitleTarget) {
			setTimeout(() => {
				this.titleTarget.classList.remove('opacity-0', 'translate-y-4');
				this.titleTarget.classList.add(
					'transition-all',
					'duration-500',
					'ease-out',
					'opacity-100',
					'translate-y-0'
				);
			}, 100);
		}

		// Then animate each film item with a staggered delay
		this.filmItemTargets.forEach((item, index) => {
			setTimeout(() => {
				item.classList.remove('opacity-0', 'translate-y-4');
				item.classList.add(
					'transition-all',
					'duration-500',
					'ease-out',
					'opacity-100',
					'translate-y-0'
				);
			}, 300 + index * 150); // Start after title animation, then 150ms between each item
		});
	}
}
