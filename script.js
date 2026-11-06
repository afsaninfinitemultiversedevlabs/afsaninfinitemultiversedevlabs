
/* =========================================
   AIMDL — Website JavaScript
========================================= */

// 1. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu after clicking a navigation link
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// 2. SOCIAL ICON CLICK ANIMATION
const socialLinks = document.querySelectorAll(".footer-socials a");

socialLinks.forEach(link => {

    link.addEventListener("click", () => {

        link.classList.remove("clicked");

        // Restart animation
        void link.offsetWidth;

        link.classList.add("clicked");

        link.addEventListener("animationend", () => {
            link.classList.remove("clicked");
        }, { once: true });

    });

});

// 3. AUTOMATIC COPYRIGHT YEAR
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// 4. CONSOLE BRAND MESSAGE
console.log(
    "%cAIMDL — Afsan Infinite Multiverse DevLabs",
    "color: #00B87A; font-size: 16px; font-weight: bold;"
);

console.log(
    "%cOne Identity. One Ecosystem. Infinite Possibilities.",
    "color: #A8B3AC; font-size: 12px;"
);




// AIMDL PWA - Service Worker Registration

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then((registration) => {
                console.log(
                    "AIMDL Service Worker registered:",
                    registration.scope
                );
            })
            .catch((error) => {
                console.error(
                    "AIMDL Service Worker registration failed:",
                    error
                );
            });
    });
}
