const express = require('express');
const app = express();
const pool = require('./db')

let port = process.env.PORT;
if(port == null || port == "") {
 port = 5000;
}

let table_for_four = 10;
let table_for_two = 10;

app.use(express.json()) // -> req.body

//GET ALL RESERVATIONS
app.get("/reservations", async (req, res) =>{
    try {
        const allReservations = await pool.query("SELECT * FROM restaurant_table");
        res.json(allReservations.rows)
    } catch (error) {
        console.log(error.message)
    }
})

//GET A RESERVATION
app.get("/reservations/:id", async (req, res) => {
    try {
        const {id} =req.params
        const reservation = await pool.query("SELECT * FROM restaurant_table WHERE reservation_id = $1", [id])
        res.json(reservation.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//CRAETE A RESERVATION
app.post('/reservations',async (req, res) =>{
    try {
        const content = req.body;
        user_name=content.user_name;
        mobile_number=content.mobile_number;
        no_of_people=content.no_of_people;
        // time_of_reservation=content.time_of_reservation

        if(no_of_people<=2 && table_for_two != 0){
            const newReservation = await pool.query(
                "INSERT INTO restaurant_table(user_name, mobile_number, no_of_people) VALUES($1,$2,$3) RETURNING *",
                [user_name,mobile_number,no_of_people]
            )
            // res.json(newReservation.rows);
            res.sendStatus(200)
            table_for_two = table_for_two-1;
        }
        else if(no_of_people>=3 && no_of_people <=4 && table_for_four != 0){
            const newReservation = await pool.query(
                "INSERT INTO restaurant_table(user_name, mobile_number, no_of_people) VALUES($1,$2,$3) RETURNING *",
                [user_name,mobile_number,no_of_people]
            )
            // res.status(200).json(newReservation.rows);
            res.sendStatus(200)
            // res.status(200).send("booked");
            table_for_four = table_for_four-1;
        }
        else{
            // res.json("No reservations available!");
            res.sendStatus(500)
        }

    } catch (error) {
        console.error(error.message);
    }
})

//UPDATE A RESERVATION
app.put('/reservations/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const content = req.body;
        no_of_people = content.no_of_people;
        
        const updateReservation = await pool.query(
            "UPDATE restaurant_table SET no_of_people = $1 WHERE reservation_id = $2",
            [no_of_people, id]);
        // res.json('Reservation was Updated!');
        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
    }
})

//DELETE A RESERVATION
app.delete('/reservations/:mobile_number', async (req, res) =>{
    try {
        const {mobile_number} = req.params;
        const content = req.body;
        no_of_people = content.no_of_people;

        if(no_of_people <=2){
            table_for_two = table_for_two+1;
        }else{
            table_for_four = table_for_four+1;
        }

        const deleteReservation = await pool.query("DELETE FROM restaurant_table WHERE mobile_number =$1",[mobile_number])
        // res.json('Reservation was successfully deleted')
        
        res.sendStatus(200)
    } catch (error) {
     console.error(error.message)   
    }
})

app.listen(port, ()=> {
    console.log("server started successfully on port "+port)
});

// {
//     "user_name": "Shekhar",
//     "mobile_number": 1234567890,
//     "no_of_people": 4,
// }