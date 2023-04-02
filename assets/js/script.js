//selectors
var start = document.getElementById("start");
var resetScores = document.getElementById("reset-scores")
var timer = document.querySelector(".timer");
var questionCard = document.querySelector(".question");
var radioContainer = document.querySelector(".radio-container");
has_gameEnded = false;
currentIndex = 0; //index that points to each question
var numCorrectAnswers = 0;
var nameInitials = []; 
var scores = []
var initial;
//Array of objects containing each question with its multiple option as array value and index to the correct answer
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
    
    
    //add more questions here
];



        var btnEl = document.createElement("button"); //submit button
        var count = 30; //timer start point in seconds
        var h2El = document.createElement('h2');
        h2El.setAttribute("style","padding-left:100px; font-family: cursive; font-size:200%;")
        timer.setAttribute("style","height:fit-content; width:fit-content; ")
        timer.appendChild(h2El);


//loops through Array of objects to display each questions and options
function displayQuestions(i){
    if(i<quiz.length && count>0){ 
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

        var choice = document.createElement("input");//radio buttons
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
        
        displayScore(); //end of array or timer reached 0  it displays score and end quiz
        saveScore();
        
        
    }   
}
//displaying result(score)
function displayScore(){
    questionCard.textContent = "";
    radioContainer.textContent = "";
    questionCard.textContent = "Correct Answers: "+ numCorrectAnswers+" out of "+quiz.length + " ("+Math.floor(numCorrectAnswers*100/quiz.length)+"%)"; // displays result also in percentage
    

}

//saves current score into local storage 
function saveScore(){
    // name initial input element when saving score
    var input = document.createElement("input");
    input.id = "initials";
    input.required = true;
    input.setAttribute("style","border-radius:10px; border-color: var(--theme); height:25px; margin:10px;text-align:center;")
   
    //name initial input label
    var labelEl = document.createElement("label");    
    labelEl.setAttribute("for","initials");    
    labelEl.style.margin = "10px";
    labelEl.textContent = "Enter your initials: ";

    //save score button
    var saveBtn = document.createElement("button");
    saveBtn.setAttribute("style","width:100px; margin:3%; background-color:var(--theme);font-size: 110%;color: white;box-shadow: 2px 5px 3px gray;border-radius:20px;margin: 3%;padding: 1%;height: 8%;text-align: center;")
    saveBtn.textContent = "Save";

    //appending score input form elements
    questionCard.appendChild(labelEl);
    questionCard.appendChild(input);
    questionCard.appendChild(saveBtn);
    
    //event listener for save score button
    saveBtn.addEventListener("click",function(){
    initial = input.value;                   
    scores.push(numCorrectAnswers);
    nameInitials.push(initial);

    //storing intital and score to local storage as key,value pair respectively
    localStorage.setItem(initial,numCorrectAnswers);        
    generateList();
        
    })
   
}

//renders a list geenerated freom local storage (initial name and score)
function generateList(){    
        questionCard.textContent = ""
        radioContainer.textContent = ""
        
         var scoreListCard = document.createElement("ol");  
        for (let i = 0; i < localStorage.length; i++) {
            var storedinital = localStorage.key(i); //grabs the key from local storage aka name initial
            var storedScore = localStorage.getItem(storedinital); //grabs value(score) from local storage

            var scoreListEl = document.createElement("li");
            scoreListEl.textContent =  storedinital+" ----------- "+storedScore;
            scoreListCard.appendChild(scoreListEl);

        }
  
        questionCard.appendChild(scoreListCard);
 
}

//click start event listener
start.addEventListener("click",function(){
    //Timer starts countdown as sonn as start is clicked
    currentIndex=0;
    count=30;
    radioContainer.textContent = "";
    questionCard.textContent = "";
    h2El.textContent = "Timer : " + count;
    
    has_gameEnded=false;

    //timer functionality
    var countDown = setInterval(function(){
        if(currentIndex == quiz.length){
            has_gameEnded = true;
        }

        if(count>0 && has_gameEnded==false){
        count--; //count decreases every second        
        h2El.textContent = "Timer : " + count; //countdown displayed
        }else if(count == 0){          
                clearInterval(countDown);
                
                h2El.textContent = "Time's up!";           
    
        }
    },1000);
    displayQuestions(currentIndex); //displays next qquestion at currentindex

});

resetScores.addEventListener("click",function(){
        localStorage.clear(); //clears the entire local storage
        generateList(); //shows a list whoch is empty hence scores are reset
        
    });
//submit button click event listener
btnEl.addEventListener('click',function(){   
    
    //selecting the checked radio button
    const selectedRadioButton = document.querySelector('input[type="radio"]:checked');
    if (selectedRadioButton) {
    const selectedAnswer = selectedRadioButton.value; //grabbing its value
    // Comparing selectedAnswer to the correct answer
    var correctIndex = quiz[currentIndex].correctAnswerIndex; //grabs the correct answer from (quiz) array of objects containg sub array that has index to the right answer
    if(selectedAnswer === quiz[currentIndex].options[correctIndex]){
        numCorrectAnswers+=1;
        
    
    }else{
        count-=5; //when incorrect timer decreases by 5 seconds
    }
    if(currentIndex == quiz.length || count==0){ //end ofd array reached and quiz is complete
        saveScore();
        
    }
        questionCard.innerHTML = ""; //clears space for the next question
        radioContainer.innerHTML = "";
        
        currentIndex++; //index now points to next question
        displayQuestions(currentIndex);

    
  
    }
});
 
 //Reset Scores event listener


    
    