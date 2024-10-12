//!Comment Like and Dislike result message events
const commentLike = document.querySelectorAll('#commentLike');
const commentDislike = document.querySelectorAll('#commentDislike');
const commentThumbsWrapper = document.querySelectorAll('.comment-content__thumbs');
commentLike.forEach(like => {
    like.addEventListener('click', () => {
        const commentLikeNumber = like.nextElementSibling;
        const likeParentElement = like.closest('.comment-content__thumbs');
        const currentNumber = parseInt(commentLikeNumber.textContent) || 0;
        if (!like.classList.contains('active')) {
            like.classList.add('active');
            commentLikeNumber.textContent = (currentNumber + 1).toString();
            likeParentElement.innerHTML = '<span>Beğeniniz bizi mutlu etti, teşekkürler!</span>';
        }
    });
});
commentDislike.forEach(dislike => {
    dislike.addEventListener('click', () => {
        const dislikeParentElement = dislike.closest('.comment-content__thumbs');
        if (!dislike.classList.contains('active')) {
            dislike.classList.add('active');
            dislikeParentElement.innerHTML = '<span>Görüşlerinizi önemsiyoruz, değerlendirmeniz için teşekkür ederiz!</span>';
        }
    });
});
//!Product detail page comment section form inputs element check validation events
const commentForm = document.querySelector('.comment-form');
const raitingStarsWrapper = document.querySelectorAll('.raiting-stars-wrapper a');
const commentNameInput = document.getElementById('commentNameInput');
const commentEmailInput = document.getElementById('commentEmailInput');
const commentMessageInput = document.getElementById('commentMessageInput');
const commentListWrapper = document.getElementById('commentListWrapper');
raitingStarsWrapper.forEach((star, index) => {
    star.addEventListener('click', (e) => {
        e.preventDefault();
        raitingStarsWrapper.forEach(star => star.classList.remove('active'));
        star.classList.add('active');
        raitingStarsWrapper.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('active');
            }
        });
    });
});
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkNameOrEmail = checkRequiredInputField([commentNameInput, commentEmailInput]);
    const checkEmail = checkValidateEmail(commentEmailInput);
    const checkName = checkValidateName(commentNameInput);
    const selectedStarsCount = Array.from(raitingStarsWrapper).filter(star => star.classList.contains('active')).length;
    Array.from(raitingStarsWrapper).filter(active => active.classList.contains('active')).length >= 1 ? raitingStarsWrapper.forEach(a => a.classList.add('active')) : raitingStarsWrapper.forEach(r => r.classList.add('error'));
    checkValidateStars(raitingStarsWrapper);
    const createComment = {
        name: commentNameInput.value,
        message: commentMessageInput.value,
    };
    if (checkNameOrEmail && checkEmail && checkName && selectedStarsCount) {
        const imagesHtml = selectedImages.map(imgSrc => `
            <div class="thumb-img-item d-flex gap-3">
                <img src="${imgSrc}" alt="" width="100" height="100" class="rounded border object-fit-cover">
            </div>
        `).join('');
        const comment = `
            <li class="comments-item d-flex align-items-center gap-4"> 
                <div class="comment-profile">
                    <img src="img/check.svg" alt="onay işareti">
                    <img src="img/avatar.png" alt="avatar" width="60" height="60">
                </div>
                <div class="comment-content">
                    <ul class="comment-content__star d-flex text-warning">
                        ${'<li><i class="bi bi-star-fill"></i></li>'.repeat(selectedStarsCount)}
                        ${'<li><i class="bi bi-star-fill" style="color: #dee0ea"></i></li>'.repeat(5 - selectedStarsCount)}
                    </ul>
                    <div class="comment-content__meta">
                        <strong>${createComment.name}</strong>
                        <span>-</span>
                        <time>${new Date().toLocaleDateString()}</time>
                    </div>
                    ${createComment.message ? `
                        <div class="comment-content__description mt-2">
                            <p>${createComment.message}</p>
                        </div>
                    ` : ''}
                    <div class="comment-thumb-img mt-3">
                        <div class="thumb-img-item d-flex gap-2">
                            ${imagesHtml}
                        </div>
                    </div>
                </div>
            </li>
        `;
        commentListWrapper.insertAdjacentHTML('beforeend', comment);
        selectedImages = [];
        commentThumb.innerHTML = '';
        commentNameInput.value = '';
        commentEmailInput.value = '';
        commentMessageInput.value = '';
        document.querySelector('.comment-file-field').style.display = 'block';
        commentNameInput.className = 'global-input w-100';
        commentEmailInput.className = 'global-input w-100';
        raitingStarsWrapper.forEach(star => star.classList.remove('active', 'error'));
        reviewsText();
    }
});
const reviewsText = () => {
    const productTitle = document.querySelector('#productTitle').textContent;
    document.querySelector('#commentTextInfo').innerHTML = `${productTitle} için (${commentListWrapper.children.length} Değerlendirme)`;
};
reviewsText();
const checkValidateStars = (stars) => {
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
const checkRequiredInputField = (inputs) => {
    let allFilled = true;
    inputs.forEach(input => {
        if (input.value === '') {
            errorFormInput(input);
            allFilled = false;
        }
        else {
            successFormInput(input);
        }
    });
    return allFilled;
};
const checkValidateName = (name) => {
    const nameRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s-]+$/;
    if (!nameRegex.test(name.value)) {
        errorNameInput(name, 'İsim, sadece harf ve boşluk içermelidir. Rakam veya noktalama işareti kabul edilmez.');
        return false;
    }
    return true;
};
const checkValidateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email.value)) {
        errorEmailInput(email, 'Lütfen doğru formatta giriniz!');
        return false;
    }
    return true;
};
const errorEmailInput = (input, message) => {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.className = 'invalid-feedback';
    div.textContent = message;
};
const errorNameInput = (input, message) => {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.className = 'invalid-feedback';
    div.textContent = message;
};
const errorFormInput = (input) => {
    input.className = 'form-control is-invalid';
};
const successFormInput = (input) => {
    input.className = 'form-control is-valid';
};
//!Comment Image add events
const MAX_IMAGES = 5;
let selectedImages = [];
const commentFileInput = document.getElementById('commentFileInput');
const commentThumb = document.querySelector('.comment-thumb');
const maxImagesLength = MAX_IMAGES;
commentFileInput.addEventListener('change', function () {
    const fileResult = this.files[0];
    if (fileResult) {
        if (selectedImages.length >= maxImagesLength) {
            document.querySelector('.thumb-message p').textContent = 'En fazla 5 dosya ekleyebilirsiniz.';
            return;
        }
        const readerFile = new FileReader();
        readerFile.onload = function (event) {
            const imgSrc = event.target.result;
            let img = `
            <div class="comment-thumb__item me-3">
                <i class="bi bi-trash3-fill" onclick="deleteImg(this)"></i>
                <img src="${imgSrc}" alt="" width="100" height="100" class="rounded border object-fit-cover">
            </div>
            `;
            commentThumb.insertAdjacentHTML('beforeend', img);
            selectedImages.push(imgSrc);
            if (selectedImages.length >= maxImagesLength) {
                document.querySelector('.comment-file-field').style.display = 'none';
                document.querySelector('.thumb-message p').textContent = 'En fazla 5 dosya ekleyebilirsiniz.';
            }
            else {
                document.querySelector('.comment-file-field').style.display = 'block';
            }
        };
        readerFile.readAsDataURL(fileResult);
    }
});
const deleteImg = (img) => {
    const imgSrc = img.nextElementSibling.getAttribute('src');
    img.parentElement.remove();
    if (imgSrc) {
        selectedImages = selectedImages.filter(src => src !== imgSrc);
    }
    if (selectedImages.length < maxImagesLength) {
        document.querySelector('.comment-file-field').style.display = 'block';
    }
};
//# sourceMappingURL=reviews.js.map