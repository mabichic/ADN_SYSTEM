import {
  GEOJSONTYPE,
  LAYER_LANESIDE,
  LAYER_LN_LINK,
  LAYER_LN_NODE,
  LAYER_POI,
  LAYER_ROADLIGHT,
  LAYER_ROADMARK,
} from "../dto/dto";
const objectSet = {
  LAYER_ROADMARK: LAYER_ROADMARK,
  LAYER_ROADLIGHT: LAYER_ROADLIGHT,
  LAYER_LANESIDE: LAYER_LANESIDE,
  LAYER_POI: LAYER_POI,
  LAYER_LN_LINK: LAYER_LN_LINK,
  LAYER_LN_NODE: LAYER_LN_NODE,
};

export default async function Converter(
  layerNM:
    | "LAYER_LANESIDE"
    | "LAYER_LN_LINK"
    | "LAYER_LN_NODE"
    | "LAYER_POI"
    | "LAYER_ROADLIGHT"
    | "LAYER_ROADMARK",
  dataSet: Array<any>,
  filePath: string
) {
  let geoType:
    | "Point"
    | "LineString"
    | "Polygon"
    | "MultiPoint"
    | "MultiLineString"
    | "MultiPolygon" = "Point";
  switch (layerNM) {
    case "LAYER_LANESIDE":
    case "LAYER_LN_LINK":
    case "LAYER_ROADLIGHT":
      geoType = "LineString";
      break;
    case "LAYER_LN_NODE":
    case "LAYER_POI":
      geoType = "Point";
      break;
    case "LAYER_ROADMARK":
      geoType = "Polygon";
      break;
  }
  const response = await fetch(filePath);
  if (response.status === 200) {
    const gesons = [];
    const text = await response.text();
    text.split("\n").forEach((array) => {
      array = array.trim();
      if (array !== "") {
        let obj = new objectSet[layerNM](array);
        let geson: GEOJSONTYPE = {
          type: "Feature",
          group: layerNM,
          id: layerNM + "_" + obj.ID,
          geometry: {
            type: geoType,
            coordinates: obj.PointXY,
          },
          properties: obj,
        };
        gesons.push(geson);
      }
    });
    return gesons;
  } else {
    throw new Error("Unable to get your location");
  }
}
