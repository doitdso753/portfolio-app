'use strict';

(function () {
  function initImageModal(options = {}) {
    const modalSelector = options.modalSelector || '.image-modal';
    const triggerSelector = options.triggerSelector || '[data-image-modal-trigger]';
    const modal = document.querySelector(modalSelector);

    if (modal == null || modal.dataset.imageModalInitialized === 'true') {
      return;
    }

    const modalImg = modal.querySelector('.image-modal__img');
    const closeBtn = modal.querySelector('.image-modal__close');
    const triggerButtons = document.querySelectorAll(triggerSelector);

    if (modalImg == null || closeBtn == null || triggerButtons.length === 0) {
      return;
    }

    modal.dataset.imageModalInitialized = 'true';

    function openImageModal(button) {
      const fallbackImg = button.querySelector('img');
      modalImg.src = button.dataset.imageModalSrc || (fallbackImg != null ? fallbackImg.src : '');
      modalImg.alt = button.dataset.imageModalAlt || (fallbackImg != null ? fallbackImg.alt : '');
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeImageModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalImg.src = '';
      modalImg.alt = '';
    }

    triggerButtons.forEach((button) => {
      button.addEventListener('click', () => {
        openImageModal(button);
      });
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.closest('.image-modal__close') === closeBtn) {
        closeImageModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('open')) {
        closeImageModal();
      }
    });
  }

  window.PortfolioImageModal = {
    init: initImageModal,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initImageModal());
  } else {
    initImageModal();
  }
})();
