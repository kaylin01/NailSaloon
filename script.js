/* ============================================================
   Polish Me Pretty Gang — Scripts
   Boutique nail studio · Morningside, Durban
   Vanilla JS only · no dependencies · defensively guarded
   ============================================================ */

/* Respect the user's motion preference throughout */
var PREFERS_REDUCED_MOTION = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

/* ============================================================
   TESTIMONIAL DATA (home carousel + reviews page)
   ============================================================ */
var TESTIMONIALS = [
  {
    name:   'Thandeka M.',
    role:   'Acrylic Tips · Morningside',
    text:   '"Best acrylics I\'ve had in Durban, hands down. My set lasted over four weeks without a single lift and the shape was exactly what I asked for. I\'m booked in every month now."',
    rating: 5,
    initials: 'TM',
  },
  {
    name:   'Naledi K.',
    role:   'Gel Overlays · Regular client',
    text:   '"So clean, so professional, and the gel finish is glossy for weeks. I send everyone here. Booking on WhatsApp is quick and she always replies fast."',
    rating: 5,
    initials: 'NK',
  },
  {
    name:   'Aisha P.',
    role:   'Nail Art · Berea',
    text:   '"I came in with a Pinterest screenshot and walked out with even better. The chrome and hand-painted art is next level. Worth every rand."',
    rating: 5,
    initials: 'AP',
  },
  {
    name:   'Lerato S.',
    role:   'Acrylic Fill · Loyal client',
    text:   '"Hygiene is spotless and the space is so relaxing. My fills are always neat and on time. Polish Me Pretty Gang is my happy place."',
    rating: 5,
    initials: 'LS',
  },
  {
    name:   'Zinhle D.',
    role:   'Gel Tips · Umhlanga',
    text:   '"Travelled in from Umhlanga and it was 100% worth the drive. Gorgeous gel tips, gentle hands, and honest pricing. Highly recommend."',
    rating: 5,
    initials: 'ZD',
  },
  {
    name:   'Carmen V.',
    role:   'Acrylic Toes · First visit',
    text:   '"First time and definitely not my last. My toes have never looked this good and the chrome finish is stunning. Such a warm, welcoming vibe."',
    rating: 5,
    initials: 'CV',
  },
];

/* ============================================================
   NAVBAR — scroll state + mobile toggle
   ============================================================ */
(function initNavbar() {
  var navbar = document.querySelector('.navbar');
  var toggle = document.querySelector('.navbar__toggle');
  var nav    = document.querySelector('.navbar__nav');
  if (!navbar) return;

  var hasHero = !!document.querySelector('.hero');
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
    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape for keyboard users
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
    });
  }
})();

/* ============================================================
   SMOOTH SCROLL — in-page anchor links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
      ) || 76;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth' });
    });
  });
})();

/* ============================================================
   TESTIMONIAL CAROUSEL (home)
   ============================================================ */
(function initCarousel() {
  var inner      = document.querySelector('.carousel__inner');
  var prevCard   = document.getElementById('tCardPrev');
  var centerCard = document.getElementById('tCardCenter');
  var nextCard   = document.getElementById('tCardNext');
  var btnPrev    = document.getElementById('carouselPrev');
  var btnNext    = document.getElementById('carouselNext');
  var dotsWrap   = document.getElementById('carouselDots');
  if (!inner || !centerCard) return;

  var n = TESTIMONIALS.length;
  var current = 0;
  var autoPlay;
  var isAnimating = false;
  var touchStartX = 0;
  var touchDeltaX = 0;

  var dots = [];
  if (dotsWrap) {
    TESTIMONIALS.forEach(function (_, i) {
      var dot = document.createElement('button');
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
    var stars  = el.querySelector('.t-card__stars');
    var text   = el.querySelector('.t-card__text');
    var name   = el.querySelector('.t-card__name');
    var role   = el.querySelector('.t-card__role');
    var avatar = el.querySelector('.t-card__avatar');
    if (stars)  { stars.textContent = '★'.repeat(data.rating); stars.setAttribute('aria-label', data.rating + ' out of 5 stars'); }
    if (text)   text.textContent = data.text;
    if (name)   name.textContent = data.name;
    if (role)   role.textContent = data.role;
    if (avatar) avatar.textContent = data.initials || '';
  }

  function render() {
    var prevIdx = (current - 1 + n) % n;
    var nextIdx = (current + 1) % n;
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

    var exitClass = dir === 'next' ? 'is-exiting-left' : 'is-exiting-right';
    var enterTx   = dir === 'next' ? '56px' : '-56px';

    var delay = PREFERS_REDUCED_MOTION ? 0 : 380;
    if (!PREFERS_REDUCED_MOTION) inner.classList.add(exitClass);

    setTimeout(function () {
      if (typeof targetIndex === 'number') current = targetIndex;
      else if (dir === 'next') current = (current + 1) % n;
      else current = (current - 1 + n) % n;
      render();

      if (PREFERS_REDUCED_MOTION) { isAnimating = false; return; }

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
    }, delay);
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
    if (PREFERS_REDUCED_MOTION) return;
    autoPlay = setInterval(function () { navigate('next'); }, 6500);
  }
  function resetAutoPlay() { clearInterval(autoPlay); startAutoPlay(); }

  var carouselEl = document.querySelector('.carousel');
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
    if (Math.abs(touchDeltaX) > 40) navigate(touchDeltaX < 0 ? 'next' : 'prev');
    startAutoPlay();
  });

  render();
  startAutoPlay();
})();

/* ============================================================
   GALLERY — category filtering
   ============================================================ */
(function initGalleryFilter() {
  var filters = document.querySelectorAll('.gallery__filter');
  var items   = document.querySelectorAll('.gallery__item');
  if (!filters.length || !items.length) return;

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');

      filters.forEach(function (f) {
        var active = f === btn;
        f.classList.toggle('is-active', active);
        f.setAttribute('aria-pressed', String(active));
      });

      items.forEach(function (item) {
        var match = cat === 'all' || item.getAttribute('data-category') === cat;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });
})();

/* ============================================================
   GALLERY — accessible lightbox
   ============================================================ */
(function initLightbox() {
  var lightbox = document.getElementById('lightbox');
  var triggers = document.querySelectorAll('.gallery__item[data-full]');
  if (!lightbox || !triggers.length) return;

  var imgEl     = lightbox.querySelector('.lightbox__img');
  var captionEl = lightbox.querySelector('.lightbox__caption');
  var btnClose  = lightbox.querySelector('.lightbox__close');
  var btnPrev   = lightbox.querySelector('.lightbox__nav--prev');
  var btnNext   = lightbox.querySelector('.lightbox__nav--next');

  var visible = [];      // currently-shown triggers (respects active filter)
  var index = 0;
  var lastFocused = null;

  function currentList() {
    return Array.prototype.filter.call(triggers, function (t) {
      return !t.classList.contains('is-hidden');
    });
  }

  function show(i) {
    visible = currentList();
    if (!visible.length) return;
    index = (i + visible.length) % visible.length;
    var t = visible[index];
    var full = t.getAttribute('data-full');
    var cap  = t.getAttribute('data-caption') || '';
    var imgInside = t.querySelector('img');
    imgEl.src = full;
    imgEl.alt = imgInside ? imgInside.alt : cap;
    captionEl.textContent = cap;
  }

  function open(t) {
    lastFocused = document.activeElement;
    visible = currentList();
    index = visible.indexOf(t);
    if (index < 0) index = 0;
    show(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(function (t) {
    t.addEventListener('click', function () { open(t); });
  });

  if (btnClose) btnClose.addEventListener('click', close);
  if (btnPrev)  btnPrev.addEventListener('click', function () { show(index - 1); });
  if (btnNext)  btnNext.addEventListener('click', function () { show(index + 1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'Tab') {
      // simple focus trap among the lightbox controls
      var focusables = [btnClose, btnPrev, btnNext].filter(Boolean);
      var first = focusables[0];
      var last  = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

/* ============================================================
   FAQ — accessible accordion
   ============================================================ */
(function initFaq() {
  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    var btn = item.querySelector('.faq-item__q');
    var ans = item.querySelector('.faq-item__a');
    if (!btn || !ans) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
      ans.style.maxHeight = isOpen ? ans.scrollHeight + 'px' : '0px';
    });
  });

  // Recalculate open panel heights on resize
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-item.is-open .faq-item__a').forEach(function (ans) {
      ans.style.maxHeight = ans.scrollHeight + 'px';
    });
  });
})();

/* ============================================================
   CONTACT — highlight today's opening hours
   ============================================================ */
(function initOpeningHours() {
  var rows = document.querySelectorAll('.hours-row[data-day]');
  if (!rows.length) return;
  var today = new Date().getDay(); // 0 = Sun ... 6 = Sat
  rows.forEach(function (row) {
    if (parseInt(row.getAttribute('data-day'), 10) === today) {
      row.classList.add('is-today');
      var day = row.querySelector('.hours-row__day');
      if (day && !row.querySelector('.hours-row__badge')) {
        var badge = document.createElement('span');
        badge.className = 'hours-row__badge';
        badge.textContent = 'Today';
        day.appendChild(badge);
      }
    }
  });
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (PREFERS_REDUCED_MOTION || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  document.querySelectorAll(
    '.featured__grid > .reveal, .gallery__grid > *, .why__grid > *, .why-cards__grid > *, .reviews__grid > *, .process__grid > *'
  ).forEach(function (el, i) {
    el.style.transitionDelay = (i * 70) + 'ms';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   FOOTER YEAR
   ============================================================ */
(function initYear() {
  var el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
