// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var url = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74";
var client = Ti.Network.createHTTPClient({
   // function called when the response data is available
        onload : function(e) {
        Ti.API.info("Received text: " + this.responseText);
        alert('success');
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
// Parse using JSON
var foursquareData = JSON.parse(this.responseText);

// Display phone number on click
function doClick(e) {
    alert(foursquareData.contact);
}

// Create a table
Ti.UI.backgroundColor = 'white';
var win = Ti.UI.createWindow();

var tableData = [ foursquareData ];

var table = Ti.UI.createTableView({
  data: tableData
});
win.add(table);
win.open();