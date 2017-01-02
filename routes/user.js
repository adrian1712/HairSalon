// // NOTE:11 connect user page to basic refere to basic.js notes starting at 8
//
// var express = require ('express');
// var router = express.Router ();
// // NOTE:16 create and brig in the model/user.js
// var User = require ('../model/user.js');
// // var sg = require('sendgrid')('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');
//
//
// // NOTE: 12 this is the url to render the page
// router.get('/login', function(request,response) {
//     if (request.session.user) {
//         response.redirect ('/')
//     }
//     else {
//         response.render ('login')
//     }
// });
//
//
// // NOTE:12a this is the route need for my template to POST too.
// router.post ('/login', function (request, response){
//     // NOTE:12b test connection to template using
//     // response.send('looking for user')
//     // NOTE 12c then bring in the body parcer in  server.js to make the information being sent when pressing submit
//     User.findOne (request.body,
//         // NOTE:12d for login use mongoose 'findOne'login
//         function (error,result){
//             if (error) {
//                 console.error('UNABLE TO FIND USER!!!!!!!');
//                 console.error(error);
//             }
//             else if (!result) {
//                request.flash ('error', ' Your user name and pasword did not match');
//
//                // NOTE:12e redirect to log in page
//                response.redirect ('/user/login');
//             }
//             else{
//                 console.log('this is the fund user', result);
//                 // NOTE: 12f birng in express-sessions in server.js
//                 request.session.user = result
//                 console.log('this is the session data', request.session);
//                 response.redirect ('/');
//             }
//         }
//     )
// });
//
// // NOTE:14 bring in and install mongoose in server.js
//
//
// // NOTE: 15 the register to verify we are posting on the page
// router.get ('/register', function (request,response) {
//     // NOTE: 15a test connection
//     // response.send ('here')
//     // NOTE: 15b then render page
//     response.render ('register');
// });
//
// router.post ('/register', function(request, response){
//     // response.send('loooking for plase to save user')
//     var newUser = User ({
//         username: request.body.username,
//         password: request.body.password,
//         email: request.body.email
//     });
//     newUser.save(function (error) {
//         if (error) {
//             console.error('**** un able to save user');
//             console.error(error);
//         }
//         else {
//
//             var request = require ('request');
//             //Make a request to the Sendgrid API service.
//             request (
//                 //Pass the configuration object with where to make the call.
//                 {
//                     method: 'POST',
//                     url: 'https://api.sendgrid.com/v3/mail/send',
//                     headers: {
//                         'Authorization': 'Bearer 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',
//                         'Content-Type': 'application/json'
//                     },
//                     //The JSON or form data to send with the request.
//                     json: {
//                         //The email subject and recipients.
//                         personalizations: [
//                             {
//                                 //An array of objects so you can send to many different emails.
//                                 to: [
//                                     {
//                                         'email': 'aa17.1atq@gmail.com'
//                                     }
//                                 ],
//                                 subject: 'welcome to my domain'
//                             }
//                         ],
//                         from: {
//                             email: 'no-reply@bob.com'
//                         },
//                         content: [
//                             {
//                                 type: 'text/html',
//                                 value: 'thanks for registering'
//                             }
//                         ]
//                     }
//                 },
//                 function (error, httpResponse, body) {
//                     if (error) {
//                         console.log ('*** error: ', error);
//                     }
//
//                     console.log ('body: ', body);
//
//                     // console.log('user saved', request.body.username);
//                     response.redirect ('/user/login');
//                 }
//             )
//             // //.on is chained so you only need one ; at the end of all of the .on calls.
//             // .on ('response', function (requestReply) {      //Pass a callback for when the 'response' event is fired.
//             //     console.log ('request reply: ', requestReply.statusCode);
//             //     console.log ('request reply: ');
//             //     // response.send ('Email sent and user registered');
//             // })
//             // .on ('error', function() {
//             //     response.error ('There was a problem sending the registration email.');
//             // })
//         }
//     });
// });

//
// // router.post ('/register', function(request, response){
// //     // response.send('loooking for plase to save user')
// //     var newUser = User ({
// //         username: request.body.username,
// //         password: request.body.password,
// //         email: request.body.email
// //     });
// //     newUser.save(function (error) {
// //         if (error) {
// //             console.error('**** un able to save user');
// //             console.error(error);
// //         }
// //         else {
// //             var request = sg.emptyRequest({
// //                 method : 'POST',
// //                 path: '/v3/mail/send',
// //                 body: {
// //                     personalizations: [{
// //                         to: [{
// //                             email: 'aa17.1atq@gmail.com'
// //                         }],
// //                         subject: 'Hello World from the SendGrid Node.js Library!',
// //                     }]
// //                 },
// //                 from: {
// //                     email: 'test@example.com',
// //                 },
// //                 content: [{
// //                     type: 'text/plain',
// //                     value: 'Hello, Email',
// //                 }]
// //             })
// //             sg.API(request, function(error, response) {
// //                 if (error) {
// //                     console.log('Error response received');
// //                 }
// //             })
// //             console.log('user saved', request.body.username);
// //             response.redirect('/user/login')
// //         }
// //     });
// // });
// router.get ('/logout', function (request, response) {
//     request.session.destroy ();
//     console.log('session destroyed', request.session);
//     response.redirect ('/user/login')
// })
//
//
//
// module.exports = router
