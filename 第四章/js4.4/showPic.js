function showPic(whichpic) {
	var source = whichpic.getAttribute('href');
	var title = whichpic.getAttribute('title');
	var placeholder = document.getElementById('placeholder');
	placeholder.setAttribute('src', source);
	var description = document.getElementById('description');
	description.innerHTML = title;
}
function countBodyChildren() {
	var body_element = document.getElementsByTagName('body')[0];
	alert(body_element.childNodes.length);
}

// window.onload = countBodyChildren;