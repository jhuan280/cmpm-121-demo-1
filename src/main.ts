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
    alert('This button will eventually do something cool!');
});

// Append the button 
app.appendChild(button);
