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

let currentFontSize = 16;

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

function displayQuote() {
  if (filteredQuotes.length > 0) {
    const quote = filteredQuotes[currentIndex];
    quoteDisplay.innerHTML = `"${quote.quote}" - ${quote.author}`;
  } else {
    quoteDisplay.innerHTML = "No quotes available.";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < filteredQuotes.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  displayQuote();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = filteredQuotes.length - 1;
  }
  displayQuote();
});


loadQuotes();
