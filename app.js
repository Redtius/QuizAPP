const questions = [
  {
    lib: 'What is the output of the following code?\n\nconsole.log(typeof null);',
    answers: [
      { text: 'object', correct: true },
      { text: 'null', correct: false },
      { text: 'undefined', correct: false },
      { text: 'string', correct: false }
    ]
  },
  {
    lib: 'Which of the following is not a JavaScript framework or library?',
    answers: [
      { text: 'React', correct: false },
      { text: 'Angular', correct: false },
      { text: 'Vue', correct: false },
      { text: 'Java', correct: true }
    ]
  },
  {
    lib: 'What is the result of the following expression?\n\n"5" + 3',
    answers: [
      { text: '8', correct: false },
      { text: '53', correct: true },
      { text: 'NaN', correct: false },
      { text: '35', correct: false }
    ]
  },
  {
    lib: 'What is the result of the following expression?\n\nconsole.log(10 + "20")',
    code: 'console.log(10 + "20");',
    answers: [
      { text: '1020', correct: true },
      { text: '30', correct: false },
      { text: 'NaN', correct: false },
      { text: '68', correct: false }
    ]
  },
  {
    lib: 'Which of the following methods is used to add elements to the end of an array in JavaScript?',
    code: 'arr.push(element);',
    answers: [
      { text: 'push()', correct: true },
      { text: 'pop()', correct: false },
      { text: 'shift()', correct: false },
      { text: 'unshift()', correct: false }
    ]
  },
  {
    lib: 'What is the output of the following code snippet?\n\nconsole.log(5 == "5")',
    code: 'console.log(5 == "5");',
    answers: [
      { text: 'true', correct: true },
      { text: 'false', correct: false },
      { text: 'NaN', correct: false },
      { text: 'TypeError', correct: false }
    ]
  },
  {
    lib: 'What is the correct way to check if a variable is an array in JavaScript?',
    code: 'Array.isArray(variable);',
    answers: [
      { text: 'Array.isArray(variable)', correct: true },
      { text: 'typeof variable === "array"', correct: false },
      { text: 'variable.isArray()', correct: false },
      { text: 'variable instanceof Array', correct: false }
    ]
  },
  {
    lib: 'Which of the following is not a valid JavaScript loop?',
    code: 'foreach (item in array) { ... }',
    answers: [
      { text: 'foreach (item in array) { ... }', correct: true },
      { text: 'for (let i = 0; i < array.length; i++) { ... }', correct: false },
      { text: 'while (condition) { ... }', correct: false },
      { text: 'do { ... } while (condition)', correct: false }
    ]
  },
  {
    lib: 'What is the purpose of the setTimeout() function in JavaScript?',
    code: 'setTimeout(callback, delay);',
    answers: [
      { text: 'To schedule the execution of a function after a specified delay', correct: true },
      { text: 'To pause the execution of the code for a specified duration', correct: false },
      { text: 'To execute a function repeatedly at a specified interval', correct: false },
      { text: 'To handle asynchronous tasks in JavaScript', correct: false }
    ]
  }
];

let count=0;
let correctAnswers=0;

nextButton();

SetQuestion(questions[count])


function nextButton(){
  const nextButton = document.getElementById('Next');

  nextButton.addEventListener('click',()=>{
      nextStep();
  });
}

//Question Setup
function SetQuestion(question){
  const Libelle = document.getElementById('Question');

  Libelle.textContent=question.lib;

  disableNext();

  mapAnswers(question);

}

//this function puts the answers in there places
function mapAnswers(question){
  question.answers.map((answer)=>{
      const parent = document.getElementById('Answers');

      const Row = document.createElement('tr');

      Row.classList.add('flex','w-full');

      parent.appendChild(Row);

      const Answer=document.createElement('button');

      Answer.textContent=answer.text;

      Answer.classList.add(
        'border-2',
        'p-3',
        'my-5',
        'w-full',
        'text-start',
        'border-slate-800',
        'bg-white',
        'rounded-xl',
        'hover:bg-slate-800',
        'hover:text-white',
        'transition',
        'hover:ease-in-out',
        'duration-500'
      );

      if(answer.correct) 
      Answer.classList.add('correct');

      Answer.addEventListener('click',()=>{
        selectAnswer(Answer,answer.correct);
        disablebuttons(parent);
        enableNext();
      });

      Row.appendChild(Answer);   

  });
}

//selects the answer you clicked on
function selectAnswer(answer,isCorrect){
  if(!isCorrect){
    answer.classList.add('bg-red-400')
  }
  else correctAnswers++;
  highlightCorrect();
  
}

//highlights the correct response after answering
function highlightCorrect(){
  const correctAnswer=document.getElementsByClassName('correct');
  correctAnswer[0].classList.add('bg-green-400');
};

// disables buttons
function disablebuttons(parent){
  const children = parent.querySelectorAll('button');
  children.forEach(button => {
    button.setAttribute('disabled','disabled');
    button.classList.remove('hover:bg-slate-800',
    'hover:text-white',
    'transition',
    'hover:ease-in-out',
    'duration-500')
  });
}

// enables the Next Button
function enableNext(){
  const nextButton=document.getElementById('Next');
  nextButton.removeAttribute('disabled');
  nextButton.classList.add('hover:text-slate-800','hover:bg-white','transition',
  'hover:ease-in-out',
  'duration-500');
}

// disables the Next Button
function disableNext(){
  const nextButton=document.getElementById('Next');
  nextButton.setAttribute('disabled','disabled');
  nextButton.classList.remove('hover:text-slate-800','hover:bg-white')
}

// redirects you to the next question
function nextQuestion(){
  removeAnswers();

  SetQuestion(questions[count]);
}

function removeAnswers(){
  const Answers = document.getElementById('Answers');
  const childrens = Answers.querySelectorAll('tr');

  childrens.forEach(children=>{
    Answers.removeChild(children);
  });
}

function showResult(){
// remove the Next Button
  const nextButton = document.getElementById('Next');

  nextButton.classList.add('hidden');

// remove answers
  removeAnswers();

// remove the question
  const question = document.getElementById('Question');

  question.classList.add('hidden');

// Create the result

  const result = document.createElement('div');

  result.textContent='You Got '+correctAnswers+'/'+questions.length+'!';

  result.classList.add('text-xl','text-center')

// Add the result
  const container = document.getElementsByTagName('tbody');

  container[0].appendChild(result);

}

// sends you to the Next Step
function nextStep(){
  count++;
  if(count<questions.length)
  {
      nextQuestion();
  }
  else{
      showResult();
  }
}