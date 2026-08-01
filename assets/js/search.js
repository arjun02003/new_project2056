/*
 * HIWIN search JavaScript
 * Handles parsing the search query, searching through data.js, and rendering results.
 */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let query = params.get('q');
    
    // Fallback to sessionStorage in case server redirects and drops the query parameter
    if (!query) {
        query = sessionStorage.getItem('hiwin_search_query');
        if (query) {
            window.history.replaceState({}, '', '?q=' + encodeURIComponent(query));
        }
    } else {
        sessionStorage.setItem('hiwin_search_query', query);
    }
    
    const queryDisplay = document.getElementById('search-query-display');
    const resultsContainer = document.getElementById('search-results-container');
    const searchInput = document.querySelector('.search-panel input[type="search"]');

    if (searchInput && query) {
        searchInput.value = query;
    }

    if (!resultsContainer) return;

    if (!query) {
        if (queryDisplay) queryDisplay.textContent = 'Please enter a search term.';
        resultsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }

    if (queryDisplay) queryDisplay.textContent = `Showing results for: "${query}"`;

    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search across models (Product Name, Model Number, Category, Series)
    // First, let's map models to their series and categories for easier searching
    HIWIN_DATA.models.forEach(model => {
        const series = HIWIN_DATA.series.find(s => s.id === model.seriesId);
        const category = series ? HIWIN_DATA.categories.find(c => c.id === series.categoryId) : null;
        
        const seriesName = series ? series.name : '';
        const categoryName = category ? category.name : '';

        // Fields to search
        const searchableText = [
            model.name.toLowerCase(),
            model.id.toLowerCase(),
            seriesName.toLowerCase(),
            categoryName.toLowerCase(),
            model.description.toLowerCase()
        ].join(' ');

        if (searchableText.includes(lowerQuery)) {
            results.push({
                model: model,
                seriesName: seriesName,
                categoryName: categoryName
            });
        }
    });

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="grid-column: 1 / -1; font-size: 1.2rem; color: rgba(16, 35, 63, 0.75);">No products found.</p>';
        return;
    }

    let html = '';
    results.forEach(item => {
        const { model, categoryName, seriesName } = item;
        html += `
            <article class="category-card">
                <a href="product-details.html?product=${model.id}" class="category-card__media-link" aria-label="Explore ${model.name}">
                    <div class="category-card__media">
                        <img src="${model.image}" alt="${model.name}" loading="lazy">
                    </div>
                </a>
                <div class="category-card__content">
                    <p style="font-size: 0.85rem; color: var(--accent); margin: 0 0 5px; font-weight: 600;">${categoryName} > ${seriesName}</p>
                    <h3 style="margin-top:0;">${model.name}</h3>
                    <p>${model.description}</p>
                    <a href="product-details.html?product=${model.id}" class="button button-primary">View Details →</a>
                </div>
            </article>
        `;
    });

    resultsContainer.innerHTML = html;
});
