//替代window.onload的方法，可能类似jquery里的$.onready()?
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//准备插入标签，使用dom方法
function preparePlaceholder() {
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementsByTagName) {
        return false;
    }
    if (!document.getElementById("imagegalley")) {
        return false;
    }
    //dom插入
    var placeholder = document.createElement('img');
    placeholder.alt = '占位符';
    placeholder.id = 'placeholder';
    var description = document.createElement('p');
    description.id = 'description';
    var descriptionText = document.createTextNode('choose an image.');
    description.appendChild(descriptionText);
    var gallery = document.getElementById("imagegalley");
    gallery.appendChild(placeholder);
    gallery.appendChild(description);
}

function prepareGallery() {
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementsByTagName) {
        return false;
    }
    if (!document.getElementById("imagegalley")) {
        return false;
    }
    var gallery = document.getElementById("imagegalley");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            return !showPic(this);
        }
    }
}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) {
        return false;
    }
    var source = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source);
    if (document.getElementById("description")) {
        var title = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
        var description = document.getElementById('description');
        description.innerHTML = title;
    }
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
