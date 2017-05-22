addloadEvent(function() {
    var showBtn = document.getElementById('show');
    showBtn.onclick = displayAbbreviations;
});
addloadEvent(displayCitations);
addloadEvent(displayAccessKey);


function addloadEvent(func) {
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
//显示缩略语列表
function displayAbbreviations() {
    var abbrs = document.getElementsByTagName('abbr');
    if (abbrs.length <= 0) return false;
    //var titles = [], txts = [];
    var dl = document.createElement('dl');
    for (var i = 0; i < abbrs.length; i++) {
        var dt = document.createElement('dt');
        dt.innerHTML = abbrs[i].innerHTML;
        var dd = document.createElement('dd');
        dd.innerHTML = abbrs[i].title;
        //titles.add(abbrs[i].title);
        //txts.add(abbrs[i].innerHTML);
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
    document.getElementsByTagName('body')[0].appendChild(dl);

}
//显示文献来源链接表
function displayCitations() {
    var quotes = document.getElementsByTagName('blockquote');
    for (var i = 0; i < quotes.length; i++) {
        if (!quotes[i].getAttribute('cite')) continue;
        var url = quotes[i].getAttribute('cite');
        var quoteChildren = quotes[i].getElementsByTagName('*');
        if (quoteChildren < 1) continue;
        //下面是一种很棒的用法，记住
        var elem = quoteChildren[quoteChildren.length - 1];
        var link = document.createElement('a');
        var link_text = document.createTextNode('source');
        link.appendChild(link_text);
        link.setAttribute('href', url);
        var superscript = document.createElement('sup');
        superscript.appendChild(link);
        elem.appendChild(superscript);
    }
}
//显示快捷键清单
function displayAccessKey() {
    if (!document.getElementsByTagName || !document.createElement) return false;
    var nav = document.getElementById('navigation');
    //getElementByTagName('a')会获取到blockquote标签的内容，why？
    var links = nav.getElementsByTagName('a');
    var list = document.createElement('ul');
    for (var i = 0; i < links.length; i++) {
        var current_link = links[i];
        var key = current_link.getAttribute('href');
        var val = current_link.getAttribute('accesskey');
        var item = document.createElement('li');
        item.innerHTML = key + ' : ' + val;
        list.appendChild(item);
    }
    var body = document.getElementsByTagName('body')[0];
    var header = document.createElement('h3');
    header.innerHTML = 'Accesskey';
    body.appendChild(header);
    body.appendChild(list);
}
