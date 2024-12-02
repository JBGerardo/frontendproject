$(document).ready(function() {
    // Redirect to URL on image click
    const popupImages = document.querySelectorAll(".popup-image");
    popupImages.forEach(function(popup) {
        popup.addEventListener("click", function() {
            const url = this.getAttribute("data-url"); // Get the data-url attribute
            if (url) {
                window.location.href = url; // Redirect to the URL
            }
        });
    });

    // Show overlay with explicit display: flex
    $('#popupImage1').click(function() {
        $('#overlay').css('display', 'flex').hide().fadeIn(); // Show overlay with fade-in effect
    });

    $('#popupImage2').click(function() {
        $('#overlay2').css('display', 'flex').hide().fadeIn(); // Show overlay2
    });

    $('#popupImage3').click(function() {
        $('#overlay3').css('display', 'flex').hide().fadeIn(); // Show overlay3
    });

    // Hide overlay on close button click
    $('#closeOverlay').click(function() {
        $('#overlay').fadeOut(function() { // Fade out effect
            $(this).css('display', 'none'); // Set display to none after fading
        });
    });

    $('#closeOverlay2').click(function() {
        $('#overlay2').fadeOut(function() {
            $(this).css('display', 'none');
        });
    });

    $('#closeOverlay3').click(function() {
        $('#overlay3').fadeOut(function() {
            $(this).css('display', 'none');
        });
    });

    // Show the Team Overview overlay when clicking popupImage4
    $('#popupImage4').on('click', function() {
        $('#overlay4').addClass('active'); // Add active class to display overlay4
    });

    // Close the overlay when clicking the close button
    $('#closeOverlay4').on('click', function() {
        $('#overlay4').removeClass('active'); // Remove active class to hide overlay4
    });

    // Toggle dropdown menu on click
    $('.dropdown-toggle').on('click', function(event) {
        event.preventDefault(); // Prevent default click behavior
        $(this).siblings('.dropdown-menu').slideToggle(200); // Toggle dropdown menu with slide effect
    });

    // Close the dropdown when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.dropdown').length) { // Check if the click is outside dropdown
            $('.dropdown-menu').slideUp(200); // Close the dropdown menu
        }
    });
    // Toggle dropdown content on click
    $(".dropdown-toggle").click(function() {
        $(this).next(".dropdown-content").toggle(); // Show/hide dropdown content
    });
});

// Redirect to URL on team member click
document.querySelectorAll('.navigation').forEach(member => {
    member.addEventListener('click', function() {
        const url = this.getAttribute('data-url'); // Get the data-url attribute
        if (url) {
            window.location.href = url; // Navigate to the specified URL
        }
    });
});

$(document).ready(function () {
     // Toggle the main navigation menu
     $(".menu-toggle").on("click", function () {
        $("nav").toggleClass("active");
    });

    // Toggle dropdown content
    $(".dropdown > a").on("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        $(this).parent().toggleClass("active"); // Toggle active class on dropdown parent
        $(this).siblings(".dropdown-content").slideToggle(); // Toggle dropdown content visibility
    });
});

// Redirect to URL on team member click
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', function() {
        const url = this.getAttribute('data-url'); // Get the data-url attribute
        if (url) {
            window.location.href = url; // Navigate to the specified URL
        }
    });

});