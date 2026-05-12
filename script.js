/* ============================================================
   Luxe Nails Studio — Scripts
   ============================================================ */

/* ============================================================
   TESTIMONIAL DATA
   ============================================================ */
const TESTIMONIALS = [
  {
    name:   'Amara Sithole',
    role:   'Regular Client',
    text:   '"Every visit feels like a quiet luxury escape. The work is precise, the studio is calm, and my gel sets last impeccably. I genuinely don\'t go anywhere else."',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=47',
  },
  {
    name:   'Jessica Pretorius',
    role:   'Loyal Client',
    text:   '"I\'ve tried every salon in the northern suburbs. Luxe is on a different level — the cleanliness, the artistry, the unhurried pace. Worth every cent."',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    name:   'Kehlani Dlamini',
    role:   'Monthly Visitor',
    text:   '"My acrylic full set lasted six weeks without lifting. The detail Zanele puts into every nail is unmatched, and she has the gentlest hands."',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
  {
    name:   'Priya Naidoo',
    role:   'Bridal Client',
    text:   '"My wedding nails were the most photographed part of the day. Booked Luxe again three days after the honeymoon — I can\'t wear another set."',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=23',
  },
  {
    name:   'Chloe Reynolds',
    role:   'Nail Art Enthusiast',
    text:   '"I asked for hand-painted botanicals and got a gallery on my fingertips. The talent here is genuinely world-class."',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=56',
  },
];

/* ============================================================
   NAVBAR — scroll, mobile toggle, opaque on sub-pages
   ============================================================ */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const nav    = document.querySelector('.navbar__nav');

  if (!navbar) return;

  const hasHero = !!document.querySelector('.hero');
  if (!hasHero) navbar.classList.add('navbar--scrolled');

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else if (hasHero) {
      navbar.classList.remove('navbar--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ============================================================
   SMOOTH SCROLL — for in-page anchor links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
      ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   SERVICES EXPAND / COLLAPSE
   ============================================================ */
(function initServicesToggle() {
  const toggle = document.getElementById('servicesToggle');
  if (!toggle) return;

  const grid    = document.querySelector('.services__grid');
  const extras  = document.querySelectorAll('.svc-card--extra');
  const textEl  = toggle.querySelector('.services__toggle-text');
  if (!grid || !extras.length) return;

  let expanded = false;
  let busy = false;

  toggle.addEventListener('click', function () {
    if (busy) return;
    busy = true;
    expanded = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    if (textEl) textEl.textContent = expanded ? 'Show Less' : 'Show More Services';

    if (expanded) {
      extras.forEach(function (card) { card.classList.add('is-active'); });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          extras.forEach(function (card, i) {
            setTimeout(function () { card.classList.add('is-visible'); }, i * 90);
          });
          setTimeout(function () { busy = false; }, 600 + extras.length * 90);
        });
      });
    } else {
      extras.forEach(function (card, i) {
        setTimeout(function () { card.classList.remove('is-visible'); }, (extras.length - 1 - i) * 60);
      });
      setTimeout(function () {
        extras.forEach(function (card) { card.classList.remove('is-active'); });
        busy = false;
      }, 600);
    }
  });
})();

/* ============================================================
   TESTIMONIAL CAROUSEL — translateX based
   ============================================================ */
(function initCarousel() {
  const inner      = document.querySelector('.carousel__inner');
  const prevCard   = document.getElementById('tCardPrev');
  const centerCard = document.getElementById('tCardCenter');
  const nextCard   = document.getElementById('tCardNext');
  const btnPrev    = document.getElementById('carouselPrev');
  const btnNext    = document.getElementById('carouselNext');
  const dotsWrap   = document.getElementById('carouselDots');

  if (!inner || !centerCard) return;

  const n = TESTIMONIALS.length;
  let current = 0;
  let autoPlay;
  let isAnimating = false;
  let touchStartX = 0;
  let touchDeltaX = 0;

  const dots = [];
  if (dotsWrap) {
    TESTIMONIALS.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function populateCard(el, data) {
    if (!el || !data) return;
    const stars  = el.querySelector('.t-card__stars');
    const text   = el.querySelector('.t-card__text');
    const name   = el.querySelector('.t-card__name');
    const role   = el.querySelector('.t-card__role');
    const avatar = el.querySelector('.t-card__avatar');
    if (stars)  stars.textContent  = '★'.repeat(data.rating);
    if (text)   text.textContent   = data.text;
    if (name)   name.textContent   = data.name;
    if (role)   role.textContent   = data.role;
    if (avatar) { avatar.src = data.avatar; avatar.alt = data.name; }
  }

  function render() {
    const prevIdx = (current - 1 + n) % n;
    const nextIdx = (current + 1) % n;
    populateCard(prevCard,   TESTIMONIALS[prevIdx]);
    populateCard(centerCard, TESTIMONIALS[current]);
    populateCard(nextCard,   TESTIMONIALS[nextIdx]);
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });
  }

  function animateNav(dir, targetIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const exitClass = dir === 'next' ? 'is-exiting-left' : 'is-exiting-right';
    const enterTx   = dir === 'next' ? '56px' : '-56px';

    inner.classList.add(exitClass);

    setTimeout(function () {
      if (typeof targetIndex === 'number') {
        current = targetIndex;
      } else if (dir === 'next') {
        current = (current + 1) % n;
      } else {
        current = (current - 1 + n) % n;
      }
      render();

      inner.classList.remove(exitClass);
      inner.style.transition = 'none';
      inner.style.transform  = 'translateX(' + enterTx + ')';
      inner.style.opacity    = '0';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          inner.style.transition = '';
          inner.style.transform  = '';
          inner.style.opacity    = '';
          setTimeout(function () { isAnimating = false; }, 500);
        });
      });
    }, 380);
  }

  function navigate(dir) { animateNav(dir); }

  function goTo(index) {
    if (index === current || isAnimating) return;
    animateNav(index > current ? 'next' : 'prev', index);
    resetAutoPlay();
  }

  if (btnPrev) btnPrev.addEventListener('click', function () { navigate('prev'); resetAutoPlay(); });
  if (btnNext) btnNext.addEventListener('click', function () { navigate('next'); resetAutoPlay(); });

  function startAutoPlay() {
    autoPlay = setInterval(function () { navigate('next'); }, 6500);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  const carouselEl = document.querySelector('.carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', function () { clearInterval(autoPlay); });
    carouselEl.addEventListener('focusin',    function () { clearInterval(autoPlay); });
    carouselEl.addEventListener('mouseleave', startAutoPlay);
    carouselEl.addEventListener('focusout',   startAutoPlay);
  }

  inner.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchDeltaX = 0;
    clearInterval(autoPlay);
  }, { passive: true });

  inner.addEventListener('touchmove', function (e) {
    touchDeltaX = e.changedTouches[0].clientX - touchStartX;
  }, { passive: true });

  inner.addEventListener('touchend', function () {
    if (Math.abs(touchDeltaX) > 40) {
      navigate(touchDeltaX < 0 ? 'next' : 'prev');
    }
    startAutoPlay();
  });

  render();
  startAutoPlay();
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  document.querySelectorAll(
    '.services__grid > .reveal, .gallery__grid > *, .why__grid > *'
  ).forEach(function (el, i) {
    el.style.transitionDelay = (i * 70) + 'ms';
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   YEAR INJECTION (footer)
   ============================================================ */
(function initYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
