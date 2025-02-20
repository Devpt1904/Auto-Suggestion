const searchBox = document.getElementById("searchBox");
const suggestions = document.getElementById("suggestions");

searchBox.addEventListener("input", async () => {
    let query = searchBox.value.trim();
    suggestions.innerHTML = "";

    if (query === "") return;

    // Wikipedia Suggest API (works without CORS issues)
    let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=5&format=json&origin=*`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let suggestionsList = data[1]; // Extract suggestions

        if (suggestionsList.length === 0) {
            suggestions.innerHTML = "<li>No suggestions found</li>";
            return;
        }

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
        suggestions.innerHTML = "<li>Error fetching data</li>";
    }
});
