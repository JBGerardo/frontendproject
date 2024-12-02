$(document).ready(function() {
    // Initial animations for the hero image
    $(".hero-image").css({
        opacity: 0, // Start with 0 opacity (invisible)
        position: "relative", // Position relative for animation
        left: "-1000px" // Start off-screen to the left
    })
    .delay(500).animate({
        opacity: 1, // Fade in
        left: "0" // Move to its original position
    }, 2000); // Animation duration: 2 seconds

    // Text content animations 
    $(".text-content").css({
        opacity: 0, // Start with 0 opacity (invisible)
        position: "relative", // Position relative for animation
        left: "50px" // Start slightly to the right
    }).delay(1000).animate({
        opacity: 1, // Fade in
        left: "0" // Move to its original position
    }, 500); // Animation duration: 0.5 seconds

    // Hover effect for navigation links
    $(".header nav a").hover(
        function() {
            $(this).stop().animate({ color: "cyan" }, 200); // Change color to cyan on hover
        },
        function() {
            $(this).stop().animate({ color: "#cccccc" }, 200); // Revert to gray on mouse out
        }
    );

    $(".menu-toggle").on("click", function () {
        $(".navigation").toggleClass("active");
    });
  
});
