var express = require ('express');
var router = express.Router ();

var User = require ('../../model/user.js');

router.get ('/register', function (request,response) {
    response.render ('user/register');
});

router.post ('/register', function(request, response){
    // response.send('loooking for plase to save user')
    var newUser = User (request.body);
    newUser.save(function (error) {
        if (error) {
            console.error('**** un able to save user');
            console.error(error);
        }
        else {

            var request = require ('request');
            //Make a request to the Sendgrid API service.
            request (
                //Pass the configuration object with where to make the call.
                {
                    method: 'POST',
                    url: 'https://api.sendgrid.com/v3/mail/send',
                    headers: {
                        'Authorization': 'Bearer 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',
                        'Content-Type': 'application/json'
                    },
                    //The JSON or form data to send with the request.
                    json: {
                        //The email subject and recipients.
                        personalizations: [
                            {
                                //An array of objects so you can send to many different emails.
                                to: [
                                    {
                                        'email': 'aa17.1atq@gmail.com'
                                    }
                                ],
                                subject: 'welcome to my domain'
                            }
                        ],
                        from: {
                            email: 'no-reply@bob.com'
                        },
                        content: [
                            {
                                type: 'text/html',
                                value: 'thanks for registering'
                            }
                        ]
                    }
                },
                function (error, httpResponse, body) {
                    if (error) {
                        console.log ('*** error: ', error);
                    }

                    console.log ('body: ', body);

                    // console.log('user saved', request.body.username);
                    response.redirect ('/login');
                }
            )
            // //.on is chained so you only need one ; at the end of all of the .on calls.
            // .on ('response', function (requestReply) {      //Pass a callback for when the 'response' event is fired.
            //     console.log ('request reply: ', requestReply.statusCode);
            //     console.log ('request reply: ');
            //     // response.send ('Email sent and user registered');
            // })
            // .on ('error', function() {
            //     response.error ('There was a problem sending the registration email.');
            // })
        }
    });
});


router.get('/login', function(request,response) {
    if (request.session.user) {
        response.redirect ('/')
    }
    else {
        response.render ('user/login')
    }
});


router.post ('/login', function (request, response){
    User.findOne (request.body,
        function (error,result){
            if (error) {
                console.error('UNABLE TO FIND USER!!!!!!!');
                console.error(error);
            }
            else if (!result) {
               request.flash ('error', ' Your user name and pasword did not match');
               response.redirect ('/login');
            }
            else{
                console.log('this is the fund user', result);
                // NOTE: 12f birng in express-sessions in server.js
                request.session.user = result
                console.log('this is the session data', request.session);
                response.redirect ('/');
            }
        }
    )
});

router.get ('/logout', function (request, response) {
    request.session.destroy ();
    console.log('session destroyed', request.session);
    response.redirect ('/login')
})


module.exports = router
