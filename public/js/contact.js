async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
        }
        const headerContent = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerContent;

        // Set active tab
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'contact.html') {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error loading header:', error);
        document.getElementById('header-placeholder').innerHTML = '<p>Error loading header</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async (e) => { // Line ~40
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit contact form'); // Line 48
            }

            formMessage.innerHTML = '<p style="color: green;">Message sent successfully!</p>';
            contactForm.reset();
        } catch (error) {
            console.error('Error submitting contact form:', error); // Line 54
            formMessage.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        }
    });
});