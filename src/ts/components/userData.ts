//!User information comes from the account page
export const userData = () => {
    window.addEventListener('load', () => {
      const message = document.querySelector<HTMLDivElement>('.set-global-message');
      const params = new URLSearchParams(window.location.search);
      const username = params.get('account');
    
      if(username) {
        message.classList.add('active');
        message.querySelector<HTMLParagraphElement>('p').textContent = `Tekrardan Merhaba, ${decodeURIComponent(username).toUpperCase()}, 👋 Hoşgeldin..`;
      } 
    
      setTimeout(() => {
        message.classList.remove('active');
      }, 3000)
    });
}