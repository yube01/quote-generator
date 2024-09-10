let quotes = [];
let currentCategory = "Science";
let currentIndex = 0;
let filteredQuotes = [];

const quoteDisplay = document.getElementById("quoteDisplay");
const categorySelect = document.getElementById("categorySelect");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const increaseFontBtn = document.getElementById("increaseFontBtn");
const decreaseFontBtn = document.getElementById("decreaseFontBtn");
const modeToggle = document.getElementById("modeToggle");
const randomBtn = document.getElementById("randomBtn");

let currentFontSize = 30;

// loading data from quotes.json file and filtering based on category and storing it into quotes and filterQuotes array
async function loadQuotes() {
  try {
    const response = await fetch("./quotes.json");
    const data = await response.json();
    quotes = data.quotes;
    filteredQuotes = quotes.filter(
      (quote) => quote.category === currentCategory
    );
    displayQuote();
  } catch (error) {
    console.error("Error fetching quotes:", error);
    quoteDisplay.innerHTML = "Failed to load quotes.";
  }
}

// displays the quote data on html
function displayQuote() {
  if (filteredQuotes.length > 0) {
    const quote = filteredQuotes[currentIndex];
    quoteDisplay.innerHTML = `"${quote.quote}" - ${quote.author}`;
  } else {
    quoteDisplay.innerHTML = "No quotes available.";
  }
}

// next button function
nextBtn.addEventListener("click", () => {
  if (currentIndex < filteredQuotes.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  displayQuote();
});

// prevoius button function
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = filteredQuotes.length - 1;
  }
  displayQuote();
});

// category filter button which filters quote category based on user input
categorySelect.addEventListener("change", (e) => {
  currentCategory = e.target.value;
  filteredQuotes = quotes.filter((quote) => quote.category === currentCategory);
  currentIndex = 0;
  displayQuote();
});

// toggle button for white and dark mode
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("white-mode");
  modeToggle.textContent = document.body.classList.contains("white-mode")
    ? "Dark Mode"
    : "White Mode";
});

// random button which displays random quotes from random category
randomBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.quote}" - ${randomQuote.author}`;
});

// increases font size when increase font button is clicked
increaseFontBtn.addEventListener("click", () => {
  currentFontSize += 2;
  quoteDisplay.style.fontSize = `${currentFontSize}px`;
});

// decreases font size when decreases font button is clicked
decreaseFontBtn.addEventListener("click", () => {
  if (currentFontSize > 12) {
    currentFontSize -= 2;
    quoteDisplay.style.fontSize = `${currentFontSize}px`;
  }
});

// calls loadQuotes funtion which loads data from quotes.json and displays the data inside html when website loads
loadQuotes();
