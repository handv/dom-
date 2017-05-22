addloadEvent(getNewContent);

function addloadEvent(func) {
    oldLoad = window.onload;

    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            onload();
            func();
        }
    }
}

function getHTTPObject() {
    if (typeof XMLHttpRequest == 'undefined') {
        XMLHttpRequest = function() {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP.6.0');
            } catch (e) {
                // statements
                console.log(e);
            }
            try {
                return new ActiveXObject('Msxml2.XMLHTTP.3.0');
            } catch (e) {
                // statements
                console.log(e);
            }
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                // statements
                console.log(e);
            }
        }
    }
    return new XMLHttpRequest();
}

function getNewContent() {
    var request = getHTTPObject();
    request.open('GET', 'example.txt', true);
    if (request) {
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                var para = document.createElement('p');
                var txt = document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById('new').appendChild(para);
            }
        };
        request.send(null);
    } else {
        alert('sorry');
    }
}
