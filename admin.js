// ===============================
// CHECK ADMIN LOGIN
// ===============================

const isLoggedIn =
    localStorage.getItem("smartMessAdminLoggedIn");

if (isLoggedIn !== "true") {

    window.location.href = "admin-login.html";

}
// ===============================
// SMARTMESS ADMIN PANEL
// ===============================


// Get feedback data from localStorage

let feedbacks =
    JSON.parse(localStorage.getItem("smartMessFeedbacks")) || [];


// Get poll data from localStorage

let votes =
    JSON.parse(localStorage.getItem("smartMessVotes")) || {
        "Veg Biryani": 0,
        "Paneer Masala": 0,
        "Fried Rice": 0
    };


// ===============================
// UPDATE ADMIN SUMMARY
// ===============================

function updateAdminSummary() {

    // Total feedback

    document.getElementById("adminFeedback").textContent =
        feedbacks.length;


    // Average rating

    let totalRating = 0;

    feedbacks.forEach(function(feedback) {
        totalRating += Number(feedback.rating);
    });

    let average = 0;

    if (feedbacks.length > 0) {
        average = totalRating / feedbacks.length;
    }

    document.getElementById("adminRating").textContent =
        average.toFixed(1) + " / 5";


    // Total votes

    let totalVotes =
        votes["Veg Biryani"] +
        votes["Paneer Masala"] +
        votes["Fried Rice"];

    document.getElementById("adminVotes").textContent =
        totalVotes;
}


// ===============================
// DISPLAY FEEDBACK
// ===============================

function displayAdminFeedback() {

    const feedbackContainer =
        document.getElementById("adminFeedbackList");

    feedbackContainer.innerHTML = "";


    if (feedbacks.length === 0) {

        feedbackContainer.innerHTML =
            "<p>No feedback available.</p>";

        return;
    }


    feedbacks.forEach(function(feedback) {

        const card = document.createElement("div");

        card.className = "feedback-card";


        card.innerHTML = `
            <h4>👤 ${feedback.name}</h4>

            <p class="rating">
                ${feedback.stars}
            </p>

            <p>
                ${feedback.message}
            </p>
        `;


        feedbackContainer.appendChild(card);

    });
}


// ===============================
// DISPLAY POLL RESULTS
// ===============================

function displayAdminPoll() {

    const result =
        document.getElementById("adminPollResults");


    const totalVotes =
        votes["Veg Biryani"] +
        votes["Paneer Masala"] +
        votes["Fried Rice"];


    if (totalVotes === 0) {

        result.innerHTML =
            "<p>No votes yet.</p>";

        return;
    }


    const biryaniPercentage =
        (votes["Veg Biryani"] / totalVotes) * 100;


    const paneerPercentage =
        (votes["Paneer Masala"] / totalVotes) * 100;


    const ricePercentage =
        (votes["Fried Rice"] / totalVotes) * 100;


    result.innerHTML = `

        <div class="feedback-card">

            <h3>🍚 Veg Biryani</h3>

            <p>
                ${votes["Veg Biryani"]} Votes
                (${biryaniPercentage.toFixed(0)}%)
            </p>

        </div>


        <div class="feedback-card">

            <h3>🧀 Paneer Masala</h3>

            <p>
                ${votes["Paneer Masala"]} Votes
                (${paneerPercentage.toFixed(0)}%)
            </p>

        </div>


        <div class="feedback-card">

            <h3>🍜 Fried Rice</h3>

            <p>
                ${votes["Fried Rice"]} Votes
                (${ricePercentage.toFixed(0)}%)
            </p>

        </div>
    `;
}


// ===============================
// CLEAR FEEDBACK
// ===============================

function clearFeedback() {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete all feedback?"
        );


    if (!confirmDelete) {
        return;
    }


    localStorage.removeItem("smartMessFeedbacks");

    feedbacks = [];


    displayAdminFeedback();

    updateAdminSummary();


    alert("All feedback has been deleted.");
}


// ===============================
// CLEAR POLL VOTES
// ===============================

function clearVotes() {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete all poll votes?"
        );


    if (!confirmDelete) {
        return;
    }


    votes = {
        "Veg Biryani": 0,
        "Paneer Masala": 0,
        "Fried Rice": 0
    };


    localStorage.setItem(
        "smartMessVotes",
        JSON.stringify(votes)
    );


    displayAdminPoll();

    updateAdminSummary();


    alert("All poll votes have been deleted.");
}


// ===============================
// LOAD ADMIN PANEL
// ===============================

displayAdminFeedback();

displayAdminPoll();

updateAdminSummary();
// ===============================
// ADMIN LOGOUT
// ===============================

function logoutAdmin() {

    localStorage.removeItem(
        "smartMessAdminLoggedIn"
    );

    alert("You have been logged out successfully.");

    window.location.href = "admin-login.html";
}
// ===============================
// MENU MANAGEMENT
// ===============================

let menuData = JSON.parse(
    localStorage.getItem("smartMessMenu")
) || {
    breakfast: "Poha + Tea",
    lunch: "Dal + Rice + Roti + Vegetable + Salad",
    dinner: "Paneer Masala + Roti + Rice + Dal"
};


// Show current menu in admin form

function loadAdminMenu() {

    document.getElementById("adminBreakfast").value =
        menuData.breakfast;

    document.getElementById("adminLunch").value =
        menuData.lunch;

    document.getElementById("adminDinner").value =
        menuData.dinner;
}


// Update menu

document.getElementById("menuForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        menuData = {

            breakfast:
                document.getElementById("adminBreakfast").value,

            lunch:
                document.getElementById("adminLunch").value,

            dinner:
                document.getElementById("adminDinner").value
        };


        localStorage.setItem(
            "smartMessMenu",
            JSON.stringify(menuData)
        );


        document.getElementById("menuMessage").textContent =
            "✅ Menu updated successfully!";

        document.getElementById("menuMessage").style.color =
            "green";
    }
);


loadAdminMenu();
// ===============================
// ANALYTICS
// ===============================

function updateAnalytics() {

    let five = 0;
    let four = 0;
    let three = 0;
    let two = 0;
    let one = 0;

    feedbacks.forEach(function(feedback) {

        const rating = Number(feedback.rating);

        if (rating === 5) {
            five++;
        }

        else if (rating === 4) {
            four++;
        }

        else if (rating === 3) {
            three++;
        }

        else if (rating === 2) {
            two++;
        }

        else if (rating === 1) {
            one++;
        }

    });


    document.getElementById("fiveStar").textContent = five;

    document.getElementById("fourStar").textContent = four;

    document.getElementById("threeStar").textContent = three;

    document.getElementById("twoStar").textContent = two;

    document.getElementById("oneStar").textContent = one;
}


updateAnalytics();
// ===============================
// WEEKLY MENU MANAGEMENT
// ===============================

let weeklyMenu = JSON.parse(
    localStorage.getItem("smartMessWeeklyMenu")
) || {

    Monday: {
        breakfast: "Poha",
        lunch: "Dal Rice",
        dinner: "Paneer"
    },

    Tuesday: {
        breakfast: "Upma",
        lunch: "Rajma Rice",
        dinner: "Veg Biryani"
    },

    Wednesday: {
        breakfast: "Idli",
        lunch: "Dal Roti",
        dinner: "Mix Veg"
    },

    Thursday: {
        breakfast: "Paratha",
        lunch: "Chole Rice",
        dinner: "Paneer Roti"
    },

    Friday: {
        breakfast: "Poha",
        lunch: "Dal Rice",
        dinner: "Veg Pulao"
    },

    Saturday: {
        breakfast: "Upma",
        lunch: "Dal Roti",
        dinner: "Masala Rice"
    },

    Sunday: {
        breakfast: "Paratha",
        lunch: "Special Thali",
        dinner: "Veg Biryani"
    }
};


// Load weekly menu into form

function loadWeeklyMenu() {

    document.getElementById("monBreakfast").value =
        weeklyMenu.Monday.breakfast;

    document.getElementById("monLunch").value =
        weeklyMenu.Monday.lunch;

    document.getElementById("monDinner").value =
        weeklyMenu.Monday.dinner;


    document.getElementById("tueBreakfast").value =
        weeklyMenu.Tuesday.breakfast;

    document.getElementById("tueLunch").value =
        weeklyMenu.Tuesday.lunch;

    document.getElementById("tueDinner").value =
        weeklyMenu.Tuesday.dinner;


    document.getElementById("wedBreakfast").value =
        weeklyMenu.Wednesday.breakfast;

    document.getElementById("wedLunch").value =
        weeklyMenu.Wednesday.lunch;

    document.getElementById("wedDinner").value =
        weeklyMenu.Wednesday.dinner;


    document.getElementById("thuBreakfast").value =
        weeklyMenu.Thursday.breakfast;

    document.getElementById("thuLunch").value =
        weeklyMenu.Thursday.lunch;

    document.getElementById("thuDinner").value =
        weeklyMenu.Thursday.dinner;


    document.getElementById("friBreakfast").value =
        weeklyMenu.Friday.breakfast;

    document.getElementById("friLunch").value =
        weeklyMenu.Friday.lunch;

    document.getElementById("friDinner").value =
        weeklyMenu.Friday.dinner;


    document.getElementById("satBreakfast").value =
        weeklyMenu.Saturday.breakfast;

    document.getElementById("satLunch").value =
        weeklyMenu.Saturday.lunch;

    document.getElementById("satDinner").value =
        weeklyMenu.Saturday.dinner;


    document.getElementById("sunBreakfast").value =
        weeklyMenu.Sunday.breakfast;

    document.getElementById("sunLunch").value =
        weeklyMenu.Sunday.lunch;

    document.getElementById("sunDinner").value =
        weeklyMenu.Sunday.dinner;
}


// Save weekly menu

document.getElementById("weeklyMenuForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        weeklyMenu = {

            Monday: {
                breakfast: document.getElementById("monBreakfast").value,
                lunch: document.getElementById("monLunch").value,
                dinner: document.getElementById("monDinner").value
            },

            Tuesday: {
                breakfast: document.getElementById("tueBreakfast").value,
                lunch: document.getElementById("tueLunch").value,
                dinner: document.getElementById("tueDinner").value
            },

            Wednesday: {
                breakfast: document.getElementById("wedBreakfast").value,
                lunch: document.getElementById("wedLunch").value,
                dinner: document.getElementById("wedDinner").value
            },

            Thursday: {
                breakfast: document.getElementById("thuBreakfast").value,
                lunch: document.getElementById("thuLunch").value,
                dinner: document.getElementById("thuDinner").value
            },

            Friday: {
                breakfast: document.getElementById("friBreakfast").value,
                lunch: document.getElementById("friLunch").value,
                dinner: document.getElementById("friDinner").value
            },

            Saturday: {
                breakfast: document.getElementById("satBreakfast").value,
                lunch: document.getElementById("satLunch").value,
                dinner: document.getElementById("satDinner").value
            },

            Sunday: {
                breakfast: document.getElementById("sunBreakfast").value,
                lunch: document.getElementById("sunLunch").value,
                dinner: document.getElementById("sunDinner").value
            }
        };


        localStorage.setItem(
            "smartMessWeeklyMenu",
            JSON.stringify(weeklyMenu)
        );


        document.getElementById(
            "weeklyMenuMessage"
        ).textContent =
            "✅ Weekly menu updated successfully!";


        document.getElementById(
            "weeklyMenuMessage"
        ).style.color = "green";
    }
);


loadWeeklyMenu();