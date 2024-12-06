//!User information comes from the account page
export const userData = () => {
    window.addEventListener('load', () => {
        const params = new URLSearchParams(window.location.search);
        const message = document.querySelector('.set-global-message');
        const username = params.get('account');
        if (message && username) {
            message.classList.add('active');
            const paragraph = message.querySelector('p');
            if (paragraph) {
                paragraph.textContent = `Tekrardan Merhaba, ${decodeURIComponent(username).toUpperCase()}, 👋 Hoşgeldin..`;
            }
        }
        setTimeout(() => {
            if (message) {
                message.classList.remove('active');
            }
        }, 3000);
    });
};
