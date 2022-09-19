import React, {useState} from 'react';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import Container from '@mui/material/Container';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {makeStyles} from '@mui/styles';
import { useHistory} from 'react-router-dom';
import ReservationsPage from './ReservationsPage';

const useStyles = makeStyles({
    field:{
        marginTop:20,
        marginBottom:20,
        display: 'block'
    }
})

export default function CreateReservation() {
    const history = useHistory()
    const classes = useStyles();
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [no_of_people, setNo_of_people] = useState(0)
    const [nameError, setNameError] = useState(false)
    const [mobileError, setMobileError] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setNameError(false)
        setMobileError(false)     

        if(name===''){
            setNameError(true)
        }
        if(mobile===0 || mobile===''){
            setMobileError(true)
        }
        if(name && mobile && no_of_people){

            axios.post("http://localhost:5000/reservations",
                {
                    user_name : name,
                    mobile_number : mobile,
                    no_of_people : no_of_people
                })
                .then(
                    (res)=>{
                        // console.log(res.status);
                        history.push("/")})
        }
        else(console.log("No Reservations Available try again Later!"))
    }

    return (
        <Container>
            <Typography
            variant="h4"
            color="secondary"
            align="center"
            >
            Create new Reservation
            </Typography>

            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField 
                onChange={(e)=>setName(e.target.value)}
                className={classes.field}
                label='Name for Reservation'
                variant='outlined'
                color='primary'
                fullWidth
                required 
                error={nameError}
                />
                <br /><br />
                <TextField 
                onChange={(e)=>setMobile(e.target.value)}
                className={classes.field}
                label='Mobile Number'
                variant='outlined'
                color='primary'
                fullWidth
                required 
                error={mobileError}
                />

                <br /><br />
                <FormControl className={classes.field}>
                <FormLabel>Select number of person's</FormLabel>
                    <RadioGroup value={no_of_people} onChange={(e) => setNo_of_people(e.target.value)}>
                        <FormControlLabel value="1" control={<Radio />} label="One"/>
                        <FormControlLabel value="2" control={<Radio />} label="Two"/>
                        <FormControlLabel value="3" control={<Radio/>} label="Three"/>
                        <FormControlLabel value="4" control={<Radio/>} label="Four"/>
                    </RadioGroup>
                </FormControl>

                <br /><br />

                <Button 
                type='submit' 
                align='center'
                variant='contained' 
                color ='secondary'
                endIcon={<ArrowCircleUpIcon />}
                >
                Submit
                </Button>

            </form>
        </Container>
    )
}