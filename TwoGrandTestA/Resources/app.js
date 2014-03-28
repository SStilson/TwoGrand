// A TableView displaying FourSquare restaurants in a specified area.
// Each restaurant will display a phone number (if available) when clicked.


// Get the current location: not working
//myLat = null;
//myLong = null;
//Ti.Geolocation.purpose = "Receive User Location";
//Ti.Geolocation.getCurrentPosition(function(){ myLat = this.LocationCoordinates.latitude; myLong = this.LocationCoordinates.longitude;});
// Input location into the url
//var url = "https://api.foursquare.com/v2/venues/search?ll="+myLat+","+myLong+"&oauth_token=X4DPNJ0IMZLZZDNIJHMSAXEVB4WEJ4WTHUSM4A0DVW3D11QT&v=20140327";

var url = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=X4DPNJ0IMZLZZDNIJHMSAXEVB4WEJ4WTHUSM4A0DVW3D11QT&v=20140327";
var foursquareData = null;
var phoneList = [];
var client = Ti.Network.createHTTPClient({
   // function called when the response data is available
        onload : function(e) {
        Ti.API.info("Received text: " + this.responseText);
        alert('success');
        // Parse using JSON
        foursquareData = JSON.parse(this.responseText);
        Ti.API.info("foursquareData: " + JSON.stringify(foursquareData));
        
        // Create a table
		Ti.UI.backgroundColor = 'white';
		var win = Ti.UI.createWindow();
		
		// Display restaurant names in a table
		var tableData = [];
		var venuesList = foursquareData.response.venues;
		
		Ti.API.info("VenuesList: " + JSON.stringify(venuesList));
	
		for (var i=0; i<venuesList.length; i++){
			// Add data to rows
			var row = Ti.UI.createTableViewRow({title: venuesList[i].name});
			// Configure a list for phone number information
			if (venuesList[i].contact.hasOwnProperty('formattedPhone')) {
				phoneList[i] = 'Phone: ' + venuesList[i].contact.formattedPhone;
			}
			else if (venuesList[i].contact.hasOwnProperty('phone')) {
				phoneList[i] = 'Phone: ' + venuesList[i].contact.phone;
			}
			else {
				phoneList[i] = 'No phone number available';
			}
			function createListener(i) {
				return function(){alert(phoneList[i]);};
			}
			// Click functionality
			row.addEventListener('click',createListener(i));
			tableData[i] = row;
		};
  
		var table = Ti.UI.createTableView({
 		data: tableData
		});

		win.add(table);
		win.open();
    },
    // function called when an error occurs, including a timeout
    onerror : function(e) {
        Ti.API.debug(e.error);
        alert('error');
    },
    timeout : 5000  // in milliseconds
 });
 
// Prepare the connection.
client.open("GET", url);
// Send the request.
client.send();


