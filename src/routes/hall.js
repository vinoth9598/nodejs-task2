const express=require('express');

const hallcontroller=require('../controller/hall')
const router=express.Router();

router.get('/rooms/all',hallcontroller.getAllRomms);
router.post('/rooms/create',hallcontroller.createRoom);
router.post('/createbooking/:id',hallcontroller.bookingRoom);
router.get('/viewbooking',hallcontroller.getAllBookedRooms);
router.get('/customers',hallcontroller.getAllCustomers);
router.get('/customer/:name',hallcontroller.getBookingCountByCustomer);


module.exports=router