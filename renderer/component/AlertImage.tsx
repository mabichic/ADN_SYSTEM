import { Card, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";

export default function AlertImage({ img, left, visible, setVisible }) {

    const [open, setOpen] = useState(false);
    const gridClick = () =>{ 
        setVisible(false);
    }
    useEffect(() => {

    }, [visible]);
    return (
        <div style={{
            position: "absolute",
            top: 20,
            left: left,
            zIndex: 10
        }}
        onMouseDown={gridClick}
        >
            {visible &&
                <Card style={{ cursor: "pointer" }} >
                    <CardMedia
                        component="img"
                        width="100%"
                        height="122"
                        image={img}
                        alt="green iguana"
                    />
                </Card>
            }
        </div>
    )
}