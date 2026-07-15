document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    
    if (path.endsWith('.html')) {
        const cleanPath = path.replace('.html', '');
        
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const multimediaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;

        if (element.tagName === "IMG" && element.dataset.src) {
          element.src = element.dataset.src;
          element.removeAttribute("data-src");
          element.classList.add("fade-in-loaded"); 
        }

        if (element.tagName === "VIDEO") {
          const sources = element.querySelectorAll("source");
          sources.forEach(source => {
            if (source.dataset.src) {
              source.src = source.dataset.src;
              source.removeAttribute("data-src");
            }
          });
          
          element.load(); 
          
          if (element.hasAttribute("autoplay")) {
            element.play().catch(error => {
              console.log("Auto-reproducción prevenida o esperando interacción: ", error);
            });
          }
        }

        observer.unobserve(element);
      }
    });
  }, {
    rootMargin: "0px 0px 200px 0px"
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  const lazyVideos = document.querySelectorAll("video.lazy-video");

  lazyImages.forEach(img => multimediaObserver.observe(img));
  lazyVideos.forEach(video => multimediaObserver.observe(video));
});