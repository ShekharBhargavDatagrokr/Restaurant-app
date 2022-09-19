import React from 'react';
import { Card, IconButton, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';

export default function NoteCard({reservation, handleDelete}){
    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                action={
                    <IconButton onClick={() => handleDelete(reservation.mobile_number)}>
                    <DeleteOutlinedIcon />
                    </IconButton>
                }
                title={reservation.user_name}
                // subheader={"Mobile Number: "+reservation.mobile_number}
                />
                <CardContent>
                <Typography variant='body2' color="textSecondary">
                    {"Reservation ID : "+reservation.reservation_id}
                </Typography>
                <Typography variant='body2' color="textSecondary">
                    {"Table for "+reservation.no_of_people+" person"}
                </Typography>
                <Typography variant='body2' color="textSecondary">
                    {"Mobile Number: "+reservation.mobile_number}
                </Typography>
                <Typography variant='body2' color="textSecondary">
                    {"Time of reservation : "+Moment(reservation.time_of_reservation).format("LLL")}
                    {/* {"Time of reservation : "+Moment(reservation.time_of_reservation).format('do MMM YY, H:mm')} */}
                </Typography>
                </CardContent>
            </Card>
        </div>
    )
}