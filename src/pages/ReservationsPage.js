import React, {useState, useEffect} from "react";
import axios from "axios";
import {Container} from "@mui/material";
import Masonry from 'react-masonry-css'
import NoteCard from "../components/NoteCard";

const ReservationsPage = () =>{
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/reservations")
        .then(data=>{setReservations(data.data)})
    },[]);

    console.log(reservations)
    
    const handleDelete = async (mobile_number) =>{
        await axios.delete("http://localhost:5000/reservations/"+mobile_number)

        const newReservations = reservations.filter(reservation => reservation.mobile_number != mobile_number)
        setReservations(newReservations)
    }

    const breakpoints = {
        default: 3,
        1100:2,
        700:1
      }

    return (
        <Container>
            <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            >
                {reservations.map(reservation => (
                    <div key = {reservation.reservation_id}>
                        <NoteCard reservation={reservation} handleDelete={handleDelete}/>
                    </div>
                ))}
            </Masonry>
        </Container>
    )
}

export default ReservationsPage