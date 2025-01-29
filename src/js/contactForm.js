/**
 * public/js/contactForm.js
 */

// Get references to our form and status div
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent normal page reload

    // Collect the form fields
    const formData = new FormData(contactForm);
    const data = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      // Send a POST request to our Node server's /send_email endpoint
      const response = await fetch('/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      // Parse the server response
      const result = await response.json();

      if (response.ok) {
        // Success
        formStatus.style.color = 'green';
        formStatus.textContent = result.success || 'Email sent successfully!';
        // Optionally clear form fields
        contactForm.reset();
      } else {
        // Server returned an error status
        formStatus.style.color = 'red';
        formStatus.textContent = result.error || 'Error sending email.';
      }

    } catch (err) {
      // Network or other error
      console.error(err);
      formStatus.style.color = 'red';
      formStatus.textContent = 'An error occurred. Please try again.';
    }
  });
}
