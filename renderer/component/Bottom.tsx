import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DrivingData from './Modal/DrivingData';
import DrivingNegotiation from "./Modal/DrivingNegotiation";
import Settings from './Modal/Settings';

const Test = ({ serviceOpen, setServiceOpen }) => {
    // const [toggle] = useAudio("/audio/step1.wav");
    // const [open, setOepn] = useState(false);
    const [step, setStep] = useState(0);
    const stepText = ['BSM 방송을 시작합니다.', '커넥티드카 접근이 감지되었습니다.', '양보를 요청합니다', '커넥티크카 접근이 감지되었습니다.', '운행상태로 복귀합니다']
    const stepImg = ["/images/class1.gif", "/images/classA-1.gif", "/images/step3.png", "/images/classA-1.gif",]
    useEffect(() => {
        // toggle(true);
        setServiceOpen(serviceOpen);
    }, [serviceOpen])
    const closeService = () => {
        setServiceOpen(false);
    }
    const clickEvt = () => {
        setServiceOpen(false);
        if (step === 4) {
            setServiceOpen(false);
        }
        setStep((value) => value + 1);
    }
    if (serviceOpen) {
        return (
            <Box sx={{
                position: 'absolute', width: 495, height: '100%', backgroundColor: 'gray', bottom: 55, right: 0
            }} >
                <Card style={{ cursor: "pointer" }} >
                    <CardMedia
                        component="img"
                        width="100%"
                        height="100%"
                        image={stepImg[step]}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" onClick={clickEvt}>
                            {/* {stepText[step]} */}
                            주행의도 IMG
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
    const stHandleOpen = () => {
        setDnOpen(false);
        setStOpen(true);
        setServiceOpen(false);
        setDdOpen(false);
    }
    const ddHandleOpen = () => {
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
                sx={{
                    backgroundImage: "linear-gradient(to bottom, #232E43, #141C2A)",
                }}
            // value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            >
                <Box sx={{ flexGrow: 1 }} />
                {/* <BottomNavigationAction label="협력주행" icon={<DirectionsCarIcon />} onClick={dnHandleOpen} sx={{
                    backgroundImage: "linear-gradient(to bottom, #1F49D1, #132D7E)",
                    color: 'white',
                    // linearGradient : "( to right, yellow, red )"
                }} /> */}
                {/* <BottomNavigationAction label="주행데이터" icon={<ReadMoreIcon />} onClick={ddHandleOpen} sx={{backgroundColor:"#1F47BF", color:'white'}}/> */}
                <BottomNavigationAction label="장치기능" icon={<SettingsIcon />} onClick={stHandleOpen} sx={{ backgroundImage: "linear-gradient(to bottom, #1F49D1, #132D7E)", color: 'white' }} />
            </BottomNavigation>

            <DrivingNegotiation handleClose={dnHandleClose} open={dnOpen} serviceHandleOpen={serviceHandleOpen} />
            <Settings open={stOpen} handleClose={stHadnleClose} />
            <DrivingData open={ddOpen} handleClose={ddHadnleClose} />
            {serviceOpen && <Test serviceOpen={serviceOpen} setServiceOpen={setServiceOpen} />}


        </>
    )
}

export default Bottom;