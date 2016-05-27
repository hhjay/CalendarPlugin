// jQuery插件
;(function($){
    var div_str = '<style type="text/css">    .calendar-matrix{        position: absolute;        top: 58px;        right: -1px;        width: 275px;        height: 230px;        color: #606060;        border: 1px solid #e2e2e2;        display: none;        z-index: 1000;        background: #ffffff;    }    .matrix-head{        width: 275px;        height: 37px;        background: #f3f3f3;    }    .matrix-title{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #f23d63;        position: absolute;        top: 7px;        left: 20px;    }    .matrix-year{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        position: absolute;        top: 7px;        right: 80px;        height: 20px;        width: 70px;        border: 1px solid #e2e2e2;        background: #ffffff;        padding: 2px 0 0 5px;    }    .matrix-year img{        float: right;        height: 20px;        margin-right: 5px;    }    .matrix-month{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        position: absolute;        top: 7px;        right: 20px;        height: 20px;        width: auto;        border: 1px solid #e2e2e2;        background: #ffffff;        padding: 2px 0 0 5px;    }    .matrix-month img{        float: right;        height: 20px;        margin-right: 5px;    }    .matrix-content{        padding: 5px 10px 10px 10px;        margin: 0;        list-style: none;        width: 255px;        height: 173px;        background: #ffffff;        overflow: hidden;    }    .matrix-content li{        float: left;        width: 30px;        height: 25px;        padding: 0 3px 0px 3px;        font-size: 12px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        text-align: center;        padding-top: 5px;    }    .year-list{        position: absolute;        top: 31px;        right: 87px;        width: 70px;        height: 80px;        list-style: none;        margin: 0;        padding: 0;        display: none;    }    .year-list li{        float: left;        height: 20px;        width: 75px;        border: 1px solid #e2e2e2;        border-top-width: 0px;        padding: 2px 0 0 0px;        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        background: #ffffff;        text-align: center;    }    .month-list{        position: absolute;        top: 31px;        right: 22px;        width: 50px;        height: 240px;        list-style: none;        margin: 0;        padding: 0;        display: none;    }    .month-list li{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        float: left;        height: 20px;        width: 50px;        border: 1px solid #e2e2e2;        border-top-width: 0px;        background: #ffffff;        padding: 2px 0 0 0px;        text-align: center;    }    .date-selected{        color: #ffffff !important;        background: #f23d63 !important;    }</style><div class="calendar-matrix"><div class="matrix-head"><span class="matrix-title">日历</span><span class="matrix-year">2015年<img src="http://mat1.gtimg.com/sports/test/john/nbagame/list.png"/></span><span class="matrix-month">6月<img src="http://mat1.gtimg.com/sports/test/john/nbagame/list.png"/></span></div><ul class="matrix-content"></ul><ul class="year-list"><li>2016年</li><li>2015年</li><li>2014年</li><li>2013年</li><li>2012年</li></ul><ul class="month-list"><li>1月</li><li>2月</li><li>3月</li><li>4月</li><li>5月</li><li>6月</li><li>7月</li><li>8月</li><li>9月</li><li>10月</li><li>11月</li><li>12月</li></ul></div>';

    var load_calendar_matrix = function(year, month, callback) 
    {
        $(".matrix-content").empty();
        
        $(".matrix-content").append("<li>一</li>");
        $(".matrix-content").append("<li>二</li>");
        $(".matrix-content").append("<li>三</li>");
        $(".matrix-content").append("<li>四</li>");
        $(".matrix-content").append("<li>五</li>");
        $(".matrix-content").append("<li>六</li>");
        $(".matrix-content").append("<li>日</li>");

        month--;          // 因为数组从0开始，月份-1
        var months = [];
        if((year%4 == 0) || (year%400 == 0))
        {
            months = [31,29,31,30,31,30,31,31,30,31,30,31];  // 闰年
        }
        else
        {
            months = [31,28,31,30,31,30,31,31,30,31,30,31];
        }

        var year_week = new Array();            // 某年第一天是周几
        year_week["2016"] = 5;
        year_week["2015"] = 4;
        year_week["2014"] = 3;
        year_week["2013"] = 2;
        year_week["2012"] = 7;

        var before_days = 0;
        for(var i = 0; i < month; i++)
        {
            before_days += months[i];      // 1月1日到本月1日的天数
        }

        var firstday = (before_days + year_week[year]) % 7;      // 计算本月1日是星期几
        if(firstday == 0)
            firstday = 7;

        var last_month = (month + 11) % 12;
        for(var m = firstday-1; m > 0; m--)                                             // 在本月1号之前加入上个月的最后几天
        {
            var day = months[last_month]-m+1;
            $(".matrix-content").append('<li>' + day + '</li>'); 
        }

        for(var i = 1; i <= months[month]; i++)
        {
            $(".matrix-content").append('<li>' + i + '</li>');
        }

        for(var j = 1; j < (36-months[month]-(firstday-1)); j++)    // 在最后加入下个月的前几天
        {
            $(".matrix-content").append('<li>' + j + '</li>');
        }

        $(".matrix-content li").on("click",function(){
            callback();
        });

        $(".year-list li:nth-child(1)").addClass("date-selected");
        $(".month-list li:nth-child(1)").addClass("date-selected");
    };

    // 点击click_ele打开日历，点击某一天执行callback
    $.fn.add_calendar = function(click_ele, callback)
    {
        this.html(div_str);

        var today = new Date();
        load_calendar_matrix(today.getFullYear(), today.getMonth()+1, callback);

        $(".matrix-year").html(today.getFullYear() + "年" +"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");
        $(".matrix-month").html((today.getMonth()+1) + "月" +"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");

        click_ele.on("click",function(e){
            e.stopPropagation(); 
            $(".calendar-matrix").slideToggle();
        });
        $(document).click(function (event){
            $(".calendar-matrix").hide();
        });

        $(".matrix-year").on("click",function(e){
            e.stopPropagation(); 
            $(".year-list").children().removeClass("date-selected");
            $(".year-list").toggle();
        });

        $(".matrix-month").on("click",function(e){
            e.stopPropagation(); 
            $(".month-list").children().removeClass("date-selected");
            $(".month-list").toggle();
        });

        $(".year-list li").on("click",function(e){
            e.stopPropagation(); 
            $(".year-list").children().removeClass("date-selected");
            $(this).addClass("date-selected");

            $(".matrix-year").html($(this).html()+"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");
            $(".year-list").hide();
        }); 
        $(".year-list li").hover(
            function()
            {
                $(this).addClass("date-selected");
            },
            function()
            {
                $(this).removeClass("date-selected");
            }
        );

        $(".month-list li").on("click",function(e){
            e.stopPropagation(); 
            $(".month-list").children().removeClass("date-selected");
            $(this).addClass("date-selected");

            var month_html = $(this).html();
            $(".matrix-month").html(month_html+"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");

            var year_html = $(".matrix-year").html();
            var select_year = year_html.match(/[1-9][0-9]*/g)[0];
            var select_month = month_html.match(/[1-9][0-9]*/g)[0];
            $(".month-list").hide();

            load_calendar_matrix(select_year, select_month, callback);
        }); 
        $(".month-list li").hover(
            function()
            {
                $(this).addClass("date-selected");
            },
            function()
            {
                $(this).removeClass("date-selected");
            }
        );
    }
})(jQuery);

// 使用增强的模块模式创建日历
var calendarFactory = function()
{
    //私有变量和私有函数
    var div_str = '<style type="text/css">    .calendar-matrix{        position: absolute;        top: 58px;        right: -1px;        width: 275px;        height: 230px;        color: #606060;        border: 1px solid #e2e2e2;        display: none;        z-index: 1000;        background: #ffffff;    }    .matrix-head{        width: 275px;        height: 37px;        background: #f3f3f3;    }    .matrix-title{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #f23d63;        position: absolute;        top: 7px;        left: 20px;    }    .matrix-year{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        position: absolute;        top: 7px;        right: 80px;        height: 20px;        width: 70px;        border: 1px solid #e2e2e2;        background: #ffffff;        padding: 2px 0 0 5px;    }    .matrix-year img{        float: right;        height: 20px;        margin-right: 5px;    }    .matrix-month{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        position: absolute;        top: 7px;        right: 20px;        height: 20px;        width: auto;        border: 1px solid #e2e2e2;        background: #ffffff;        padding: 2px 0 0 5px;    }    .matrix-month img{        float: right;        height: 20px;        margin-right: 5px;    }    .matrix-content{        padding: 5px 10px 10px 10px;        margin: 0;        list-style: none;        width: 255px;        height: 173px;        background: #ffffff;        overflow: hidden;    }    .matrix-content li{        float: left;        width: 30px;        height: 25px;        padding: 0 3px 0px 3px;        font-size: 12px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        text-align: center;        padding-top: 5px;    }    .year-list{        position: absolute;        top: 31px;        right: 87px;        width: 70px;        height: 80px;        list-style: none;        margin: 0;        padding: 0;        display: none;    }    .year-list li{        float: left;        height: 20px;        width: 75px;        border: 1px solid #e2e2e2;        border-top-width: 0px;        padding: 2px 0 0 0px;        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        background: #ffffff;        text-align: center;    }    .month-list{        position: absolute;        top: 31px;        right: 22px;        width: 50px;        height: 240px;        list-style: none;        margin: 0;        padding: 0;        display: none;    }    .month-list li{        font-size: 14px;        font-family: "\5FAE\8F6F\96C5\9ED1",sans-serif;        color: #606060;        float: left;        height: 20px;        width: 50px;        border: 1px solid #e2e2e2;        border-top-width: 0px;        background: #ffffff;        padding: 2px 0 0 0px;        text-align: center;    }    .date-selected{        color: #ffffff !important;        background: #f23d63 !important;    }</style><div class="calendar-matrix"><div class="matrix-head"><span class="matrix-title">日历</span><span class="matrix-year">2015年<img src="http://mat1.gtimg.com/sports/test/john/nbagame/list.png"/></span><span class="matrix-month">6月<img src="http://mat1.gtimg.com/sports/test/john/nbagame/list.png"/></span></div><ul class="matrix-content"></ul><ul class="year-list"><li>2016年</li><li>2015年</li><li>2014年</li><li>2013年</li><li>2012年</li></ul><ul class="month-list"><li>1月</li><li>2月</li><li>3月</li><li>4月</li><li>5月</li><li>6月</li><li>7月</li><li>8月</li><li>9月</li><li>10月</li><li>11月</li><li>12月</li></ul></div>';

    var load_calendar_matrix = function(year, month, callback) 
    {
        $(".matrix-content").empty();
        
        $(".matrix-content").append("<li>一</li>");
        $(".matrix-content").append("<li>二</li>");
        $(".matrix-content").append("<li>三</li>");
        $(".matrix-content").append("<li>四</li>");
        $(".matrix-content").append("<li>五</li>");
        $(".matrix-content").append("<li>六</li>");
        $(".matrix-content").append("<li>日</li>");

        month--;          // 因为数组从0开始，月份-1
        var months = [];
        if((year%4 == 0) || (year%400 == 0))
        {
            months = [31,29,31,30,31,30,31,31,30,31,30,31];  // 闰年
        }
        else
        {
            months = [31,28,31,30,31,30,31,31,30,31,30,31];
        }

        var year_week = new Array();            // 某年第一天是周几
        year_week["2016"] = 5;
        year_week["2015"] = 4;
        year_week["2014"] = 3;
        year_week["2013"] = 2;
        year_week["2012"] = 7;

        var before_days = 0;
        for(var i = 0; i < month; i++)
        {
            before_days += months[i];      // 1月1日到本月1日的天数
        }

        var firstday = (before_days + year_week[year]) % 7;      // 计算本月1日是星期几
        if(firstday == 0)
            firstday = 7;

        var last_month = (month + 11) % 12;
        for(var m = firstday-1; m > 0; m--)                                             // 在本月1号之前加入上个月的最后几天
        {
            var day = months[last_month]-m+1;
            $(".matrix-content").append('<li>' + day + '</li>'); 
        }

        for(var i = 1; i <= months[month]; i++)
        {
            $(".matrix-content").append('<li>' + i + '</li>');
        }

        for(var j = 1; j < (36-months[month]-(firstday-1)); j++)    // 在最后加入下个月的前几天
        {
            $(".matrix-content").append('<li>' + j + '</li>');
        }

        $(".matrix-content li").on("click",function(){
            callback();
        });

        $(".year-list li:nth-child(1)").addClass("date-selected");
        $(".month-list li:nth-child(1)").addClass("date-selected");
    };

    //创建对象
    var object = {};

    //添加特权/公有属性和方法
    object.add_calendar = function(cal_ele, click_ele, callback)
    {
        cal_ele.html(div_str);

        var today = new Date();
        load_calendar_matrix(today.getFullYear(), today.getMonth()+1, callback);

        $(".matrix-year").html(today.getFullYear() + "年" +"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");
        $(".matrix-month").html((today.getMonth()+1) + "月" +"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");

        click_ele.on("click",function(e){
            e.stopPropagation(); 
            $(".calendar-matrix").slideToggle();
        });
        $(document).click(function (event){
            $(".calendar-matrix").hide();
        });

        $(".matrix-year").on("click",function(e){
            e.stopPropagation(); 
            $(".year-list").children().removeClass("date-selected");
            $(".year-list").toggle();
        });

        $(".matrix-month").on("click",function(e){
            e.stopPropagation(); 
            $(".month-list").children().removeClass("date-selected");
            $(".month-list").toggle();
        });

        $(".year-list li").on("click",function(e){
            e.stopPropagation(); 
            $(".year-list").children().removeClass("date-selected");
            $(this).addClass("date-selected");

            $(".matrix-year").html($(this).html()+"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");
            $(".year-list").hide();
        }); 
        $(".year-list li").hover(
            function()
            {
                $(this).addClass("date-selected");
            },
            function()
            {
                $(this).removeClass("date-selected");
            }
        );

        $(".month-list li").on("click",function(e){
            e.stopPropagation(); 
            $(".month-list").children().removeClass("date-selected");
            $(this).addClass("date-selected");

            var month_html = $(this).html();
            $(".matrix-month").html(month_html+"<img src='http://mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");

            var year_html = $(".matrix-year").html();
            var select_year = year_html.match(/[1-9][0-9]*/g)[0];
            var select_month = month_html.match(/[1-9][0-9]*/g)[0];
            $(".month-list").hide();

            load_calendar_matrix(select_year, select_month, callback);
        }); 
        $(".month-list li").hover(
            function()
            {
                $(this).addClass("date-selected");
            },
            function()
            {
                $(this).removeClass("date-selected");
            }
        );
    };

    //返回这个对象
    return object;
}();