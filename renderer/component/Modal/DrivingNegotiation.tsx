import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Modal, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from 'react';
import useAudio from '../useAudio';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Step1Card = ({ text, img, onClickFn }) => {
    return (
        <Card style={{ cursor: "pointer" }} onClick={onClickFn}>
            <CardMedia
                component="img"
                width="100%"
                height="100"
                image={img}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default function DrivingNegotiation({ handleClose, open, serviceHandleOpen }) {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['협력주행 서비스를 선택하세요.', '세부 협력주행 서비스를 선택하세요'];
    const [skipped, setSkipped] = useState(new Set<number>());
    const [selectType, setSelectType] = useState(null);
    


    // const isStepOptional = (step: number) => {
    //     return step === 1;
    // };
    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handlePrev = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    const handleNext = (selectType) => {

        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //     newSkipped = new Set(newSkipped.values());
        //     newSkipped.delete(activeStep);
        // }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
        setSelectType(selectType);
    };
    const selectSerivce = () => {
        handleClose();
        serviceHandleOpen();
    }
    useEffect(() => {
        return () => {
            setActiveStep(0);
        };
    }, [open])

    return (
        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        // if (isStepOptional(index)) {
                        //     labelProps.optional = (
                        //         <Typography variant="caption">Optional</Typography>
                        //     );
                        // }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === 0 ? (
                    <>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: '20px' }}>
                            <Grid item xs={6}>
                                <Step1Card text={"Class A"} img={"/images/classA.png"} onClickFn={() => { handleNext(1) }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Step1Card text={"Class C"} img={"/images/classC.png"} onClickFn={() => { handleNext(3) }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Step1Card text={"Class B"} img={"/images/classB.png"} onClickFn={() => { handleNext(2) }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Step1Card text={"Class D"} img={"/images/classD.png"} onClickFn={() => { handleNext(4) }} />
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: '20px' }}>
                            <Grid item xs={6}>
                                <Step1Card text={"Class A-1"} img={"/images/classA.png"} onClickFn={() => { selectSerivce() }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Step1Card text={"Class A-2"} img={"/images/classC.png"} onClickFn={() => { selectSerivce() }} />
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Step1Card text={"ClassB"} img={"/images/classB.png"} onClickFn={() => { handleNext(2) }} /> */}
                            </Grid>
                            <Grid item xs={6}>
                                {/* <Step1Card text={"ClassD"} img={"/images/classD.png"} onClickFn={() => { handleNext(4) }} /> */}
                            </Grid>
                        </Grid>
                        <Button onClick={handlePrev}>
                            {activeStep > 0 && '이전'}
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    )
}
