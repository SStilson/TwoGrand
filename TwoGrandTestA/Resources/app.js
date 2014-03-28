// A TableView displaying FourSquare restaurants in a specified area.


// Get the current location
//var location = Ti.Geolocation.getCurrentPosition();
// Input location into the url
//var url = "https://api.foursquare.com/v2/venues/search?ll="+location+"&oauth_token=X4DPNJ0IMZLZZDNIJHMSAXEVB4WEJ4WTHUSM4A0DVW3D11QT&v=20140327";

var url = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=X4DPNJ0IMZLZZDNIJHMSAXEVB4WEJ4WTHUSM4A0DVW3D11QT&v=20140327";

var client = Ti.Network.createHTTPClient({
   // function called when the response data is available
        onload : function(e) {
        Ti.API.info("Received text: " + this.responseText);
        alert('success');
        // Parse using JSON
        var foursquareData = JSON.parse(this.responseText);
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

// Display phone number on click
function doClick(e) {
    alert('phone');
}

// Create a table
Ti.UI.backgroundColor = 'white';
var win = Ti.UI.createWindow();

// Display restaurant names in a table
var tableData = [];

for (var i=1; i<=20; i++){
	while (client.foursquareData.venues != null) {
		  tableData[i] = {title: String(venues.name)};
	};
};
  
var table = Ti.UI.createTableView({
  data: tableData
});
win.add(table);
win.open();
