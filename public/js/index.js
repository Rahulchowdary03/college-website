document.addEventListener('DOMContentLoaded', () => {
    // Load header
    async function loadHeader() {
        try {
            const response = await fetch('header.html');
            if (!response.ok) {
                throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
            }
            const headerContent = await response.text();
            document.getElementById('header-placeholder').innerHTML = headerContent;

            // Set active tab for Home by default
            const navLinks = document.querySelectorAll('nav ul li a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'index.html' && window.location.hash !== '#admin') {
                    link.classList.add('active');
                }
            });

            // Attach admin tab event listener after header is loaded
            const adminTab = document.getElementById('admin-tab');
            const adminSection = document.getElementById('admin-section');
            const homeSection = document.getElementById('home');

            if (adminTab && adminSection && homeSection) {
                adminTab.addEventListener('click', (e) => {
                    e.preventDefault();
                    showAdminSection(navLinks, adminTab, homeSection, adminSection);
                });

                // Check if the URL has #admin and trigger the admin section
                if (window.location.hash === '#admin') {
                    showAdminSection(navLinks, adminTab, homeSection, adminSection);
                }
            }
        } catch (error) {
            console.error('Error loading header:', error);
            document.getElementById('header-placeholder').innerHTML = '<p>Error loading header</p>';
        }
    }

    function showAdminSection(navLinks, adminTab, homeSection, adminSection) {
        // Prompt for password
        const password = prompt('Enter admin password:');
        if (password !== 'admin2025') {
            document.getElementById('admin-access-message').innerHTML = '<p style="color: red;">Access Denied: Incorrect password</p>';
            return;
        }

        // Hide home section and show admin section
        homeSection.style.display = 'none';
        adminSection.style.display = 'block';

        // Update active tab
        navLinks.forEach(link => link.classList.remove('active'));
        adminTab.classList.add('active');

        // Fetch data
        fetchContactData();
        fetchRegistrationsData();
    }

    loadHeader();

    // Fetch contact data (read-only)
    async function fetchContactData() {
        try {
            const response = await fetch('/api/admin/contact?api_key=secure-api-key-2025');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch contact data: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            const tableBody = document.getElementById('contact-table-body');
            tableBody.innerHTML = '';
            data.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="Name">${entry.name}</td>
                    <td data-label="Email">${entry.email}</td>
                    <td data-label="Message">${entry.message}</td>
                    <td data-label="Submitted At">${new Date(entry.created_at).toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching contact data:', error.message);
            document.getElementById('contact-section').innerHTML += `<p>Error loading contact data: ${error.message}</p>`;
        }
    }

    // Fetch registrations data (read/edit)
    async function fetchRegistrationsData() {
        try {
            const response = await fetch('/api/admin/registrations?api_key=secure-api-key-2025');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch registrations data: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            const tableBody = document.getElementById('registrations-table-body');
            tableBody.innerHTML = '';
            data.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="Name" class="editable" data-field="name">${entry.name}</td>
                    <td data-label="Email" class="editable" data-field="email">${entry.email}</td>
                    <td data-label="Course" class="editable" data-field="course">${entry.course}</td>
                    <td data-label="Registered At">${new Date(entry.created_at).toLocaleString()}</td>
                    <td data-label="Actions" class="actions">
                        <button onclick="editRow(this, ${entry.id})">Edit</button>
                        <button onclick="saveRow(this, ${entry.id})" style="display: none;">Save</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching registrations data:', error.message);
            document.getElementById('registrations-section').innerHTML += `<p>Error loading registrations data: ${error.message}</p>`;
        }
    }

    // Make row editable
    window.editRow = (button, id) => {
        const row = button.parentElement.parentElement;
        const editableCells = row.querySelectorAll('.editable');
        editableCells.forEach(cell => {
            const field = cell.dataset.field;
            const value = cell.textContent;
            cell.innerHTML = `<input type="text" value="${value}" data-field="${field}">`;
        });
        button.style.display = 'none';
        row.querySelector('button[onclick*="saveRow"]').style.display = 'inline';
    };

    // Save edited row
    window.saveRow = async (button, id) => {
        const row = button.parentElement.parentElement;
        const inputs = row.querySelectorAll('input');
        const updatedData = { id };
        inputs.forEach(input => {
            const field = input.dataset.field;
            updatedData[field] = input.value;
        });

        try {
            const response = await fetch(`/api/admin/registrations/${id}?api_key=secure-api-key-2025`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update registration: ${response.status} - ${errorText}`);
            }
            // Refresh the table
            fetchRegistrationsData();
        } catch (error) {
            console.error('Error updating registration:', error.message);
            alert('Error updating registration: ' + error.message);
        }
    };
});