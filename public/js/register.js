async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
        }
        const headerContent = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerContent;
    } catch (error) {
        console.error('Error loading header:', error);
        document.getElementById('header-placeholder').innerHTML = '<p>Error loading header</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);

async function submitRegistration() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const course = document.getElementById('course').value;
    const formMessage = document.getElementById('register-form-message');

    if (!name || !email || !course) {
        formMessage.textContent = 'Please fill in all fields.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, course }),
        });

        if (response.ok) {
            formMessage.textContent = 'Registration successful!';
            document.getElementById('reg-name').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('course').value = '';
        } else {
            formMessage.textContent = 'Error submitting registration.';
        }
    } catch (error) {
        formMessage.textContent = 'Error connecting to server.';
        console.error(error);
    }
}