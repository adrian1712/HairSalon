var express = require ('express');
var router = express.Router ();
// NOTE: 16
var Appointment = require ('../model/calendar.js');


// NOTE: 12 making first connection
// router.get ('/', function (request, response) {
//     // NOTE: 12a create a post in  first then add the find to post items
//     Appointment.find ({}, function(error,result) {
//         if (error) {
//             console.log('***error loading the profducts');
//         }
//         else {
//             console.log('results: ', result);
//             response.render ('calendar/list', {
//                 data: {
//                     appointmentList: result
//                 }
//             });
//         }
//     })
// })

router.get ('/', function (request, response) {
    // NOTE: 12a create a post in  first then add the find to post items

    var filter = {};
    console.log('this is the date', request.body.date);
    if (request.body.date) {
        filter.date = request.body.date;
    }
    Appointment.find (filter).sort('date').sort('time').exec(function(error,result) {
        if (error) {
            console.log('***error loading the profducts');
        }
        else {
            console.log('results: ', result);
            response.render ('calendar/list', {
                data: {
                    appointmentList: result
                }
            });
        }
    })
})



// NOTE: 13 setting the connection to the create page
router.get ('/create', function (request, response) {
    response.render('calendar/edit', {
        // NOTE: This data is injected into the view page tittle
        data: {
            title: 'Create Appointment',
            method: 'POST'
        }
    })
})
// NOTE:14 making connectiion to save the information
router.post('/', function(request, response) {
    // NOTE:14 the appointment is made using body information
    // NOTE: appointment is defined in the model
    var newAppointment = Appointment (request.body);

    newAppointment.save (function(error){
        if (error) {
            var errorMessage = 'canot create appointment';
            console.log('error: ') + errorMessage;
            request.send(errorMessage)
        }
        else {
            response.redirect ('./create');
        }
    })
})
// NOTE: this is were we get the id and display it on the view page by it self
router.get('/:id', function(request, response){
    var appointmentId = request.params.id
    // NOTE: will need to find by id
    Appointment.findById (appointmentId, function (error, result) {
        if (error){
            console.log('***error finding ', + appointmentId);
            response.send('something went wro***ng')
        }
        else {
            response.render ('calendar/view', {
                data: {
                    appointment:result
                }
            })
        }
    })
})
// NOTE: this will display the appointment and alow to make the changes before submiting
router.get('/:id/edit', function(request, response){
    var appointmentId = request.params.id
    // NOTE: will need to find by id
    Appointment.findById (appointmentId, function (error, result) {
        if (error){
            console.log('***error finding ', + appointmentId);
            response.send('something went wrong')
        }
        else {
            response.render ('calendar/edit', {
                data: {
                    title: 'Edit Appointment',
                    method: 'PUT',
                    appointment: result
                }
            })
        }
    })
})
// NOTE:This is the route to put the changes made to the appointment and save them
router.put ('/:id', function (request, response) {
    var appointmentId = request.params.id
        Appointment.findByIdAndUpdate(appointmentId,request.body,function(error,result) {
            if (error){
                console.log('can not update appointment');
            }
            else{
                response.redirect('/calendar/' + appointmentId)
            }
        }
    )
})
// NOTE: This is the route that is going to be used to get the id to be deleted
router.get('/:id/delete', function(request, response) {
    var appointmentId = request.params.id
    Appointment.findByIdAndRemove(appointmentId, function(error,result) {
        if (error) {
            console.log('id could not be deleted');
        }
        else{
            response.redirect('/calendar')
        }
    })
})
// NOTE: This is the route that is going to be used to Delete the appointment





module.exports = router
