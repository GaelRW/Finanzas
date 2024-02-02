document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.navegacion-principal');
    const barraFija = document.querySelector('.consejos');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){

        if(barraFija.getBoundingClientRect().top < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}