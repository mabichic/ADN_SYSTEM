import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Modal, Typography } from "@mui/material";
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
export default function DrivingData({ open, handleClose }) {
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
                        <Typography>
                            <Chip variant="outlined" icon={<SettingsIcon />} label={`차량 주행 정보 입력`} />
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <OutlinedInput fullWidth  value={`68 `}
                            endAdornment={<InputAdornment position="end">{`Mbit/초`}</InputAdornment>}
                        /> */}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Chip variant="outlined" icon={<SettingsIcon />} label={`차량 주행 정보 로그 파일 불러오기`} />
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <OutlinedInput fullWidth  value={`100 `}
                            endAdornment={<InputAdornment position="end">{`dB`}</InputAdornment>}
                        /> */}
                    </AccordionDetails>
                </Accordion>
                
            </Box>

        </Modal>
    )
}