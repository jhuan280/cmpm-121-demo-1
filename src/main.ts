import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//title
const gameName = "Jackie's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//------------------button-------------------------

// Create a new button element and set the text
const button = document.createElement('button');
button.textContent = '🥡';

// Add a click event listener to the button
button.addEventListener('click', () => {
    console.log('Button was clicked!');
    // alert('test');
});

// Append the button 
app.appendChild(button);

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

// Function to update counter display
const updateCounter = () => {
    counterDiv.textContent = `Counter: ${counter} boxes of takeout`;
}

// Add a click event listener to the button
button.addEventListener('click', () => {
    counter++; // Increment the counter
    updateCounter();
    counterDiv.textContent = `Counter: ${counter} boxes of takeout`; // Update counter display
    // console.log('Button was clicked!');
    // alert('test');
});


// Increment the counter automatically every second
setInterval(() => {
    counter++; // Increment the counter
    updateCounter(); // Update counter display
}, 1000); // 1000ms = 1 second
