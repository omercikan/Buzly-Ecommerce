//!Blog detail page html form elements;
const commentBlogForm = document.querySelector('.comment-form');
const blogNameInput = document.getElementById('commentNameInput');
const blogEmailInput = document.getElementById('commentEmailInput');
const blogStars = document.querySelectorAll('.raiting-stars-wrapper a');
const blogMessageInput = document.getElementById('commentMessageInput');
const commentBlogListWrapper = document.getElementById('commentListWrapper');
document.addEventListener('DOMContentLoaded', () => {
    const blogTitle = document.querySelector('.blog-title');
    const blogCommentTitle = document.querySelector('.comment-title');
    blogCommentTitle.textContent = `${blogTitle.textContent} Yazısından - ${commentBlogListWrapper.children.length} Yorum`;
});
const inputsFieldIsEmpty = () => {
    blogNameInput.value = '';
    blogEmailInput.value = '';
    blogMessageInput.value = '';
    blogStars.forEach(stars => stars.classList.remove('active', 'error'));
    const blogTitle = document.querySelector('.blog-title');
    const blogCommentTitle = document.querySelector('.comment-title');
    blogCommentTitle.textContent = `${blogTitle.textContent} Yazısından - ${commentBlogListWrapper.children.length} Yorum`;
    const inputs = [blogNameInput, blogEmailInput];
    Array.from(inputs).forEach(inputs => inputs.className = 'global-input w-100');
};
//!Blog detail page form submit event
commentBlogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valiteInputs = checkBlogInputs([blogNameInput, blogEmailInput]);
    const valideEmail = checkBlogEmail(blogEmailInput);
    const selectBlogStarsCount = Array.from(blogStars).filter(star => star.classList.contains('active')).length;
    Array.from(blogStars).filter(star => star.classList.contains('active')).length >= 1 ? blogStars.forEach(active => active.classList.add('active')) : blogStars.forEach(error => error.classList.add('error'));
    checkBlogStars(blogStars);
    const WriteInputField = {
        name: blogNameInput.value,
        message: blogMessageInput.value
    };
    if (valiteInputs && valideEmail && selectBlogStarsCount) {
        let blogCreateCommentHtml = `
             <li class="comments-item d-flex align-items-center gap-4">
                <div class="comment-profile">
                  <img src="img/avatar.png" alt="" width="60" height="60">
                </div>

                <div class="comment-content">
                  <ul class="comment-content__star d-flex text-warning">
                    ${'<li><i class="bi bi-star-fill"></i></li>'.repeat(selectBlogStarsCount)}
                    ${`<li><i class="bi bi-star-fill" style="color: #dee0ea"></i></li>`.repeat(5 - selectBlogStarsCount)}
                  </ul>

                  <div class="comment-content__meta">
                    <strong>${WriteInputField.name}</strong>
                    <span>-</span>
                    <time>${new Date().toLocaleDateString()}</time>
                  </div>

                  ${WriteInputField.message ? `
                    <div class="comment-content__description mt-2">
                        <p>
                            ${WriteInputField.message}
                        </p>
                    </div>
                ` : ''}
            </li>
        `;
        commentBlogListWrapper.insertAdjacentHTML('beforeend', blogCreateCommentHtml);
        inputsFieldIsEmpty();
    }
});
//!Blog detail page form inputs check validation
const checkBlogInputs = (inputs) => {
    let isValidInput = true;
    inputs.forEach(input => {
        if (input.value === '') {
            errorFieldInput(input, 'Lütfen isminizi giriniz!');
            isValidInput = false;
        }
        else {
            successFieldInput(input);
        }
    });
    return isValidInput;
};
const errorFieldInput = (input, message) => {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.className = 'invalid-feedback';
    div.innerHTML = message;
};
const successFieldInput = (input) => {
    input.className = 'form-control is-valid';
};
const checkBlogEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email.value)) {
        errorFieldEmail(email, 'Geçersiz e-posta adresi. Lütfen doğru bir format kullanın.');
        return false;
    }
    else {
        succesFieldEmail(email);
    }
    return true;
};
const errorFieldEmail = (email, message) => {
    email.className = 'form-control is-invalid';
    const div = email.nextElementSibling;
    div.className = 'invalid-feedback';
    div.innerHTML = message;
};
const succesFieldEmail = (email) => {
    email.className = 'form-control is-valid';
};
const checkBlogStars = (stars) => {
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            e.preventDefault();
            stars.forEach(stateStar => stateStar.classList.remove('active', 'error'));
            const index = Array.from(stars).indexOf(star);
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('active');
            }
        });
    });
};
Array.from(blogStars).forEach((star, index) => {
    star.addEventListener('click', (event) => {
        event.preventDefault();
        blogStars.forEach(all => all.classList.remove('active'));
        star.classList.add('active');
        blogStars.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('active');
            }
        });
    });
});
//# sourceMappingURL=blog-detail.js.map