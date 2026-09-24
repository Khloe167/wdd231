// Set hidden timestamp field when form loads
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal dialog controls
    const modals = [
        { btn: 'np-btn', modal: 'np-modal' },
        { btn: 'bronze-btn', modal: 'bronze-modal' },
        { btn: 'silver-btn', modal: 'silver-modal' },
        { btn: 'gold-btn', modal: 'gold-modal' }
    ];

    modals.forEach(pair => {
        const button = document.getElementById(pair.btn);
        const dialog = document.getElementById(pair.modal);

        if (button && dialog) {
            button.addEventListener('click', () => dialog.showModal());

            const closeButton = dialog.querySelector('.close-modal');
            if (closeButton) {
                closeButton.addEventListener('click', () => dialog.close());
            }

            // Close modal when clicking on backdrop
            dialog.addEventListener('click', (event) => {
                const rect = dialog.getBoundingClientRect();
                if (
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom
                ) {
                    dialog.close();
                }
            });
        }
    });

    // Navigation toggle (matching directory.js logic)
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => navList.classList.toggle('open'));
    }

    // Dynamic footer dates
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
});