console.log("connected");
var start = document.getElementById("start");
var timer = document.querySelector(".timer");
var questionCard = document.querySelector(".question");
var radioContainer = document.querySelector(".radio-container");
has_gameEnded = false;
start.addEventListener("click",function(){
    //Timer
    var count = 10;
    var index = 0;
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

    //Questions

    var quiz = [
        {
            question: "Which of the following keywords is used to define a variable in Javascript?",
            options: ["var","let","Both A and B","None of the above"]
        }
        //add questions here
    ];



    var currentQuestion = quiz[index];
    //displays the currrent question
    questionCard.textContent = currentQuestion.question;
 
    

});