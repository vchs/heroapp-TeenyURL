var url = require('url');
var idgen = require('idgen');
var DataAccessorFactory = require('../lib/DataAccessorFactory');

exports.register = function (app) {

    function validateUrl(inputUrl) {
        var protocol = url.parse(inputUrl).protocol;
        if (protocol == "http:" || protocol == "https:")
            return true;
        else
            return false;
    }

    app.post("/api/create", function (req, res) {
        var originalUrl = req.param('originalUrl'),
            expireAt = req.param('expireAt');
        
        console.log("originalUrl is: " + originalUrl);
        console.log("expireAt is: " + expireAt);

        // check the url
        if(validateUrl(originalUrl)) {
            var dataAccess = DataAccessorFactory.build;

            var keyGen = function(dataObject, callback){
                callback(null, idgen(4));
            };
            var newDataObject = {};
            newDataObject.originalUrl = originalUrl;
            newDataObject.expireAt = expireAt;

            /*dataAccess.create(newDataObject, keyGen, function(err, dataObject) {
               if (err != null) {
                   console.log(err);
                   res.send({"result": "Error", "message": "Server error."});
               } else {
                   res.send({"result": "OK", "key": dataObject.key});
               }
            });*/
            res.send({"result": "OK", "key": {"key":"abc"}.key});
        }
        else {
            res.send({"result": "Error", "message": "Invalid URL."});
        }
    });
};