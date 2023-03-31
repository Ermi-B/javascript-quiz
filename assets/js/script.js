var start = document.getElementById("start");
var timer = document.querySelector(".timer");
var questionCard = document.querySelector(".question");
var radioContainer = document.querySelector(".radio-container");
has_gameEnded = false;
currentIndex = 0;
var numCorrectAnswers = 0;
var nameInitial;
quiz = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        options: ["var","let","Both A and B","None of the above"],
        correctAnswerIndex: 2 // index of the correct answer in options Array
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        options: ["getElementsbyId()","console.log()","Both A and B","None of the above"],
        correctAnswerIndex: 0 // index of the correct answer in options
    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        options: ["stringfy()","parse()","convert()","None of the above"],
        correctAnswerIndex: 0 // index of the correct answer in options
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        options: ["const","var","let","constant"],
        correctAnswerIndex: 0 // index of the correct answer in options
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        options: ["document.write()","console.log()","window.alert()","All of the above"],
        correctAnswerIndex: 3 // index of the correct answer in options
    },
    {
        question: "What is the output of the following code snippet? NaN === NaN",
        options: ["true","false","undefined","Error"],
        correctAnswerIndex: 1 // index of the correct answer in options
    },
    {
        question: " Which built-in method returns the string representation of the number's value?",
        options: ["toValue()","ToNumber()","toString()","None of the above"],
        correctAnswerIndex: 2 // index of the correct answer in options
    },
    
    
    //add questions here
];





var btnEl = document.createElement("button"); //submit button making it global to be able to create event listener for itself
var count = 1; //timer start point in seconds
var h2El = document.createElement('h2');
h2El.textContent = "Timer : " + count;
h2El.setAttribute("style","padding-left:100px; font-family: cursive; font-size:200%;")
timer.setAttribute("style","height:fit-content; width:fit-content; ")
timer.appendChild(h2El);

function displayQuestions(i){
    if(i<quiz.length){ 
        var currentQuestion = quiz[i];
        
        //displays the currrent question
        questionCard.textContent = currentQuestion.question;        
        
        currentQuestion.options.forEach(option => {
        //displays each option as choice using radio buttons        
        var label = document.createElement("label");
        label. textContent = option;
        label.setAttribute("for",option);       
        label.className = 'radio';
        label.setAttribute('style','display:inline-flex; align-items:center; cursor:pointer; margin-right:15px; padding:3px; margin-top:10px;')
       
        var brEl = document.createElement("br"); //break line
        radioContainer.appendChild(brEl);

        var choice = document.createElement("input");
        choice.type = 'radio';
        choice.value = option;
        choice.name = 'choice';
        choice.id = option;
        choice.setAttribute('style','display:inline-flex; align-items:center; cursor:pointer; margin-right:15px')
        radioContainer.appendChild(choice);
        radioContainer.appendChild(label);
        radioContainer.appendChild(brEl);
        questionCard.appendChild(radioContainer);    
        
        btnEl.textContent = "Submit";
        btnEl.type = "submit";
        btnEl.className = "submitBtn";
        btnEl.setAttribute("style","width:100px; margin:3%; background-color:var(--theme);font-size: 110%;color: white;box-shadow: 2px 5px 3px gray;border-radius:20px;margin: 3%;padding: 1%;height: 8%;text-align: center;")
        questionCard.appendChild(btnEl);

        });
    }else{
        console.log("end of questions");
        console.log("correct answers",numCorrectAnswers)
        console.log("Total questions",quiz.length)
        displayScore();
    }   
}
function displayScore(){
    questionCard.textContent = "";
    radioContainer.textContent = "";
    questionCard.textContent = "Correct Answers: "+ numCorrectAnswers+" out of "+quiz.length + " ("+Math.floor(numCorrectAnswers*100/quiz.length)+"%)";
    

}
function saveScore(){
    //initial input element
    var input = document.createElement("input");
    input.id = "initials";
    input.setAttribute("style","border-radius:10px; border-color: var(--theme); height:25px; margin:10px;text-align:center;")
   
    //initial input label
    var labelEl = document.createElement("label");    
    labelEl.setAttribute("for","initials");    
    labelEl.style.margin = "10px";
    labelEl.textContent = "Enter your initials: ";

    //save score button
    var saveBtn = document.createElement("button");
    saveBtn.setAttribute("style","width:100px; margin:3%; background-color:var(--theme);font-size: 110%;color: white;box-shadow: 2px 5px 3px gray;border-radius:20px;margin: 3%;padding: 1%;height: 8%;text-align: center;")
    saveBtn.textContent = "Save";
    //appending score saving form elements
    questionCard.appendChild(labelEl);
    questionCard.appendChild(input);
    questionCard.appendChild(saveBtn);
    
    saveBtn.addEventListener("click",function(){
        nameInitial = input.value;
        console.log(nameInitial);
        generateList();
    })

   
}
function generateList(){
    
        questionCard.textContent = ""
        radioContainer.textContent = ""
        var scoreListCard = document.createElement("ol");   
        var scoreListEl = document.createElement("li");
        scoreListEl.textContent = nameInitial +" ----------- "+numCorrectAnswers;

   


    scoreListCard.appendChild(scoreListEl);
    questionCard.appendChild(scoreListCard);
}

//click start event listener
start.addEventListener("click",function(){
    //Timer  
    radioContainer.textContent = "";
    questionCard.textContent = "";
    
    var countDown = setInterval(function(){
        if(count>0 && has_gameEnded==false){
        count--;
        h2El.textContent = "Timer : " + count;
        }else{
            clearInterval(countDown);
            if(count == 0){
                h2El.textContent = "Time's up!";
                displayScore();
                saveScore();
                
                
            }
            has_gameEnded = true;
        }
    },1000);
    displayQuestions(currentIndex);

});

//submit button click event listener
btnEl.addEventListener('click',function(){
    
    
    
    const selectedRadioButton = document.querySelector('input[type="radio"]:checked');
    if (selectedRadioButton) {
    const selectedAnswer = selectedRadioButton.value;
    console.log(selectedAnswer)
    // Comparing selectedAnswer to the correct answer
    var correctIndex = quiz[currentIndex].correctAnswerIndex;
    if(selectedAnswer === quiz[currentIndex].options[correctIndex]){
        console.log('correct');
        numCorrectAnswers+=1;
        count+=5;
    
    }else{
            console.log('wrong');
            count-=5;
            
        }
        questionCard.innerHTML = "";
        radioContainer.innerHTML = "";
        
        currentIndex++;
        displayQuestions(currentIndex);
    if(currentIndex == quiz.length){
        saveScore();
        has_gameEnded = true;
    }
        
       
    }
});
    

    
    
    
    
    
    