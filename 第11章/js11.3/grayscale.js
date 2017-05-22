function convertToGS(img) {
    //存储原始颜色
    img.color = img.src;
    //创建灰度版
    img.grayscale = createGSCanvas(img);

    img.onmouseonver = function() {
        img.src = img.grayscale;
    }
    img.onmouseout = function() {
        img.src = img.color;
    }

}

function createGSCanvas(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');
    //向画布上绘制图像、画布或视频。
    ctx.drawImage(img, 0, 0);

    //getImageData 只能操作与脚本位于同一个域的图片
    //本例无法执行，因为imge和脚本不同域，用本地文件是不行的，只能用web服务器
    /*
        ImageData 对象不是图像，它规定了画布上一个部分（矩形），并保存了该矩形内每个像素的信息。
        对于 ImageData 对象中的每个像素，都存在着四方面的信息，即 RGBA 值：
        R - 红色（0-255）
        G - 绿色（0-255）
        B - 蓝色（0-255）
        A - alpha 通道（0-255; 0 是透明的，255 是完全可见的）
    */
    var c = ctx.getImageData(0, 0, img.width, img.height);
    for (var i = 0; i < c.height; i++) {
        for (var j = 0; j < c.width; j++) {
            //为什么要*4，因为data[]有4个参数
            var x = (i * 4) * c.height + (j * 4);
            /*
            以下代码可获得被返回的 ImageData 对象中第一个像素的 color/alpha 信息：
            red=imgData.data[0];
            green=imgData.data[1];
            blue=imgData.data[2];
            alpha=imgData.data[3];
            */
            var r = c.data[x];
            var g = c.data[x + 1];
            var b = c.data[x + 2];
            c.data[x] = c.data[x + 1] = c.data[x + 2] = (r + g + b) / 3;
        }
    }
    ctx.putImageData(c, 0, 0, 0.0.c.width, c.height);
    return canvas.toDataURL();
}
window.onload = function() {
    convertToGS(document.getElementById('avatar'));
}
