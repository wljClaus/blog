$(function () {
    var index=0,
        timer=null;
    //清除定时器
    $('.main').mouseover(function () {
        if(timer)   clearInterval(timer);
    })
    //间歇调用定时器
    jQuery('.main').mouseout(function () {
        timer = setInterval(function () {
            index++;
            if (index >= $('.banner-slide').length){
                index = 0;
            }
            xxx();
        },1000)
    })
    $('.main').mouseout();
    //小圆点点击事件
    $('span').click(function () {
        index = $(this).index();
        xxx()
    })
    //点击上下图标进行
    $('.button1').click(function () {
        index--;
        if (index < 0) index = $('.banner-slide').length - 1;
        xxx();
    })
    $('.button2').click(function () {
        index++;
        if (index>=$('.banner-slide').length){
            index = 0;
        }
        xxx();
    })
    //图片轮播
    function xxx() {
        $('.banner-slide').eq(index).addClass('slide-active')
            .parent().siblings().children().removeClass('slide-active');

        $('span').eq(index).addClass('active')
            .siblings().removeClass('active');
    }

})