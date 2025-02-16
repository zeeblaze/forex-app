function initializeWalletModal() {
    console.log('Initializing wallet modal...'); // Debug log

    const walletButton = document.getElementById('walletButton');
    const walletModal = document.getElementById('walletModal');
    const closeWalletModal = document.getElementById('closeWalletModal');

    if (!walletButton || !walletModal || !closeWalletModal) {
        console.error('Wallet modal elements not found:', {
            button: !!walletButton,
            modal: !!walletModal,
            closeButton: !!closeWalletModal
        });
        return;
    }

    // Open modal
    walletButton.addEventListener('click', function(e) {
        console.log('Wallet button clicked');
        e.preventDefault();
        e.stopPropagation();
        walletModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal with button
    closeWalletModal.addEventListener('click', function(e) {
        console.log('Close button clicked');
        e.preventDefault();
        walletModal.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Close modal when clicking backdrop
    walletModal.addEventListener('click', function(e) {
        if (e.target === walletModal) {
            console.log('Clicked modal backdrop');
            walletModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !walletModal.classList.contains('hidden')) {
            console.log('Escape pressed');
            walletModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// Export the initialization function
window.initializeWalletModal = initializeWalletModal;
