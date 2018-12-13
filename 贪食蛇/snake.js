//小蛇的自调用函数
(function () {
    //存放校舍的身体每个部分
    var elements = [];

    //小蛇的构造方法
    function Snake(width, height, direction) {
        //小蛇每部分的宽
        this.width = width || 20;
        //小蛇每部分的高
        this.height = height || 20;
        //小蛇移动的方向
        this.direction = direction || "right";
        //小蛇的全身
        this.body = [
            {x: 3, y: 2, color: "red"},//头
            {x: 2, y: 2, color: "orange"},//身体
            {x: 1, y: 2, color: "orange"}//身体
        ]
    }

    //为原型添加方法--小蛇初始化的方法
    Snake.prototype.init = function (map) {
        //先删除之前的小蛇
        remove();
        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            map.appendChild(div);
            //设置div样式
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.position = "absolute";
            // var img = document.createElement("img");
            // img.setAttribute("src","small.png");
            // img.style.width= div.offsetWidth+"px";
            // img.style.height = "auto";
            // div.appendChild(img);
            //设置横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            //设置背景颜色
            div.style.backgroundColor = obj.color;
            //方向
            //把div添加到elements数组中,目的是为了删除
            elements.push(div);
        }
    };

    //为原型添加方法--小蛇动起来
    Snake.prototype.move = function (fd, map) {
        var i = this.body.length - 1;
        for (i; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;

        //console.log(headX + "====" + fd.x + "-----" + headY + "====" + fd.y);
        if (headX == fd.x && headY == fd.y) {
            var last = this.body[this.body.length-1];

            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color,
            });
            fd.init(map);
        }
    };

    function remove() {
        //获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            //先从当前的子元素中找到该子元素的伏击元素，然后再删除该子元素
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    window.Snake = Snake;
})();
