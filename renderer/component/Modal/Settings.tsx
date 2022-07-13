import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, InputAdornment, Modal, OutlinedInput, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from "react";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    bgcolor: '#1F293C',
    border: '1px solid #323B4B ',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
};
export default function Settings({ open, handleClose }) {

    const [value, setValue] = useState(
        {
            ip: 'locahost',
            port: '8107'
        }
    );
    const [connect, setConnect] = useState(false);
    const ipHandle = (e) => {
        const newValue = e.target.value;
        const inputName = e.target.name;

        setValue(
            (prevState) => {
                return ({
                    ...prevState,
                    [inputName]: newValue
                })
            }
        );
    };
    const connectClient = useCallback(() => {
        ipcRenderer.send("connectClient", value);
        console.log(value);
        console.log(ipcRenderer);
        setConnect((value) => (!value));
    }, [value]);
    const closeClient = useCallback(() => {
        ipcRenderer.send("closeClient", value);
        setConnect((value) => (!value));
    }, [value]);
    useEffect(() => {
        ipcRenderer.on("closeServer", (event, args) => {
            setConnect(false);
        });
        return () => {
            ipcRenderer.removeAllListeners("closeServer");
        }
    }, [value])
    return (
        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography onClick={handleClose}>
                    [임시 닫기]
                </Typography>
                <Accordion sx={{ backgroundColor: "#343E51", color: '#ECECEC' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <SettingsIcon sx={{ marginRight: '10px' }} />
                        <Typography>
                            {`통신장치 > 전송속도 설정하기`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput fullWidth value={`68 `}
                            endAdornment={<InputAdornment position="end">{`Mbit/초`}</InputAdornment>}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ backgroundColor: "#343E51", color: '#ECECEC' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <SettingsIcon sx={{ marginRight: '10px' }} />
                        <Typography>
                            {`통신장치 > 송신전력 설정하기`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput fullWidth value={`100 `}
                            endAdornment={<InputAdornment position="end">{`dB`}</InputAdornment>}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ backgroundColor: "#343E51", color: '#ECECEC' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <SettingsIcon sx={{ marginRight: '10px' }} />
                        <Typography>
                            {`통신장치 > IP 주소 설정하기`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={1} sx={{ textAlign: 'right', }}>
                                <Typography >IP :</Typography>
                            </Grid>
                            <Grid item xs={11} >
                                <OutlinedInput size="small" fullWidth name='ip' value={value.ip} onChange={ipHandle} sx={{ background: "#475164", borderColor: "#535D6E", color: '#ffffff' }} />
                            </Grid>
                            <Grid item xs={1} sx={{ textAlign: 'right' }}>
                                Port :
                            </Grid>
                            <Grid item xs={11}>
                                <OutlinedInput size="small" fullWidth name='port' value={value.port} onChange={ipHandle} sx={{ background: "#475164", borderColor: "#535D6E", color: '#ffffff' }} />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                <Button onClick={connectClient} variant="contained" color="success" disabled={connect}>Connect</Button>
                                <Button onClick={closeClient} variant="contained" sx={{backgroundColor:'#cccccc', marginLeft:'10px'}} disabled={!connect}>close</Button>


                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>

        </Modal>
    )
}