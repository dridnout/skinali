$(window).on('load', function() {
    $(".before-after").twentytwenty({
        before_label: 'Без скинали',
        after_label: 'Со скинали'
    });
    $('.before-slider').slick({
        draggable: false,
        dots: true,
        dotsClass: 'before-slider__dots',
        prevArrow: $('.arrow-left'),
        nextArrow: $('.arrow-right')
    });
    $('.menu-button').click(function(){
        $('.menu').toggleClass('menu_active');
    });

    $('.select_checked').on('click', function(){
        $('.select__dropdown').toggleClass('select__dropdown_open');
    });
    $('.select__option').on('click', function(){
        var value = $(this).attr('data-value');
        $('.select_checked').text(value);
        $('#select-type').val(value);
    });

    $('a[href^="#"]').click(function(){
        var _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top - 160 + 'px'});
        return false;
    });

    // mask
    $('input[type="tel"]').inputmask('+7(999)999-99-99');
});

// Модальные окна

function modal(id) {
	let modal = document.getElementById(id);
    let close = document.querySelectorAll('[data-close="true"]');
    let overflow = document.createElement('div');

    overflow.className = 'modal-overlay modal__overlay';
    document.body.appendChild(overflow);
    
	modal.classList.add('modal_active');
	for (let i = 0; i < close.length; i++) {
		close[i].onclick = function() {
            modal.classList.remove('modal_active');
            document.body.removeChild(overflow);
		}
    }
    window.onclick = function(e){
		if (e.target == modal) {
			modal.classList.remove('modal_active');
            document.body.removeChild(overflow);
		}
	};

	document.onkeydown = function(e) {
		if (e.keyCode == 27) {
            modal.classList.remove('modal_active');
            document.body.removeChild(overflow);
		}
    };
    
    
}
var reviews = $('.reviews');
var reviewsTop = reviews.offset().top;
$(window).bind('scroll', function(){
    var windowTop = $(this).scrollTop();
    if(windowTop > reviewsTop) {
        console.log('Докрутили');
        $('#map').html('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A5c6c9c21f7106ae24ad9e8edd13e764db58da541d6a2920e38a521512fd8cf0d&amp;width=100%25&amp;height=450&amp;lang=ru_RU&amp;scroll=false"></script>');
        $(window).unbind('scroll');
    }
});

// получить data аттрибут от элемента по событию click 
function getTarget(){
    document.addEventListener('click', (e) =>{
        let targetEl = e.target.getAttribute('data-modal'); 
        if(e.target.hasAttribute('data-modal')){
            e.preventDefault();
            modal(targetEl);
        }
    });
}
getTarget();