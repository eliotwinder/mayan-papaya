// var getQuestions = require('../models/trivia/triviaRoutes');
var unirest = require('unirest');

var getQuestions = function(callback){
  unirest.get("http://jservice.io/api/random?count=10") // changed to 100
    .header("Accept", "application/json")
    .end(function (result) {
      var triviaArr = [];
      // var parsed = JSON.parse(result);
      var collection = result.body;
      for(var i = 0; i < collection.length; i++){
        var trivia = {};
        trivia.id = collection[i].id;
        trivia.answer = collection[i].answer;
        trivia.question = collection[i].question;
        trivia.category = collection[i].category.title;
        trivia.value = collection[i].value;
        triviaArr.push(trivia);
    }
    callback(triviaArr);
  });
};

module.exports = function(app){
  var httpServer = require('http').Server(app);
  var io = require('socket.io')(httpServer);

  getQuestions(function(qs){
    var questions = qs;
    for (var i = 0; i < questions.length; i++) {
      questions[i].playersAttempted = [];
    }

    // Things to keep track of
    var gameObj = {
      players: [],
      questions: questions,
      maxNumQuestions: 10,
      questionNumber: -1,
      currQuest: function(){
        return this.questions[this.questionNumber];
      },
      prevQuest: function(){
        if (this.questionNumber === 0) {
          return null;
        } else {
          return this.questions[this.questionNumber - 1];
        }
      }
    };
  });

  var moveOnToNextQuestion = function() {
    gameObj.questionNumber++;
    if (gameObj.questionNumber === gameObj.maxNumQuestions) {
      // score the game
      data = {winner: winnerName, message: winnerName+"wins!"};
      io.emit('endGame', data);
    } else {
      io.emit('update', {
        players: gameObj.players,
        question: gameObj.currQuest().question,
        prevQuest: gameObj.prevQuest()
      });
    }
  };

  var handleClientOnConnection = function(socket) {

    socket.on('getUsername', function(data){
      socket.username = data.username;
      gameObj.players.push({username: socket.username, score: 0});
    });
    
    // Update everyone with the new player
    io.emit('update', {players: gameObj.players});
    
    // Start the game if there are 3 players
    if (numPlayers === 3) {
      io.emit('startGame');

      // moveOnToNextQuestion();
    }

    // A player answers
    socket.on('answer', function(input) {
      var answer = input.answer;
      var currQuest = gameObj.currQuest();
      var correctAnswer = currQuest.answer;
      var players = gameObj.players;

      if (currQuest.playersAttempted.indexOf(socket.username)) {
        
      //     player already attempte this question, so s/he cannot answer anymore
        data = {error: "You can only attempt a question once"};
        socket.emit('update', data);
        return;
      }

      // correct answer:
      if (answer === correctAnswer) {
        for (var i = 0; i < players; i++) {
          var player = players[i];
          if (player.username === socket.username){
            player.score += currQuest.value;
            currQuest.winner = socket.username;
            moveOnToNextQuestion();
            return;
          }          
        }
      } else {
        currQuest.playersAttempted.push(socket.username);
        if (players.length === currQuest.playersAttempted.length) {
          currQuest.winner = "nobody :(";
          moveOnToNextQuestion();
        }
      }

    });

    // What to do if a player disconnects?
    socket.on('disconnect', function() {
      //numPlayers--;
    });
  };

  io.on('connection', handleClientOnConnection);

};