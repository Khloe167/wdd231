// Fetch and Display Members
const url = 'data/members.json';
const container = document.getElementById('members-container');

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = ''; // Clear existing content

    members.forEach((member) => {
        const card = document.createElement('section');
        
        // Map membership numerical level to text
        let levelText = ' Member';
        if (member.membership === 2) levelText = ' Silver Member';
        if (member.membership === 3) levelText = ' Gold Member';

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <p class="membership-level"><strong>Membership:</strong> ${levelText}</p>
        `;

        container.appendChild(card);
    });
}

getMembers();

// Toggle Grid and List Views
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid');
    container.classList.remove('list');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list');
    container.classList.remove('grid');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// Navigation Toggle for Mobile View
const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
});

// Footer Metadata (Year & Last Modification Date)
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;