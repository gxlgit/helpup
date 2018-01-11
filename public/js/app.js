//Materialize
$('.datepicker').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 2, // Creates a dropdown of 15 years to control year,
  today: 'Today',
  clear: 'Clear',
  close: 'Ok',
  closeOnSelect: false // Close upon selecting a date,
})

$('.timepicker').pickatime({
  default: 'now', // Set default time: 'now', '1:30AM', '16:30'
  fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
  twelvehour: false, // Use AM/PM or 24-hour format
  donetext: 'OK', // text for done-button
  cleartext: 'Clear', // text for clear-button
  canceltext: 'Cancel', // Text for cancel-button
  autoclose: false, // automatic close timepicker
  ampmclickable: true, // make AM PM clickable
  aftershow: function(){} //Function for after opening timepicker
})

 $('.button-collapse').sideNav()

 $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

//https://developers.google.com/maps/documentation/javascript/adding-a-google-map#key
  function initMap() {

          var theMap = document.getElementById('job-map')
          var location = {lat: -25.363, lng: 131.044}
          //var location = theMap.innerHTML
          var map = new google.maps.Map( theMap, {
            zoom: 4,
            center: location
          })
          var marker = new google.maps.Marker({
            position: location,
            map: map
          })
        }

        var geocoder;
        var map;
        function initialize() {
          geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(-34.397, 150.644);
          var mapOptions = {
            zoom: 8,
            center: latlng
          }
          map = new google.maps.Map(document.getElementById('job-map'), mapOptions);
        }

        function codeAddress() {
          var address = document.getElementById('address').value;
          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }

//w3Schools
  function validateSignup() {

    if ( document.forms['signup']['name'].value === '') {
        Materialize.toast('Must give a name!', 4000, 'red') // 4000 is the duration of the toast
        //alert('Must give a name');
        return false
    }
    if ( document.forms['signup']['handle'].value === '') {
        Materialize.toast('Must pick a login name!', 4000, 'red') // 4000 is the duration of the toast
        //alert('Must give a name');
        return false
    }
    if ( document.forms['signup']['email'].value === '') {
        Materialize.toast('Must give an email address!', 4000, 'red') // 4000 is the duration of the toast
        //alert('Must give a name');
        return false
    }

    if ( document.forms['signup']['password'].value === '') {
        Materialize.toast('Must pick a password!', 4000, 'red') // 4000 is the duration of the toast
        //alert('Must give a name');
        return false
    }
}
