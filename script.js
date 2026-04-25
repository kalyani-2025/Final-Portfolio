/* ============================================================
   K. Venkata Kalyani — Portfolio Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── 2. SKILL BARS ── */
  const skillSection = document.querySelector('#skills');
  if (skillSection) {
    const skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar-fill').forEach(function (bar) {
            bar.style.width = bar.dataset.width + '%';
          });
        }
      });
    }, { threshold: 0.3 });
    skillObserver.observe(skillSection);
  }

  /* ── 3. CONTACT FORM SUBMISSION ── */
  var sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var name    = document.getElementById('contactName').value.trim();
      var email   = document.getElementById('contactEmail').value.trim();
      var message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }

      var contactData = {
        name: name,
        email: email,
        message: message,
        submittedAt: new Date().toISOString()
      };

      var storedMessages = JSON.parse(localStorage.getItem('contactFormSubmissions')) || [];
      storedMessages.push(contactData);
      localStorage.setItem('contactFormSubmissions', JSON.stringify(storedMessages));

      console.log('Contact form submissions:', storedMessages);

      var orig = sendBtn.textContent;
      sendBtn.textContent = 'Message Sent ✓';
      sendBtn.style.background = '#5a7a4a';
      sendBtn.disabled = true;

      setTimeout(function () {
        sendBtn.textContent = orig;
        sendBtn.style.background = '';
        sendBtn.disabled = false;
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
      }, 3000);
    });
  }

  /* ── 4. NEWSLETTER SUBSCRIBE ── */
  var subBtn = document.getElementById('subscribeBtn');
  if (subBtn) {
    subBtn.addEventListener('click', function () {
      var emailInput = document.getElementById('newsletterEmail');
      if (!emailInput || !emailInput.value.trim()) {
        alert('Please enter your email address.');
        return;
      }
      var orig = subBtn.textContent;
      subBtn.textContent = 'Subscribed ✓';
      subBtn.style.background = '#5a7a4a';
      setTimeout(function () {
        subBtn.textContent = orig;
        subBtn.style.background = '';
        emailInput.value = '';
      }, 2500);
    });
  }

  /* ── 5. ACTIVE NAV LINK ON SCROLL ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    var current = '';

    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--accent)';
      }
    });
  });

});