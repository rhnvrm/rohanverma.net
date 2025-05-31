+++
title = "Search"
+++

# Search

<div id="search-container">
    <input type="text" id="search-input" placeholder="Search posts..." />
    <div id="search-results"></div>
</div>

<script>
// Search functionality will be implemented using Zola's built-in search index
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        // Load search index
        fetch('/search_index.en.json')
            .then(response => response.json())
            .then(data => {
                searchInput.addEventListener('input', function() {
                    const query = this.value.toLowerCase();
                    if (query.length > 2) {
                        const results = data.filter(item => 
                            item.title.toLowerCase().includes(query) ||
                            item.body.toLowerCase().includes(query)
                        );
                        
                        displayResults(results);
                    } else {
                        searchResults.innerHTML = '';
                    }
                });
            });
    }
    
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }
        
        const html = results.map(result => 
            `<div class="search-result">
                <h3><a href="${result.permalink}">${result.title}</a></h3>
                <p>${result.body.substring(0, 150)}...</p>
            </div>`
        ).join('');
        
        searchResults.innerHTML = html;
    }
});
</script>

<style>
#search-container {
    max-width: 600px;
    margin: 2rem auto;
}

#search-input {
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
}

.search-result {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

.search-result h3 {
    margin: 0 0 0.5rem 0;
}

.search-result a {
    color: var(--primary-color);
    text-decoration: none;
}

.search-result a:hover {
    text-decoration: underline;
}
</style>