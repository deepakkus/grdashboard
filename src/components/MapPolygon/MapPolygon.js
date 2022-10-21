import { Map, TileLayer, Marker, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import "leaflet-draw";
import { EditControl } from "react-leaflet-draw";

const createPolygon = (latlngArray) => {
  const polygon = [];
  if (latlngArray && latlngArray[0]) {
    for (const latlng of latlngArray[0]) {
      polygon.push([latlng.lat, latlng.lng]);
    }
    polygon.push(polygon[0]);
  }
  // polygon is of format : [[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]
  return polygon;
};

/**
 * Map componenet that uses react-leaflet. This can be used as editable and readonly. For editable map, pass
 * onChange, editable(=true) center(eg: [51.508530, -0.076132]) and polygon if there is any value eg: edit a farm.
 * For readonly , pass polygon(eg: [[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]), center(matching one latlng or any nearby point of polygon) and editable=false in props.
 */
const MapPolygon = (props) => {
  const mapRef = useRef();
  let fgRef = null;
  let leafLetEl = null;

  const [center, setCenter] = useState(props.center || [51.50853, -0.076132]);

  const onChange = (polygon) => {
    if (props.onChange) {
      props.onChange(polygon);
    }
  };

  const onEdited = (e) => {
    const polygons = [];
    e.layers.eachLayer((layer) => {
      polygons.push(createPolygon(layer.getLatLngs()));
    });
    onChange(polygons[0]);
  };
  const onDeleted = (e) => {
    onChange([]);
  };
  const onAdded = (e) => {
    const added = e.layer;
    const polygon = createPolygon(added.getLatLngs());
    if (leafLetEl) {
      leafLetEl.eachLayer((layer) => {
        if (layer._leaflet_id !== added._leaflet_id) {
          leafLetEl.removeLayer(layer); // just so there is only one polygon at a time
        }
      });
    }
    onChange(polygon);
  };
  const setMapCenter = () => {
    setCenter(props.center);
  };

  useEffect(() => {
    if (
      center &&
      props.center &&
      JSON.stringify(center) !== JSON.stringify(props.center)
    ) {
      setMapCenter();
    }
  });

  const setFGRef = (ref) => {
    if (ref) {
      fgRef = ref;
      leafLetEl = fgRef.leafletElement;
    }
  };
  let mapCenter = props.center || [51.50853, -0.076132];

  const polygon = props.polygon;
  if (polygon && polygon.length) {
    mapCenter = polygon[0];
  }
  let bounds;
  if (mapCenter && mapCenter.length) {
    bounds = [
      [mapCenter[0], mapCenter[1]],
      [mapCenter[0], mapCenter[1]],
    ];
  }

  const editable = props.editable;
  const zoom = props.zoom || 16;
  return (
    <div>
      {mapCenter && (
        <Map
          className={props.className || "map"}
          center={mapCenter}
          zoom={zoom}
          ref={mapRef}
          fitBounds={bounds}
        >
          <TileLayer
            attribution="google"
            url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
          />
          {/* <Marker position={mapCenter || [51.50853, -0.076132]}></Marker> */}
          <FeatureGroup ref={(ref) => setFGRef(ref)}>
            {polygon && polygon.length > 0 && <Polygon positions={polygon} />}
            {editable === true && (
              <EditControl
                position="topright"
                onEdited={onEdited}
                onCreated={onAdded}
                onDeleted={onDeleted}
                draw={{
                  polygon: {
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                      color: "#e1e100", // Color the shape will turn when intersects
                      message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
                    },
                    shapeOptions: {
                      color: "#97009c",
                    },
                  },
                  polyline: false,
                  circle: false, // Turns off this drawing tool
                  rectangle: false,
                  marker: false,
                }}
              />
            )}
          </FeatureGroup>
        </Map>
      )}
    </div>
  );
};

export default MapPolygon;
