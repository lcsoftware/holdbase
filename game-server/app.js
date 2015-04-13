var pomelo = require('pomelo'),
    mongoose = require('mongoose'),
    chalk = require('chalk');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'holdbase');

//app.loadConfig('mongo', app.getBase() + '/config/mongo.json');

// Bootstrap db connection
var db = mongoose.connect('mongodb://localhost:27017/holdbase', function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});


// app configuration
app.configure('production|development',  function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3
    });
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
