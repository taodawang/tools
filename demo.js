var tools = (function(){

	//获取url带的参数中名为name的值
	var getQueryString = function(name){
		var re=new RegExp("(^|&)"+name+"=([^&]*)(&|$)",'i');
		var result=window.location.search.substring(1).match(re);
		if (result!=null) {
			return decodeURIComponent(result[2]);
		}else{
			return null;
		}
	};

	//获取光标位置
	var getCursorPosition = function(ctrl){
		var CaretPos = 0;   // IE Support
	    if (document.selection) {
	    	ctrl.focus ();
	        var Sel = document.selection.createRange ();
	        Sel.moveStart ('character', -ctrl.value.length);
	        CaretPos = Sel.text.length;
	    }
	    // Firefox support
	    else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
	        CaretPos = ctrl.selectionStart;
	    }
	    return (CaretPos);
    },
    //设置光标位置
	var	setCursorPosition = function(ctrl, pos){
	    if(ctrl.setSelectionRange) {
	        ctrl.focus();
	        ctrl.setSelectionRange(pos,pos);
	    }
	    else if (ctrl.createTextRange) {
	        var range = ctrl.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', pos);
	        range.moveStart('character', pos);
	        range.select();
	    }
   };
	//获取Cookie
	var getCookie = function(name){
		var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}
		else{
			return null;
		}
	};
	//设置cookie
	var setCookie = function(name, value,time){
	    var exp = new Date();
	    exp.setTime(exp.getTime() + time);
	    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	};
	//时间戳转换时间
	var timeStamp2time = function(timestamp){
		var date = new Date(timestamp);
		var Y,M,D,h,m,s;
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() + ' ';
		h = date.getHours() + ':';
		m = date.getMinutes() + ':';
		s = date.getSeconds();
		return Y+M+D+h+m+s;
	};
	//时间转换成时间戳
	var time2timeStamp = function(time){
		var stringTime = time.toString();
		var timestamp = Date.parse(new Date(stringTime));
		timestamp = timestamp / 1000;
		return timestamp;
	};
	//数组转对象(序列化表单转成对象)
	var array2obj = function(array){
		var obj = {};
        for( var i=0; i<array.length; i++){

            var key = array[i].name;
            var value = array[i].value;

            if (obj[key] == undefined) {
                obj[key] = value;
            }
            else {
                if (Array.isArray( obj[key] )) {
                    obj[key].push( value );
                }
                else {
                    var temp = obj[key];
                    obj[key] = [temp];
                    obj[key].push(value);
                }
            }
        }
        return obj;
	};
	//公用ajax
	var comAjax = function(type,url,data,callback){
		return $.ajax({
			type:type,
			url:url,
			data : data,
			success : callback,
		});
	};
	//回到顶部动画
	var backToTop = function (rate) {
	    var doc = document.body.scrollTop? document.body : document.documentElement;
	    var scrollTop = doc.scrollTop;
	    var top = function () {
	        scrollTop = scrollTop + (0 - scrollTop) / (rate || 2);

	        // 临界判断，终止动画
	        if (scrollTop < 1) {
	            doc.scrollTop = 0;
	            return;
	        }
	        doc.scrollTop = scrollTop;
	        // 动画gogogo!
	        requestAnimationFrame(top);
	    };
	    top();
	};

	// 下载文件方法
	var funDownload = function (content, filename) {
	    var eleLink = document.createElement('a');
	    eleLink.download = filename;
	    eleLink.style.display = 'none';
	    // 字符内容转变成blob地址
	    var blob = new Blob([content]);
	    eleLink.href = URL.createObjectURL(blob);
	    // 触发点击
	    document.body.appendChild(eleLink);
	    eleLink.click();
	    // 然后移除
	    document.body.removeChild(eleLink);
	};
	return{
		getQueryString : getQueryString,
		getCursorPosition : getCursorPosition,
		setCursorPosition : setCursorPosition,
		getCookie : getCookie,
		SetCookie : SetCookie,
		timeStamp2time : timeStamp2time,
		time2Timestamp : time2Timestamp
		array2obj : array2obj,
		comAjax : comAjax,
		backToTop : backToTop,
		funDownload : funDownload,
	}

})(jQuery);
