const bgAnimation = document.getElementById('bgAnimation');

const numberOfColorBoxes = 400;

for (let i = 0; i < numberOfColorBoxes; i++) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    bgAnimation.append(colorBox)
}




const nav = document.querySelector( '.navbar' )
fetch( './navbar.html')
.then(res => res.text())
.then(data =>{
    nav.innerHTML=data;
})


    var util = {
        mobileMenu() {
        $("#nav").toggleClass("nav-visible");
        },
        windowResize() {
        if ($(window).width() > 800) {
            $("#nav").removeClass("nav-visible");
        }
        },
        scrollEvent() {
        var scrollPosition = $(document).scrollTop();
        
        $.each(util.scrollMenuIds, function(i) {
            var link = util.scrollMenuIds[i],
                container = $(link).attr("href"),
                containerOffset = $(container).offset().top,
                containerHeight = $(container).outerHeight(),
                containerBottom = containerOffset + containerHeight;
    
            if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
            $(link).addClass("active");
            } else {
            $(link).removeClass("active");
            }
        });
        }
    };
    
    $(document).ready(function() {
        
        util.scrollMenuIds = $("a.nav-link[href]");
        $("#menu").click(util.mobileMenu);
        $(window).resize(util.windowResize);
        $(document).scroll(util.scrollEvent);
        
    });
  