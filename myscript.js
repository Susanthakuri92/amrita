// --------------------navbar-------------------------
const navbar = document.querySelector('nav');
const sidemenu = document.querySelector('#sidemenu');
const backToTopButton = document.querySelector('#back-to-top');

function openmenu() {
  sidemenu.style.right = "0px";
}

function closemenu() {
  sidemenu.style.right = "-300px";
}

window.addEventListener('load', () => {
  window.addEventListener('scroll', () => {
    if (sidemenu.style.right === "0px") {
      closemenu();
    }
  });

  document.addEventListener('click', (event) => {
    const isClickInside = navbar.contains(event.target);
    if (!isClickInside && sidemenu.style.right === "0px") {
      closemenu();
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 800 || document.documentElement.scrollTop > 800) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.visibility = 'visible';
      backToTopButton.style.transitionDelay = '0s';

      if (document.querySelector('.gallery img.zoom')) {
        removeZoomClass(document.querySelector('.gallery img.zoom'));
      }
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
      backToTopButton.style.transitionDelay = '0.3s';
    }

    backToTopButton.addEventListener('click', () => {
      topFunction();
    });

    function topFunction() {
      document.body.scrollTop = 0; 
      document.documentElement.scrollTop = 0; 
    }
  });
  const transitionTime = 0.43; // seconds
  navbar.style.transition = `opacity ${transitionTime}s, visibility ${transitionTime}s`;
  sidemenu.style.transition = `right ${transitionTime}s`;
  backToTopButton.style.transition = `opacity ${transitionTime}s, visibility ${transitionTime}s, transition-delay ${transitionTime}s`;
});

// -----------------image---gallery----------
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    if (image.classList.contains('zoom')) {
      removeZoomClass(image);
    } else {
      if (document.querySelector('.gallery img.zoom')) {
        removeZoomClass(document.querySelector('.gallery img.zoom'));
      }
      image.classList.add('zoom');
    }
  });
});

window.addEventListener('scroll', () => {
  if (document.querySelector('.gallery img.zoom')) {
    removeZoomClass(document.querySelector('.gallery img.zoom'));
  }
});

function removeZoomClass(image) {
  image.classList.remove('zoom');
}
// ------------FORM----------
const scriptURL = 'https://script.google.com/macros/s/AKfycbx-r0LRqecSWLpfQXgxUUgo0TyoSMk7jZKmuoGzzDcZq13voNplL_9Zc7wvZOJVerxu/exec'
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        console.log('Success!', response);
        msg.innerHTML = "Your message has been sent successfully!";
        form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
