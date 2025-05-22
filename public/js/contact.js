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

async function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('form-message');

    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            formMessage.textContent = 'Message sent successfully!';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        } else {
            formMessage.textContent = 'Error sending message.';
        }
    } catch (error) {
        formMessage.textContent = 'Error connecting to server.';
        console.error(error);
    }
}