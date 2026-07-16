const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 45, 360)}ms`;
      observer.observe(el);
    });

    const projectImages = document.querySelectorAll(
      '.latest-visual img, .featured-visual img, .project-thumb img'
    );

    projectImages.forEach((image) => {
      const container = image.parentElement;

      const handleLoad = () => container.classList.remove('no-image');
      const handleError = () => {
        container.classList.add('no-image');
        image.remove();
      };

      if (image.complete) {
        if (image.naturalWidth > 0) {
          handleLoad();
        } else {
          handleError();
        }
        return;
      }

      image.addEventListener('load', handleLoad, { once: true });
      image.addEventListener('error', handleError, { once: true });
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach((card) => {
          const matched = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !matched);
        });
      });
    });
