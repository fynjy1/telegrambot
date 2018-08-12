process.env.NTBA_FIX_319 = 1;

var TelegramBot = require('node-telegram-bot-api');

var token = '649209171:AAE9o3Q1bW5J2bSrplAjuSFUi6vwP6Wsqac';

var bot = new TelegramBot(token, {
	polling: true,
});

var notes = [];

	bot.onText(/\/напомни (.+) в (.+)/, function (msg, match) {
	  var userId = msg.from.id;
	  var text = match[1];
	  var time = match[2];

	  notes.push( { 'uid':userId, 'time':time, 'text':text } );

	  bot.sendMessage(userId, 'Отлично! Я обязательно напомню!');
	});

	setInterval(function(){
		for (var i = 0; i < notes.length; i++){
			var curDate = new Date().getHours() + ':' + new Date().getMinutes();
				if ( notes[i]['time'] == curDate ) {
					bot.sendMessage(notes[i]['uid'], 'НАПОМИНАЮ: '+ notes[i]['text'] + ' сейчас.');
					notes.splice(i,1);
				}
			}
	},1000);