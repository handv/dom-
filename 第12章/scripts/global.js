addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);

function addLoadEvent(func) {
    oldLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldLoad();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parentEle = targetElement.parentElement;
    if (parentEle.lastChild == targetElement) {
        parentEle.appendChild(newElement);
    } else {
        parentEle.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByTagName('nav')) return false;
    if (!document.getElementsByTagName('a')) return false;
    var links = document.getElementsByTagName('nav')[0].getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        //addClass(links[i],null);
        linkUrl = links[i].href;
        if (window.location.href.indexOf(linkUrl) != -1) {
            addClass(links[i], 'here');
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id', linktext);
        }
    }
}

function moveElement(elementId, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementId)) return false
    var ele = document.getElementById(elementId);
    if (ele.movement) {
        clearTimeout(ele.movement);
    }
    var pos_x = parseInt(!ele.style.left ? 0 : ele.style.left);
    var pos_y = parseInt(!ele.style.top ? 0 : ele.style.top);
    var dist = 0;
    if (pos_x == final_x && pos_y == final_y) {
        return true;
    }
    if (pos_x < final_x) {
        dist = Math.ceil((final_x - pos_x) / 10);
        pos_x += dist;
    }
    if (pos_x > final_x) {
        dist = Math.ceil(Math.abs((final_x - pos_x)) / 10);
        pos_x -= dist;
    }
    if (pos_y < final_y) {
        dist = Math.ceil((final_y - pos_y) / 10);
        pos_y += dist;
    }
    if (pos_y > final_y) {
        dist = Math.ceil((pos_y - final_y) / 10);
        pos_y -= dist;
    }
    ele.style.left = pos_x + 'px';
    ele.style.top = pos_y + 'px';
    var repeat = "moveElement('" + elementId + "', " + final_x + ", " + final_y + ", " + interval + ")";
    ele.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {

    var intro = document.getElementById('intro');
    var slideshow = document.createElement('div');
    slideshow.setAttribute('id', 'slideshow');
    var frame = document.createElement('img');
    frame.setAttribute('src', 'images/frame.gif');
    frame.setAttribute('id', 'frame');
    slideshow.appendChild(frame);
    var preview = document.createElement('img');
    preview.setAttribute('src', 'images/slideshow.gif');
    preview.setAttribute('alt', 'a glimpse of what awaites you');
    preview.setAttribute('id', 'preview');
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = intro.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].thisI = i;
        links[i].onmouseover = function() {
            moveElement('preview', -150 * (this.thisI + 1), 0, 10);
        }
    }
}
