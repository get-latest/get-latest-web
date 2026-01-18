/**
 * Component Loader
 * Fetches HTML snippets and injects them into placeholders
 */
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const container = document.getElementById(elementId);

        if (container) {
            container.innerHTML = html;

            // Trigger specific logic after the header exists in the DOM
            if (elementId === 'header-placeholder') {
                setActiveNavLink();
            }
        }
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

/**
 * Highlights active link and handles Bootstrap specific 'active' states
 */
function setActiveNavLink() {
    // Get current page path
    let currentPath = window.location.pathname;
    
    // Default to index.html if at root
    if (currentPath === "" || currentPath === "/") {
        currentPath = "/index.html";
    }

    // Target the links inside your nav
    const links = document.querySelectorAll('.navbar-nav .nav-link');

    links.forEach(link => {
        // Remove existing active classes
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // Match the href against current path
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath.endsWith(href) && href.startsWith('/'))) {
            link.classList.add('active');
            // Accessibility: Tells screen readers this is the current page
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    // Using components/ folder as suggested by your AI Studio output
    loadComponent('header-placeholder', '/components/header.html');
    loadComponent('footer-placeholder', '/components/footer.html');
});