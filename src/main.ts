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

// Initial prices
let priceEggrolls = 10;
let priceSushi = 100;
let priceDumplings = 1000;

// Create the first upgrade button element
const upgradeButton1 = document.createElement('button');
upgradeButton1.textContent = 'Purchase Eggrolls 🍣';
upgradeButton1.disabled = true;

// Price display for eggrolls
const priceDisplayEggrolls = document.createElement("p");
priceDisplayEggrolls.textContent = `Price: ${Math.floor(priceEggrolls)} boxes`;

// Append the first upgrade button and its price to the container
upgradesContainer.appendChild(upgradeButton1);
upgradesContainer.appendChild(priceDisplayEggrolls);

// Add a click event listener to the first upgrade button
upgradeButton1.addEventListener('click', () => {
    if (counter >= Math.floor(priceEggrolls)) {
        counter -= Math.floor(priceEggrolls); // Deduct units from the counter
        increment += 1; // 1 unit per second
        priceEggrolls *= 1.15; // Increase the price
        eggrollsPurchased++;
        updateStatusDisplay(); // Update status display
        checkUpgradeAvailability(); // Re-check after purchase
        priceDisplayEggrolls.textContent = `Price: ${Math.floor(priceEggrolls)} boxes`; // Update price display
    }
});

// Create the second upgrade button element
const upgradeButton2 = document.createElement('button');
upgradeButton2.textContent = 'Purchase Sushi 🍱';
upgradeButton2.disabled = true;

// Price display for sushi
const priceDisplaySushi = document.createElement("p");
priceDisplaySushi.textContent = `Price: ${Math.floor(priceSushi)} boxes`;

// Append the second upgrade button and its price to the container
upgradesContainer.appendChild(upgradeButton2);
upgradesContainer.appendChild(priceDisplaySushi);

// Add a click event listener to the second upgrade button
upgradeButton2.addEventListener('click', () => {
    if (counter >= Math.floor(priceSushi)) {
        counter -= Math.floor(priceSushi); // Deduct units from the counter
        increment += 2; // 2 units per second
        priceSushi *= 1.15; // Increase the price
        sushiPurchased++;
        updateStatusDisplay(); // Update status display
        checkUpgradeAvailability(); // Re-check after purchase
        priceDisplaySushi.textContent = `Price: ${Math.floor(priceSushi)} boxes`; // Update price display
    }
});

// Create the third upgrade button element
const upgradeButton3 = document.createElement('button');
upgradeButton3.textContent = 'Purchase Dumplings 🥟';
upgradeButton3.disabled = true;

// Price display for dumplings
const priceDisplayDumplings = document.createElement("p");
priceDisplayDumplings.textContent = `Price: ${Math.floor(priceDumplings)} boxes`;

// Append the third upgrade button and its price to the container
upgradesContainer.appendChild(upgradeButton3);
upgradesContainer.appendChild(priceDisplayDumplings);

// Add a click event listener to the third upgrade button
upgradeButton3.addEventListener('click', () => {
    if (counter >= Math.floor(priceDumplings)) {
        counter -= Math.floor(priceDumplings); // Deduct units from the counter
        increment += 50; // 50 units per second
        priceDumplings *= 1.15; // Increase the price
        dumplingsPurchased++;
        updateStatusDisplay(); // Update status display
        checkUpgradeAvailability(); // Re-check after purchase
        priceDisplayDumplings.textContent = `Price: ${Math.floor(priceDumplings)} boxes`; // Update price display
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
    upgradeButton1.disabled = Math.floor(counter) < Math.floor(priceEggrolls);  // Enable upgrade button 1 if affordable
    upgradeButton2.disabled = Math.floor(counter) < Math.floor(priceSushi); // Enable upgrade button 2 if affordable
    upgradeButton3.disabled = Math.floor(counter) < Math.floor(priceDumplings); // Enable upgrade button 3 if affordable
}

// Start the incrementation
requestAnimationFrame(updateCounter);