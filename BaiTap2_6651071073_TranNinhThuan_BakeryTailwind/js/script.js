// Menu điện thoại, kiểm tra form và cập nhật mục điều hướng đang xem.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const openIcon = document.querySelector('#menu-open-icon');
  const closeIcon = document.querySelector('#menu-close-icon');
  const desktopQuery = window.matchMedia('(min-width: 768px)');

  const setMenuOpen = (isOpen) => {
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenu.classList.toggle('flex', isOpen);
    openIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  // Hiện trạng thái menu đúng với khu vực đang nằm trong màn hình.
  const menuLinks = [...document.querySelectorAll('.menu-link')];
  const observedSections = [...new Set(menuLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean))];

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        menuLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px' });

    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  // Kiểm tra thông tin cơ bản trước khi xác nhận yêu cầu đặt bánh.
  const form = document.querySelector('#order-form');
  const message = document.querySelector('#form-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const validPhone = /^0\d{9}$/.test(phone);

    if (!name) {
      message.textContent = 'Bạn vui lòng nhập họ và tên nhé.';
      message.className = 'min-h-6 text-sm font-bold text-berry-700';
      form.elements.name.focus();
      return;
    }

    if (!validPhone) {
      message.textContent = 'Số điện thoại cần có 10 chữ số và bắt đầu bằng số 0.';
      message.className = 'min-h-6 text-sm font-bold text-berry-700';
      form.elements.phone.focus();
      return;
    }

    message.textContent = 'Thông tin hợp lệ rồi! Bếp sẽ liên hệ bạn để xác nhận đơn nhé.';
    message.className = 'min-h-6 text-sm font-bold text-pistachio-700';
    form.reset();
  });
});
