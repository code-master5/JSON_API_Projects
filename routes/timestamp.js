const express = require('express');
var timestampRouter = express.Router();

var monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];

timestampRouter.route('/:timestamp')
.all(function (request, response) {

    var timeStamp = request.params.timestamp;
    
    var timeObj = {
        "unix" : null,
        "natural": null
    };
    
    try {
        
        var naturalTime = timeStamp.toString().split(' ');
        
        if (naturalTime.length === 3) {
            
            var dt = new Date(timeStamp.toString());
            timeObj["natural"] = timeStamp.toString(); 
            timeObj["unix"] = dt.valueOf() / 1000;
            //response.write('Natural Date!');

        } else {
            throw new Error('Not Natural Date!'); 
        }

    } catch (err1) {
        try {
            
            var unixTime = Number(timeStamp);
            
            if (isNaN(unixTime))  { 
                throw new Error('Not Unix Timestamp!');
            } else {
                timeObj["unix"] = unixTime;
                
                var dt = new Date(unixTime * 1000);
                timeObj["natural"] = monthNames[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
            } 
        } catch (err2) {
            console.log(err2);
        }
    }

    response.send(timeObj);
});

module.exports = timestampRouter;

