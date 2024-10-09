import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//title
const gameName = "Jackie's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//------------------primary button-------------------------

// Create the main button element
const mainButton = document.createElement('button');
mainButton.textContent = '🥡';

// Append the main button to the app div
app.appendChild(mainButton);

// Add a click event listener to the main button
mainButton.addEventListener('click', () => {
    counter++; // Increment the counter by 1 on button click
    counterDiv.textContent = `Counter: ${Math.floor(counter)} boxes of takeout`; // Update counter display
    console.log('Main button was clicked!');
    checkUpgradeAvailability(); // Check if upgrade can be enabled
});

//------------------upgrade button-------------------------

// Create an upgrade button element
const upgradeButton = document.createElement('button');
upgradeButton.textContent = 'Upgrade Item 🌟';
upgradeButton.disabled = true;


// Append the upgrade button to the app div
app.appendChild(upgradeButton);

// Add a click event listener to the upgrade button
upgradeButton.addEventListener('click', () => {
    if (counter >= 10) {
        console.log('Upgrade button was clicked!');
        counter -= 10; // Deduct 10 units from the counter
        increment += 1 / 60; // Increase the growth rate to add 1 per second
        checkUpgradeAvailability(); // Re-check after purchase
        // upgradeButton.disabled = true; // Disable the button post-purchase to prevent repeated purchases
        // counterDiv.textContent = `Counter: ${Math.floor(counter)} boxes of takeout`; // Update counter display
    }
});


//------------------counter-------------------------

// Create a div element to display the counter
const counterDiv = document.createElement("div");
let counter = 0; // Initialize counter
counterDiv.textContent = `Counter: ${counter} boxes of takeout`;

// Append the counter div to the app div
app.appendChild(counterDiv);

// // Add a click event listener to the button
// button.addEventListener('click', () => {
//     counter++; // Increment the counter
//     counterDiv.textContent = `Counter: ${counter} boxes of takeout`; // Update counter display
//     // console.log('Button was clicked!');
//     // alert('test');
// });

//------------------incrementation-------------------------

let increment = 0; // Set the initial increment to 0, so no automatic increase at start

const updateCounter = () => {
    counter += increment; // Add fractional amount per frame based on current increment
    counterDiv.textContent = `Counter: ${Math.floor(counter)} boxes of takeout`; // Update display

    checkUpgradeAvailability(); // Check if upgrade can be enabled
    // Schedule the next frame
    requestAnimationFrame(updateCounter);
}

// Function to enable the "Upgrade" button when conditions are met
const checkUpgradeAvailability = () => {
    if (counter >= 10) {
        upgradeButton.disabled = false; // Enable upgrade button
    } else {
        upgradeButton.disabled = true; // Disable if can't afford
    }
}

// Start the incrementation
requestAnimationFrame(updateCounter);
