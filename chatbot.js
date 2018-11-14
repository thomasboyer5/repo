'use strict'


/**
--!-- Bot class declaration
**/
var Bot = function Bot (model) {
  this.id = model.id;
  this.name = model.name;
  this.ai = model.ai;
};

/**
--!-- Chat class declaration
**/
var Chat = function Chat() {
  this.messages = [];
  this.idIterator = 0;
  this.Bots = [];
};

/**
--!-- Add a bot to the list of bots
**/
Chat.prototype.addActionBot = function (bot){
  var bot = new BotModel();
  bot.id = this.idIterator;
  bot.name = 'test';
  bot.ai = botAction;
  this.Bots.push(bot);
}

/**
--!-- When the user press send, run Chat.sendMessage 
**/
Chat.prototype.onClickButtonSendMessage = function() {
  document.querySelector('#send-button').addEventListener('click', function() {
    this.sendMessage(document.querySelector('#input-message').value);
  }.bind(this));
};

Chat.prototype.onEnterKeySendMessage = function() {
  document.querySelector('#input-message').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      this.sendMessage(document.querySelector('#input-message').value);
    }
  }.bind(this));
};

/**
--!-- Main logic for message sending : 
- Run addMsgToChat to display the message
- Run getBotsReaction to see if the message triggers any bots
- add the message to the list of messages
- Locally store the message
**/
Chat.prototype.sendMessage = function (message) {
  var el = document.querySelector('#display-message');

  if (message != ''){
    addMsgToChat(message);
    this.getBotsReaction(message);
    document.querySelector('#input-message').value = '';
  }
}

/**
--!-- Display the message in the HTML
**/
var addMsgToChat = function(message, bot = false) {
  var el = document.querySelector('#display-messages');
  var messageHTML = document.createElement('div');

  if (!bot){
    messageHTML.className = 'col-md-4 ml-auto text-center p-2 rounded bg-primary border';
  }
  else {
    messageHTML.className = 'col-md-4 text-center p-2 rounded bg-success border';
  }

  messageHTML.textContent = message;
  el.appendChild(messageHTML);
  el.scrollTop = el.scrollHeight;
};




/**
--!-- Check if the message triggers any bots reaction
**/
Chat.prototype.getBotsReaction = function(message) {
  this.Bots.forEach(function(bot){

    bot.ai.forEach(function(ai) {
      ai.action(message);
    });

  });
}

/**
  --!-- Function creating the header with the correct information
**/

Chat.prototype.headerImpl = function() {
  var doc = document.querySelector('#user-bot-list');

  this.Bots.forEach(function(bot) {
    var doc = document.querySelector('#user-bot-list');

    var list = document.createElement('li');
    list.className = "nav-item active";
    list.id = bot.id;


    var a = document.createElement('a');
    a.className = 'nav-link';
    a.href = '#';
    a.textContent = bot.name;
    a.addEventListener('click', function() {
      bot.ai.forEach(function(ai) {
        ai.help();
      })
    });

    doc.appendChild(list.appendChild(a));
  }.bind(this));

  document.querySelector('#home').addEventListener('click', this.reinitChatDisplay);
};

Chat.prototype.reinitChatDisplay = function() {
  var display = document.querySelector('#display-messages');

  display.innerHTML = '';
  addMsgToChat('Hello', true);
}

/**
--!-- Start the app
**/
Chat.prototype.run = function() {
  this.Bots.push(PiloteBot);

  this.onClickButtonSendMessage();
  this.onEnterKeySendMessage();
  this.headerImpl();
};

var test = new Chat();
test.run();
