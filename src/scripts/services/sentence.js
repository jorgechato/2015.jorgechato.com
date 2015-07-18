angular.module("orggue")
.service("Sentence",function(){
  var question = [
    "Who is Jorge Chato?",
    "What is your love?",
    "What would you like do next?",
    "What is your favourite quote?",
    "What is your goal?",
    "What is your favourite sentence?",
    "Where did you work?",
    "What kind of man are you?",
    "What are you going to do tomorrow?"
  ];
  var answer = [
    "i'm a sporty developer",
    "do sport outside and javascript",
    "build awesome platforms, don't matter where",
    "without goals you can't score",
    "DO MORE",
    "WORK HARD",
    "Spain and currently working in Amsterdam",
    "the one who never give up",
    "learn something new"
  ];
  return {
    question : question,
    answer : answer,
    getRandomSentence : function(){
      var index = Math.floor(Math.random() * question.length);
      return [question[index], answer[index]];
    }
  };
});
