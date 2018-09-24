//head 点击
(function(){
   var aLi=$('.head ul li');
   var oText=$('.head input');
   var arrText=[
       '例如：荷棠鱼坊烤鱼 或 樱花日本料理',
       '例如：荷棠鱼坊或日本',
       '例如：优惠',
       '例如：所有',
       '例如：视频'
   ];
    var iCur=0;
    oText.val(arrText[iCur]);
    aLi.each(function(index){
        $(this).click(function(){
            iCur=index;
            oText.val(arrText[iCur]);
            aLi.attr('class','grad');
            $(this).attr('class','active');
        })
    });
    oText.focus(function(){
        if($(this).val()==arrText[iCur]){
            $(this).val('');
        }
    });oText.blur(function(){
        if($(this).val()==''){
            $(this).val(arrText[iCur]);
        }
    });
})();

//滑动的文字
(function(){
    var $oOl=$('.head ol');
    var $oBTN=$('.BTN');
    var $Dt=$($oBTN,'dt');

    var $btnUp=$('#btnUp');
    var $btnDown=$('#btnDown');
    var arrData=[
        //<li><a href="##"><span>萱萱 </span><em>5分钟前 </em>写了一篇新文章：那些灿烂华美的瞬间…</a></li>
        {'name':'萱萱','time':'10','title':'写了一篇新文章：那些灿烂华美的瞬间…','url':'##'},
        {'name':'萱萱1','time':'10','title':'写了一篇新文章：那些灿烂华美的瞬间…','url':'##'},
        {'name':'萱萱2','time':'10','title':'写了一篇新文章：那些灿烂华美的瞬间…','url':'##'},
        {'name':'萱萱3','time':'10','title':'写了一篇新文章：那些灿烂华美的瞬间…','url':'##'},
        {'name':'萱萱4','time':'10','title':'写了一篇新文章：那些灿烂华美的瞬间…','url':'##'}
    ];
    var str='';
    var iH=0;
    var iNow=0;
    var tid=null;
    for(var i=0;i<arrData.length;i++){
        str +='<li><a href="'+arrData[i].url+'"><span>'+arrData[i].name+' &nbsp;</span><em>'+arrData[i].time+'分前</em>'+arrData[i].title+'</a></li>';
    }
    $oOl.html(str);
    iH=$oOl.find('li').height();
    $btnUp.click(function(){
         doMove(-1)
     });
    $btnDown.click(function(){
        doMove(1);
    });
    $oBTN.hover(function(){
        clearInterval(tid);
    },function(){
        autoPlay()
    });
    autoPlay();
     function autoPlay(){
         tid = setInterval(function(){
             doMove(-1);
         },3000)
     }
    function doMove(index){
        iNow +=index;
        if(Math.abs(iNow)>arrData.length-1) iNow = 0;
        if(iNow>0) iNow=-(arrData.length-1);
        $oOl.animate({'top':iH*iNow},2000,'easeInStrong');
    }
})();
//红铺和新铺的btn
(function(){
    var $hBtn=$('#hotbtn');
    var $ewBtn=$('#ewbtn');
    var $oOl1=$('.main .mid .ol1');
    var $oOl2=$('.main .mid .ol2');
    $hBtn.click(function(){
        $hBtn.addClass('grad');
        $ewBtn.removeClass('grad');
        $oOl1.show();
        $oOl2.hide();
        $('#sp1').addClass('sp1');
        $('#sp2').removeClass('sp1');
    });
    $ewBtn.click(function(){
        $ewBtn.addClass('grad');
        $hBtn.removeClass('grad');
        $oOl2.show();
        $oOl1.hide();
        $('#sp2').addClass('sp1');
        $('#sp1').removeClass('sp1');
    })
})();
//抢卷儿tab，advice，map
(function () {
    tab($('.tab_list ul'),$('.tab_list ol'),'click');
    tab($('.advice ul'),$('.advice ol'),'mouseover');
    tab($('.map ul'),$('.map ol'),'click');

    function tab(oList,oContent,ev){
        var aLi = oList.children();//按钮
        oContent.hide().eq(0).show();//文本
        //对按钮操作
        aLi.each(function(index){
            $(this).on(ev,function(){//回调函数，
                //console.log('1111111111');
                aLi.removeClass('active');
                $(this).addClass('active');
                oContent.hide().eq(index).show();
            })
        })
    }
})();
//BBS
(function () {
    var aImg=$('.BBS ul img');
    var aOl=$('.BBS ul ol');
    aOl.hover(function () {
        aImg.hide();
        aOl.css({width:318,height:30});
        $(this).css({width:318,height:70});
        var oImg=$(this).find('img');
        oImg.show();
    },function () {
        $(this).css({width:318,height:30})
        aImg.hide();
    })
    //alert(aLi)
})();
// 图片切换效果
(function () {
    var oFade = $('.recommend .img');
    var aUlLi = oFade.find('ul li');
    var aOlLi = oFade.find('ol li');
    var oP = oFade.find('p');
    var arrText = ['爸爸，你去哪里了?',"美女1","美女2"];
    var tid = null;
    var iNow = 0;
    fade();
    function fade(){
        // 共用函数
        aUlLi.each(function(index){
            if(iNow!=index){
                aUlLi.eq(index).fadeOut(1000).css('zIndex',1);
                aOlLi.eq(index).removeClass('active');
            }else{
                aUlLi.eq(index).fadeIn(1000).css('zIndex',2);
                aOlLi.eq(index).addClass('active')
            }
            oP.text(arrText[iNow]);
        })
    }
    aOlLi.click(function(){
        iNow=aOlLi.index(this);
        fade();
    });
    autoPlay();
    function autoPlay(){
        tid =  setInterval(function(){
            iNow++;
            iNow = iNow%3;
            fade()
        },3000)
    }
    oFade.hover(
        function(){
            clearInterval(tid)
        },
        function(){
            autoPlay();
        }
    )
})();
//日历
/*
(function (){
    var x = 0;
    var y = -40;
    $(".act a").mouseover(function(e){
        var tooltip = "<div id='tooltip'><img src='"+ this.href +"' alt='产品预览图'/><\/div>"; //创建 div 元素
        $("body").append(tooltip);	//把它追加到文档中
        $("#tooltip")
            .css({
                "top": (e.pageY+y) + "px",
                "left":  (e.pageX+x)  + "px"
            }).show("fast");
    }).mouseout(function(){
        $("#tooltip").remove();
    }).mousemove(function(e){
        $("#tooltip")
            .css({
                "top": (e.pageY+y) + "px",
                "left":  (e.pageX+x)  + "px"
            });
    });
})();
*/
(function(){
    var oImg=$('.day img');
    var oA=$('.day ul a');
    oA.hover(function(){
        oImg.show();
    },function(){
        oImg.hide();
    })
})();
//hot
(function () {
    var oUlLl=$('.hot ul li');
    var oOlLi=$('.hot ol li');
    var oP=$('.hot ol li p');
    oUlLl.each(function (index) {
        var  iNow=index-1;
        $(this).mouseover(function () {
           oOlLi.eq(iNow).css({zIndex:'1'})
        });
        oP.mouseleave( function () {
            oOlLi.eq(iNow).css({zIndex:'-1'})
        })
    })
})();