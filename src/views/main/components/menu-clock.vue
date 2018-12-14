<style lang="less" scoped>
.clock-contain {
    position: absolute;
    bottom:50px;
    left:50px;
    width:90px;
    height:120px;
    color:#fff;
    text-align:center;
    .week{
        padding-top:5px;
        font-size:14px;
    };
    .clock-box{
        width: 90px;
        height: 90px;
        position: relative;
        bottom:0;
        #m-clock{
            width: 90px;
            height: 90px;
            /*background: radial-gradient(circle at 50% 50%,rebeccapurple,royalblue);*/
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border-radius: 50%;
        }
    }
}
</style>

<template>
    <div>
        <div class="clock-contain">
            <div class="clock-box">
                <div id="m-clock"></div>
            </div>
            <div class="week">{{menudate}}</div>
            <div class="week">{{menuweek}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menuClock',
    data() {
        return{
            menuweek:'',
            menudate: ''
        }
    },
    mounted() {
        //  clock
        let clock=document.getElementById("m-clock");
        let clockW = clock.offsetHeight
        draw();
        let time=new Date();
        let h=drawpointer(4,26,"#fff",time.getHours()*30+time.getMinutes()*6/12);
        let m=drawpointer(3,35,"#fff",time.getMinutes()*6);
        let s=drawpointer(2,35,"rgba(255,255,255,0.8)",time.getSeconds()*6);
        setInterval(function(){
            let time=new Date();
            h.style.transform="rotate("+(time.getHours()*30+time.getMinutes()*6/12)+"deg)";
            m.style.transform="rotate("+time.getMinutes()*6+"deg)";
            s.style.transform="rotate("+time.getSeconds()*6+"deg)"
        },1000);
        function draw(){
            let newdiv=document.createElement("div");
            newdiv.style.cssText="width:"+clockW+"px;height:"+clockW+"px;position:absolute;left:0;top:0;border-radius:50%;border:4px solid #fff"
            clock.appendChild(newdiv);
        }
        function drawpointer(w,h,b,d){
            let newdiv=document.createElement("div");
            //                中间的圆
            let newd=document.createElement("div");
            newd.style.cssText="width:8px;height:8px;border-radius:50%;background: radial-gradient(circle at 50% 50%,#fff,#fff);position:absolute;left:"+(clockW-8)/2+"px;top:"+(clockW-8)/2+"px;"
            newdiv.style.cssText="width:"+w+"px;height:"+h+"px;position:absolute;left:"+(clockW-w)/2+"px;top:"+(clockW/2-h)+"px;background:"+b+";transform:rotate("+d+"deg);transform-origin:center bottom;";
            clock.appendChild(newdiv);
            clock.appendChild(newd);
            return newdiv;
        };
        //  date
        let seperator1 = "-";
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let strDate = time.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        this.menudate = currentdate;
        //  星期
        let weekday=new Array(7)
        weekday[0]="星期天"
        weekday[1]="星期一"
        weekday[2]="星期二"
        weekday[3]="星期三"
        weekday[4]="星期四"
        weekday[5]="星期五"
        weekday[6]="星期六"
        this.menuweek = weekday[time.getDay()];
    }
};
</script>
