var map = L.map('map', {
  center: [37.973, 23.725],
  zoom: 16,
  zoomControl: false,
  attributionControl: false
});

var baseMap_perm = L.tileLayer('https://api.mapbox.com/styles/v1/emilyhu/cjuykkzuz0fmk1fmpyfaywrdn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZW1pbHlodSIsImEiOiJjanRraXBjYjAwMDZiNDRxbHg3cDlwbHA5In0.Z8oZamlBpJF4Sv58aC1c_A', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  ext: 'png'
}).addTo(map)

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

var baseMap = L.tileLayer('https://api.mapbox.com/styles/v1/emilyhu/cjuykkzuz0fmk1fmpyfaywrdn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZW1pbHlodSIsImEiOiJjanRraXBjYjAwMDZiNDRxbHg3cDlwbHA5In0.Z8oZamlBpJF4Sv58aC1c_A', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  ext: 'png'
}).addTo(map)

var historicalUrl = 'https://api.mapbox.com/styles/v1/emilyhu/cjuyljp711i0r1fod1rlg16ub/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZW1pbHlodSIsImEiOiJjanRraXBjYjAwMDZiNDRxbHg3cDlwbHA5In0.Z8oZamlBpJF4Sv58aC1c_A'

var layerHistorical = L.tileLayer(historicalUrl, {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>'
});

var sbsInitial = L.control.sideBySide(baseMap, Esri_WorldImagery).addTo(map);

L.control.zoom({
  position: 'topright'
}).addTo(map);

var myStyle = function(feature) {
  switch (feature.properties.period) {
    case "Archaic":
      return {
        color: '#646464'
        // color: '#440154FF'
      };
    case "Classical":
      return {
        color: '#00395E'
        // color: '#31688EFF'
      };
    case "Hellenistic":
      return {
        color: '#E0C389'
        // color: '#35B779FF'
      };
    case "Roman":
      return {
        color: '#8B0E3A'
        // color: '#FDE725FF'
      };
    default:
      return {
        color: '#f2f2f2'
      };
  }
};
var layerAttractions;

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.name, {
    closeButton: false,
    offset: L.point(0, -20)
  });
  layer.on('mouseover', function() {
    layer.openPopup();
  });
  layer.on('mouseout', function() {
    layer.closePopup();
  });
}

layerAttractions = L.geoJSON(attractions, {
  style: myStyle,
  onEachFeature: onEachFeature
}).addTo(map);
