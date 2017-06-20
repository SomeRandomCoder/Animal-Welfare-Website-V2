var directionDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
    var latlng = new google.maps.LatLng(-34.0054, 18.544989999999984);
    directionsDisplay = new google.maps.DirectionsRenderer();
    var myOptions = {
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));

}

function calcRoute() {
    var start = document.getElementById("routeStart").value;
    var end = "-34.0054,18.544989999999984";
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };


    directionsService.route(request, function(response, status) {
        if (status == 'ZERO_RESULTS') {
            alert('No route could be found between the origin and destination.');
        } else if (status == 'UNKNOWN_ERROR') {
            alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
        } else if (status == 'REQUEST_DENIED') {
            alert('This webpage is not allowed to use the directions service.');
        } else if (status == 'OVER_QUERY_LIMIT') {
            alert('The webpage has gone over the requests limit in too short a period of time.');
        } else if (status == 'NOT_FOUND') {
            alert('At least one of the origin, destination, or waypoints could not be geocoded.');
        } else if (status == 'INVALID_REQUEST') {
            alert('The DirectionsRequest provided was invalid.');
        } else if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            if (status == 'ZERO_RESULTS') {
                alert("Could not calculate a route to or from one of your destinations.");
            } else {
                alert("There was an unknown error in your request. Requeststatus: " + status);
            }
        }
    });
}
