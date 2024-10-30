import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// Constants
const GAME_NAME = "Jackie's Restaurant";
const PRICE_MULTIPLIER = 1.15;
const INITIAL_INCREMENT = 0;

// Title
document.title = GAME_NAME;

const header = document.createElement("h1");
header.innerHTML = GAME_NAME;
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
    counter++; 
    updateCounterDisplay(); 
    checkUpgradeAvailability();
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

const availableItems: Item[] = [
    { name: "Eggrolls 🍣", cost: 10, rate: 1, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Crispy and delicious eggrolls!" },
    { name: "Sushi 🍱", cost: 100, rate: 2, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Fresh sushi made from the finest fish!" },
    { name: "Dumplings 🥟", cost: 1000, rate: 50, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Steamed to perfection dumplings." },
    { name: "Noodles 🍜", cost: 5000, rate: 150, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Savory noodles with a kick of spice!" },
    { name: "Riceballs 🍙", cost: 10000, rate: 300, purchased: 0, priceElement: document.createElement("p"), buttonElement: document.createElement('button'), description: "Riceballs filled with a surprise!" }
];

const upgradesContainer = document.createElement("div");
upgradesContainer.classList.add('upgrades-container');

let increment = INITIAL_INCREMENT;

// Function to create and initialize an item element
const createAndInitializeItemElement = (item: Item) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add('upgrade-item');

    item.buttonElement.textContent = `Purchase ${item.name}`;
    item.buttonElement.disabled = true;
    item.buttonElement.title = item.description;

    item.priceElement.textContent = `Price: ${Math.floor(item.cost)} boxes`;
    itemContainer.appendChild(item.buttonElement);
    itemContainer.appendChild(item.priceElement);

    item.buttonElement.addEventListener('click', () => handleItemPurchase(item));

    return itemContainer;
};

const initializeItems = () => {
    availableItems.forEach((item) => {
        const itemContainer = createAndInitializeItemElement(item);
        upgradesContainer.appendChild(itemContainer);
    });
};

const handleItemPurchase = (item: Item) => {
    if (counter >= Math.floor(item.cost)) {
        counter -= Math.floor(item.cost);
        increment += item.rate;
        item.cost *= PRICE_MULTIPLIER;
        item.purchased++;
        updateItemPriceDisplay(item);
        updateStatusDisplay();
        checkUpgradeAvailability();
    }
};

const updateItemPriceDisplay = (item: Item) => {
    item.priceElement.textContent = `Price: ${Math.floor(item.cost)} boxes`;
};

app.appendChild(upgradesContainer);
initializeItems();

//------------------counter and status display-------------------------

const counterDiv = document.createElement("div");
let counter = 0;
counterDiv.textContent = `Counter: ${counter} boxes of takeout`;

app.appendChild(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth rate: ${increment.toFixed(1)} boxes/sec`;

const purchaseCountsDiv = document.createElement("div");
purchaseCountsDiv.textContent = availableItems.map(item => `${item.name}: ${item.purchased}`).join(", ");

app.appendChild(growthRateDiv);
app.appendChild(purchaseCountsDiv);

const updateCounterDisplay = () => {
    counterDiv.textContent = `Counter: ${Math.floor(counter)} boxes of takeout`;
};

const updateStatusDisplay = () => {
    growthRateDiv.textContent = `Growth rate: ${increment.toFixed(1)} boxes/sec`;
    purchaseCountsDiv.textContent = availableItems.map(item => `${item.name}: ${item.purchased}`).join(", ");
};

//------------------incrementation-------------------------

let lastTimestamp = performance.now();

const updateCounter = (currentTimestamp: number) => {
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000;
    counter += increment * deltaTime;
    updateCounterDisplay();
    checkUpgradeAvailability();
    lastTimestamp = currentTimestamp;
    requestAnimationFrame(updateCounter);
}

const checkUpgradeAvailability = () => {
    availableItems.forEach(item => {
        item.buttonElement.disabled = Math.floor(counter) < Math.floor(item.cost);

        // Apply the class to the button
        if (Math.floor(counter) < Math.floor(item.cost)) {
            item.buttonElement.classList.add('unavailable');
            item.buttonElement.classList.remove('available');
        } else {
            item.buttonElement.classList.add('available');
            item.buttonElement.classList.remove('unavailable');
        }
    });
}

requestAnimationFrame(updateCounter);