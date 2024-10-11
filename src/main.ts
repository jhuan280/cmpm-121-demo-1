import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// Title
const gameName = "Jackie's Amazing Game";
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
    checkUpgradeAvailability(); // Check if upgrades can be enabled
});

//------------------upgrade buttons-------------------------

// Create the first upgrade button element
const upgradeButton1 = document.createElement('button');
upgradeButton1.textContent = 'Purchase eggrolls 🍣';
upgradeButton1.disabled = true;

// Append the first upgrade button to the app div
app.appendChild(upgradeButton1);

// Add a click event listener to the first upgrade button
upgradeButton1.addEventListener('click', () => {
    if (counter >= 10) {
        console.log('Upgrade button was clicked!');
        counter -= 10; // Deduct 10 units from the counter
        increment += 1; // 1 unit per second
        checkUpgradeAvailability(); // Re-check after purchase
    }
});

// Create the second upgrade button element
const upgradeButton2 = document.createElement('button');
upgradeButton2.textContent = 'Purchase sushi 🍱';
upgradeButton2.disabled = true;

// Append the second upgrade button to the app div
app.appendChild(upgradeButton2);

// Add a click event listener to the second upgrade button
upgradeButton2.addEventListener('click', () => {
    if (counter >= 100) {
        console.log('Super Upgrade button was clicked!');
        counter -= 100; // Deduct 100 units from the counter
        increment += 2; // 2 units per second
        checkUpgradeAvailability(); // Re-check after purchase
    }
});

// Create the third upgrade button element
const upgradeButton3 = document.createElement('button');
upgradeButton3.textContent = 'Purchase dumplings 🥟';
upgradeButton3.disabled = true;

// Append the third upgrade button to the app div
app.appendChild(upgradeButton3);

// Add a click event listener to the third upgrade button
upgradeButton3.addEventListener('click', () => {
    if (counter >= 1000) {
        console.log('Dumplings upgrade was purchased!');
        counter -= 1000; // Deduct 1000 units from the counter
        increment += 50; // 50 units per second
        checkUpgradeAvailability(); // Re-check after purchase
    }
});

//------------------counter-------------------------

// Create a div element to display the counter
const counterDiv = document.createElement("div");
let counter = 0; // Initialize counter
counterDiv.textContent = `Counter: ${counter} boxes of takeout`;

// Append the counter div to the app div
app.appendChild(counterDiv);

//------------------incrementation-------------------------

let increment = 0; // Set the initial increment growth rate
let lastTimestamp = performance.now(); // Initialize last timestamp for calculation

const updateCounter = (currentTimestamp: number) => {
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000; // Calculate time difference in seconds
    counter += increment * deltaTime; // Increment counter based on actual elapsed time
    counterDiv.textContent = `Counter: ${Math.floor(counter)} boxes of takeout`; // Update counter display

    checkUpgradeAvailability(); // Re-check if upgrades can be enabled
    lastTimestamp = currentTimestamp; // Update last timestamp for next frame
    requestAnimationFrame(updateCounter); // Schedule the next frame
}

// Function to enable the upgrade buttons when conditions are met
const checkUpgradeAvailability = () => {
    upgradeButton1.disabled = counter < 10;  // Enable upgrade button 1 if affordable
    upgradeButton2.disabled = counter < 100; // Enable upgrade button 2 if affordable
    upgradeButton3.disabled = counter < 1000; // Enable upgrade button 3 if affordable
}

// Start the incrementation
requestAnimationFrame(updateCounter);