// A TableView displaying FourSquare restaurants in a specified area.


// Get the current location
//var location = Ti.Geolocation.getCurrentPosition();
// Input location into the url
//var url = "https://api.foursquare.com/v2/venues/search?ll="+location+"&oauth_token=X4DPNJ0IMZLZZDNIJHMSAXEVB4WEJ4WTHUSM4A0DVW3D11QT&v=20140327";

var url = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=X4DPNJ0IMZLZZDNIJHMSAXEVB4WEJ4WTHUSM4A0DVW3D11QT&v=20140327";
var foursquareData = null;
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
		var phoneList = [];
	
		for (var i=0; i<venuesList.length; i++){
			tableData[i] = {title: venuesList[i].name};
			if (venuesList[i].contact.hasOwnProperty('formattedPhone')) {
				phoneList[i] = 'Phone: ' + venuesList[i].contact.formattedPhone;
			}
			else if (venuesList[i].contact.hasOwnProperty('phone')) {
				phoneList[i] = 'Phone: ' + venuesList[i].contact.phone;
			}
			else {
				phoneList[i] = 'No phone number available';
			}
			tableData[i].addEventListener('click',function(){alert(phoneList[i]);});
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


