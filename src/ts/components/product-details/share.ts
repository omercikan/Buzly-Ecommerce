const shareWhatsapp = document.getElementById('shareWhatsapp') as HTMLAnchorElement;
const shareTelegram = document.getElementById('shareTelegram') as HTMLAnchorElement;
const shareMessage = document.getElementById('shareMessage') as HTMLAnchorElement;
const copyUrl = document.getElementById('copyUrl') as HTMLElement;
const productUrl = document.URL;

shareWhatsapp.href = `https://wa.me/?text=${encodeURI(productUrl)}`;
shareTelegram.href = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}`;
shareMessage.href = `sms:?body=Merhaba, bu ürünü incelemeni tavsiye ederim! ${encodeURIComponent(productUrl)}`;
copyUrl.addEventListener('click', () => {
    let url = window.location.href;
    navigator.clipboard.writeText(url)
    copyUrl.classList.contains('bi-clipboard') ? copyUrl.className = 'bi bi-clipboard-check-fill' : null;

    setTimeout(() => {
        copyUrl.className = 'bi bi-clipboard'
    }, 3000);
});

const shareWrapper = document.querySelector<HTMLDivElement>('.share-wrapper')
document.querySelector('#shareText').addEventListener('click', (e) => {
    e.stopPropagation();
    shareWrapper.classList.toggle('open');
    shareWrapper.addEventListener('click', (e) => e.stopPropagation())
});

window.addEventListener('click', () => {
    shareWrapper.classList.remove('open')
});