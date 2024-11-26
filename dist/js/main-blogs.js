// const getStorageBlogData = localStorage.getItem('blogs') ? JSON.parse(localStorage.getItem('blogs')) : [];
const getStorageBlogData = JSON.parse(localStorage.getItem('blogs') || '[]');
function getToFocusMainBlog() {
    const getStorageBlogData = JSON.parse(localStorage.getItem('blogs') || '[]');
    const mainPageBlogLinks = document.querySelectorAll('.main-blog-title');
    mainPageBlogLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('data-id');
            const findFocusBlog = getStorageBlogData.find((blog) => blog.blogId === Number(id));
            if (findFocusBlog) {
                localStorage.setItem('showBlog', JSON.stringify(findFocusBlog));
                window.location.href = 'blog-detail.html';
            }
        });
    });
}
export const displayBlogs = (getStorageBlogData) => {
    // if (!getStorageBlogData || getStorageBlogData.length === 0) return;
    let mainPageBlogHTML = '';
    const mainPageBlogsList = document.getElementById('mainPageBlogsList');
    const otherBlogsList = document.getElementById('otherBlogsList');
    getStorageBlogData.splice(0, 3).forEach((data) => {
        mainPageBlogHTML += `
            <article class="blog-item text-center" data-id="${data.blogId}">
                <figure>
                <a href="#" class='main-blog-title' data-id="${data.blogId}">
                    <img src="${data.blogImage}" alt="${data.blogTitle}">
                </a>
    
                <div class="blog-description">
                    <figcaption>
                    <time>${new Date().toLocaleDateString()}</time> - <span>2 Yorum</span>
                    </figcaption>
                    
                    <a href="#" class='main-blog-title' data-id="${data.blogId}">${data.blogTitle}</a>
                    <a href="#" class='main-blog-title' data-id="${data.blogId}">Devamını oku</a>
                </div>
                </figure>
            </article>
        `;
    });
    if (mainPageBlogsList) {
        mainPageBlogsList.innerHTML = mainPageBlogHTML;
        getToFocusMainBlog();
    }
    if (otherBlogsList) {
        otherBlogsList.innerHTML = mainPageBlogHTML;
        getToFocusMainBlog();
    }
};
export const displayAllBlogs = (getStorageBlogData) => {
    let blogPageHTML = '';
    const blogsList = document.getElementById('blogsList');
    getStorageBlogData.forEach((data) => {
        blogPageHTML += `
            <article class="blog-item text-center" data-id="${data.blogId}">
                <figure>
                <a href="#" class='main-blog-title' data-id="${data.blogId}">
                    <img src="${data.blogImage}" alt="${data.blogTitle}">
                </a>
    
                <div class="blog-description">
                    <figcaption>
                    <time>${new Date().toLocaleDateString()}</time> - <span>2 Yorum</span>
                    </figcaption>
                    
                    <a href="#" class='main-blog-title' data-id="${data.blogId}">${data.blogTitle}</a>
                    <a href="#" class='main-blog-title' data-id="${data.blogId}">Devamını oku</a>
                </div>
                </figure>
            </article>
        `;
    });
    if (blogsList) {
        blogsList ? blogsList.innerHTML = blogPageHTML : '';
        getToFocusMainBlog();
    }
};
