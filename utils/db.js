var mongoose = require('mongoose');

const mlabURI = 'mongodb://trinhchinchin:matkhaula1@ds113098.mlab.com:13098/backendapi'
const dbName = 'user-api';

const con = mongoose.connect(mlabURI, { useNewUrlParser: true }, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;