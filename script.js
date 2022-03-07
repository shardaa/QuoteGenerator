const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}
function completeLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show new quotes

function newQuote(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // check length of quote and add class
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    }
    else(quoteText.classList.remove("long-quote"))
    
    quoteText.textContent = quote.text

// check if author is blank
    if (!quote.author) {
        authorText.textContent = "Anonymous";
    }
    else {
        authorText.textContent = `- ${quote.author}`
    }

    completeLoading()
}
//  Get quotes from api

async function getQuotes() {
    loading()
    const apiUrl = "https://type.fit/api/quotes";

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://www.facebook.com/dialog/share?
app_id=145634995501895
&display=page
&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`;
    // const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl,'_blank');
}

twitterBtn.addEventListener('click',tweetQuote)
newQuoteBtn.addEventListener('click',newQuote)

getQuotes()