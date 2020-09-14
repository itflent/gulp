'use strict';

window.onload = function () {
	$('.lazy').Lazy();
};

var pageLinks = document.querySelectorAll(' a[href="#"] ');
pageLinks.forEach(function (link) {
	return link.addEventListener(' click ', function (e) {
		e.preventDefault();
	});
});

var pageSvgs = document.querySelectorAll(' .svg ');
pageSvgs.forEach(function (svg) {
	var src = svg.getAttribute(' data-src ');
	svg.removeAttribute(' data-src ');
	svg.style.maskImage = ' url(' + src + ') ';
});