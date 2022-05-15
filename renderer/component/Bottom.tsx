import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useEffect, useState } from "react";
import DrivingNegotiation from "./Modal/DrivingNegotiation";
import useAudio from "./useAudio";

const Test = (serviceOpen) => {
    const [toggle] = useAudio("/audio/step1.wav");
    useEffect(() => {

        toggle(true);

    }, [serviceOpen])
    if (serviceOpen) {
        console.log("여까진");
        return (
            <Box sx={{
                position: 'absolute', width: 800, height: 200, backgroundColor: 'gray', bottom: 60, right: 0
            }} >
                Service 모델
            </Box>
        )
    }
}
const Bottom = () => {
    const [value, setValue] = useState(0);

    const [dnOpen, setOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const dnHandleOpen = () => setOpen(true);
    const dnHandleClose = () => setOpen(false);
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
                <BottomNavigationAction label="주행데이터" icon={<ReadMoreIcon />} />
                <BottomNavigationAction label="장치기능" icon={<SettingsIcon />} />
            </BottomNavigation>

            <DrivingNegotiation handleClose={dnHandleClose} open={dnOpen} serviceHandleOpen={serviceHandleOpen} />
            {serviceOpen && <Test serviceOpen={serviceOpen} />}


        </>
    )
}

export default Bottom;