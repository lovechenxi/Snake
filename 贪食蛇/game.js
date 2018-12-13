//游戏的自调用函数
(function () {
    function Game(map) {
        //保存食物对象
        this.food = new Food();
        //保存小蛇对象
        this.snake = new Snake();
        //保存地图对象
        this.map = map;
        //克隆一个指向Game的that
        that = this;
    }

    //添加原型方法--游戏初始化
    Game.prototype.init = function () {
        //初始化食物对象
        this.food.init(this.map);
        // 初始化小蛇对象
        this.snake.init(this.map);
        //调用小蛇自动跑函数
        this.runSnake(this.food, this.map);
        //调用按键事件获取小蛇移动方向
        this.bingKey();
    };

    //添加原型方法--设置小蛇可以自动跑起来
    Game.prototype.runSnake = function (food, map) {
        var timeId = setInterval(function () {
            //移动小蛇
            this.snake.move(food, map);
            //初始化小蛇
            this.snake.init(map);

            //获取小蛇移动的最大横坐标
            var maxX = map.offsetWidth / this.snake.width;
            //获取小蛇移动的最大纵坐标
            var maxY = map.offsetHeight / this.snake.height;
            //获取小蛇头部的横坐标
            var headX = this.snake.body[0].x;
            //获取小蛇头部的纵坐标
            var headY = this.snake.body[0].y;
            //判断小蛇是否撞墙
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that), 150);
    };

    //添加按键事件，判断用户输入，以及小蛇的移动方向
    Game.prototype.bingKey = function () {
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37 :
                    this.snake.direction = "left";
                    break;
                case 38 :
                    this.snake.direction = "top";
                    break;
                case 39 :
                    this.snake.direction = "right";
                    break;
                case 40 :
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    };

    window.Game = Game;
})();
