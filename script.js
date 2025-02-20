const searchBox = document.getElementById("searchBox");
const suggestions = document.getElementById("suggestions");

searchBox.addEventListener("input", async () => {
    let query = searchBox.value.trim();
    suggestions.innerHTML = "";

    if (query === "") return;

    // Fetch suggestions from Google API
    let url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        let suggestionsList = data[1]; // Extracting suggestions from API response

        // Display suggestions
        suggestionsList.forEach(word => {
            let li = document.createElement("li");
            li.textContent = word;
            li.addEventListener("click", () => {
                searchBox.value = word;
                suggestions.innerHTML = "";
            });
            suggestions.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
});
