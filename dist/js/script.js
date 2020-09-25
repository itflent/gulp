window.onload = () => { $('.lazy').Lazy() };

const pageLinks = document.querySelectorAll(' a[href="#"] ')
pageLinks.forEach(link => link.addEventListener(' click ', (e) => {e.preventDefault()}))

const pageSvgs = document.querySelectorAll(' .svg ');
pageSvgs.forEach(svg => {
	let src = svg.getAttribute(' data-src ')
	svg.removeAttribute(' data-src ')
	svg.style.maskImage = ` url(${src}) `
})