import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import { useContext, useEffect, useState } from "react";
import MapContext from "./context/MapContext";
import HdMapStyle from "./HdMapStyle";
import HdMapVectorLayer from "./layer/HdMapVectorLayer";
import Converter from "./util/Converter";
function Layers({ children }) {
    const map = useContext(MapContext);
    const [layers, setLayers] = useState([]);
    useEffect(() => {
        if (!map) return;
        // setLayers([VworldTileLayer({ zIndex: 0, map: map })]);

        let dataSet = {
            type: "FeatureCollection",
            features: [],
            crs: { type: "name", properties: { name: "EPSG:5186" } },
        };

        
        const dataLoad = async () => {
            let layer_laneside = await Converter('LAYER_LANESIDE', dataSet['features'], '/hdmap/etridb_plus_LAYER_LANESIDE.txt');
            let layer_ln_link = await Converter('LAYER_LN_LINK', dataSet['features'], '/hdmap/etridb_plus_LAYER_LN_LINK.txt');
            let layer_ln_node = await Converter('LAYER_LN_NODE', dataSet['features'], '/hdmap/etridb_plus_LAYER_LN_NODE.txt');
            let layer_poi = await Converter('LAYER_POI', dataSet['features'], '/hdmap/etridb_plus_LAYER_POI.txt');
            let layer_roadlight = await Converter('LAYER_ROADLIGHT', dataSet['features'], '/hdmap/etridb_plus_LAYER_ROADLIGHT.txt');
            let layer_roadmark = await Converter('LAYER_ROADMARK', dataSet['features'], '/hdmap/etridb_plus_LAYER_ROADMARK.txt');
            // console.log(layer_laneside);
            dataSet.features = [...dataSet.features, ...layer_laneside];
            dataSet.features = [...dataSet.features, ...layer_ln_link];
            dataSet.features = [...dataSet.features, ...layer_ln_node];
            dataSet.features = [...dataSet.features, ...layer_poi];
            dataSet.features = [...dataSet.features, ...layer_roadlight];
            dataSet.features = [...dataSet.features, ...layer_roadmark];
            let features = new GeoJSON().readFeatures(dataSet);
            let source = new VectorSource({
                features: features
            });
            setLayers(layers => [...layers, HdMapVectorLayer({ map: map, source: source, style: HdMapStyle, title: 'HdMap' })]);
        }
        dataLoad();

    }, [map]);
    return (
        <>
        </>
    );
};

export default Layers;
