var currentSection = 1;
var sections;

$('document').ready(function () {
	setCurrentSection();
	setSectionIndicator(1);
	$('.navigation').click(function () {
		if (this.id == "nav-left") { 
			if (currentSection != 1) {
				scrollToSection(currentSection - 1);
				$('#nav-left').prop('disabled', true);
			}
		}
		else  {
			if (currentSection+1 <= sections) {
				scrollToSection(currentSection + 1);
				$('#nav-right').prop('disabled', true);
			}
		}
	});

	$('.navigation').on('mouseover', function() {
		if (this.id == 'nav-left') {
			if (currentSection != 1) $(this).addClass('navigation-hover');
		} else {
			if (currentSection+1 <= sections) $(this).addClass('navigation-hover');
		}
	}).on('mouseout', function () {
		$(this).removeClass('navigation-hover');
	});

	$(window).resize(function() {
		setCurrentSection();
		setSectionIndicator(currentSection);
	});

});

function setCurrentSection() {
	var carouselWidth = $('.carousel').width();
	var projectWidth = $('.project').width() + parseInt($('.project').css('margin-right').replace('px',''));
	var projectsQtt = $('.project').size();
	var projectsPerSection = carouselWidth / projectWidth;
	sections = Math.round(projectsQtt / projectsPerSection);
	var rollLeft = Math.abs(parseInt($('.roll').css('left').replace('px','')));
	if (rollLeft == 0) currentSection = 1;
	else {
		currentSection = Math.round((rollLeft / carouselWidth) + 1);
	}
	$('#nav-left').prop('disabled', false);
	$('#nav-left').removeClass('navigation-hover');
	$('#nav-right').prop('disabled', false);
	$('#nav-right').removeClass('navigation-hover');
}

function scrollToSection(section) {
	var width = $('.carousel').width() * (Math.abs(currentSection - section));
	if (section < currentSection) {
		$('.roll').animate({left: '+='+width}, "slow", setCurrentSection);
	} else {
		$('.roll').animate({left: '-='+width}, "slow", setCurrentSection);
	}
	setSectionIndicator(section);
}

function setSectionIndicator(section) {
	$('.sections').html('');
	for (var i = 1; i <= sections; i++) {
		if (i == section) circleClass = 'fa fa-circle';
		else circleClass = 'fa fa-circle-thin';
		$('.sections').html($('.sections').html() + '<i class="'+circleClass+' indicator" data-id="'+i+'" aria-hidden="true"></i>');
	}
	$('.indicator').click(function() {
		scrollToSection($(this).attr('data-id'));
	});
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};