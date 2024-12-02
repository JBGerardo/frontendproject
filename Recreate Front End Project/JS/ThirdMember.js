document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.querySelector(".open-modal"); // Button to open the modal
    const modal = document.getElementById("infoModal"); // Modal element
    const closeModalBtn = document.querySelector(".close-modal"); // Button to close the modal
    const documentFrame = document.getElementById("documentFrame"); // iFrame for document
    const downloadLink = document.getElementById("downloadLink"); // Download link for the document
    const documentURL = "JOHN CARLO SINOY - Updated(07202024).docx.pdf"; // Path to your document

    if (openModalBtn && modal && closeModalBtn) {
        openModalBtn.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                // Automatically download the document on small screens
                const tempLink = document.createElement("a");
                tempLink.href = documentURL;
                tempLink.download = "JOHN CARLO SINOY - Updated(07202024).docx.pdf";
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            } else {
                // Set the iframe source and download link for larger screens
                documentFrame.src = documentURL;
                downloadLink.href = documentURL;

                // Show the modal
                modal.style.display = "flex";
            }
        });

        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none"; // Close modal by hiding it
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none"; // Close modal when clicking outside the modal content
            }
        });
    }

    // DROPDOWN MENU FUNCTIONALITY
    const dropdownToggle = document.querySelectorAll(".dropdown-toggle"); // All dropdown buttons

    dropdownToggle.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the dropdown from closing when clicking the button
            const dropdownContent = toggle.nextElementSibling; // Find the next sibling for dropdown content
            dropdownContent?.classList.toggle("show-dropdown"); // Toggle dropdown visibility
        });
    });

    window.addEventListener("click", () => {
        document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
            dropdown.classList.remove("show-dropdown"); // Close all dropdowns when clicking elsewhere
        });
    });

    // ADD POST FUNCTIONALITY
    const addPostBtn = document.getElementById("addPostBtn"); // Button to add a new post
    const correctPassword = "member123"; // Password for user authentication

    if (addPostBtn) {
        addPostBtn.addEventListener("click", () => {
            const postTitle = document.getElementById("postTitle").value.trim(); // Get the post title
            const postContent = document.getElementById("postContent").value.trim(); // Get the post content
            const fileInput = document.getElementById("fileInput"); // File input for image
            const feed = document.querySelector(".feed-items"); // Feed where posts are displayed

            const userPassword = prompt("Enter the password to add a post:"); // Prompt for password

            if (userPassword === correctPassword) { // Check if the password is correct
                if (postTitle && postContent) { // Ensure both title and content are provided
                    const newFeedItem = document.createElement("section"); // Create a new post section
                    newFeedItem.classList.add("feed-item");

                    newFeedItem.innerHTML = `
                        <h4>${postTitle}</h4>
                        <p>${postContent}</p>
                        <span class="date">Posted on: ${new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</span>
                    `;

                    // Check if a file was uploaded
                    if (fileInput.files.length > 0) {
                        const file = fileInput.files[0];
                        const fileURL = URL.createObjectURL(file);

                        if (file.type.startsWith("image/")) {
                            const img = document.createElement("img");
                            img.src = fileURL;
                            img.alt = file.name;
                            img.style.maxWidth = "100%";
                            img.style.height = "auto";
                            newFeedItem.appendChild(img);
                        } else if (file.type === "application/zip" || file.name.endsWith(".zip")) {
                            const zipLink = document.createElement("a");
                            zipLink.href = fileURL;
                            zipLink.textContent = `Download ${file.name}`;
                            zipLink.download = file.name;
                            zipLink.style.textDecoration = "none";
                            newFeedItem.appendChild(zipLink);
                        } else {
                            alert("Only images or ZIP files are allowed.");
                            return;
                        }
                    }

                    feed.insertBefore(newFeedItem, feed.firstChild); // Add post at the top of the feed

                    // Clear input fields
                    document.getElementById("postTitle").value = "";
                    document.getElementById("postContent").value = "";
                    fileInput.value = "";

                    alert("Post added successfully!");
                } else {
                    alert("Please enter a title and content for the post.");
                }
            } else {
                alert("Incorrect password. Only members can add posts.");
            }
        });
    }

    // ADD REVIEW AND RATING FUNCTIONALITY
    const addReviewBtn = document.getElementById("addReviewBtn"); // Button to add a review
    const stars = document.querySelectorAll(".add-feedback .star"); // Star rating elements
    let selectedRating = 0; // Default rating
    let totalRating = 4.2; // Initial average rating
    let ratingCount = 1; // Number of reviews

    function displayAverageRating(rating) {
        const ratingDisplay = document.getElementById("ratingDisplay"); // Average rating stars
        const ratingValue = document.getElementById("ratingValue"); // Average rating value
        ratingDisplay.innerHTML = ""; // Clear previous stars

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.classList.add("star");
            star.innerHTML = "&#9733;";
            star.style.color = i <= Math.round(rating) ? "yellow" : "#ccc";
            ratingDisplay.appendChild(star);
        }
        ratingValue.textContent = rating.toFixed(1);
    }

    if (addReviewBtn) {
        displayAverageRating(totalRating); // Initialize the average rating display

        stars.forEach((star) => {
            star.addEventListener("click", () => {
                selectedRating = parseInt(star.getAttribute("data-value"));
                updateStarRating(selectedRating);
            });
        });

        function updateStarRating(rating) {
            stars.forEach((star) => {
                star.classList.toggle(
                    "selected",
                    parseInt(star.getAttribute("data-value")) <= rating
                );
            });
        }

        addReviewBtn.addEventListener("click", () => {
            const reviewTitle = document.getElementById("reviewTitle").value.trim();
            const reviewContent = document.getElementById("reviewContent").value.trim();
            const reviewSection = document.querySelector(".review-items");

            if (reviewTitle && reviewContent && selectedRating > 0) {
                const newReview = document.createElement("div");
                newReview.classList.add("review-item");

                newReview.innerHTML = `
                    <h4>${reviewTitle}</h4>
                    <p>${reviewContent}</p>
                    <div class="star-rating">
                        ${[...Array(5)]
                            .map(
                                (_, i) =>
                                    `<span style="color: ${
                                        i < selectedRating ? "yellow" : "#ccc"
                                    }">&#9733;</span>`
                            )
                            .join("")}
                    </div>
                `;

                reviewSection.insertBefore(newReview, reviewSection.firstChild);

                totalRating = (totalRating * ratingCount + selectedRating) / (ratingCount + 1);
                ratingCount++;
                displayAverageRating(totalRating);

                document.getElementById("reviewTitle").value = "";
                document.getElementById("reviewContent").value = "";
                selectedRating = 0;
                updateStarRating(0);
            } else {
                alert("Please fill in the title, content, and select a rating.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("header nav");
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    // Toggle navigation menu for small screens
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Toggle dropdown content for small screens
    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const dropdownContent = toggle.nextElementSibling; // Find the sibling dropdown content
            dropdownContent.classList.toggle("show-dropdown"); // Show/hide dropdown
        });
    });

    // Close dropdown when clicking outside
    window.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-dropdown")) {
            document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
                dropdown.classList.remove("show-dropdown");
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const profileDetails = document.querySelector(".profile-details");
    const toggleProfileBtn = document.createElement("button");
    toggleProfileBtn.classList.add("toggle-profile-btn");
    toggleProfileBtn.textContent = "☰"; // Icon for toggle button
    document.body.appendChild(toggleProfileBtn);

    const closeProfileBtn = document.createElement("button");
    closeProfileBtn.classList.add("close-profile");
    closeProfileBtn.textContent = "×";
    profileDetails.appendChild(closeProfileBtn);

    // Show Profile Details
    toggleProfileBtn.addEventListener("click", () => {
        profileDetails.classList.add("modal-view");
        profileDetails.style.display = "flex";
    });

    // Hide Profile Details
    closeProfileBtn.addEventListener("click", () => {
        profileDetails.style.display = "none";
        profileDetails.classList.remove("modal-view");
    });
    // Close Profile Details when clicking outside the modal
    window.addEventListener("click", (e) => {
        if (
            !profileDetails.contains(e.target) && // Click is outside the modal
            !toggleProfileBtn.contains(e.target) && // Click is not on the toggle button
            profileDetails.classList.contains("modal-view") // Modal is currently open
        ) {
            profileDetails.style.display = "none";
            profileDetails.classList.remove("modal-view");
        }
    });

});