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
mainButton.classList.add('main-button');

// Append the main button to the app div, right after the title
app.appendChild(mainButton);

// Add a click event listener to the main button
mainButton.addEventListener('click', () => {
    counter++; // Increment the counter by 1 on button click
    updateCounterDisplay(); // Update counter display
    checkUpgradeAvailability(); // Check if upgrades can be enabled
});

//------------------upgrade buttons container-------------------------

// Create a container for the upgrade buttons
const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add('upgrades-container');

// Variables to track how many of each type have been purchased
let eggrollsPurchased = 0;
let sushiPurchased = 0;
let dumplingsPurchased = 0;

let increment = 0; // Set the initial increment growth rate

// Create the first upgrade button element
const upgradeButton1 = document.createElement('button');
upgradeButton1.textContent = 'Purchase eggrolls 🍣';
upgradeButton1.disabled = true;

// Price display for eggrolls
const priceEggrolls = document.createElement("p");
priceEggrolls.textContent = 'Price: 10 boxes';

// Append the first upgrade button and its price to the container
upgradesContainer.appendChild(upgradeButton1);
upgradesContainer.appendChild(priceEggrolls);

// Add a click event listener to the first upgrade button
upgradeButton1.addEventListener('click', () => {
    if (counter >= 10) {
        counter -= 10; // Deduct 10 units from the counter
        increment += 1; // 1 unit per second
        eggrollsPurchased++;
        updateStatusDisplay(); // Update status display
        checkUpgradeAvailability(); // Re-check after purchase
    }
});

// Create the second upgrade button element
const upgradeButton2 = document.createElement('button');
upgradeButton2.textContent = 'Purchase sushi 🍱';
upgradeButton2.disabled = true;

// Price display for sushi
const priceSushi = document.createElement("p");
priceSushi.textContent = 'Price: 100 boxes';

// Append the second upgrade button and its price to the container
upgradesContainer.appendChild(upgradeButton2);
upgradesContainer.appendChild(priceSushi);

// Add a click event listener to the second upgrade button
upgradeButton2.addEventListener('click', () => {
    if (counter >= 100) {
        counter -= 100; // Deduct 100 units from the counter
        increment += 2; // 2 units per second
        sushiPurchased++;
        updateStatusDisplay(); // Update status display
        checkUpgradeAvailability(); // Re-check after purchase
    }
});

// Create the third upgrade button element
const upgradeButton3 = document.createElement('button');
upgradeButton3.textContent = 'Purchase dumplings 🥟';
upgradeButton3.disabled = true;

// Price display for dumplings
const priceDumplings = document.createElement("p");
priceDumplings.textContent = 'Price: 1000 boxes';

// Append the third upgrade button and its price to the container
upgradesContainer.appendChild(upgradeButton3);
upgradesContainer.appendChild(priceDumplings);

// Add a click event listener to the third upgrade button
upgradeButton3.addEventListener('click', () => {
    if (counter >= 1000) {
        counter -= 1000; // Deduct 1000 units from the counter
        increment += 50; // 50 units per second
        dumplingsPurchased++;
        updateStatusDisplay(); // Update status display
        checkUpgradeAvailability(); // Re-check after purchase
    }
});

// Append the upgrades container to the app div
app.appendChild(upgradesContainer);

//------------------counter and status display-------------------------

// Create a div element to display the counter
const counterDiv = document.createElement("div");
let counter = 0; // Initialize counter
counterDiv.textContent = `Counter: ${counter} boxes of takeout`;

// Append the counter div to the app div
app.appendChild(counterDiv);

// Create a div element to display the growth rate
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth rate: ${increment.toFixed(1)} boxes/sec`;

// Create a div element to display the purchase counts
const purchaseCountsDiv = document.createElement("div");
purchaseCountsDiv.textContent = `Eggrolls: ${eggrollsPurchased}, Sushi: ${sushiPurchased}, Dumplings: ${dumplingsPurchased}`;

// Append the growth rate and purchase counts divs to the app div
app.appendChild(growthRateDiv);
app.appendChild(purchaseCountsDiv);

// Function to update the counter display
const updateCounterDisplay = () => {
    counterDiv.textContent = `Counter: ${Math.floor(counter)} boxes of takeout`; // Update counter display
}

// Function to update the status display
const updateStatusDisplay = () => {
    growthRateDiv.textContent = `Growth rate: ${increment.toFixed(1)} boxes/sec`; // Update growth rate display
    purchaseCountsDiv.textContent = `Eggrolls: ${eggrollsPurchased}, Sushi: ${sushiPurchased}, Dumplings: ${dumplingsPurchased}`; // Update purchase counts display
}

//------------------incrementation-------------------------

let lastTimestamp = performance.now(); // Initialize last timestamp for calculation

const updateCounter = (currentTimestamp: number) => {
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000; // Calculate time difference in seconds
    counter += increment * deltaTime; // Increment counter based on actual elapsed time
    updateCounterDisplay(); // Update counter display with floor value
    checkUpgradeAvailability(); // Check if upgrades can be enabled without hitting the primary button
    lastTimestamp = currentTimestamp; // Update last timestamp for next frame
    requestAnimationFrame(updateCounter); // Schedule the next frame
}

// Function to enable the upgrade buttons when conditions are met
const checkUpgradeAvailability = () => {
    upgradeButton1.disabled = Math.floor(counter) < 10;  // Enable upgrade button 1 if affordable
    upgradeButton2.disabled = Math.floor(counter) < 100; // Enable upgrade button 2 if affordable
    upgradeButton3.disabled = Math.floor(counter) < 1000; // Enable upgrade button 3 if affordable
}

// Start the incrementation
requestAnimationFrame(updateCounter);