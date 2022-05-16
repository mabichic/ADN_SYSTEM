import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DrivingData from './Modal/DrivingData';
import DrivingNegotiation from "./Modal/DrivingNegotiation";
import Settings from './Modal/Settings';
import useAudio from "./useAudio";

const Test = (serviceOpen) => {
    const [toggle] = useAudio("/audio/step1.wav");
    const [open, setOepn] = useState(false);
    useEffect(() => {
        toggle(true);
        setOepn(serviceOpen);
    }, [serviceOpen])
    const closeService = () =>{
        setOepn(false);
    }
    if (open) {
        console.log("여까진");
        return (
            <Box sx={{
                position: 'absolute', width: 800, height: 200, backgroundColor: 'gray', bottom: 60, right: 20
            }} >
                <Card style={{ cursor: "pointer" }} >
                    <CardMedia
                        component="img"
                        width="100%"
                        height="122"
                        image={"/images/tes.gif"}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" onClick={closeService}>
                            {"커넥티드카 접근이 감지되었습니다."}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        )
    }
}
const Bottom = () => {
    const [value, setValue] = useState(0);

    const [dnOpen, setDnOpen] = useState(false);
    const [stOpen, setStOpen] = useState(false);
    const [ddOpen, setDdOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const dnHandleOpen = () => {
        setDnOpen(true);
        setStOpen(false);
        setServiceOpen(false);
        setDdOpen(false);
    }
    const stHandleOpen = () =>{
        setDnOpen(false);
        setStOpen(true);
        setServiceOpen(false);
        setDdOpen(false);
    }
    const ddHandleOpen = () =>{
        setDnOpen(false);
        setStOpen(false);
        setServiceOpen(false);
        setDdOpen(true);
    }
    const dnHandleClose = () => setDnOpen(false);
    const stHadnleClose = () => setStOpen(false);
    const ddHadnleClose = () => setDdOpen(false); 
    const serviceHandleOpen = () => setServiceOpen(true);


    return (
        <>
            <BottomNavigation
                showLabels
            // value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            >
                <Box sx={{ flexGrow: 1 }} />
                <BottomNavigationAction label="협력주행" icon={<DirectionsCarIcon />} onClick={dnHandleOpen} />
                <BottomNavigationAction label="주행데이터" icon={<ReadMoreIcon />} onClick={ddHandleOpen}/>
                <BottomNavigationAction label="장치기능" icon={<SettingsIcon />} onClick={stHandleOpen} />
            </BottomNavigation>

            <DrivingNegotiation handleClose={dnHandleClose} open={dnOpen} serviceHandleOpen={serviceHandleOpen} />
            <Settings open={stOpen} handleClose={stHadnleClose} />
            <DrivingData open ={ddOpen} handleClose={ddHadnleClose} />
            {serviceOpen && <Test serviceOpen={serviceOpen} />}


        </>
    )
}

export default Bottom;