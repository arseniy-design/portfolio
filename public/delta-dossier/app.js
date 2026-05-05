/* ====================================================================
   THE DELTA DOSSIER — Interactive Behavior
   - Dark mode toggle
   - Chart.js visualizations
   - Scroll reveal (IntersectionObserver fallback)
   - Scenario card expand/collapse
   - Number count-up animation
   - Probability bar animation
   ==================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* DARK MODE TOGGLE                                                    */
  /* ------------------------------------------------------------------ */
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
      // Re-render charts with new colors
      renderCharts();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* ------------------------------------------------------------------ */
  /* COLOR HELPERS                                                       */
  /* ------------------------------------------------------------------ */
  function getColor(varName) {
    return getComputedStyle(root).getPropertyValue(varName).trim();
  }

  function chartColors() {
    return {
      text: getColor('--color-text'),
      muted: getColor('--color-text-muted'),
      faint: getColor('--color-text-faint'),
      accent: getColor('--color-accent'),
      success: getColor('--color-success'),
      error: getColor('--color-error'),
      border: getColor('--color-border'),
      surface: getColor('--color-surface'),
      grid: getColor('--color-divider'),
    };
  }

  /* ------------------------------------------------------------------ */
  /* SCROLL REVEAL (IntersectionObserver fallback for browsers without   */
  /* scroll-driven animations)                                           */
  /* ------------------------------------------------------------------ */
  if (!CSS.supports('animation-timeline', 'scroll()')) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* NUMBER COUNT-UP                                                     */
  /* ------------------------------------------------------------------ */
  function animateCountUp(el) {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(1);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Observe count-up elements
  const countEls = document.querySelectorAll('[data-count-to]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObserver.observe(el));

  /* ------------------------------------------------------------------ */
  /* PROBABILITY BAR ANIMATION                                           */
  /* ------------------------------------------------------------------ */
  const barFills = document.querySelectorAll('[data-fill]');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.dataset.fill;
        entry.target.style.width = fill + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  barFills.forEach(el => barObserver.observe(el));

  /* ------------------------------------------------------------------ */
  /* SCENARIO CARD EXPAND/COLLAPSE                                       */
  /* ------------------------------------------------------------------ */
  const scenarioCards = document.querySelectorAll('.scenario-card');
  scenarioCards.forEach(card => {
    card.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');
      // Collapse all
      scenarioCards.forEach(c => c.classList.remove('expanded'));
      // Toggle clicked
      if (!wasExpanded) {
        card.classList.add('expanded');
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* NAV ACTIVE STATE                                                    */
  /* ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.topnav__links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  /* ------------------------------------------------------------------ */
  /* CHARTS — wait for Chart.js to load                                  */
  /* ------------------------------------------------------------------ */
  let epsChart, movesChart, ivChart;

  function waitForChartJS(cb) {
    if (typeof Chart !== 'undefined') {
      cb();
    } else {
      setTimeout(() => waitForChartJS(cb), 100);
    }
  }

  waitForChartJS(() => {
    Chart.defaults.font.family = "'Satoshi', 'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    renderCharts();
  });

  function renderCharts() {
    const c = chartColors();

    // ------ EPS: Actual vs Estimate ------
    const epsCtx = document.getElementById('chart-eps');
    if (!epsCtx) return;

    if (epsChart) epsChart.destroy();
    epsChart = new Chart(epsCtx, {
      type: 'bar',
      data: {
        labels: ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026E'],
        datasets: [
          {
            label: 'Estimate',
            data: [1.75, 0.59, 2.28, 1.92, 1.70, 0.70],
            backgroundColor: c.border,
            borderRadius: 3,
            barPercentage: 0.55,
            categoryPercentage: 0.7,
          },
          {
            label: 'Actual',
            data: [1.85, 0.46, 2.36, 1.98, 1.79, null],
            backgroundColor: function(ctx) {
              if (ctx.dataIndex === 5) return 'transparent';
              const est = [1.75, 0.59, 2.28, 1.92, 1.70];
              const act = [1.85, 0.46, 2.36, 1.98, 1.79];
              return act[ctx.dataIndex] >= est[ctx.dataIndex] ? c.success : c.error;
            },
            borderRadius: 3,
            barPercentage: 0.55,
            categoryPercentage: 0.7,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: c.muted, boxWidth: 12, padding: 16, font: { size: 11 } }
          },
          tooltip: {
            backgroundColor: c.surface,
            titleColor: c.text,
            bodyColor: c.muted,
            borderColor: c.border,
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: function(ctx) {
                return ctx.dataset.label + ': $' + (ctx.parsed.y !== null ? ctx.parsed.y.toFixed(2) : '—');
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: c.faint, font: { size: 11 } }
          },
          y: {
            grid: { color: c.grid, lineWidth: 0.5 },
            ticks: { color: c.faint, font: { size: 11 }, callback: v => '$' + v.toFixed(2) },
            beginAtZero: true
          }
        }
      }
    });

    // ------ Post-Earnings Moves ------
    const movesCtx = document.getElementById('chart-moves');
    if (!movesCtx) return;

    const moveData = [6.2, -7.5, 10.3, 4.8, 12.1, -8.4];
    const moveLabels = ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Implied'];

    if (movesChart) movesChart.destroy();
    movesChart = new Chart(movesCtx, {
      type: 'bar',
      data: {
        labels: moveLabels,
        datasets: [{
          label: '1-Day Move %',
          data: moveData,
          backgroundColor: moveData.map((v, i) => {
            if (i === 5) return c.accent + '66';
            return v >= 0 ? c.success : c.error;
          }),
          borderRadius: 3,
          barPercentage: 0.6,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: c.surface,
            titleColor: c.text,
            bodyColor: c.muted,
            borderColor: c.border,
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx => (ctx.parsed.x > 0 ? '+' : '') + ctx.parsed.x.toFixed(1) + '%'
            }
          }
        },
        scales: {
          x: {
            grid: { color: c.grid, lineWidth: 0.5 },
            ticks: { color: c.faint, font: { size: 11 }, callback: v => v + '%' }
          },
          y: {
            grid: { display: false },
            ticks: { color: c.faint, font: { size: 11 } }
          }
        }
      }
    });

    // ------ Implied vs Realized Move ------
    const ivCtx = document.getElementById('chart-iv');
    if (!ivCtx) return;

    if (ivChart) ivChart.destroy();
    ivChart = new Chart(ivCtx, {
      type: 'bar',
      data: {
        labels: ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026E'],
        datasets: [
          {
            label: 'Implied Move',
            data: [7.5, 8.0, 8.5, 9.0, 8.8, 9.4],
            backgroundColor: c.accent + '55',
            borderColor: c.accent,
            borderWidth: 1,
            borderRadius: 3,
            barPercentage: 0.55,
            categoryPercentage: 0.7,
          },
          {
            label: 'Realized Move',
            data: [6.2, 7.5, 10.3, 4.8, 12.1, null],
            backgroundColor: c.text + '33',
            borderColor: c.text + '88',
            borderWidth: 1,
            borderRadius: 3,
            barPercentage: 0.55,
            categoryPercentage: 0.7,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: c.muted, boxWidth: 12, padding: 16, font: { size: 11 } }
          },
          tooltip: {
            backgroundColor: c.surface,
            titleColor: c.text,
            bodyColor: c.muted,
            borderColor: c.border,
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx => ctx.dataset.label + ': ±' + (ctx.parsed.y !== null ? ctx.parsed.y.toFixed(1) : '—') + '%'
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: c.faint, font: { size: 11 } }
          },
          y: {
            grid: { color: c.grid, lineWidth: 0.5 },
            ticks: { color: c.faint, font: { size: 11 }, callback: v => '±' + v + '%' },
            beginAtZero: true
          }
        }
      }
    });
  }

})();
