const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program structure.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more proficient in writing code functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces object-oriented programming concepts.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students focus on user experience, accessibility, and optimization.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const container = document.getElementById('courses-container');
const totalCreditsEl = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    container.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.classList.add(course.completed ? 'completed' : 'not-completed');
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    // Calculate total credits dynamically using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;
}

// Event Listeners for Filters
document.getElementById('all').addEventListener('click', () => displayCourses(courses));
document.getElementById('cse').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});
document.getElementById('wdd').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

// Initial Render
displayCourses(courses);