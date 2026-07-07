document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    
    if (path.endsWith('.html')) {
        const cleanPath = path.replace('.html', '');
        
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
    }
});