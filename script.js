// DOM Elements
const tabs = document.querySelectorAll('.tab');
const townName = document.getElementById('currentTown');
const changeTownBtn = document.querySelector('.change-town');
const joinDiscussionBtn = document.querySelector('.join-discussion');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation-tabs');

// Tab Navigation
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Here you would typically update the content based on the selected tab
        updateContent(tab.dataset.tab);
    });
});

// Location handling
function updateLocation(town, city, state, country) {
    document.getElementById('currentTown').textContent = town;
    document.getElementById('cityState').textContent = `${city}, ${state}`;
    document.getElementById('country').textContent = country;
}

// Calendar Implementation
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

let currentDate = new Date();
let selectedMonth = currentDate.getMonth();
let selectedYear = 2025;

// Sample events data for 2025
const events2025 = {
    '1-5': ['Town Hall Meeting'],
    '1-12': ['Community Festival'],
    '2-15': ['Local Market Day'],
    '3-25': ['Sports Tournament'],
    '4-10': ['Spring Fair'],
    '5-20': ['Music Festival'],
    '6-15': ['Summer Beach Party'],
    '7-4': ['Independence Day Celebration'],
    '8-12': ['Food Festival'],
    '9-5': ['Art Exhibition'],
    '10-31': ['Halloween Parade'],
    '12-25': ['Christmas Celebration']
};

function initializeCalendar() {
    const monthSelect = document.getElementById('monthSelect');
    monthNames.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    monthSelect.value = selectedMonth;

    monthSelect.addEventListener('change', (e) => {
        selectedMonth = parseInt(e.target.value);
        renderCalendar();
    });

    document.getElementById('todayBtn').addEventListener('click', () => {
        selectedMonth = new Date().getMonth();
        monthSelect.value = selectedMonth;
        renderCalendar();
    });

    renderCalendar();
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const today = new Date();

    let calendarHTML = `
        <div class="calendar-grid">
            <div class="weekday">Sun</div>
            <div class="weekday">Mon</div>
            <div class="weekday">Tue</div>
            <div class="weekday">Wed</div>
            <div class="weekday">Thu</div>
            <div class="weekday">Fri</div>
            <div class="weekday">Sat</div>
    `;

    // Previous month's days
    const prevMonthDays = firstDay.getDay();
    const prevMonth = new Date(selectedYear, selectedMonth, 0);
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        calendarHTML += `<div class="day other-month">${prevMonth.getDate() - i}</div>`;
    }

    // Current month's days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(selectedYear, selectedMonth, day);
        const classes = ['day'];

        // Check if it's today
        if (date.toDateString() === today.toDateString()) {
            classes.push('today');
        }

        // Check for events
        const eventKey = `${selectedMonth + 1}-${day}`;
        if (events2025[eventKey]) {
            classes.push('has-event');
        }

        calendarHTML += `
            <div class="${classes.join(' ')}" data-date="${selectedYear}-${selectedMonth + 1}-${day}">
                ${day}
            </div>`;
    }

    // Next month's days
    const remainingDays = 42 - (prevMonthDays + lastDay.getDate()); // 42 is 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
        calendarHTML += `<div class="day other-month">${i}</div>`;
    }

    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;

    // Add event listeners to days
    const days = calendar.querySelectorAll('.day:not(.other-month)');
    days.forEach(day => {
        day.addEventListener('click', () => {
            const [year, month, date] = day.dataset.date.split('-');
            const eventKey = `${month}-${date}`;
            if (events2025[eventKey]) {
                alert(`Events on ${monthNames[month - 1]} ${date}, ${year}:\n${events2025[eventKey].join('\n')}`);
            }
        });
    });
}

// Update content based on selected tab
function updateContent(tabName) {
    // This function would fetch and display content based on the selected tab
    console.log(`Updating content for ${tabName} tab`);
}

// Change town functionality
changeTownBtn.addEventListener('click', () => {
    const newTown = prompt('Enter town name:');
    if (newTown) {
        // In a real application, you would fetch the city, state, and country data
        updateLocation(newTown, 'New City', 'State', 'Country');
    }
});

// Join discussion functionality
joinDiscussionBtn.addEventListener('click', () => {
    // Here you would implement login/registration logic
    alert('Please log in or create an account to join the discussion');
});

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
    // Set initial location
    updateLocation('Carbondale, CO', 'New York', 'NY', 'United States');
});

// Sample news items with better images
const sampleNews = [
    {
        title: 'Local Park Renovation Complete',
        content: 'The central park renovation project has been completed ahead of schedule...',
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop',
        category: 'Local News',
        date: 'Feb 6, 2025',
        author: 'Town Council'
    },
    {
        title: 'Community Festival Announcement',
        content: 'Get ready for the biggest community festival of the year...',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop',
        category: 'Events',
        date: 'Feb 6, 2025',
        author: 'Event Committee'
    }
];

// Function to render news items
function renderNews(newsItems) {
    const newsFeed = document.getElementById('news-feed');
    newsItems.forEach(item => {
        const article = document.createElement('article');
        article.className = 'news-item';
        article.innerHTML = `
            <div class="news-image" style="background-image: url('${item.image}')">
                <div class="news-category">${item.category}</div>
            </div>
            <div class="news-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <div class="meta">
                    <span class="date">${item.date}</span>
                    <span class="author">By ${item.author}</span>
                </div>
            </div>
        `;
        newsFeed.appendChild(article);
    });
}

// Sample activities data
const activities = [
    {
        icon: 'fas fa-users',
        title: 'Community Meetup',
        description: '25 people joined the downtown cleanup initiative',
        time: '2 hours ago'
    },
    {
        icon: 'fas fa-calendar-check',
        title: 'New Event Added',
        description: 'Summer Festival scheduled for June 15',
        time: '5 hours ago'
    },
    {
        icon: 'fas fa-comment-alt',
        title: 'Discussion Update',
        description: '15 new comments on "Town Park Renovation"',
        time: '1 day ago'
    },
    {
        icon: 'fas fa-store',
        title: 'New Business Listed',
        description: 'Welcome "Green Cafe" to our community',
        time: '2 days ago'
    }
];

// Function to add a new activity
function addNewActivity(activity, animate = true) {
    const activityList = document.querySelector('.activity-list');
    const activityItem = document.createElement('div');
    activityItem.className = `activity-item${animate ? ' new' : ''}`;

    activityItem.innerHTML = `
        <div class="activity-icon">
            <i class="${activity.icon}"></i>
        </div>
        <div class="activity-content">
            <h4>${activity.title}</h4>
            <p>${activity.description}</p>
            <span class="activity-time">${activity.time}</span>
        </div>
    `;

    // Add click event to show more details
    activityItem.addEventListener('click', () => {
        showActivityDetails(activity);
    });

    // Insert at the beginning of the list
    activityList.insertBefore(activityItem, activityList.firstChild);

    // Remove animation class after animation completes
    if (animate) {
        setTimeout(() => {
            activityItem.classList.remove('new');
        }, 500);
    }
}

// Function to show activity details
function showActivityDetails(activity) {
    const details = `
        ${activity.title}
        
        ${activity.description}
        Posted: ${activity.time}
        
        Click OK to interact with this activity.
    `;

    if (confirm(details)) {
        // Handle interaction based on activity type
        switch (activity.icon) {
            case 'fas fa-users':
                alert('Redirecting to community meetup page...');
                break;
            case 'fas fa-calendar-check':
                alert('Opening event details...');
                break;
            case 'fas fa-comment-alt':
                alert('Opening discussion thread...');
                break;
            case 'fas fa-store':
                alert('Opening business profile...');
                break;
        }
    }
}

// Initialize activities
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing activities without animation
    activities.forEach(activity => {
        addNewActivity(activity, false);
    });

    // Simulate new activity every 30 seconds
    setInterval(() => {
        const newActivity = {
            icon: 'fas fa-bell',
            title: 'New Update',
            description: 'Something interesting just happened in the community!',
            time: 'Just now'
        };
        addNewActivity(newActivity);
    }, 30000);
});

// Leaderboard Data
const leaderboardData = {
    weekly: [
        {
            name: 'Sarah Johnson',
            role: 'Community Leader',
            points: 1250,
            events: 15,
            rank: 1
        },
        {
            name: 'Mike Chen',
            points: 950,
            rank: 2,
            badge: 'award'
        },
        {
            name: 'Emma Davis',
            points: 820,
            rank: 3,
            badge: 'medal'
        },
        {
            name: 'Alex Turner',
            points: 780,
            rank: 4
        },
        {
            name: 'Lisa Wong',
            points: 650,
            rank: 5
        }
    ],
    monthly: [
        {
            name: 'Mike Chen',
            role: 'Event Organizer',
            points: 4250,
            events: 25,
            rank: 1
        },
        {
            name: 'Sarah Johnson',
            points: 3950,
            rank: 2,
            badge: 'award'
        },
        {
            name: 'David Park',
            points: 3820,
            rank: 3,
            badge: 'medal'
        },
        {
            name: 'Emma Davis',
            points: 3780,
            rank: 4
        },
        {
            name: 'Alex Turner',
            points: 3650,
            rank: 5
        }
    ]
};

// Initialize Leaderboard
function initializeLeaderboard() {
    const leaderboardTabs = document.querySelectorAll('.leaderboard-tab');
    leaderboardTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            leaderboardTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update leaderboard content
            updateLeaderboard(tab.dataset.tab);
        });
    });

    // Initialize with weekly data
    updateLeaderboard('weekly');
}

// Update Leaderboard Content
function updateLeaderboard(period) {
    const data = leaderboardData[period];
    const topContributor = data[0];

    // Update top contributor card
    const topCard = document.querySelector('.contributor-card.top');
    topCard.innerHTML = `
        <div class="rank">${topContributor.rank}</div>
        <div class="contributor-avatar">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="contributor-info">
            <h4>${topContributor.name}</h4>
            <p>${topContributor.role || 'Top Contributor'}</p>
            <div class="contribution-stats">
                <span><i class="fas fa-star"></i> ${topContributor.points.toLocaleString()} points</span>
                ${topContributor.events ? `<span><i class="fas fa-hands-helping"></i> ${topContributor.events} events</span>` : ''}
            </div>
        </div>
    `;

    // Update other contributors
    const contributorsList = document.querySelector('.contributors-list');
    contributorsList.innerHTML = data.slice(1).map(contributor => `
        <div class="contributor-item" data-contributor="${contributor.name}">
            <div class="rank">${contributor.rank}</div>
            <div class="contributor-brief">
                <i class="fas fa-user-circle"></i>
                <div class="brief-info">
                    <h5>${contributor.name}</h5>
                    <span>${contributor.points.toLocaleString()} points</span>
                </div>
            </div>
            ${contributor.badge ? `
                <div class="contribution-badge">
                    <i class="fas fa-${contributor.badge}"></i>
                </div>
            ` : ''}
        </div>
    `).join('');

    // Add click handlers to contributor items
    document.querySelectorAll('.contributor-item').forEach(item => {
        item.addEventListener('click', () => {
            const contributorName = item.dataset.contributor;
            showContributorProfile(contributorName);
        });
    });
}

// Show Contributor Profile
function showContributorProfile(name) {
    const contributor = [...leaderboardData.weekly, ...leaderboardData.monthly]
        .find(c => c.name === name);

    if (contributor) {
        const details = `
            ${contributor.name}
            Rank: ${contributor.rank}
            Points: ${contributor.points.toLocaleString()}
            ${contributor.role ? `Role: ${contributor.role}` : ''}
            ${contributor.events ? `Events Organized: ${contributor.events}` : ''}
            
            Click OK to view full profile
        `;

        if (confirm(details)) {
            alert('Redirecting to contributor profile page...');
        }
    }
}

// Initialize leaderboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLeaderboard();
    // ... other initializations
});

function toggleMenu() {
    const toggleMenu = document.querySelector('.mediaScreen');
    toggleMenu.classList.toggle('show');
}

window.addEventListener('scroll', function () {
    const toggleMenu = document.querySelector('.mediaScreen');
    toggleMenu.classList.remove('show');
});
function menuShow() {
    let mScreen = document.querySelector('.menu');
    mScreen.classList.toggle('show')
};
window.addEventListener('scroll', function () {
    let mScreen = document.querySelector('.menu');
    mScreen.classList.remove('show')

})