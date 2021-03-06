import { ipcRenderer } from "electron";
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
import AlertImage from "./AlertImage";
import Bottom from './Bottom';
import MapContext from "./context/MapContext";
import IntentionsImage from "./IntentionsImage";
import useAudio from "./useAudio";
proj4.defs([
    ['EPSG:5186', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +epllps']
]);
proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs"); // 5186 좌표선언
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

register(proj4);

// const PerspectiveMap = dynamic(() => import('ol-ext'), { ssr: false });

function HdMap({ children, zoom, center }) {
    const [detectionAudio] = useAudio("/audio/step1.mp3");
    const [requestAudio] = useAudio("/audio/request.mp3");
    
    const [mergintResphonseAudio] = useAudio("/audio/mergint_resphonse.mp3");
    const [concessionResphonseAudio] = useAudio("/audio/concession_resphonse.mp3")
    const [interruptReshponseAudio] = useAudio("/audio/interrupt_reshponse.mp3")
    const [overtakingReshponseAudio] = useAudio("/audio/overtaking_reshponse.mp3")

    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const [detectionVisible, setDetectionVisible] = useState(false);
    
    const [mergintVisible, setMergintVisible] = useState(false);
    const [concessionVisible, setConcessionVisible] = useState(false);
    const [interruptVisible, setInterruptVisible] = useState(false);
    const [overtakingVisible, setOvertakingVisible] = useState(false);
    const [requestVisible, setRequestVisible] = useState(false);
    const [resphonseVisible, setResphonseVisible] = useState(false);
    const [feature, setFeature] = useState(null);
    const [vector, setVector] = useState(null);
    const [moving, setMoving] = useState(false);
    const iconStyle = new Style({
        image: new Icon({
            src: 'images/car.png',
        }),
    });

    let i = 20;
    let j = 20;

    useEffect(() => {
        let options = {
            layers: [],
            view: new View({
                projection: 'EPSG:5186',
                center: [232936.21828125, 420510.53421875],
                zoom: 18,
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
        mapObject.on('click', ()=>{
            setMoving((prevState)=>!prevState);
            console.log(moving);
        });
        const iconFeature = new Feature({
            geometry: new Point([232937.72578125, 420510.51140625]),
            population: 4000,
            rainfall: 500,
        });


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
        setFeature(iconFeature);
        setVector(vectorSource);
        const clickEvt = () => {
            if (click) return;
            click = true;
            setDetectionVisible(true);
            const arr = ['232956.33171875', '420510.29296875', '232955.82984375', '420510.30046875', '232955.3278125', '420510.3078125', '232954.825625', '420510.31484375', '232954.32328125', '420510.32171875', '232953.8209375', '420510.32828125', '232953.3184375', '420510.3346875', '232952.8159375', '420510.3409375', '232952.31328125', '420510.34703125', '232951.81046875', '420510.35296875', '232951.30765625', '420510.35875', '232950.80484375', '420510.364375', '232950.30203125', '420510.37', '232949.7990625', '420510.37546875', '232949.2959375', '420510.38078125', '232948.79296875', '420510.38609375', '232948.28984375', '420510.39125', '232947.78671875', '420510.3965625', '232947.28359375', '420510.40171875', '232946.78046875', '420510.40671875', '232946.2771875', '420510.411875', '232945.7740625', '420510.41703125', '232945.2709375', '420510.4221875', '232944.76765625', '420510.4275', '232944.26453125', '420510.43265625', '232943.76125', '420510.43796875', '232943.258125', '420510.4434375', '232942.755', '420510.44890625', '232942.251875', '420510.454375', '232941.74875', '420510.46015625', '232941.24578125', '420510.4659375', '232940.74265625', '420510.471875', '232940.2396875', '420510.47796875', '232939.736875', '420510.484375', '232939.23390625', '420510.49078125', '232938.73125', '420510.4975', '232938.2284375', '420510.504375', '232937.72578125', '420510.51140625', '232937.22328125', '420510.51875', '232936.72078125', '420510.52640625', '232936.21828125', '420510.53421875'];
            var result = [];
            for (let k = 0; k < arr.length; k += 2) result.push(arr.slice(k, k + 2).map(Number));
            result.reverse();
            let z = 0;
            let interval = setInterval(function () {
                iconFeature.getGeometry().setCoordinates(result[z]);
                z++;
                if (z > 40) {
                    z = 0;
                    clearInterval(interval)
                    click = false;
                }
                vectorSource.changed();
            }, 200);
        }
        
        

    }, []);
    useEffect(() => {
        if(map===null) return;
        
        ipcRenderer.on("latlon", (event, args) => {
            try {
                let json = args;
                let coor = proj4('EPSG:4326', 'EPSG:5186', [Number(json.lon), Number(json.lat)]);
                
                feature.setStyle(() => {
                    const x = Math.sin((i * Math.PI) / 180) * 0.5;
                    const y = Math.sin((j * Math.PI) / 180) * 0.5;
                    
                    iconStyle.getImage().setScale([x, y]);
                    iconStyle.getImage().setRotation((Math.PI / 180) * Number(json.heading),)
                    return iconStyle
                });
                
                feature.getGeometry().setCoordinates(coor);
                // vector.changed();
                
                if (moving) {
                    map.getView().setCenter(coor);
                }
                
            }catch(err){
                console.log(err);
            }

        });
        ipcRenderer.on("detection", (event, args)=>{
            try{ 
                setDetectionVisible(true);
                detectionAudio(true);
            }catch(err){
                console.log(err);
            }
        });
        ipcRenderer.on("mergintRequest", (event,args)=>{
            try{ 
                setRequestVisible(true);
                setMergintVisible(true);
                requestAudio(true);
            }catch(err){
                console.log(err);
            }
        });
        ipcRenderer.on("interruptRequest", (event,args)=>{
            try{ 
                setRequestVisible(true);
                setInterruptVisible(true);
                requestAudio(true);
            }catch(err){
                console.log(err);
            }
        });

        ipcRenderer.on("overtakingRequest", (event,args)=>{
            try{ 
                setRequestVisible(true);
                setOvertakingVisible(true);
                requestAudio(true);
            }catch(err){
                console.log(err);
            }
        });

        ipcRenderer.on("concessionRequest", (event,args)=>{
            try{ 
                setRequestVisible(true);
                setConcessionVisible(true);
                requestAudio(true);
            }catch(err){
                console.log(err);
            }
        });

        ipcRenderer.on("mergintResphonse", (event,args)=>{
            try{ 
                setResphonseVisible(true);
                setMergintVisible(true);
                mergintResphonseAudio(true);
            }catch(err){
                console.log(err);
            }
        });

        ipcRenderer.on("interruptReshponse", (event,args)=>{
            try{ 
                setResphonseVisible(true);
                setInterruptVisible(true);
                interruptReshponseAudio(true);
            }catch(err){
                console.log(err);
            }
        });

        ipcRenderer.on("overtakingReshponse", (event,args)=>{
            try{ 
                setResphonseVisible(true);
                setOvertakingVisible(true);
                overtakingReshponseAudio(true);
            }catch(err){
                console.log(err);
            }
        });
        ipcRenderer.on("concessionResphonse", (event,args)=>{
            try{ 
                setResphonseVisible(true);
                setConcessionVisible(true);
                concessionResphonseAudio(true);
            }catch(err){
                console.log(err);
            }
        }); 



        ipcRenderer.on("error",(event,args)=>{
            console.log(args);
        });
        return () => {
            ipcRenderer.removeAllListeners("latlon");
            ipcRenderer.removeAllListeners("detection");
            ipcRenderer.removeAllListeners("mergintRequest");

            ipcRenderer.removeAllListeners("mergintResphonse");
            ipcRenderer.removeAllListeners("concessionResphonse");
            ipcRenderer.removeAllListeners("interruptReshponse");
            ipcRenderer.removeAllListeners("error");
        };
    }, [map, feature, vector, moving])
    return (
        <>
            <AlertImage img={'images/detection.png'} left={50} visible={detectionVisible} setVisible={setDetectionVisible} />
            <AlertImage img={'images/request.png'} left={300} visible={requestVisible} setVisible={setRequestVisible} />
            <AlertImage img={'images/resphonse.png'} left={300} visible={resphonseVisible} setVisible={setResphonseVisible} />
            <IntentionsImage img={'images/mergint.gif'} right={10} visible={mergintVisible} setVisible={setMergintVisible} />
            <IntentionsImage img={'images/interrupt.gif'} right={10} visible={interruptVisible} setVisible={setInterruptVisible} />
            <IntentionsImage img={'images/overtaking.gif'} right={10} visible={overtakingVisible} setVisible={setOvertakingVisible} />
            <IntentionsImage img={'images/concession.gif'} right={10} visible={concessionVisible} setVisible={setConcessionVisible} />
            <MapContext.Provider value={map}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ flexGrow: 1, backgroundColor: 'gray' }} >
                        <div ref={mapRef} style={{ height: '100%' }} />
                        {children}
                    </div>
                    <Bottom />
                </div>
            </MapContext.Provider >
        </>
    )
}
export default HdMap;