var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var url = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74";

var client = Ti.Network.createHTTPClient({
    onload: function() {
        Ti.API.info("Received text: " + this.responseText);
        alert("success");
    },
    onerror: function(e) {
        Ti.API.debug(e.error);
        alert("error");
    },
    timeout: 5e3
});

client.open("GET", url);

client.send();

var foursquareData = JSON.parse(this.responseText);

Ti.UI.backgroundColor = "white";

var win = Ti.UI.createWindow();

var tableData = [ foursquareData ];

var table = Ti.UI.createTableView({
    data: tableData
});

win.add(table);

win.open();

Alloy.createController("index");