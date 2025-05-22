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