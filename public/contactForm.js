/**
 * public/js/contactForm.js
 */

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Use EmailJS to send the form
    emailjs.sendForm(
      'service_0zchqdd',   // e.g. 'service_123abc'
      'template_uo47bo2',  // e.g. 'template_xy123'
      '#contactForm'       // the CSS selector of the form
    )
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      formStatus.style.color = 'green';
      formStatus.textContent = 'Email sent successfully!';
      contactForm.reset();
    }, function(error) {
      console.error('FAILED...', error);
      formStatus.style.color = 'red';
      formStatus.textContent = 'Oops! Something went wrong. Please try again.';
    });
  });
}
