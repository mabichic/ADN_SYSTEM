import { Feature, View } from "ol";
import PerspectiveMap from 'ol-ext/map/PerspectiveMap';
// import ol from 'openlayers';
import 'ol-ext/map/PerspectiveMap.css';
import { Point } from "ol/geom";
import { defaults as defaultInteraction } from 'ol/interaction';
import VectorLayer from "ol/layer/Vector";
import 'ol/ol.css';
import { register } from 'ol/proj/proj4';
import VectorSource from "ol/source/Vector";
// import { default as Icon, default as Style } from "ol/style";
import { Icon, Style } from 'ol/style';
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
                center: [232936.21828125, 420510.53421875],
                zoom: 20,
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

        const iconFeature = new Feature({
            geometry: new Point([232937.72578125, 420510.51140625]),
            population: 4000,
            rainfall: 500,
        });

        const iconStyle = new Style({
            image: new Icon({
                src: 'images/car.png',
            }),
        });

        let i = 20;
        let j = 20;
        let click = false;
        iconFeature.setStyle(() => {
            const x = Math.sin((i * Math.PI) / 180) * 0.5;
            const y = Math.sin((j * Math.PI) / 180) * 0.5;

            iconStyle.getImage().setScale([x, y]);
            iconStyle.getImage().setRotation((Math.PI / 180) * 90,)
            return iconStyle
        });

        const vectorSource = new VectorSource({
            features: [iconFeature],
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            zIndex: 2,
        });
        mapObject.addLayer(vectorLayer);

        const clickEvt = () => {
            if(click) return;
            click = true; 

            const arr = ['232956.33171875', '420510.29296875', '232955.82984375', '420510.30046875', '232955.3278125', '420510.3078125', '232954.825625', '420510.31484375', '232954.32328125', '420510.32171875', '232953.8209375', '420510.32828125', '232953.3184375', '420510.3346875', '232952.8159375', '420510.3409375', '232952.31328125', '420510.34703125', '232951.81046875', '420510.35296875', '232951.30765625', '420510.35875', '232950.80484375', '420510.364375', '232950.30203125', '420510.37', '232949.7990625', '420510.37546875', '232949.2959375', '420510.38078125', '232948.79296875', '420510.38609375', '232948.28984375', '420510.39125', '232947.78671875', '420510.3965625', '232947.28359375', '420510.40171875', '232946.78046875', '420510.40671875', '232946.2771875', '420510.411875', '232945.7740625', '420510.41703125', '232945.2709375', '420510.4221875', '232944.76765625', '420510.4275', '232944.26453125', '420510.43265625', '232943.76125', '420510.43796875', '232943.258125', '420510.4434375', '232942.755', '420510.44890625', '232942.251875', '420510.454375', '232941.74875', '420510.46015625', '232941.24578125', '420510.4659375', '232940.74265625', '420510.471875', '232940.2396875', '420510.47796875', '232939.736875', '420510.484375', '232939.23390625', '420510.49078125', '232938.73125', '420510.4975', '232938.2284375', '420510.504375', '232937.72578125', '420510.51140625', '232937.22328125', '420510.51875', '232936.72078125', '420510.52640625', '232936.21828125', '420510.53421875'];
            var result = [];
            for (let k= 0; k < arr.length; k += 2) result.push(arr.slice(k, k + 2).map(Number));
            result.reverse();
            let z = 0;
            let interval  = setInterval(function () {
                iconFeature.getGeometry().setCoordinates(result[z]);
                z++;
                if (z > 40){
                    z = 0;
                    clearInterval(interval)
                    click = false;
                } 
                vectorSource.changed();
            }, 200);
        }
        mapObject.on('click', clickEvt);
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