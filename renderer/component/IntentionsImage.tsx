import { Card, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";

export default function IntentionsImage({ img, right, visible, setVisible }) {

    const [open, setOpen] = useState(false);
    const gridClick = () =>{ 
        setVisible(false);
    }
    useEffect(() => {

    }, [visible]);
    return (
        <div style={{
            position: "absolute",
            bottom: 60,
            right: right,
            zIndex: 10
        }}
        onMouseDown={gridClick}
        >
            {visible &&
                <Card style={{ cursor: "pointer" }} >
                    <CardMedia
                        component="img"
                        // width="100%"
                        height="100%"
                        image={img}
                        alt="green iguana"
                    />
                </Card>
            }
        </div>
    )
}