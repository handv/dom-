addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTable);
addLoadEvent(highlightRows);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);

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
    var trs = document.getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
        if (i % 2 != 0) {
            addClass(trs[i], 'odd');
        }
    }
}
// live页面，鼠标悬浮时显示高亮
function highlightRows() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByTagName('tbody')) return false;
    if (!document.getElementsByTagName('tr')) return false;
    var table = document.getElementsByTagName('tbody')[0];
    var trs = document.getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
        trs[i].oldClassName = trs[i].className;
        trs[i].onmouseover = function() {
            addClass(this, 'highlight');
        }
        trs[i].onmouseout = function() {
            // 还是这个方法简单有效，比用什么删除class的方法强
            this.className = this.oldClassName;
        }
    }
}
// contact页面，点击label焦点在input上
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByTagName('fieldset')) return false;
    if (!document.getElementsByTagName('label')) return false;
    var fieldset = document.getElementsByTagName('fieldset')[0];
    var labels = fieldset.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        labels[i].onclick = function() {
            var id = this.getAttribute("for");
            var input = document.getElementById(id);
            if (!input) return false;
            input.focus();
        }
    }
}
// contact页面，placeholder的实现
function resetFields(whichform) {
    if (Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        element.txt = element.getAttribute('placeholder');
        element.onfocus = function() {
            //只有value和placeholder值一致，才为空
            if (this.placeholder == this.txt) {
                this.placeholder = "";
            }
        }
        element.onblur = function() {
            if (this.placeholder == '') {
                this.placeholder = this.txt;
            }
        }
        element.onblur(); //为什么要立即调用
    }
}
// forms 集合返回当前页面所有表单的数组集合
function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        //form的submit方法
        thisform.onsubmit = function() {
            if (!validateForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            //如果方法管用，就更改article的内容，返回false不用跳转
            if (submitFormWithAjax(this, article)) return false;
            //否则,返回true，跳转到submit.html页面
            return true;
        }
    }
}
// contact页面，验证表单内容是否为空
function isFilled(field) {
    if (field.value.replace(' ', '').length == 0) return false;
    var placeholder = field.placeholder;
    return (field.value != placeholder);
}
// contact页面，验证email
function isEmail(field) {
    return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1);
}
// contact页面，验证form表单
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.required) {
            if (!isFilled(element)) {
                alert('Please fill in the ' + element.name + ' field.');
                return false;
            }
            if (element.type == 'email') {
                if (!isEmail(element)) {
                    alert('The ' + element.name + ' field must be a valid email address');
                    return false;
                }
            }
        }
    }
    return true;
}
// loading图片
function displayAjaxLoading(element) {
    //删除掉element的所有子元素
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement('img');
    content.src = 'images/loading.gif';
    content.alt = 'Loading...';
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
    var request = new XMLHttpRequest();
    displayAjaxLoading(thetarget);
    var dataParts = [];
    for (var i = 0; i < whichform.elements.length; i++) {
        var thiselement = whichform.elements[i];
        if (thiselement.name) {
            dataParts.push(thiselement.name + '=' + encodeURIComponent(thiselement.value));
        }
    }
    var data = dataParts.join('&');

    request.open('POST', whichform.action, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function() {
        //readystatus,HTTP 请求的状态
        if (request.readyState == 4) {
            //status,由服务器返回的 HTTP 状态代码
            if (request.status == 200) {
                //responseText,目前为止为服务器接收到的响应体（不包括头部），或者如果还没有接收到数据的话，就是空字符串。
                var matches = request.reponseText.match(/<article>(.*)<\/article>/);
                if (matches.length > 0) {
                    thetarget.innerHTML = matches[1]; //[0]
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry!</p>';
                }
            } else {
                //statusText,这个属性用名称而不是数字指定了请求的 HTTP 的状态代码
                thetarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
    };
    //send(),发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
    //发送post方法的请求体
    request.send(data);
    return true;
}
