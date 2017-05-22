addLoadEvent(positionMessage);

function addLoadEvent(func) {
    oldLoad = window.onload;
    if (typeof window.onload == 'function') {
        oldLoad();
        func();
    } else {
        window.onload = func;
    }
}
//初始化坐标位置
function positionMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById('message')) return false;
	var mes = document.getElementById('message');
	mes.style.position = 'absolute';//绝对定位才能设置位置
	mes.style.top = '10px';
	mes.style.left = '50px';
	/*
	 * setTimeout 方法接收两个参数，第一个参数为回调函数函数或字符串
	 * 函数时为函数名，如果是带括号的话，会立即执行，没有延迟
	 * 字符串的话，必须带括号，否则没有作用
	 */
	//movement = setTimeout(moveMessage, 50);
	//setTimeout('moveMessage()', 5000);
	//movement = setTimeout("moveElement('message', 200, 100, 50)",50);
	moveElement('message', 200, 100, 50)
}
//移动函数
function moveMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById('message')) return false;
	var mes = document.getElementById('message');
	var xpos = parseInt(mes.style.left);
	var ypos = parseInt(mes.style.top);
	if(xpos == 200 && ypos == 100){
		return true;
	}
	if(xpos < 200){
		xpos++;
	}
	if(xpos > 200){
		xpos--;
	}
	if(ypos < 100){
		ypos++;
	}
	if(ypos > 100){
		ypos--;
	}
	mes.style.left = xpos + 'px';
	mes.style.top = ypos + 'px';
	//如何使用setTimeout来做重复的时间间隔功能，递归调用setTimeout
	movement = setTimeout(moveMessage, 50);
	
}
//带参数的移动函数
function moveElement(elementId, final_x, final_y, interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementId)) return false;
	var mes = document.getElementById(elementId);
	var xpos = parseInt(mes.style.left);
	var ypos = parseInt(mes.style.top);
	if(xpos == final_x && ypos == final_y){
		return true;
	}
	if(xpos < final_x){
		xpos++;
	}
	if(xpos > final_x){
		xpos--;
	}
	if(ypos < final_y){
		ypos++;
	}
	if(ypos > final_y){
		ypos--;
	}
	mes.style.left = xpos + 'px';
	mes.style.top = ypos + 'px';
	//如何使用setTimeout来做重复的时间间隔功能，递归调用setTimeout
	var repeat = "moveElements('"+elementId+"', "+final_x+', '+final_y+', '+interval+")";
	movement = setTimeout(repeat, interval);
}