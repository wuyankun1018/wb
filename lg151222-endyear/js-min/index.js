var WIN_HEIGHT=$(window).height(),WIN_WIDTH=$(window).width(),REM_WIN_WIDTH=7.5,REM_WIN_HEIGHT=REM_WIN_WIDTH*WIN_HEIGHT/WIN_WIDTH;function transToRem(a){return REM_WIN_WIDTH*a/WIN_WIDTH+.01}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
window.DeviceMotionEvent&&function(){var a=y=z=lastX=lastY=lastZ=0;window.addEventListener("devicemotion",function(){var b=event.accelerationIncludingGravity;a=b.x;y=b.y;(25<Math.abs(a-lastX)||25<Math.abs(y-lastY))&&$(window).trigger("shake");lastX=a;lastY=y},!1)}();
(function(){$("[data-rt]").each(function(a,b){$(b).data("oheight",$(this).height())});$("[data-oh]").each(function(a,b){var c=$(b);if(parseFloat(c.data("oh"))>REM_WIN_HEIGHT){var d=WIN_HEIGHT/c.height(),e=c.height(),k=c.width()*(1-d)/2;changeTransform(c,"translateY(-"+(1-d)*e/2+"px) scale("+d+")");$(this).data("scale",d);c.find("[data-align]").each(function(a,b){var c=$(b);c.data("align").split(" ").forEach(function(a){"left"==a&&c.css({"margin-left":-(k/d)+"px"})})})}})})();
var viewController={viewParent:$(".main_container"),currentIndex:0,length:0,init:function(a){this.currentIndex=a|0;a=this.length=this.viewParent.find("[class*=frame]").length;this.currentIndex>a-1&&(this.currentIndex=a-1);0>this.currentIndex&&(this.currentIndex=0);this.reloadView()},next:function(){this.currentIndex++;var a=this.length;if(this.currentIndex>a-1)return this.currentIndex=a-1;this.reloadView("next")},prev:function(){this.currentIndex--;if(0>this.currentIndex)return this.currentIndex=
0;this.reloadView("prev")},reloadView:function(a){function b(a){var b=[];a.each(function(a,c){var d=$(c),f=d.parents(".oh_wrapper").data("scale")||1,h=REM_WIN_HEIGHT;1!==f&&(h=parseFloat(d.parents(".oh_wrapper").data("oh")));var f=d.data("rt")||0,h=parseFloat(f)+h,f=parseFloat(d.data("delay"))||0,m=parseFloat(d.data("time"))||1;b.push([d,0,h,m,f])});return b}var c=this.viewParent;a=function(){var a=[];c.find(".on_show").each(function(b,c){var g=$(c),l=g.parents(".oh_wrapper").data("scale")||1,f=parseFloat(g.data("oheight"))||
g.height(),f=transToRem(f+WIN_HEIGHT);g.removeClass("on_show");a.push(moveUp(g,-getCurrTy(g),f/l,.6,0))});return a}();$(".next_tip").hide();2==this.currentIndex?a.push(fadeIn($(".after_3_bg"),0,0,.6,0)):2>this.currentIndex&&$(".after_3_bg").css("opacity",0);8===this.currentIndex?$(".p1_f9_download").show():$(".p1_f9_download").hide();1!=this.currentIndex&&6!=this.currentIndex||$(".clock_wrapper").hide().css("opacity",0).removeClass("show33 show45 show70 show99");disShake();disableEvents();$.when.apply(this,
a).done(function(){var a=c.find("[class^=p1_f"+(this.currentIndex+1)+"]"),e=[];b(a).forEach(function(a){"fadein"==a[0].data("type")?e.push(fadeIn.apply(a[0],a).done(function(a){$(a).addClass("on_show")})):e.push(moveUp.apply(a[0],a).done(function(a){$(a).addClass("on_show")}))});var k=$.when.apply(this,e).done(function(){initEvents();$(".clock_wrapper").removeClass("show33 show45 show70 show99");switch(this.currentIndex){case 2:k.done(function(){$(".clock_wrapper").addClass("show33")});break;case 3:k.done(function(){$(".clock_wrapper").addClass("show45")});
break;case 4:k.done(function(){$(".clock_wrapper").addClass("show70")});break;case 5:k.done(function(){$(".clock_wrapper").addClass("show99")});break;case 8:initShake()}this.currentIndex<this.length-1&&$(".next_tip").show()}.bind(this));switch(this.currentIndex){case 2:case 3:case 4:case 5:$(".clock_wrapper").css("opacity",1).show()}}.bind(this))}};function changeTransform(a,b){$(a).css({transform:b,"-webkit-transform":b})}
function moveUp(a,b,c,d,e){function k(){if(h<f){var d;var e=h;d=1>(e/=f/2)?c/2*e*e+b:-c/2*(--e*(e-2)-1)+b;changeTransform(a,"translateY(-"+d+"rem)");window.requestAnimFrame(k)}else changeTransform(a,"translateY(-"+c+"rem)"),l.resolve(g);h++}var g=this;b=b||0;var l=$.Deferred(),f=1E3*d/(1E3/60)|0,h=0;setTimeout(k,1E3*(e||0));return l.promise()}
function fadeIn(a,b,c,d,e,k){function g(){m<h?(a.css({opacity:m/h}),window.requestAnimFrame(g)):f.resolve(l);m++}var l=this,f=$.Deferred(),h=1E3*d/(1E3/60)|0,m=0;a.css({opacity:0});changeTransform(a,"translateY(-"+c+"rem)");setTimeout(g,1E3*e);return f}function getCurrTy(a){return(a=a.css("transform")||a.css("-webkit-transform"))&&-1!=a.indexOf("translateY")?parseFloat(a.split("translateY(")[1]):0}document.addEventListener("touchmove",function(a){a.preventDefault()},!1);
function initEvents(){$(".main_container").on("swipeUp",function(){viewController.next()}).on("swipeDown",function(){viewController.prev()}).on("tap",".p1f2_pag",function(a){a.preventDefault();$(this).addClass("show");$(".p1_f2_tip").remove()}).on("tap",".next_btn",function(a){a.preventDefault();viewController.next()}).on("tap",".p1_f9_sharebtn",function(a){a.preventDefault();$("#share_masker").show()})}initEvents();function disableEvents(){$(".main_container").off("swipeUp swipeDown tap")}
window.onload=function(){endLoading()};var loadingOver=!1;function beginLoading(a){var b=0,c=setInterval(function(){loadingOver&&(clearInterval(c),b=100,setTimeout(function(){a&&a()},300));99>b&&b++;$("#loading").find(".process").html(b+"%")},70)}function endLoading(a){loadingOver=!0}beginLoading(function(){$("#loading").remove();viewController.init(0)});
function initShake(){$(window).one("shake",function(a){a.preventDefault();$("#shake_masker").show();disableEvents();setTimeout(function(){window.setRandomWantText();$("#shake_masker").hide();initShake();initEvents()},1E3)})}function disShake(){$(window).off("shake")}$(".p1_f9_download").on("tap",function(a){location.href=$(this).data("href")}).on("click",".close_btn",function(a){a.preventDefault();$(".p1_f9_download").remove();return!1});
$("#share_masker").on("tap",function(a){a.preventDefault();$(this).hide()});(function(){function a(){(e=!e)?(c.hide(),d.show()):(c.show(),d.hide());setTimeout(a,200)}var b=$(".p1_f1_txt"),c=b.find(".txt1"),d=b.find(".txt2"),e=!1;a()})();(function(){function a(){(e=!e)?(c.hide(),d.show()):(c.show(),d.hide());setTimeout(a,200)}var b=$(".p1_f2_txt"),c=b.find(".txt1"),d=b.find(".txt2"),e=!1;a()})();
(function(){function a(){b.eq(d).show().siblings().hide();d++;d>=c-1&&(d=0);setTimeout(a,d===c-1?300:100)}var b=$(".pag_foot").children(),c=b.length,d=0;a()})();$("#audio_wrapper").on("tap",function(a){$(this).toggleClass("playing");a=$("#bg_audio")[0];$(this).hasClass("playing")?a.play():a.pause()});try{$("#bg_audio")[0].play()}catch(a){}window.setRandomWantText=function(){var a="";window.defaultTexts&&(a=defaultTexts[Math.random()*defaultTexts.length|0]);a=a||"\u591a\u966a\u966a\u7236\u6bcd";$("#want_input").val(a)};
window.initUser=function(a,b){a=a||"sky";b=b||"";$(".nickname").html(a);b&&$(".head_img").attr("src",b)};window.getWantText=function(){return $("#want_input").val()};initUser();