var sidebarOut = false; //the place of sidebar

$('.opacity-container').hide();

$(document).ready(function() {
  $('.opacity-container').hide();
  $('.desp-container').hide();
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
    sidebarOut = !sidebarOut;
  });

  layerAttractions.eachLayer(eachFeatureFunction);
});

$('#sldOpacity').on('change', function() {
  $('#image-opacity').html(this.value);
  layerHistorical.setOpacity(this.value);
})

$('#customSwitch1').change(function() { // toggle historical map
  if ($('#customSwitch1').is(':checked')) {
    map.removeLayer(baseMap);
    layerHistorical.addTo(map);
    sbsInitial.setLeftLayers(layerHistorical);
    $('.opacity-container').fadeIn();
    return;
  } else {
    map.removeLayer(layerHistorical);
    map.addLayer(baseMap);
    sbsInitial.setLeftLayers(baseMap);
    $('.opacity-container').fadeOut();
  }
});


//When clicking features:
var eachFeatureFunction = function(layer) {
  layer.on('click', function(event) {
    url1 = "img/monuments/" + layer.feature.properties.name + "/01.jpg";
    url2 = "img/monuments/" + layer.feature.properties.name + "/02.jpg";
    url3 = "img/monuments/" + layer.feature.properties.name + "/03.jpg";
    $("#carousel-img-1").attr("src", url1);
    $("#carousel-img-2").attr("src", url2);
    $("#carousel-img-3").attr("src", url3);
    if (!sidebarOut) {
      $('#sidebar').toggleClass('active');
      sidebarOut = !sidebarOut;
    }
    $("#despSubmenu p").text(layer.feature.properties.desp);
    $('.desp-container a').text(layer.feature.properties.name);
    $('.desp-container').fadeIn();
    $('.opening-container').fadeOut();

    //the switch to show walking distance attractions
    $('#customSwitch2').change(function() {
      createIsochrones(layer.feature.geometry.coordinates[0]);
    });
  });
};

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})
