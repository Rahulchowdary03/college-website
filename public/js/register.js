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
            if (link.getAttribute('href') === 'register.html') {
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

    const form = document.getElementById('register-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            course: formData.get('course')
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to register');
            }
            formMessage.style.color = 'green';
            formMessage.textContent = result.message;
            form.reset();
        } catch (error) {
            formMessage.style.color = 'red';
            formMessage.textContent = error.message;
        }
    });
});