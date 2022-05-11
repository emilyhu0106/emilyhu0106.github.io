var getCoods = (array) => {
  return coords = array[0] + ',' + array[1]
}

var getSelection = (layer) => {
  var isochrones = layer.toGeoJSON();
  _.map(attractions.features, function(place) {
    var poly1 = turf.polygon(place.geometry.coordinates[0]);
    var poly2 = turf.polygon(isochrones.geometry.coordinates);
    if (turf.intersect(poly1, poly2) != null) {
      L.geoJSON(place, {
        style: {
          weight: 10,
          color: "#008080",
          opacity: 0.5
        }
      }).addTo(map);
    }
  });
}

var createIsochrones = (feature) => {
  var polygon = turf.polygon(feature);
  var centroid = turf.centroid(polygon);
  token = "pk.eyJ1IjoiZW1pbHlodSIsImEiOiJjanRraXBjYjAwMDZiNDRxbHg3cDlwbHA5In0.Z8oZamlBpJF4Sv58aC1c_A";
  $.ajax({
    url: "https://api.mapbox.com/isochrone/v1/mapbox/walking/" + getCoods(centroid.geometry.coordinates) + "?contours_minutes=5&contours_colors=6706ce&polygons=true&access_token=" + token,
    success: function(polygon) {
      var geometry = polygon['features'][0]['geometry']['coordinates'][0];
      _.each(geometry, function(coord) {
        coord.reverse();
      })
      if ($('#customSwitch2').is(':checked')) {
        var layerBuffer = L.polygon(geometry, {
          color: '#666',
          opacity: 0.5
        });
        layerBuffer.addTo(map);
        getSelection(layerBuffer);
        return;
      } else {
        map.eachLayer(function(layer) {
          map.removeLayer(layer);
        });
        baseMap_perm.addTo(map);
        Esri_WorldImagery.addTo(map);
        baseMap.addTo(map);
        layerAttractions.addTo(map);
        if ($('#customSwitch1').is(':checked')) {
          map.removeLayer(baseMap);
          layerHistorical.addTo(map);
          sbsInitial.setLeftLayers(layerHistorical);
          return;
        } else {
          map.removeLayer(layerHistorical);
          map.addLayer(baseMap);
          sbsInitial.setLeftLayers(baseMap);
        }
      }
    }
  })
}
