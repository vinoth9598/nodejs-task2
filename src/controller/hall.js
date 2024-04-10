let rooms=[
    {
        roomid:'R1',
        seatAvailable:'5',
        amenities:"tv,heater,washingmachine",
        priceperhr:"200"
    }
];

let bookings=[
    {
        cutomer:"vinoth",
        bookingdate:"10/02/2024",
        startTime:"10:00am",
        endTime:"9:30pm",
        roomid:"R1",
        status:"booked"
    }
];

let customers=[
    {
        name:"vinoth",
        bookings:{
            cutomer:"vinoth",
            bookingdate:"10/02/2024",
            startTime:"10:00am",
            endTime:"9:30pm",
            roomid:"R1",
            status:"booked"
        }
    }
];

// List all rooms and its details

const getAllRomms=(req,res)=>{
    res.send(
        {
            message:"Room data fetch successsfully",
            count:rooms.length,
            Roomlist:rooms
        }
    )
}

// creating room
const createRoom=(req,res)=>{
    const room=req.body;

    const idExists=rooms.find((el)=>el.roomid === room.roomid);
    if( idExists !== undefined){
        return res.status(400).send({message:"Room already exists."});

    }else{
        rooms.push(room);
        res.status(201).send({message:"Room created successfully"});
    }
}

// booking room

const bookingRoom=(req,res)=>{
    try{

        const {id}=req.params;
        let bookroom=req.body;
        let date=new Date();
        let dateFormat=date.toLocaleDateString();
        let idExists=rooms.find((el)=>el.roomid === room.roomid)
        
        if(idExists === undefined){
            return res.status(400).send({message:"Room doesnot exist.",RoomList:rooms});
        }

        let matchId=bookings.filter((b)=>b.roomid === id);

        if(matchId.length>0){
            let dateCheck=matchId.filter((m)=>{return m.bookingdate});
            if(dateCheck.length === 0){
                let newbooking={...bookroom,roomid:id,status:"booked",booked_on:dateFormat};
                bookings.push(newbooking);
                return res.status(201).send({message:"Room booked",Bookings:bookings,added:newbooking})

            }else{
                return res.status(400).send({message:"Room already booked for this date", Bookings:bookings});
            }
           
        }else{
            let newbooking = {...bookRoom, roomId:id, status:"booked"}
            bookings.push(newbooking);
            const customerdetails = customers.find(cust => 
              cust.name === newbooking.customer);
              if (customerdetails) {
                  customerdetails.bookings.push(newbooking);
              } else {
                  customers.push({ name:newbooking.customer,bookings:[newbooking]});
              }
            return res.status(201).send({message:"Room booked", Bookings:bookings, added:newbooking});

        }

    }catch(error){
            res.status(400).send({message:"Error booking room",error:error,data:bookings});
    }
}

// list all the booked room

const getAllBookedRooms=(req,res)=>{
    const bookedRooms=bookings.map(booking=>{
        const {roomid,status,customer,bookingdate,startTime,endTime}=booking;
        return (roomid,status,customer,bookingdate,startTime,endTime);
    });
    res.status(201).send(bookedRooms);
}

//List all the customers with booked data
const getAllCustomers=(req, res) => {
    const customerBookings = customers.map(customer => {
      const { name, bookings } = customer;
      const customerDetails = bookings.map(booking => {
        const { roomId, bookingDate, startTime, endTime } = booking;
        return { name, roomId, bookingDate, startTime, endTime };
      });
     
      return customerDetails;
    })
   
    res.send(customerBookings);
  }

// List how many times the user booked the room
 const getBookingCountByCustomer=(req, res) => {
    const { name } = req.params;
    const customer = customers.find(cust => cust.name === name);
    if (!customer) {
      res.status(404).send({ error: 'Customer not found' });
      return;
    }
    const customerBookings = customer.bookings.map(booking => {
      const { customer,roomId, startTime, endTime, status, bookingDate} = booking;
      return { customer, roomId, startTime, endTime, status, bookingDate};
    });
    res.send({
        count:customerBookings.length,
        customerBookings});
  }


module.exports={
    getAllRomms,
    createRoom,
    bookingRoom,
    getAllBookedRooms,
    getAllCustomers,
    getBookingCountByCustomer

}