javascript
$(document).ready(function () {

    // =========================
    // 1. DARK MODE TOGGLE
    // =========================

    const themeButton = $("#theme");
    const savedTheme = localStorage.getItem("portfolio-theme");

    function setTheme(isDark) {
        if (isDark) {
            $("html").attr("data-theme", "dark");
            themeButton.html("☀");
            themeButton.attr("title", "Switch to light mode");
            themeButton.attr("aria-label", "Switch to light mode");
        } else {
            $("html").removeAttr("data-theme");
            themeButton.html("☾");
            themeButton.attr("title", "Switch to dark mode");
            themeButton.attr("aria-label", "Switch to dark mode");
        }
    }

    setTheme(savedTheme === "dark");

    themeButton.on("click", function () {
        const isDark = $("html").attr("data-theme") !== "dark";

        setTheme(isDark);
        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );
    });


    // =========================
    // 2. MOBILE MENU
    // =========================

    const menuButton = $("#menu");
    const navMenu = $("nav ul");

    function closeMenu() {
        navMenu.removeClass("open");
        menuButton.attr("aria-expanded", "false");
        menuButton.html("☰");
    }

    menuButton.on("click", function (event) {
        event.stopPropagation();

        const isOpen = !navMenu.hasClass("open");

        navMenu.toggleClass("open", isOpen);
        menuButton.attr("aria-expanded", String(isOpen));
        menuButton.html(isOpen ? "✕" : "☰");
    });

    $("nav ul a").on("click", function () {
        closeMenu();
    });

    $(document).on("click", function (event) {
        if (!$(event.target).closest("nav, #menu").length) {
            closeMenu();
        }
    });


    // =========================
    // 3. ACTIVE NAVIGATION LINK
    // =========================

    let currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    if (currentPage === "") {
        currentPage = "index.html";
    }

    $("nav ul a").each(function () {
        const linkPage = $(this)
            .attr("href")
            .split("/")
            .pop()
            .toLowerCase();

        const isActive = linkPage === currentPage;

        $(this).toggleClass("active", isActive);

        if (isActive) {
            $(this).attr("aria-current", "page");
        } else {
            $(this).removeAttr("aria-current");
        }
    });


    // =========================
    // 4. CONTACT FORM VALIDATION
    // =========================

    $("#contact").on("submit", function (event) {
        event.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const message = $("#msg").val().trim();

        let valid = true;

        $(".err").text("");
        $("#ok").hide();

        // Validate name
        if (name === "") {
            $("#e-name").text("Please enter your name.");
            valid = false;
        } else if (name.length < 2) {
            $("#e-name").text(
                "Name must contain at least 2 characters."
            );
            valid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            $("#e-email").text(
                "Please enter your email address."
            );
            valid = false;
        } else if (!emailPattern.test(email)) {
            $("#e-email").text(
                "Please enter a valid email address."
            );
            valid = false;
        }

        // Validate message
        if (message === "") {
            $("#e-msg").text("Please enter your message.");
            valid = false;
        } else if (message.length < 10) {
            $("#e-msg").text(
                "Message must contain at least 10 characters."
            );
            valid = false;
        }

        // Show validation confirmation
        if (valid) {
            $("#ok")
                .stop(true, true)
                .fadeIn(300);

            // Do not reset the form: no message is sent
            // until a form service is connected.
        }
    });


    // =========================
    // 5. ANIMATED SKILL BARS
    // =========================

    $(".fill").each(function () {
        const bar = $(this);
        const targetWidth = bar[0].style.width;

        bar.css("width", "0");

        requestAnimationFrame(function () {
            bar.css("width", targetWidth);
        });
    });


    // =========================
    // 6. SMOOTH SCROLLING
    // =========================

    $('a[href^="#"]').on("click", function (event) {
        const target = $(this).attr("href");

        if (target.length > 1) {
            const targetElement = $(target);

            if (targetElement.length) {
                event.preventDefault();

                $("html, body").animate({
                    scrollTop: targetElement.offset().top - 85
                }, 500);
            }
        }
    });

});
