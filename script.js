const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Please enter a task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        let span = document.createElement("span");
        span.innerHTML = "×";
        li.appendChild(span);

        // Add event listener for checking off task
        li.addEventListener("click", () => {
            li.classList.toggle("checked");
            saveData();
        });

        // Add event listener for removing task
        span.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents triggering the li click event
            li.remove();
            saveData();
        });

        listContainer.appendChild(li);
        inputBox.value = ""; // Clear the input box
        saveData(); // Save data to local storage
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function getData() {
    listContainer.innerHTML = localStorage.getItem("data") || ''; // Ensure it doesn't throw an error
    const items = listContainer.querySelectorAll("li");
    items.forEach(item => {
        // Re-attach event listeners for existing items
        item.addEventListener("click", () => {
            item.classList.toggle("checked");
            saveData();
        });
        
        const span = item.querySelector("span");
        if (span) {
            span.addEventListener("click", (e) => {
                e.stopPropagation();
                item.remove();
                saveData();
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", getData);
