// --------------------------------------------------------------------------
// ------------------------------- Vanilla Js -------------------------------
// --------------------------------------------------------------------------

// LOADEING PAGE -----------------
window.addEventListener("load", loading);
function loading(){
	let loader = document.querySelector(".loading");
	loader.style.cssText = "opacity: 0; visibility: hidden;";
}

// NAVBAR -------------------------
let barButton = document.querySelector('.bars');
let	menuNav = document.querySelector('.main-nav');
barButton.addEventListener("click", function(){
    menuNav.classList.toggle("active");
})

// --------------------------------------------------------------------------
// ------------------------------ Owl-Carousel ------------------------------
// --------------------------------------------------------------------------

$(window).on("load", function(){
    // book section carousel slider
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop:true,
        nav:true,
        margin:10,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:3
            },            
            992:{
                items:4
            }
        }
    });
});