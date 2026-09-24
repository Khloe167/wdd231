document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results');
    const currentUrl = window.location.href;

    if (currentUrl.includes('?')) {
        const formData = currentUrl.split('?')[1];
        const urlParams = new URLSearchParams(formData);

        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${urlParams.get('first_name') || 'N/A'}</p>
            <p><strong>Last Name:</strong> ${urlParams.get('last_name') || 'N/A'}</p>
            <p><strong>Email:</strong> ${decodeURIComponent(urlParams.get('email') || 'N/A')}</p>
            <p><strong>Mobile Phone:</strong> ${urlParams.get('phone') || 'N/A'}</p>
            <p><strong>Business Name:</strong> ${decodeURIComponent((urlParams.get('business_name') || 'N/A').replace(/\+/g, ' '))}</p>
            <p><strong>Submission Timestamp:</strong> ${decodeURIComponent(urlParams.get('timestamp') || 'N/A')}</p>
        `;
    } else {
        resultsContainer.innerHTML = `<p>No application data found. Please complete the form on the Join page.</p>`;
    }

    // Navigation toggle
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => navList.classList.toggle('open'));
    }

    // Dynamic footer dates
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
});