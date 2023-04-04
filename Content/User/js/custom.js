(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
	});
	
	/* ..............................................
    Fixed Menu
    ................................................. */
    
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});
	
	/* ..............................................
    Gallery
    ................................................. */
	
	$('#slides').superslides({
		inherit_width_from: '.cover-slides',
		inherit_height_from: '.cover-slides',
		play: 5000,
		animation: 'fade',
	});
	
	$( ".cover-slides ul li" ).append( "<div class='overlay-background'></div>" );
	
	/* ..............................................
    Map Full
    ................................................. */
	
	$(document).ready(function(){ 
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 100) { 
				$('#back-to-top').fadeIn(); 
			} else { 
				$('#back-to-top').fadeOut(); 
			} 
		}); 
		$('#back-to-top').click(function(){ 
			$("html, body").animate({ scrollTop: 0 }, 600); 
			return false; 
		}); 
	});
	
	/* ..............................................
    Special Menu
    ................................................. */
	
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.special-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.special-list').isotope({
			itemSelector: '.special-grid'
		});
	});
	var check = false;

	function changeVal(el) {
		var qt = parseFloat(el.parent().children(".qt").html());
		var price = parseFloat(el.parent().children(".price").html());
		var eq = Math.round(price * qt * 100) / 100;

		el.parent().children(".full-price").html(eq + "€");

		changeTotal();
	}

	function changeTotal() {

		var price = 0;

		$(".full-price").each(function (index) {
			price += parseFloat($(".full-price").eq(index).html());
		});

		price = Math.round(price * 100) / 100;
		var tax = Math.round(price * 0.05 * 100) / 100
		var shipping = parseFloat($(".shipping span").html());
		var fullPrice = Math.round((price + tax + shipping) * 100) / 100;

		if (price == 0) {
			fullPrice = 0;
		}

		$(".subtotal span").html(price);
		$(".tax span").html(tax);
		$(".total span").html(fullPrice);
	}

	$(document).ready(function () {

		$(".remove").click(function () {
			var el = $(this);
			el.parent().parent().addClass("removed");
			window.setTimeout(
				function () {
					el.parent().parent().slideUp('fast', function () {
						el.parent().parent().remove();
						if ($(".product").length == 0) {
							if (check) {
								$("#cart").html("<h1>The shop does not function, yet!</h1><p>If you liked my shopping cart, please take a second and heart this Pen on <a href='https://codepen.io/ziga-miklic/pen/xhpob'>CodePen</a>. Thank you!</p>");
							} else {
								$("#cart").html("<h1>No products!</h1>");
							}
						}
						changeTotal();
					});
				}, 200);
		});

		$(".qt-plus").click(function () {
			$(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1);

			$(this).parent().children(".full-price").addClass("added");

			var el = $(this);
			window.setTimeout(function () { el.parent().children(".full-price").removeClass("added"); changeVal(el); }, 150);
		});

		$(".qt-minus").click(function () {

			child = $(this).parent().children(".qt");

			if (parseInt(child.html()) > 1) {
				child.html(parseInt(child.html()) - 1);
			}

			$(this).parent().children(".full-price").addClass("minused");

			var el = $(this);
			window.setTimeout(function () { el.parent().children(".full-price").removeClass("minused"); changeVal(el); }, 150);
		});

		window.setTimeout(function () { $(".is-open").removeClass("is-open") }, 1200);

		$(".btn").click(function () {
			check = true;
			$(".remove").click();
		});
	});
	
	/* ..............................................
    BaguetteBox
    ................................................. */
	
	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});
	
	
	
	/* ..............................................
    Datepicker
    ................................................. */
	
	$('.datepicker').pickadate();
	
	$('.time').pickatime();
	
	
	
	
	
}(jQuery));