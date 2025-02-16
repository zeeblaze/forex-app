function switchTab(tabId) {
    // Hide all content sections
    document.querySelectorAll('.content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show selected content
    document.getElementById(tabId).classList.remove('hidden');
    
    // Update tab styles
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600');
        btn.classList.add('bg-gray-800');
    });
    
    // Highlight active tab
    event.currentTarget.classList.remove('bg-gray-800');
    event.currentTarget.classList.add('bg-blue-600');
}