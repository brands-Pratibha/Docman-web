document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Blog ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    // Default to the first blog if no ID is present, or show an error state
    // For this prototype, we'll default to ID 1 if null, or redirect to blogs.html if invalid ID
    if (!blogId) {
        // Optional: window.location.href = 'blogs.html'; 
        // But for dev, let's just show post 1
        loadBlog(1);
    } else {
        loadBlog(blogId);
    }
});

function loadBlog(id) {
    const blog = getBlogById(id);

    if (!blog) {
        document.getElementById('blog-content-area').innerHTML = `
            <div class="container" style="text-align:center; padding: 100px 0;">
                <h2>Article not found</h2>
                <a href="blogs.html" class="btn btn-primary">Back to Blogs</a>
            </div>
        `;
        return;
    }

    // 2. Populate Main Content
    document.title = `${blog.title} - Docman Labs`;

    // Header Info
    const categoryEl = document.getElementById('detail-category');
    categoryEl.textContent = blog.category;

    document.getElementById('detail-title').textContent = blog.title;

    // Author
    document.getElementById('detail-avatar').textContent = getInitials(blog.author);
    document.getElementById('detail-author').textContent = blog.author;
    document.getElementById('detail-role').textContent = blog.role;

    // Date & Time
    document.getElementById('detail-date').innerHTML = `<i class="far fa-calendar"></i> ${blog.date}`;
    document.getElementById('detail-readtime').innerHTML = `<i class="far fa-clock"></i> ${blog.readTime}`;

    // Image
    document.getElementById('detail-image').src = blog.image;
    document.getElementById('detail-image').alt = blog.title;

    // Body
    document.getElementById('detail-body').innerHTML = blog.content;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', getTextSummary(blog.content, 160));
    }

    // 3. Initialize Share Buttons
    initShareButtons(blog);

    // 4. Load Related Posts
    loadRelatedPosts(blog.id, blog.category);
}

/**
 * Initialize share buttons with proper URLs for each platform
 */
function initShareButtons(blog) {
    const pageUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog.title);
    const summary = encodeURIComponent(getTextSummary(blog.content, 100));

    // LinkedIn Share
    const linkedinBtn = document.getElementById('share-linkedin');
    if (linkedinBtn) {
        linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
    }

    // Twitter/X Share
    const twitterBtn = document.getElementById('share-twitter');
    if (twitterBtn) {
        twitterBtn.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${title}`;
    }

    // Facebook Share
    const facebookBtn = document.getElementById('share-facebook');
    if (facebookBtn) {
        facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    }

    // Email Share
    const emailBtn = document.getElementById('share-email');
    if (emailBtn) {
        emailBtn.href = `mailto:?subject=${title}&body=Check out this article: ${pageUrl}`;
    }
}

function getInitials(name) {
    if (!name) return 'DL';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function loadRelatedPosts(currentId, category) {
    const relatedPosts = getRelatedPosts(currentId, category);
    const container = document.getElementById('related-posts-grid');

    if (relatedPosts.length === 0) {
        document.querySelector('.related-articles-section').style.display = 'none';
        return;
    }

    container.innerHTML = relatedPosts.map(post => `
        <div class="blog-card" onclick="window.location.href='blog-detail.html?id=${post.id}'" style="cursor: pointer;">
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <span class="blog-category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${getTextSummary(post.content)}</p>
                <div class="blog-meta-mini">
                    <span class="author-mini"><span class="avatar-mini">${getInitials(post.author)}</span> ${post.author}</span>
                    <span class="read-more-link">Read More <i class="fas fa-arrow-right"></i></span>
                </div>
            </div>
        </div>
    `).join('');
}

function getTextSummary(htmlContent, length = 100) {
    // Strip HTML tags and take first N chars
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;
    const text = temp.textContent || temp.innerText || "";
    return text.substring(0, length) + '...';
}
