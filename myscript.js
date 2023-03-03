// Cache the DOM elements and selectors
const sidemenu = document.getElementById("sidemenu");
const menuBtn = document.querySelector(".fas.fa-bars");
const images = document.querySelectorAll('.gallery img');
const backToTopButton = document.getElementById('back-to-top');
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

// Function to open the sidemenu
function openmenu() {
  sidemenu.style.right = "0";
}

// Function to close the sidemenu
function closemenu() {
  sidemenu.style.right = "-200px";
}

// Handle click outside the sidemenu function
function handleClickOutside(event) {
  // If the sidemenu does not contain the target
  // And the target is not the menu button, then close the menu
  if (!sidemenu.contains(event.target) && event.target !== menuBtn) {
    closemenu();
  }
}

// Remove zoom class from all images except the clicked one
function removeZoomClass(image) {
  images.forEach(img => {
    if (img !== image) {
      img.classList.remove('zoom');
    }
  });
}

// Add click event listeners to images in gallery
function addClickEventToImages() {
  images.forEach(image => {
    image.addEventListener('click', () => {
      if (image.classList.contains('zoom')) {
        image.classList.remove('zoom');
      } else {
        removeZoomClass(image);
        image.classList.add('zoom');
      }
    });
  });
}

// Reset message after two seconds
function resetMessage() {
  setTimeout(function () {
    msg.innerHTML = ""
  }, 2000)
}

// Create a function to handle form submission
function handleFormSubmission(e) {
  e.preventDefault(); // Prevent the default action
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      // On response, set the innerHTML of the msg element to success
      msg.innerHTML = "Message sent Successfully";
      resetMessage();
      form.reset(); // Reset the form
    })
    .catch(error => {
      console.error('Error!', error.message); // Log the error message for debugging
    });
}

// Add event listeners on load
window.addEventListener('load', () => {
  // Add event listener to close sidemenu when scrolling down
  window.addEventListener('scroll', () => {
    if (sidemenu.style.right === "0px") {
      closemenu();
    }
    // Update visibility and opacity of 'back-to-top' button
    if (window.scrollY > 800 || document.documentElement.scrollTop > 800) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.visibility = 'visible';
      backToTopButton.style.transitionDelay = '0s';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
      backToTopButton.style.transitionDelay = '0.3s';
    }
  });

  // Add event listener to handle click outside the sidemenu
  document.addEventListener("click", handleClickOutside);

  // Add event listener to images in gallery
  addClickEventToImages();

  // Add submit event listener to the form
  form.addEventListener('submit', handleFormSubmission);

  // Add click event listener to the body to remove the zoom class from all images
  document.addEventListener('click', event => {
    if (!event.target.matches('.gallery img')) {
      images.forEach(img => img.classList.remove('zoom'));
    }
  });
});

// Function used to reset the document body and document element's scroll position to 0
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
