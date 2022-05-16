import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Accordion, AccordionDetails, AccordionSummary, Chip, InputAdornment, Modal, OutlinedInput, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    bgcolor: 'white',
    border: '0px',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
};
export default function Settings({ open, handleClose }) {
    const [activeStep, setActiveStep] = useState(0);


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
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                            <Chip variant="outlined" icon={<SettingsIcon />} label={`통신장치 => 전송속도 설정하기`} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput fullWidth  value={`68 `}
                            endAdornment={<InputAdornment position="end">{`Mbit/초`}</InputAdornment>}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Chip variant="outlined" icon={<SettingsIcon />} label={`통신장치 => 송신전력 설정하기`} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput fullWidth  value={`100 `}
                            endAdornment={<InputAdornment position="end">{`dB`}</InputAdornment>}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                            <Chip variant="outlined" icon={<SettingsIcon />} label={`통신장치 => IP 주소 설정하기`} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput fullWidth  value={`255.255.255.255`}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>

        </Modal>
    )
}