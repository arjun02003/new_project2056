/*
 * HIWIN Dynamic Catalog JavaScript
 * Handles fetching data from data.js based on URL parameters and rendering it.
 */

const Catalog = {
    getParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            cat: params.get('cat'),
            series: params.get('series'),
            product: params.get('product')
        };
    },

    initProductsPage() {
        const container = document.getElementById('categories-container');
        if (!container) return;

        let html = '';
        HIWIN_DATA.categories.forEach(cat => {
            html += `
                <article class="category-card">
                    <a href="category.html?cat=${cat.id}" class="category-card__media-link" aria-label="Open ${cat.name} category">
                        <div class="category-card__media">
                            <img src="${cat.image}" alt="${cat.name}" loading="lazy">
                        </div>
                    </a>
                    <div class="category-card__content">
                        <h3>${cat.name}</h3>
                        <p>${cat.description}</p>
                        <a href="category.html?cat=${cat.id}" class="button button-primary">Explore Category →</a>
                    </div>
                </article>
            `;
        });
        container.innerHTML = html;
    },

    initCategoryPage() {
        const container = document.getElementById('series-container');
        const headerTitle = document.getElementById('category-title');
        const headerDesc = document.getElementById('category-desc');
        const breadcrumbCat = document.getElementById('breadcrumb-cat');

        if (!container) return;
        
        const params = this.getParams();
        const categoryId = params.cat || 'linear-guideways'; // default for fallback
        const category = HIWIN_DATA.categories.find(c => c.id === categoryId);
        
        if (category) {
            if(headerTitle) headerTitle.textContent = category.name.toUpperCase();
            if(headerDesc) headerDesc.textContent = category.description;
            if(breadcrumbCat) breadcrumbCat.textContent = category.name;
        }

        const seriesList = HIWIN_DATA.series.filter(s => s.categoryId === categoryId);
        let html = '';
        
        if (seriesList.length === 0) {
            html = '<p>No series found for this category.</p>';
        } else {
            seriesList.forEach(series => {
                html += `
                    <article class="category-card">
                        <a href="subcategory.html?series=${series.id}" class="category-card__media-link" aria-label="Explore ${series.name}">
                            <div class="category-card__media">
                                <img src="${series.image}" alt="${series.name}" loading="lazy">
                            </div>
                        </a>
                        <div class="category-card__content">
                            <h3>${series.name}</h3>
                            <p>${series.description}</p>
                            <a href="subcategory.html?series=${series.id}" class="button button-primary">Explore Models →</a>
                        </div>
                    </article>
                `;
            });
        }
        container.innerHTML = html;
    },

    initSubcategoryPage() {
        const container = document.getElementById('models-container');
        const headerTitle = document.getElementById('series-title');
        const headerDesc = document.getElementById('series-desc');
        const breadcrumbSeries = document.getElementById('breadcrumb-series');
        const breadcrumbCatLink = document.getElementById('breadcrumb-cat-link');

        if (!container) return;
        
        const params = this.getParams();
        const seriesId = params.series || 'hg-series'; 
        const series = HIWIN_DATA.series.find(s => s.id === seriesId);
        let cat = null;

        if (series) {
            cat = HIWIN_DATA.categories.find(c => c.id === series.categoryId);
            if(headerTitle) headerTitle.textContent = series.name;
            if(headerDesc) headerDesc.textContent = series.description;
            if(breadcrumbSeries) breadcrumbSeries.textContent = series.name;
            
            if (cat && breadcrumbCatLink) {
                breadcrumbCatLink.textContent = cat.name;
                breadcrumbCatLink.href = `category.html?cat=${cat.id}`;
            }
        }

        const modelsList = HIWIN_DATA.models.filter(m => m.seriesId === seriesId);
        let html = '';
        
        if (modelsList.length === 0) {
            html = '<p>No models found for this series.</p>';
        } else {
            modelsList.forEach(model => {
                html += `
                    <article class="category-card">
                        <a href="product-details.html?product=${model.id}" class="category-card__media-link" aria-label="Explore ${model.name}">
                            <div class="category-card__media">
                                <img src="${model.image}" alt="${model.name}" loading="lazy">
                            </div>
                        </a>
                        <div class="category-card__content">
                            <h3>${model.name}</h3>
                            <p>${model.description}</p>
                            <a href="product-details.html?product=${model.id}" class="button button-primary">View Details →</a>
                        </div>
                    </article>
                `;
            });
        }
        container.innerHTML = html;
    },

    initProductDetailsPage() {
        const params = this.getParams();
        const productId = params.product || 'hgr20c';
        const model = HIWIN_DATA.models.find(m => m.id === productId);
        const details = HIWIN_DATA.products[productId];

        if (!model || !details) return;

        const series = HIWIN_DATA.series.find(s => s.id === model.seriesId);
        const category = series ? HIWIN_DATA.categories.find(c => c.id === series.categoryId) : null;

        // Populate Breadcrumbs
        if (category) {
            const bc = document.getElementById('breadcrumb-cat-link');
            if (bc) { bc.textContent = category.name; bc.href = `category.html?cat=${category.id}`; }
        }
        if (series) {
            const bs = document.getElementById('breadcrumb-series-link');
            if (bs) { bs.textContent = series.name; bs.href = `subcategory.html?series=${series.id}`; }
        }
        const bm = document.getElementById('breadcrumb-model');
        if (bm) bm.textContent = model.name;

        // Populate Main Info
        const nameEl = document.getElementById('product-name');
        if (nameEl) nameEl.textContent = details.name;

        const descEl = document.getElementById('product-desc');
        if (descEl) descEl.textContent = details.description;

        // Main Image & Gallery
        const mainImg = document.getElementById('product-main-img');
        if (mainImg) mainImg.src = details.image;

        const galleryEl = document.getElementById('product-gallery');
        if (galleryEl && details.gallery) {
            let galHtml = '';
            details.gallery.forEach((img, idx) => {
                galHtml += `<img src="${img}" alt="Gallery ${idx+1}" class="gallery-thumb" onclick="document.getElementById('product-main-img').src=this.src" loading="lazy">`;
            });
            galleryEl.innerHTML = galHtml;
        }

        // Features
        const featuresEl = document.getElementById('product-features');
        if (featuresEl && details.features) {
            let featHtml = '<ul>';
            details.features.forEach(f => featHtml += `<li>${f}</li>`);
            featHtml += '</ul>';
            featuresEl.innerHTML = featHtml;
        }

        // Specifications
        const specsEl = document.getElementById('product-specs');
        if (specsEl && details.specifications) {
            let specHtml = '<table class="spec-table"><tbody>';
            for (let key in details.specifications) {
                specHtml += `<tr><th>${key}</th><td>${details.specifications[key]}</td></tr>`;
            }
            specHtml += '</tbody></table>';
            specsEl.innerHTML = specHtml;
        }

        // Applications
        const appsEl = document.getElementById('product-apps');
        if (appsEl && details.applications) {
            let appHtml = '<ul>';
            details.applications.forEach(a => appHtml += `<li>${a}</li>`);
            appHtml += '</ul>';
            appsEl.innerHTML = appHtml;
        }
    },

    init() {
        this.initProductsPage();
        this.initCategoryPage();
        this.initSubcategoryPage();
        this.initProductDetailsPage();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Catalog.init();
});
