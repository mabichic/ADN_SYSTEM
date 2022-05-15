import { Map, View } from "ol";
import PerspectiveMap from 'ol-ext/map/PerspectiveMap';
// import ol from 'openlayers';
import { Tile } from 'ol/layer';
import { OSM, XYZ } from 'ol/source';
import 'ol/ol.css';
import 'ol-ext/map/PerspectiveMap.css';
import { useEffect, useRef, useState } from "react";
import MapContext from "./context/MapContext";
import { defaults as defaultInteraction } from 'ol/interaction';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import dynamic from "next/dynamic";
import Bottom from './Bottom'
import { height } from "@mui/system";
proj4.defs([
    ['EPSG:5186', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +epllps']
]);
proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"); // 5186 좌표선언
register(proj4);

// const PerspectiveMap = dynamic(() => import('ol-ext'), { ssr: false });

function HdMap({ children, zoom, center }) {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        let options = {
            layers: [],
            view: new View({
                projection: 'EPSG:5186',
                center: [234075, 419607],
                zoom: 15,
                minZoom: 8,
                constrainResolution: true,
            }),
            controls: [],
            overlays: [],
            interactions: defaultInteraction({
                doubleClickZoom: false, keyboard: false,
            }),
            target: mapRef.current
        };

        let mapObject = new PerspectiveMap(options);
        // mapObject.setTarget(mapRef.current);
        setMap(mapObject);
    }, []);

    return (
        <MapContext.Provider value={map}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flexGrow: 1, backgroundColor: 'gray' }} >
                    <div ref={mapRef} style={{ height: '100%' }} />
                    {children}
                </div>
                <Bottom />
            </div>

        </MapContext.Provider >
    )
}
export default HdMap;