import { VectorImage } from "ol/layer";

const HdMapVectorLayer = ({ source, style, title, map, }) => {

  let vectorLayer = new VectorImage({
    style: style,
    declutter: true,
    source: source,
    properties: {
      title: title,
      selectable: false,
      dataVisible: false,
    },
    zIndex: map.getLayers().getLength()-1,
  });

  map.addLayer(vectorLayer);
  return vectorLayer;
};

export default HdMapVectorLayer;
