/*
* @Author: qing
* @Date:   2018-01-19 11:18:03
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-21 12:00:22
*/
var weather;
var city;
// 请求太原的天气情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
    }
})

// 请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		// console.log(obj);
	}
})

//渲染数据
function updata(){
	// 获取当前的城市
    var cityName=document.getElementsByClassName("header")[0];
    // console.log(city_name);//查看是否成功获取
    cityName.innerHTML=weather.city_name;
    // 获取当前的温度
    var currentTemperature=document.getElementsByClassName("du")[0];
    currentTemperature.innerHTML=weather.current_temperature+"°";
    // +用于拼接，可以加单位
    // 获取当前的天气
    var currentCondition=document.getElementsByClassName("tianqi")[0];
    currentCondition.innerHTML=weather.current_condition;
    // 获取当前的风级
    var currentCondition=document.getElementsByClassName("tianqi")[0];
    currentCondition.innerHTML=weather.current_condition;

    // 渲染今天的最高最低
    var dat_high_temperature=document.getElementById("dat_high_temperature");
    // console.log(dat_high_temperature);
    dat_high_temperature.innerHTML=weather.dat_high_temperature;
    var dat_low_temperature=document.getElementById("dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature;

    
    // 渲染明天的最高最低温度
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
    
    //今天（当前）温度天气状况
    var day_condition=document.getElementById("day_condition");
    day_condition.innerHTML=weather.day_condition;
    // 今天icon
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
    // 明天的icon
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;

    // console.log() 
    for(var i in weather.hourly_forecast){
    	//创建父元素div
    	var now=document.createElement("div");
    	// 给父元素div加样式
    	now.className="now";
        // 获取now的父元素
    	var nowp=document.getElementById("now");
    	// 把now插入到父元素中
    	nowp.appendChild(now);

    	var now_time=document.createElement("h2");
    	now_time.className="now_time";
        now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
        now.appendChild(now_time);

        var now_icon=document.createElement("div");
    	now_icon.className="now_icon";
        now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
        now.appendChild(now_icon);

    	var now_temperature=document.createElement("h3");
    	now_temperature.className="now_temperature";
        now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"℃";
        now.appendChild(now_temperature);
    
    }

    for(var j in weather.forecast_list){
    	//创建父元素div
    	var recent=document.createElement("div");
    	// 给父元素div加样式
    	recent.className="recent";
        // 获取now的父元素
    	var recentp=document.getElementById("recent");
    	// 把now插入到父元素中
    	recentp.appendChild(recent);

	    var recent_time=document.createElement("div");
		recent_time.className="recent_time";
		recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
		recent.appendChild(recent_time);

        var recent_wea=document.createElement("h2");
    	recent_wea.className="recent_wea";
        recent_wea.innerHTML=weather.forecast_list[j].condition;
        recent.appendChild(recent_wea);

        var recent_pic=document.createElement("div");
    	recent_pic.className="recent_pic";
        recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
        recent.appendChild(recent_pic);

        var recent_high=document.createElement("h3");
    	recent_high.className="recent_high";
        recent_high.innerHTML=weather.forecast_list[j].high_temperature;
        recent.appendChild(recent_high);

        var recent_low=document.createElement("h4");
    	recent_low.className="recent_low";
        recent_low.innerHTML=weather.forecast_list[j].low_temperature;
        recent.appendChild(recent_low);

        var recent_wind=document.createElement("h5");
    	recent_wind.className="recent_wind";
        recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
        recent.appendChild(recent_wind);

        var recent_level=document.createElement("h6");
    	recent_level.className="recent_level";
        recent_level.innerHTML=weather.forecast_list[j].wind_level;
        recent.appendChild(recent_level);
    }

 // 2018-01-09


    var header=document.getElementsByClassName("header")[0];
    var city_box=document.getElementsByClassName("city_box")[0];

    // 给header添加点击事件
    header.onclick=function(){
    	$(".text").val("");
    	$(".button").html("取消")
    	city_box.style="display:block";
    }

    //渲染城市
    for(var k in city){
    	// console.log(k);

        var cityp=document.getElementById("city");

    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
        cityp.appendChild(title);
        
        var con=document.createElement("div");
        con.className="con";
        //访问二级城市
        for(var y in city[k]){
        	// console.log(y);

        	var erji=document.createElement("div");
        	erji.className="son";
        	erji.innerHTML=y;
        	con.appendChild(erji);
        }
        cityp.appendChild(con);
    }

}


//查找个城市的天气信息
function AJAX(str){
	$.ajax({
	    url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	    dataType:"jsonp",
	    type:"get",
	    success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
		updata();
		$(".city_box").css({"display":"none"});
    }
})
}
//当页面加载完成执行的代码
window.onload=function(){
    updata();

    //
    $(".son").on("click",function(){
    	var cityh=this.innerHTML;
    	AJAX(cityh);
    });

    // 当input获取焦点时，button变确认   
    // focus:获取焦点
    $(".text").on("focus",function(){
    	//html：设置或改变元素内容
    	$(".button").html("确认");
    	// console.log(1);
    })

    //操作按钮 通过内容
    var button=document.getElementsByClassName("button")[0];
     // console.log(button);

    button.onclick=function(){
    	// console.log(1);
        //获取button中间的内容
    	var btn=this.innerHTML;
    	// console.log(btn);
    	if(btn=="取消"){
    		// console.log(2);
    		var city_box1=document.getElementsByClassName("city_box")[0];
    		// console.log(city_box1);
    	    city_box1.style="display:none";
    	}
    	else{
    		//获取text的值
    		var str1 =document.getElementById("text").value;
    		// console.log(str);
    		for(var i in city){
    			if(i ==  str1){
    				AJAX(str1);
    				//符合条件跳出
    				// console.log(2);
    			    return;
    			}
    		    else{
    		    	for(var j in city[i]){
    		    		if(j == str1){
    		    			AJAX(str1);
    				        //符合条件跳出
    				        return;
    		    		}
    		    	}
    		    }
    		}
    		alert("没有该城市的气象信息")
    	}
    }
}
