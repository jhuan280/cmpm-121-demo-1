import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// Title
const gameName = "Jackie's Restaurant";
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

//------------------upgrade items-------------------------

interface Item {
  name: string;
  cost: number;
  rate: number;
  purchased: number;
  priceElement: HTMLParagraphElement;
  buttonElement: HTMLButtonElement;
  description: string;
}

// Available items with descriptions
const availableItems: Item[] = [
  {name: "Eggrolls 🍣", cost: 10, rate: 1, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Crispy and delicious eggrolls!"},
  {name: "Sushi 🍱", cost: 100, rate: 2, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Fresh sushi made from the finest fish!"},
  {name: "Dumplings 🥟", cost: 1000, rate: 50, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Steamed to perfection dumplings."},
  {name: "Noodles 🍜", cost: 5000, rate: 150, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Savory noodles with a kick of spice!"},
  {name: "Riceballs 🍙", cost: 10000, rate: 300, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Riceballs filled with a surprise!"}
];

// Create a container for the upgrade buttons
const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add('upgrades-container');

let increment = 0; // Define the initial increment growth rate

const initializeItems = () => {
    availableItems.forEach((item) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add('upgrade-item');

        item.buttonElement.textContent = `Purchase ${item.name}`;
        item.buttonElement.disabled = true;
        item.buttonElement.title = item.description;

        item.priceElement.textContent = `Price: ${Math.floor(item.cost)} boxes`;
        itemContainer.appendChild(item.buttonElement);
        itemContainer.appendChild(item.priceElement);

        upgradesContainer.appendChild(itemContainer);

        item.buttonElement.addEventListener('click', () => handleItemPurchase(item));
    });
};

// Function to handle item purchase
const handleItemPurchase = (item: Item) => {
    if (counter >= Math.floor(item.cost)) {
        counter -= Math.floor(item.cost);
        increment += item.rate;
        item.cost *= 1.15;
        item.purchased++;
        updateItemPriceDisplay(item);
        updateStatusDisplay();
        checkUpgradeAvailability();
    }
};

// Function to update the item price display
const updateItemPriceDisplay = (item: Item) => {
    item.priceElement.textContent = `Price: ${Math.floor(item.cost)} boxes`;
};

// Append the upgrades container to the app div
app.appendChild(upgradesContainer);

// Call the initialization function
initializeItems();

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
purchaseCountsDiv.textContent = availableItems.map(item => `${item.name}: ${item.purchased}`).join(", ");

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
    purchaseCountsDiv.textContent = availableItems.map(item => `${item.name}: ${item.purchased}`).join(", "); // Update purchase counts display
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
    availableItems.forEach(item => {
        item.buttonElement.disabled = Math.floor(counter) < Math.floor(item.cost);  // Enable button if affordable
    });
}

// Start the incrementation
requestAnimationFrame(updateCounter);