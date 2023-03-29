console.log("connected")
var start = document.getElementById("start")
var timer = document.querySelector(".timer")
has_gameEnded = false;
start.addEventListener("click",function(){
    //Timer
    var count = 10;
    var h2El = document.createElement('h2');
    h2El.textContent = "Timer : " + count;
    h2El.setAttribute("style","padding-left:100px;")
    timer.appendChild(h2El);
    var countDown = setInterval(function(){
        if(count>0){
        count--;
        h2El.textContent = "Timer : " + count;
        }else{
            clearInterval(countDown);
            h2El.textContent = "Time's up!";
            has_gameEnded = true;
        }
    },1000);

  



});