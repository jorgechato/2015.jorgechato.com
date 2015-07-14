angular.module("orggue")
.service("Sentence",function(){
  var sentences = {
    "Who is Jorge Chato?" : "i'm a sporty developer",
    "What is your love?" : "do sport outside and javascript",
    "What would you like do next?" : "build awesome platforms, don't matter where",
    "What is your favourite quote?" : "without goals you can't score",
    "What is your goal?" : "DO MORE",
    "What is your favourite sentence?" : "WORK HARD",
    "Where did you work?" : "Spain and currently working in Amsterdam",
    "What kind of man are you?" : "the one who never give up",
    "What are you going to do tomorrow?" : "learn something new"
  };
  return {
    sentences : sentences,
    getRandomSentence : function(){
      var index = Math.floor(Math.random() * sentences.length);
      return sentences[index];
    }
  };
});
