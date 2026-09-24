// SmartMess Feedback System

const feedbackForm = document.querySelector("form");
const feedbackList = document.getElementById("feedbackList");

// Load saved feedback
let feedbacks = JSON.parse(localStorage.getItem("smartMessFeedbacks")) || [];


// Display Feedback
function displayFeedback() {

    feedbackList.innerHTML = "";

    if (feedbacks.length === 0) {
        feedbackList.innerHTML = "<p>No feedback submitted yet.</p>";
        return;
    }

    feedbacks.forEach(function(feedback) {

        const feedbackCard = document.createElement("div");

        feedbackCard.className = "feedback-card";

        feedbackCard.innerHTML = `
            <h4>${feedback.name}</h4>
            <p class="rating">${feedback.stars}</p>
            <p>${feedback.message}</p>
        `;

        feedbackList.appendChild(feedbackCard);
    });
}


// Submit Feedback
feedbackForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rating = document.getElementById("rating").value;
    const message = document.getElementById("message").value.trim();

    if (name === "" || message === "") {

        alert("Please enter your name and feedback.");

        return;
    }


    // Convert rating number into stars

    const stars = "⭐".repeat(Number(rating));


    // Create feedback object

    const newFeedback = {

        name: name,

        rating: rating,

        stars: stars,

        message: message
    };


    // Add feedback

    feedbacks.push(newFeedback);


    // Save feedback in browser

    localStorage.setItem(
        "smartMessFeedbacks",
        JSON.stringify(feedbacks)
    );


    // Show success message

    alert(
        "Thank you, " +
        name +
        "!\nYour feedback has been submitted successfully."
    );


    // Clear form

    feedbackForm.reset();


    // Display feedback

    displayFeedback();

});


// Display saved feedback when page opens

displayFeedback();
updateSummary();
// Calculate Feedback Summary

function updateSummary() {

    const total = feedbacks.length;

    let totalRating = 0;

    feedbacks.forEach(function(feedback) {
        totalRating += Number(feedback.rating);
    });

    let average = 0;

    if (total > 0) {
        average = totalRating / total;
    }

    document.getElementById("totalFeedback").textContent = total;

    document.getElementById("averageRating").textContent =
        average.toFixed(1) + " / 5";
}
// Tomorrow's Menu Poll

let votes = JSON.parse(localStorage.getItem("smartMessVotes")) || {
    "Veg Biryani": 0,
    "Paneer Masala": 0,
    "Fried Rice": 0
};


function submitVote() {

    const selectedFood = document.querySelector(
        'input[name="food"]:checked'
    );

    if (!selectedFood) {

        alert("Please select a food option.");

        return;
    }


    const food = selectedFood.value;

    votes[food]++;


    localStorage.setItem(
        "smartMessVotes",
        JSON.stringify(votes)
    );


    displayPollResults();

    alert("Your vote has been submitted successfully!");
}


function displayPollResults() {

    const result = document.getElementById("pollResult");

    const totalVotes =
        votes["Veg Biryani"] +
        votes["Paneer Masala"] +
        votes["Fried Rice"];


    if (totalVotes === 0) {

        result.innerHTML = "<p>No votes yet.</p>";

        return;
    }


    let biryaniPercentage =
        (votes["Veg Biryani"] / totalVotes) * 100;

    let paneerPercentage =
        (votes["Paneer Masala"] / totalVotes) * 100;

    let ricePercentage =
        (votes["Fried Rice"] / totalVotes) * 100;


    result.innerHTML = `

        <h3>📊 Poll Results</h3>

        <p>
            🍚 Veg Biryani -
            ${votes["Veg Biryani"]} votes
            (${biryaniPercentage.toFixed(0)}%)
        </p>

        <p>
            🧀 Paneer Masala -
            ${votes["Paneer Masala"]} votes
            (${paneerPercentage.toFixed(0)}%)
        </p>

        <p>
            🍜 Fried Rice -
            ${votes["Fried Rice"]} votes
            (${ricePercentage.toFixed(0)}%)
        </p>

    `;
}


// Show saved results when page opens

displayPollResults();
// Dashboard Date

function updateDashboard() {

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("currentDate").textContent =
        today.toLocaleDateString("en-IN", options);
    // Update dashboard meal

const currentHour = new Date().getHours();

let mealName = "";
let mealDetails = "";

if (currentHour < 11) {

    mealName = "Breakfast";
    mealDetails = studentMenu.breakfast;

}

else if (currentHour < 17) {

    mealName = "Lunch";
    mealDetails = studentMenu.lunch;

}

else {

    mealName = "Dinner";
    mealDetails = studentMenu.dinner;

}

document.getElementById("dashboardMeal").textContent =
    mealName;

document.getElementById("dashboardMealDetails").textContent =
    mealDetails;
   
    // Update dashboard feedback count

    document.getElementById("dashboardFeedback").textContent =
        feedbacks.length;


    // Update dashboard rating

    let totalRating = 0;

    feedbacks.forEach(function(feedback) {
        totalRating += Number(feedback.rating);
    });


    let average = 0;

    if (feedbacks.length > 0) {
        average = totalRating / feedbacks.length;
    }


    document.getElementById("dashboardRating").textContent =
        average.toFixed(1) + " / 5";
}


updateDashboard();
// ===============================
// LOAD WEEKLY MENU
// ===============================

let studentWeeklyMenu = JSON.parse(
    localStorage.getItem("smartMessWeeklyMenu")
) || null;


if (studentWeeklyMenu) {

    document.getElementById("monBreakfastMenu").textContent =
        studentWeeklyMenu.Monday.breakfast;

    document.getElementById("monLunchMenu").textContent =
        studentWeeklyMenu.Monday.lunch;

    document.getElementById("monDinnerMenu").textContent =
        studentWeeklyMenu.Monday.dinner;


    document.getElementById("tueBreakfastMenu").textContent =
        studentWeeklyMenu.Tuesday.breakfast;

    document.getElementById("tueLunchMenu").textContent =
        studentWeeklyMenu.Tuesday.lunch;

    document.getElementById("tueDinnerMenu").textContent =
        studentWeeklyMenu.Tuesday.dinner;


    document.getElementById("wedBreakfastMenu").textContent =
        studentWeeklyMenu.Wednesday.breakfast;

    document.getElementById("wedLunchMenu").textContent =
        studentWeeklyMenu.Wednesday.lunch;

    document.getElementById("wedDinnerMenu").textContent =
        studentWeeklyMenu.Wednesday.dinner;


    document.getElementById("thuBreakfastMenu").textContent =
        studentWeeklyMenu.Thursday.breakfast;

    document.getElementById("thuLunchMenu").textContent =
        studentWeeklyMenu.Thursday.lunch;

    document.getElementById("thuDinnerMenu").textContent =
        studentWeeklyMenu.Thursday.dinner;


    document.getElementById("friBreakfastMenu").textContent =
        studentWeeklyMenu.Friday.breakfast;

    document.getElementById("friLunchMenu").textContent =
        studentWeeklyMenu.Friday.lunch;

    document.getElementById("friDinnerMenu").textContent =
        studentWeeklyMenu.Friday.dinner;


    document.getElementById("satBreakfastMenu").textContent =
        studentWeeklyMenu.Saturday.breakfast;

    document.getElementById("satLunchMenu").textContent =
        studentWeeklyMenu.Saturday.lunch;

    document.getElementById("satDinnerMenu").textContent =
        studentWeeklyMenu.Saturday.dinner;


    document.getElementById("sunBreakfastMenu").textContent =
        studentWeeklyMenu.Sunday.breakfast;

    document.getElementById("sunLunchMenu").textContent =
        studentWeeklyMenu.Sunday.lunch;

    document.getElementById("sunDinnerMenu").textContent =
        studentWeeklyMenu.Sunday.dinner;
}