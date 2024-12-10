//!Blog data items interface !//
interface blogData {
    blogId: number;
    blogImage: string;
    blogTitle: string;
}
//!Blog data items interface !//

//!Generate to blog html structure !//
const generateBlogHTML = (blogs: blogData[]): string => {
    return blogs.map((data) => `
            <article class="blog-item text-center" data-id="${data.blogId}">
                <figure>
                    <a href="#" class='main-blog-title' data-id="${data.blogId}">
                        <img src="${data.blogImage}" alt="${data.blogTitle}">
                    </a>
                    <div class="blog-description">
                        <figcaption>
                            <time>${new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</time> - <span>2 Yorum</span>
                        </figcaption>
                        <a href="#" class='main-blog-title' data-id="${data.blogId}">${data.blogTitle}</a>
                        <a href="#" class='main-blog-title' data-id="${data.blogId}">Devamını oku</a>
                    </div>
                </figure>
            </article>`
        )
        .join('');
}
//!Generate to blog html structure !//

//!Matches the blog and goes to the blog detail page !//
const getToFocusMainBlog = (): void => {
    const getStorageBlogData: blogData[] = JSON.parse(localStorage.getItem('blogs') || '[]');
    const mainPageBlogLinks = document.querySelectorAll<HTMLAnchorElement>('.main-blog-title')

    mainPageBlogLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('data-id');
            if(!id) return;

            const findFocusBlog = getStorageBlogData.find((blog) => blog.blogId === Number(id))

            if(findFocusBlog) {
                localStorage.setItem('showBlog', JSON.stringify(findFocusBlog));
                window.location.href = 'blog-detail.html'
            }
        });
    });
}
//!Matches the blog and goes to the blog detail page !//

//!Only for Home page show the three blog data !//
export const displayBlogs = (getStorageBlogData: blogData[]): void => {
    const mainPageBlogsList = document.getElementById('mainPageBlogsList') as HTMLElement;
    const otherBlogsList = document.getElementById('otherBlogsList') as HTMLElement;

    const mainPageHTML = generateBlogHTML(getStorageBlogData.slice(0, 3))

    if(mainPageBlogsList) {
        mainPageBlogsList.innerHTML = mainPageHTML;
    }

    if(otherBlogsList) {
        otherBlogsList.innerHTML = mainPageHTML
    }

    getToFocusMainBlog();
}
//!Only for Home page show the three blog data !//

//!Blog HTML page show the all blogs data !//
export const displayAllBlogs = (getStorageBlogData: blogData[]): void => {
    const blogsList = document.getElementById('blogsList') as HTMLElement;

    if(blogsList) {
        blogsList.innerHTML = generateBlogHTML(getStorageBlogData);
        getToFocusMainBlog();
    }
};
//!Blog HTML page show the all blogs data !//