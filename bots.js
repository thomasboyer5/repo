'use strict';

/**
--!-- Manually configured bot
**/
var PiloteBot = {
  id: 'polite-bot',
  name: 'Polite bot',
  botMemory: {},
  ai: [{
    help: (function() {
      addMsgToChat('You can say hello in English, French or Spanish' , true);
      }),
    aiMemory: {
      greeted: false
    },
    action: 
    (function(str) {
      var wording = ['Hello', 'Hola', 'Bonjour'];

      if (wording.find(function(word) {
        return this.toUpperCase().includes(word.toUpperCase());
      }, str)) {
        var username = PiloteBot.botMemory.username || '';
        var msg = PiloteBot.ai[0].aiMemory.greeted ? 'We\'ve already greeted' : 'Hello ' + username + ', how are you ?';

        addMsgToChat(msg, true);

        if (username) {
        PiloteBot.ai[0].aiMemory.greeted = true;
        }
      }
    })
  }, {
    help: (function() {
      addMsgToChat('Type My name is [your name] and we will remember it' , true);
      }),
    action: 
    (function(str) {
      var wording = /(my name is )([A-z]+)\s*/i;
      if (wording.test(str)) {
        var username = wording.exec(str)[2];
        PiloteBot.botMemory.username = username;
        addMsgToChat('Thank you ' + username, true);
        document.querySelector('#username').textContent = username;
      }
    })
  }]
};

var BotCreator = {
  id: 'creator-bot',
  name: 'Polite bot',
  botMemory: {},
  ai: [{
    help: (function() {
      addMsgToChat('To create a bot, type create a bot [bot name]' , true);
      }),
    aiMemory: {
      greeted: false
    },
    action: 
    (function (str) {
      var wording = /(create a bot )([A-z]+)\s*/i;

      if (wording.find(function(word) {
        return this.toUpperCase().includes(word.toUpperCase());
      }, str)) {
        var username = PiloteBot.botMemory.username || '';
        var msg = PiloteBot.ai[0].aiMemory.greeted ? 'We\'ve already greeted' : 'Hello ' + username + ', how are you ?';

        addMsgToChat(msg, true);

        if (username) {
        PiloteBot.ai[0].aiMemory.greeted = true;
        }
      }
    })
  }]
}
