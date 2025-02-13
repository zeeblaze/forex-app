// Initialize state object
let navigationState = {
    wasOnForexPage: false,
    currentPage: 'forex'
};

function handleNavigation(navItem) {
    const targetPage = navItem.getAttribute('data-target');
    const isCurrentlyActive = navItem.classList.contains('text-blue-500');
    
    // Remove active state from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('text-blue-500', 'bg-gray-700');
        item.classList.add('text-gray-400');
    });

    // If non-forex page already active, load welcome template into #main-content
    if (isCurrentlyActive && targetPage !== 'forex') {
        const template = document.getElementById('welcome-template');
        document.getElementById('main-content').innerHTML = template.innerHTML;
        return;
    }

    // Activate clicked item and load content
    navItem.classList.remove('text-gray-400');
    navItem.classList.add('text-blue-500', 'bg-gray-700');
    loadPage(targetPage);
}

async function loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    
    try {
        // Update navigation state
        navigationState.wasOnForexPage = navigationState.currentPage === 'forex';
        navigationState.currentPage = pageName;

        if (pageName === 'forex') {
            const response = await fetch('components/forex-page.html');
            mainContent.innerHTML = await response.text();
            
            // Initialize chart using preserved state
            if (window.forexChart && typeof window.forexChart.initialize === 'function') {
                window.forexChart.initialize();
            }
        } else {
            const response = await fetch(`pages/${pageName}.html`);
            mainContent.innerHTML = await response.text();
        }
    } catch (error) {
        console.error('Error loading page:', error);
        mainContent.innerHTML = '<div class="p-4 text-center text-gray-400">Page not found</div>';
    }
    
    // Reset forex page flag if required elsewhere
    window.forexGlobalState.wasOnForexPage = false;
}

function handleTabs(clickedTab) {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.classList.remove('bg-blue-600');
        tab.classList.add('bg-gray-800');
    });

    clickedTab.classList.remove('bg-gray-800');
    clickedTab.classList.add('bg-blue-600');
}

// Reset state when page loads
window.addEventListener('load', () => {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('text-blue-500', 'bg-gray-700');
        item.classList.add('text-gray-400');
    });

    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = document.getElementById('welcome-template').innerHTML;
});

// Export if needed
window.loadPage = loadPage;
