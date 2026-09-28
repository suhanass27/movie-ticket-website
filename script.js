/* =========================================
   CINEBOOK JAVASCRIPT
   ========================================= */


/* =========================================
   VARIABLES
   ========================================= */

let selectedMovie = "";
let selectedPrice = 0;

let selectedDate = "29 SEP";
let selectedTime = "01:30 PM";

let selectedSeats = [];


/* =========================================
   ELEMENTS
   ========================================= */

const loginModal =
    document.getElementById("loginModal");

const confirmationModal =
    document.getElementById("confirmationModal");

const openLogin =
    document.getElementById("openLogin");

const heroLogin =
    document.getElementById("heroLogin");

const closeLogin =
    document.getElementById("closeLogin");

const loginForm =
    document.getElementById("loginForm");

const confirmBooking =
    document.getElementById("confirmBooking");

const closeConfirmation =
    document.getElementById("closeConfirmation");

const summaryMovie =
    document.getElementById("summaryMovie");

const summaryDate =
    document.getElementById("summaryDate");

const summaryTime =
    document.getElementById("summaryTime");

const summarySeats =
    document.getElementById("summarySeats");

const totalPrice =
    document.getElementById("totalPrice");


/* =========================================
   LOGIN MODAL
   ========================================= */

function showLogin() {

    loginModal.classList.add("show");

}


function hideLogin() {

    loginModal.classList.remove("show");

}


openLogin.addEventListener("click", showLogin);

heroLogin.addEventListener("click", showLogin);

closeLogin.addEventListener("click", hideLogin);


/* Click outside modal */

loginModal.addEventListener("click", function(event) {

    if (event.target === loginModal) {

        hideLogin();

    }

});


/* =========================================
   LOGIN FORM
   ========================================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("userName").value.trim();


    const email =
        document.getElementById("userEmail").value.trim();


    const password =
        document.getElementById("userPassword").value.trim();


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Please fill in all the fields.");

        return;

    }


    alert(
        `Welcome to CineBook, ${name}!`
    );


    hideLogin();


    loginForm.reset();

});


/* =========================================
   MOVIE SELECTION
   ========================================= */

const bookButtons =
    document.querySelectorAll(".book-btn");


bookButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        selectedMovie =
            button.dataset.movie;


        selectedPrice =
            Number(button.dataset.price);


        summaryMovie.textContent =
            selectedMovie;


        totalPrice.textContent =
            "₹" +
            calculateTotal();


        document
            .getElementById("booking")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   DATE SELECTION
   ========================================= */

const dateButtons =
    document.querySelectorAll(".date-btn");


dateButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        dateButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const day =
            button.querySelector("strong").textContent;


        const month =
            button.textContent
                .replace(day, "")
                .trim();


        selectedDate =
            `${day} ${month}`;


        summaryDate.textContent =
            selectedDate;

    });

});


/* =========================================
   TIME SELECTION
   ========================================= */

const timeButtons =
    document.querySelectorAll(".time-btn");


timeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        timeButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedTime =
            button.textContent.trim();


        summaryTime.textContent =
            selectedTime;

    });

});


/* =========================================
   SEAT SELECTION
   ========================================= */

const seats =
    document.querySelectorAll(".seat");


seats.forEach(function(seat) {

    seat.addEventListener("click", function() {


        /* Occupied seats cannot be selected */

        if (
            seat.classList.contains("occupied")
        ) {

            return;

        }


        const seatNumber =
            seat.textContent.trim();


        /* If already selected */

        if (
            seat.classList.contains("selected")
        ) {

            seat.classList.remove("selected");


            selectedSeats =
                selectedSeats.filter(function(item) {

                    return item !== seatNumber;

                });

        }

        /* Select seat */

        else {

            seat.classList.add("selected");

            selectedSeats.push(seatNumber);

        }


        updateBookingSummary();

    });

});


/* =========================================
   CALCULATE TOTAL
   ========================================= */

function calculateTotal() {

    return selectedPrice *
        selectedSeats.length;

}


/* =========================================
   UPDATE SUMMARY
   ========================================= */

function updateBookingSummary() {

    if (selectedSeats.length === 0) {

        summarySeats.textContent = "-";

    }

    else {

        summarySeats.textContent =
            selectedSeats.join(", ");

    }


    totalPrice.textContent =
        "₹" + calculateTotal();

}


/* =========================================
   CONFIRM BOOKING
   ========================================= */

confirmBooking.addEventListener("click", function() {


    /* Movie validation */

    if (selectedMovie === "") {

        alert(
            "Please select a movie first."
        );

        document
            .getElementById("movies")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    /* Seat validation */

    if (selectedSeats.length === 0) {

        alert(
            "Please select at least one seat."
        );

        return;

    }


    /* Add information to confirmation */

    document.getElementById(
        "confirmMovie"
    ).textContent =
        selectedMovie;


    document.getElementById(
        "confirmDate"
    ).textContent =
        selectedDate;


    document.getElementById(
        "confirmTime"
    ).textContent =
        selectedTime;


    document.getElementById(
        "confirmSeats"
    ).textContent =
        selectedSeats.join(", ");


    document.getElementById(
        "confirmTotal"
    ).textContent =
        "₹" + calculateTotal();


    confirmationModal.classList.add("show");

});


/* =========================================
   CLOSE CONFIRMATION
   ========================================= */

closeConfirmation.addEventListener(
    "click",
    function() {

        confirmationModal.classList.remove("show");

    }
);


/* Click outside confirmation */

confirmationModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === confirmationModal
        ) {

            confirmationModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   SEARCH MOVIES
   ========================================= */

const searchMovie =
    document.getElementById("searchMovie");


searchMovie.addEventListener(
    "input",
    filterMovies
);


/* =========================================
   GENRE FILTER
   ========================================= */

const genreFilter =
    document.getElementById("genreFilter");


genreFilter.addEventListener(
    "change",
    filterMovies
);


/* =========================================
   FILTER FUNCTION
   ========================================= */

function filterMovies() {

    const searchValue =
        searchMovie.value
            .toLowerCase()
            .trim();


    const genreValue =
        genreFilter.value;


    const movieCards =
        document.querySelectorAll(".movie-card");


    movieCards.forEach(function(card) {

        const movieTitle =
            card.dataset.title.toLowerCase();


        const movieGenre =
            card.dataset.genre;


        const matchesSearch =
            movieTitle.includes(searchValue);


        const matchesGenre =
            genreValue === "all" ||
            movieGenre === genreValue;


        if (
            matchesSearch &&
            matchesGenre
        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}


/* =========================================
   ESCAPE KEY
   ========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            loginModal.classList.remove("show");

            confirmationModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   INITIAL SUMMARY
   ========================================= */

updateBookingSummary();

console.log(
    "🎬 CineBook loaded successfully!"
);