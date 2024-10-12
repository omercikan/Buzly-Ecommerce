const getShowBlogFromStorage = localStorage.getItem('showBlog') ? JSON.parse(localStorage.getItem('showBlog')) : localStorage.setItem('showBlog', JSON.stringify([]))
const blogDetailHTML = document.getElementById('blogDetailHTML') as HTMLElement;

let blogFieldsHTML: string = '';
const showBlogFields = () => {
    blogFieldsHTML = `
        <article>
            <figure>
                <img src="${getShowBlogFromStorage.blogImage}" alt="${getShowBlogFromStorage.blogTitle}">
            </figure>

            <div class="blog-wrapper my-4">
                <div class="blog-meta d-flex align-items-center gap-2">
                    <div class="blog-meta__categories">
                        <span>${getShowBlogFromStorage.author}</span>
                    </div>

                    <div class="blog-meta__date">
                        <time>
                            ${getShowBlogFromStorage.date}
                        </time>
                    </div>

                    <div class="blog-meta__tags">
                        <span>${getShowBlogFromStorage.tags.join(', ')}</span>
                    </div>
                </div>

                <figcaption class="blog-title mt-4">${getShowBlogFromStorage.blogTitle}</figcaption>

                <div class="blog-content mt-3">
                    <blockquote>
                        <p>${getShowBlogFromStorage.content.introduction}</p>
                    </blockquote>
                    <br>`;

    getShowBlogFromStorage.content.mainPoints.forEach((point, index) => {
        blogFieldsHTML += `
            <h2>${index + 1}. ${point.title}</h2>
            <br>
            <p>${point.text}</p>
            <br> 
        `;
    });

    blogFieldsHTML += `
                    <p class="result-text mb-5"><strong>Sonuç</strong>
                    <br><br>
                    ${getShowBlogFromStorage.content.conclusion}
                    </p>
                </div>
            </div>
        </article>
    `;

    blogDetailHTML.innerHTML = blogFieldsHTML;
    document.title = `Buzly Blog | ${getShowBlogFromStorage.blogTitle}`;
};


showBlogFields()