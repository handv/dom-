//替代window.onload的方法
addLoadEvent(prepareGallery);

function prepareGallery() {
    var gallery = document.getElementById("imagegalley");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(){
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

function addLoadEvent(func) {
    var oldFunc = window.onload;
    //如果window.onload没有内容，则执行新添加的func函数
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    //如果window.onload已经存在函数，则window.onload先执行旧函数，再执行新添加的func函数
    else {
        window.onload = function() {
            oldFunc();
            func();
        }
    }
}