import { useContext, useEffect, useState } from "react";
import MapContext from "./context/MapContext";
import VworldTileLayer from "./layer/VworldTileLayer";

function Layers({ children }) {
    const map = useContext(MapContext);
    const [layers, setLayers] = useState([]);
    useEffect(() => {
        if (!map) return;
        setLayers([VworldTileLayer({ zIndex: 0, map: map })]);
    },[map]);
    return (
        <>
        </>
    );
};

export default Layers;
