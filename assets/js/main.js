const swiper = new Swiper('.home-slider', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

