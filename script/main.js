const header = document.querySelector('header'),
      header_height = header.clientHeight,
      ul = header.querySelector('.nav-menu'),
      nav_link = ul.querySelectorAll('li'),
      toggle_button = header.querySelector('.toggle-btn'),
      overlay = document.querySelector('.main-overlay');

function show_menu() {
  if (ul.style.maxHeight) {
    overlay.classList.remove('show');
    ul.style.maxHeight = null;
    toggle_button.classList.remove('trans');
  } else {
    overlay.classList.add('show');
    ul.style.maxHeight = `${ul.scrollHeight}px`;
    toggle_button.classList.add('trans');
  }
}

toggle_button.addEventListener('click',show_menu);

overlay.addEventListener('click',show_menu);

function link_action() {
  ul.style.maxHeight = null;
  toggle_button.classList.remove('trans');
}

nav_link.forEach(el => {
  el.addEventListener('click',el => {
    el.preventDefault();
    const id = el.target.getAttribute('href').slice(1),
          element = document.getElementById(id),
          position = element.offsetTop - header_height;

    window.scrollTo({left: 0,top: position});
    link_action();
  });
});

function scroll_header() {
  this.scrollY > (header_height / 2) ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
}

window.addEventListener('scroll',scroll_header);

const scroll_top_btn = document.querySelector('.scroll-top');

function scroll_top() {
  this.scrollY > 560 ? scroll_top_btn.classList.add('show-scroll') : scroll_top_btn.classList.remove('show-scroll');
}

window.addEventListener('scroll',scroll_top);

scroll_top_btn.addEventListener('click',() => {
  window.scrollTo(0,0);
  if (overlay.classList.contains('show')) {
    overlay.classList.remove('show');
    link_action();
  }
});

const class_name = 'dark-mode',
      body = document.body,
      dark_mode_btn = document.getElementById(`${class_name}`),
      span = dark_mode_btn.querySelector('span');

let selected_theam = localStorage.getItem('selected-theam');

if (selected_theam === class_name) enable_dark_mode();

dark_mode_btn.addEventListener('click',() => {
  selected_theam = localStorage.getItem('selected-theam');
  selected_theam !== class_name ? enable_dark_mode() : disabled_dark_mode();
});

function enable_dark_mode() {
  body.classList.add(`${class_name}`);
  span.classList.add('dark-active');
  localStorage.setItem('selected-theam',class_name);
}

function disabled_dark_mode() {
  body.classList.remove(`${class_name}`);
  span.classList.remove('dark-active');
  localStorage.setItem('selected-theam',null);
}

function scroll_action() {
  const scroll_y = window.scrollY,
        section = document.querySelectorAll('section[id]');

  section.forEach(el => {
    const section_height = el.offsetHeight,
          section_top = el.offsetTop - 104,
          section_id = el.id;

    if (scroll_y > section_top && scroll_y <= section_top + section_height) {
      nav_link.forEach(el => {
        if (el.firstElementChild.getAttribute('href').slice(1) === section_id) el.classList.add('active');
        else el.classList.remove('active');
      });
    }
  });
}

if (window.scrollY > 576) window.addEventListener('scroll',scroll_action);