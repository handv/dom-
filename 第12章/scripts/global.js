addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);

function addLoadEvent(func) {
    var oldLoad = window.onload;
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
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}
// 被选中的链接高亮显示
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
// 移动动画的代码
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
// 首页，悬浮链接的时候，动态显示不同的图片
function prepareSlideshow() {
    if (!document.getElementById) return false;
    if (!document.getElementById('intro')) return false

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
// about页面，选中section显示，未选中隐藏
function showSection(id) {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById('art')) return false;
    if (!document.getElementsByTagName('section')) return false;
    var intro = document.getElementById('art');
    var sections = intro.getElementsByTagName('section');
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id == id) {
            sections[i].style.display = 'block';
        } else {
            sections[i].style.display = 'none';
        }
    }
}
// about页面，点击链接显示section
function prepareInternalnav() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById('art')) return false;
    if (!document.getElementsByTagName('section')) return false;
    var intro = document.getElementById('art');
    var links = intro.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            // 获取链接#后的数据
            var destion = this.href.split('#')[1];
            showSection(destion);
        }
    }
}
// photos页面，点击缩略图展示图片
function prepareGallery() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById('imagegallery')) return false;
    if (!document.getElementsByTagName('a')) return false;
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            showPic(this.title, this.href);
            return false;
        }
    }
}
// 为图片准备占位
function preparePlaceholder(title, href) {
    if (!document.getElementById) return false;
    if (!document.getElementById('imagegallery')) return false;
    var gallery = document.getElementById('imagegallery');
    var placeholder = document.createElement('p');
    placeholder.id = 'placeholder';
    placeholder.innerHTML = 'Choose an image';
    var img = document.createElement('img');
    img.id = 'img';
    img.src = 'images/placeholder.gif';
    img.alt = 'my image gallery';
    insertAfter(img, gallery);
    insertAfter(placeholder, gallery);
}
// 展示图片
function showPic(title, href) {
    if (!document.getElementById) return false;
    if (!document.getElementById('placeholder')) return false;
    if (!document.getElementById('img')) return false;
    var placeholder = document.getElementById('placeholder');
    placeholder.innerHTML = title;
    var img = document.getElementById('img');
    img.src = href;
    img.alt = href.split('/')[2].split('.jpg')[0];
}

// live页面，表格颜色斑马纹
function stripeTable() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByTagName('tbody')) return false;
    if (!document.getElementsByTagName('tr')) return false;
    var table = document.getElementsByTagName('tbody')[0];
    var trs = table.getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
        if (i % 2 != 0) {
            addClass(trs[i], 'odd');
        }
    }
}
// live页面，鼠标悬浮时显示高亮
function highlightRows(){
	if (!document.getElementsByTagName) return false;
    if (!document.getElementsByTagName('tbody')) return false;
    if (!document.getElementsByTagName('tr')) return false;
    var table = document.getElementsByTagName('tbody')[0];
    var trs = table.getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
    	trs[i].oldClassName = trs[i].className;
        trs[i].onmouseover = function(){
        	addClass(this,'highlight');
        }
        trs[i].onmouseout = function(){
        	// 还是这个方法简单有效，比用什么删除class的方法强
        	this.className = this.oldClassName;
        }
    }
}
