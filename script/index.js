document.addEventListener('DOMContentLoaded', () => {
   
    const button = document.getElementById('saudacao');

    if (button) {
        button.addEventListener('click', () => {
            alert('Bem-vindo à nossa apostila web!');
        });
    }
});
