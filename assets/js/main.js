/**
 * OM SHALA JOGA — JAWOR
 * Skrypt interaktywny: harmonogram, filtry, status otwarcia na żywo, modal i menu
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveStudioStatus();
  initMobileNav();
  initSchedule();
  initModals();
  initContactForm();
  initHeaderScroll();
});

/* ==========================================================================
   1. HARMONOGRAM ZAJĘĆ (INTERAKTYWNA BAZA DANYCH I WIDOK)
   ========================================================================== */

const SCHEDULE_DATA = {
  monday: {
    dayName: 'Poniedziałek',
    classes: [
      {
        time: '08:00 - 09:00',
        duration: '60 min',
        title: 'Trening Oddechowy',
        category: 'mobility',
        instructor: 'Izabela Borkowska',
        tag: 'Oddech & Spokój',
        desc: 'Funkcjonalna praca z oddechem, wyciszenie układu nerwowego i redukcja porannego napięcia.'
      },
      {
        time: '19:00 - 20:30',
        duration: '90 min',
        title: 'Hatha Joga',
        category: 'hatha',
        instructor: 'Kaja Wiśniewska',
        tag: 'Klasyczna praktyka',
        desc: 'Praktyka asan, uelastycznienie i mobilizacja ciała, głęboki oddech i relaksacja.'
      }
    ]
  },
  tuesday: {
    dayName: 'Wtorek',
    classes: [
      {
        time: '16:00 - 17:00',
        duration: '60 min',
        title: 'Mobility & Ruch',
        category: 'mobility',
        instructor: 'Izabela Borkowska',
        tag: 'Mobilność stawów',
        desc: 'Zwiększanie zakresów ruchu, profilaktyka kręgosłupa i swoboda w ciele.'
      },
      {
        time: '17:00 - 18:30',
        duration: '90 min',
        title: 'Hatha Joga (Grupa 1)',
        category: 'hatha',
        instructor: 'Kaja Wiśniewska',
        tag: 'Harmonia & Siła',
        desc: 'Świadomy ruch łączony z oddechem. Odpowiednia zarówno dla początkujących, jak i praktykujących.'
      },
      {
        time: '19:00 - 20:30',
        duration: '90 min',
        title: 'Hatha Joga (Grupa 2)',
        category: 'hatha',
        instructor: 'Kaja Wiśniewska',
        tag: 'Głęboka praktyka',
        desc: 'Wieczorna regeneracja, rozluźnienie powięzi i wyciszenie umysłu po całym dniu.'
      }
    ]
  },
  wednesday: {
    dayName: 'Środa',
    classes: [
      {
        time: '08:30 - 10:00',
        duration: '90 min',
        title: 'Hatha Joga — Poranek',
        category: 'hatha',
        instructor: 'Zespół Om Shala',
        tag: 'Poranna energia',
        desc: 'Złap oddech na dobry początek dnia. Delikatne rozbudzenie ciała i lekkość w umyśle.'
      },
      {
        time: '10:30 - 12:00',
        duration: '90 min',
        title: 'Hatha Joga',
        category: 'hatha',
        instructor: 'Kaja Wiśniewska',
        tag: 'Balans & Oddech',
        desc: 'Praca z uważnością w asanach, budowanie stabilności i elastyczności.'
      },
      {
        time: '17:00 - 18:00',
        duration: '60 min',
        title: 'Joga Nidra',
        category: 'nidra',
        instructor: 'Gabrysia',
        tag: 'Głęboki relaks',
        desc: 'Jogiczny sen i prowadzona medytacja uwalniająca głębokie napięcia psychofizyczne.'
      },
      {
        time: '18:15 - 19:45',
        duration: '90 min',
        title: 'Joga Klasyczna',
        category: 'hatha',
        instructor: 'Rafał Kozioł',
        tag: 'Równowaga & Uważność',
        desc: 'Uważna praktyka jogi skupiona na poprawnym ustawieniu ciała, oddechu i koncentracji.'
      }
    ]
  },
  thursday: {
    dayName: 'Czwartek',
    classes: [
      {
        time: '06:30 - 07:30',
        duration: '60 min',
        title: 'Hatha Joga — Świt',
        category: 'hatha',
        instructor: 'Zespół Om Shala',
        tag: 'Poranne orzeźwienie',
        desc: 'Pobudka z jogą przed pracą. Czysta energia, witalność i jasność myśli.'
      },
      {
        time: '08:30 - 10:00',
        duration: '90 min',
        title: 'Hatha Joga',
        category: 'hatha',
        instructor: 'Zespół Om Shala',
        tag: 'Elastyczność',
        desc: 'Uważne sekwencje asan wspierające mobilność kręgosłupa i spokój wewnętrzny.'
      },
      {
        time: '17:00 - 18:30',
        duration: '90 min',
        title: 'Hatha Joga',
        category: 'hatha',
        instructor: 'Kaja Wiśniewska',
        tag: 'Regeneracja',
        desc: 'Wyciszenie popołudniowe, wzmacnianie mięśni głębokich i nauka odpuszczania.'
      },
      {
        time: '19:30 - 20:30',
        duration: '60 min',
        title: 'Koncert Mis Kryształowych',
        category: 'sound',
        instructor: 'Melody of Shanti',
        tag: 'Kąpiel dźwiękowa',
        desc: 'Kojące wibracje mis kryształowych i tybetańskich, redukcja stresu, harmonizacja fal mózgowych.'
      }
    ]
  },
  friday: {
    dayName: 'Piątek',
    classes: [
      {
        time: '18:00 - 19:30',
        duration: '90 min',
        title: 'Joga & Relaks',
        category: 'hatha',
        instructor: 'Rafał Kozioł',
        tag: 'Wyciszenie',
        desc: 'Uspokajająca sesja asan przygotowująca ciało i umysł na spokojny, harmonijny weekend.'
      }
    ]
  },
  weekend: {
    dayName: 'Sobota / Niedziela',
    classes: [
      {
        time: '09:00 - 10:15 (Wybrane soboty)',
        duration: '75 min',
        title: 'Joga na trawie / Plener',
        category: 'outdoor',
        instructor: 'Kaja Wiśniewska',
        tag: 'W otoczeniu natury',
        desc: 'Sesje w Parku Miejskim przy ECMEN lub Stajni w Chełmcu. Wspólna praktyka na świeżym powietrzu.'
      },
      {
        time: 'Godziny warsztatowe',
        duration: '2 - 3 godz.',
        title: 'Warsztaty tematyczne & Dźwiękoterapia',
        category: 'sound',
        instructor: 'Goście & Melody of Shanti',
        tag: 'Wydarzenia specjalne',
        desc: 'Pogłębione sesje medytacji, warsztaty pracy z ciałem i oddechem. Zapisy ogłaszane na bieżąco.'
      }
    ]
  }
};

let currentActiveDay = 'monday';
let currentActiveFilter = 'all';

function initSchedule() {
  const dayTabsContainer = document.getElementById('schedule-day-tabs');
  const scheduleListContainer = document.getElementById('schedule-list');
  const filterPills = document.querySelectorAll('.filter-pill');

  if (!dayTabsContainer || !scheduleListContainer) return;

  // Ustawienie dzisiejszego dnia tygodnia jako domyślny
  const dayMap = ['weekend', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'weekend'];
  const todayIdx = new Date().getDay();
  currentActiveDay = dayMap[todayIdx] || 'monday';

  // Obsługa kliknięć w zakładki dni
  const dayButtons = dayTabsContainer.querySelectorAll('.day-tab-btn');
  dayButtons.forEach(btn => {
    if (btn.dataset.day === currentActiveDay) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      dayButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActiveDay = btn.dataset.day;
      renderSchedule();
    });
  });

  // Obsługa filtrów kategorii
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentActiveFilter = pill.dataset.filter;
      renderSchedule();
    });
  });

  renderSchedule();
}

function renderSchedule() {
  const container = document.getElementById('schedule-list');
  if (!container) return;

  const dayData = SCHEDULE_DATA[currentActiveDay];
  if (!dayData) return;

  let classes = dayData.classes;
  if (currentActiveFilter !== 'all') {
    classes = classes.filter(c => c.category === currentActiveFilter);
  }

  if (classes.length === 0) {
    container.innerHTML = `
      <div class="empty-schedule-box">
        <div class="empty-schedule-icon">🌿</div>
        <h3>Brak zajęć z tej kategorii w tym dniu</h3>
        <p>Wybierz inny dzień lub przełącz na „Wszystkie zajęcia”, aby zobaczyć pełny grafik.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = classes.map(item => `
    <div class="schedule-item">
      <div class="schedule-time-box">
        <span class="schedule-time">${item.time}</span>
        <span class="schedule-duration">${item.duration}</span>
      </div>
      <div class="schedule-class-info">
        <h4 class="schedule-class-name">${item.title}</h4>
        <span class="schedule-class-tag">${item.tag}</span>
        <p class="schedule-duration" style="margin-top: 4px;">${item.desc}</p>
      </div>
      <div class="schedule-instructor">
        <span class="instructor-avatar-mini">${item.instructor.charAt(0)}</span>
        <div>
          <div style="font-weight: 600; font-size: 0.9rem;">${item.instructor}</div>
          <span style="font-size: 0.76rem; color: var(--color-text-muted);">Prowadząca / Prowadzący</span>
        </div>
      </div>
      <div class="schedule-action">
        <a href="https://zarezerwuj.pl/om-shala-joga" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
          Zapisz się
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   2. STATUS OTWARCIA STUDIA NA ŻYWO (LIVE STATUS)
   ========================================================================== */

function initLiveStudioStatus() {
  const badgeElement = document.getElementById('live-status-badge');
  const badgeText = document.getElementById('live-status-text');

  const now = new Date();
  const day = now.getDay(); // 0 = Niedziela, 1 = Pon, 2 = Wt, 3 = Śr, 4 = Czw, 5 = Pt, 6 = Sob
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  // Harmonogram godzin studia (w minutach od północy)
  // Pon, Wt: 16:00 - 21:00 (960 - 1260)
  // Śr, Czw: 08:00 - 19:00 (480 - 1140)
  // Pt: 16:00 - 20:00 (godziny zajęć)
  let isOpen = false;
  let todayText = '';

  if (day === 1) { // Poniedziałek
    isOpen = (currentTime >= 16 * 60 && currentTime < 21 * 60);
    todayText = 'Dzisiaj otwarte 16:00 – 21:00';
  } else if (day === 2) { // Wtorek
    isOpen = (currentTime >= 16 * 60 && currentTime < 21 * 60);
    todayText = 'Dzisiaj otwarte 16:00 – 21:00';
  } else if (day === 3) { // Środa
    isOpen = (currentTime >= 8 * 60 && currentTime < 19 * 60);
    todayText = 'Dzisiaj otwarte 08:00 – 19:00';
  } else if (day === 4) { // Czwartek
    isOpen = (currentTime >= 8 * 60 && currentTime < 19 * 60);
    todayText = 'Dzisiaj otwarte 08:00 – 19:00';
  } else if (day === 5) { // Piątek
    isOpen = (currentTime >= 17 * 60 + 30 && currentTime < 20 * 60);
    todayText = 'Dzisiaj zajęcia 18:00 – 19:30';
  } else { // Sobota, Niedziela
    isOpen = false;
    todayText = 'Weekend — warsztaty & plener wg zapisów';
  }

  if (badgeElement && badgeText) {
    if (isOpen) {
      badgeElement.classList.add('open');
      badgeElement.classList.remove('closed');
      badgeText.textContent = `Otwarte teraz • ${todayText}`;
    } else {
      badgeElement.classList.add('closed');
      badgeElement.classList.remove('open');
      badgeText.textContent = `Zamknięte teraz • ${todayText}`;
    }
  }

  // Wyróżnienie dzisiejszego dnia w tabeli godzin
  const dayIndexToRowId = {
    1: 'hours-row-mon',
    2: 'hours-row-tue',
    3: 'hours-row-wed',
    4: 'hours-row-thu',
    5: 'hours-row-fri',
    6: 'hours-row-sat',
    0: 'hours-row-sun'
  };

  const targetRowId = dayIndexToRowId[day];
  if (targetRowId) {
    const rowEl = document.getElementById(targetRowId);
    if (rowEl) {
      rowEl.classList.add('is-today');
    }
  }
}

/* ==========================================================================
   3. NAWIGACJA MOBILNA (HAMBURGER & SCROLL)
   ========================================================================== */

function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    hamburgerBtn.innerHTML = isOpen 
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (hamburgerBtn) {
        hamburgerBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   4. MODALE / LIGHTBOX DLA PLAKATU I GRAFIKU
   ========================================================================== */

function initModals() {
  const modalOverlay = document.getElementById('image-modal-overlay');
  const modalImage = document.getElementById('modal-view-image');
  const modalClose = document.getElementById('modal-close-btn');

  const openPosterTriggers = document.querySelectorAll('[data-open-poster]');
  const openScheduleTriggers = document.querySelectorAll('[data-open-harmonogram]');

  if (!modalOverlay || !modalImage || !modalClose) return;

  const openModal = (src, alt) => {
    modalImage.src = src;
    modalImage.alt = alt;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openPosterTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('assets/images/poster.png', 'Oficjalny plakat Om Shala Joga');
    });
  });

  openScheduleTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('assets/images/harmonogram.png', 'Oficjalny harmonogram zajęć Om Shala Joga');
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. FORMULARZ KONTAKTOWY
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('studio-contact-form');
  const statusBox = document.getElementById('contact-form-status');

  if (!form || !statusBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#contact-name')?.value;
    
    statusBox.textContent = `Dziękujemy ${name || ''}! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe 🙏`;
    statusBox.classList.add('success');
    statusBox.style.display = 'block';

    form.reset();

    setTimeout(() => {
      statusBox.style.display = 'none';
      statusBox.classList.remove('success');
    }, 6000);
  });
}
