const logDate = document.getElementById("logDate");
const learned = document.getElementById("learned");
const takeaway = document.getElementById("takeaway");
const entryList = document.getElementById("entryList");
const journalPage = document.getElementById("journalPage");

let entries =
    JSON.parse(localStorage.getItem("learningEntries"))
    || {};

// Set today's date automatically
logDate.value = new Date().toISOString().split("T")[0];

// Format date nicely
function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Save entry
function saveEntry() {

    const date = logDate.value;

    entries[date] = {

        learned: learned.value.trim(),

        takeaway: takeaway.value.trim()
    };

    localStorage.setItem(
        "learningEntries",
        JSON.stringify(entries)
    );

    displayEntries();

    document.getElementById("saveStatus").textContent =
        "✓ Entry saved successfully";
}

// Display previous entries
function displayEntries() {

    entryList.innerHTML = "";

    const dates =
        Object.keys(entries)
            .sort()
            .reverse();

    dates.forEach(date => {

        const li =
            document.createElement("li");

        li.textContent = formatDate(date);

        li.onclick = () => {

    // Animate current page out
    journalPage.classList.add("page-exit");

    setTimeout(() => {

        // Remove exit animation
        journalPage.classList.remove("page-exit");

        // Place the new page to the right
        journalPage.classList.add("page-enter");

        // Load the selected entry
        logDate.value = date;
        learned.value = entries[date].learned;
        takeaway.value = entries[date].takeaway;

        // Allow the browser to apply the class first
        requestAnimationFrame(() => {

            // Animate the page into view
            journalPage.classList.remove("page-enter");

        });

    }, 350);

};

        entryList.appendChild(li);
    });
}

// Load entry when date changes
logDate.addEventListener("change", () => {

    const selectedDate =
        logDate.value;

    if (entries[selectedDate]) {

        learned.value =
            entries[selectedDate].learned;

        takeaway.value =
            entries[selectedDate].takeaway;

    } else {

        learned.value = "";
        takeaway.value = "";
    }
});

// Initial display
displayEntries();
function deleteEntry(){

    const date = logDate.value;

    if(!entries[date]){
        return;
    }

    if(confirm("Delete this learning log?")){

        delete entries[date];

        localStorage.setItem(
            "learningEntries",
            JSON.stringify(entries)
        );

        learned.value = "";
        takeaway.value = "";

        displayEntries();

        document.getElementById("saveStatus").textContent =
            "✓ Entry deleted successfully.";

    }

}