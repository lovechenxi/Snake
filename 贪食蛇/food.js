//食物的自调用函数
(function (window) {
    //用来保存每个小方块食物的
    var elements = [];

    //食物的构造函数
    function Food(width, height, color) {
        //设置食物的高度
        this.height = height || 20;
        //设置食物的宽度
        this.width = width || 20;
        //设置食物的背景颜色
        this.color = color || "green";
        //食物的横坐标
        this.x = 0;
        //食物的纵坐标
        this.y = 0;
    }

    //为原型添加食物初始话方法（作用：在页面上显示这个食物）
    Food.prototype.init = function (map) {
        //先删除这个食物,防止多次调用时生成多个食物
        remove();
        //创建div
        var div = document.createElement("div");
        //把div加入到map中
        map.appendChild(div);
        this.div = div;
        //设置div的样式
        div.style.backgroundColor = this.color;
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        //脱离文档流
        div.style.position = "absolute";
        // var img = document.createElement("img");
        // img.setAttribute("src","big.png");
        // img.style.width= div.offsetWidth+"px";
        // img.style.height = "auto";
        // div.appendChild(img);
        //调用封装的食物位置函数
        this.render(map);
        //把div加入到数组elements中
        elements.push(div);


    };

    //私有的函数 --- 删除食物用的
    function remove() {
        //elements数组中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素。然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把element中的这个子元素也要删除
            elements.splice(i, 1);
        }
    }

    //封装食物随机的位置函数
    Food.prototype.render = function (map) {
        this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;
        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";
    };
    window.Food = Food;
})(window);
