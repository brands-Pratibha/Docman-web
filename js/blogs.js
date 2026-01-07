/**
 * Blogs Page - Dynamic Blog Rendering
 * Handles blog ordering (newest-first), pagination, and load more functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initBlogListing();
});

// Configuration
const BLOGS_PER_PAGE = 7;
let visibleCount = BLOGS_PER_PAGE;

// Get blogs sorted by ID descending (newest first)
function getSortedBlogs() {
    return [...blogPosts].sort((a, b) => b.id - a.id);
}

function initBlogListing() {
    renderFeaturedBlog();
    renderBlogGrid();
    setupLoadMore();
}

function getInitials(name) {
    if (!name) return 'DL';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function renderFeaturedBlog() {
    const sortedBlogs = getSortedBlogs();
    if (sortedBlogs.length === 0) return;

    const featuredBlog = sortedBlogs[0]; // Newest blog as featured
    const container = document.getElementById('featured-blog-dynamic');
    if (!container) return;

    container.innerHTML = `
        <div class="featured-blog-card" onclick="window.location.href='blog-detail.html?id=${featuredBlog.id}'" style="cursor: pointer;">
            <div class="featured-blog-image">
                <img src="${featuredBlog.image}" alt="${featuredBlog.title}">
            </div>
            <div class="featured-blog-content">
                <span class="blog-category">${featuredBlog.category}</span>
                <h2>${featuredBlog.title}</h2>
                <p>${getTextSummary(featuredBlog.content, 200)}</p>
                <div class="blog-meta">
                    <div class="author-info">
                        <span class="avatar">${getInitials(featuredBlog.author)}</span>
                        <span class="author-name">${featuredBlog.author}</span>
                    </div>
                    <div class="blog-date">
                        <i class="far fa-calendar"></i>
                        <span>${featuredBlog.date}</span>
                    </div>
                </div>
                <a href="blog-detail.html?id=${featuredBlog.id}" class="btn btn-primary read-more-btn">
                    <span data-i18n="blog_read_more">Read More</span>
                </a>
            </div>
        </div>
    `;
}

function renderBlogGrid() {
    const sortedBlogs = getSortedBlogs();
    const gridBlogs = sortedBlogs.slice(1); // Exclude featured (first) blog
    const container = document.getElementById('blog-grid-dynamic');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    if (!container) return;

    // Calculate how many to show (excluding featured)
    const blogsToShow = gridBlogs.slice(0, visibleCount - 1);

    container.innerHTML = blogsToShow.map(blog => `
        <div class="blog-card" onclick="window.location.href='blog-detail.html?id=${blog.id}'" style="cursor: pointer;">
            <div class="blog-image">
                <img src="${blog.image}" alt="${blog.title}">
            </div>
            <div class="blog-content">
                <span class="blog-category">${blog.category}</span>
                <h3>${blog.title}</h3>
                <p>${getTextSummary(blog.content, 100)}</p>
                <div class="blog-meta-mini">
                    <span class="author-mini"><span class="avatar-mini">${getInitials(blog.author)}</span> ${blog.author}</span>
                    <a href="blog-detail.html?id=${blog.id}" class="read-more-link">
                        <span data-i18n="blog_read_more">Read More</span> <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Show/hide load more button
    if (loadMoreBtn) {
        if (visibleCount >= sortedBlogs.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

function setupLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        visibleCount += BLOGS_PER_PAGE;
        renderBlogGrid();
    });
}

function getTextSummary(htmlContent, length = 100) {
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;
    const text = temp.textContent || temp.innerText || "";
    return text.substring(0, length).trim() + '...';
}
