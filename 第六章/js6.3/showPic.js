window.onload = prepareGallery;

function prepareGallery() {
    var gallery = document.getElementById("imagegalley");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return !showPic(this);
        }
    }
}

function showPic(whichpic) {
    var source = whichpic.getAttribute('href');
    var title = whichpic.getAttribute('title');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source);
    var description = document.getElementById('description');
    description.innerHTML = title;
    return true;
}

function countBodyChildren() {
    var body_element = document.getElementsByTagName('body')[0];
    alert(body_element.childNodes.length);
}
