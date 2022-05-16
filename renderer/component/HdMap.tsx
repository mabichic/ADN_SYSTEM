import { View } from "ol";
import PerspectiveMap from 'ol-ext/map/PerspectiveMap';
// import ol from 'openlayers';
import 'ol-ext/map/PerspectiveMap.css';
import { defaults as defaultInteraction } from 'ol/interaction';
import 'ol/ol.css';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { useEffect, useRef, useState } from "react";
import Bottom from './Bottom';
import MapContext from "./context/MapContext";
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


        const hdMapRead = () => {
            console.log("DD");
            fetch('/hdmap/etridb_plus_LAYER_LN_LINK.txt')
                .then((r) => r.text())
                .then(text => {
                    text.split("\r\n")
                        .forEach((array) => {
                            array = array.trim();
                            if (array === "") return;
                            else console.log(array)
                        });
                });
            // let file = e.target.files[0];
            // let fileReader = new FileReader();
            // fileReader.onload = () => {
            //     console.log(fileReader.result);
            // };
            // fileReader.readAsText(file);
        }
        hdMapRead();
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