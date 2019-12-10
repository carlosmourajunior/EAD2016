var timeline;
var author;
var image;
 
var template;
var content;
var link;
 

var url;
var req;
var tweets;
 
onload = setTimeout(init, 0);
 
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
      
      var tab = tabs[0];    
      url = tab.url;    
      var urlSplit = url.split(".")
      url = urlSplit[1]; 
      console.log("RLC:" + url);
  });
}
    
document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl();
});

function init() {
    
	displayLoader(true);
    req = new XMLHttpRequest();
	req.open('GET', 'http://api.zanox.com/json/2011-03-01/incentives/?connectid=60873EC4E3BABAA8E7F9&region=BR&adspace=2111556&incentiveType=coupons');
	req.onload = process;
	req.send();
    
}
 
function process() {	
	update();
}
 
function update() {
    
	displayLoader(false);
    
    var urlLower = url.toLowerCase();
    var textoTotal = req.responseText.toLowerCase();
    
    if(textoTotal.indexOf(urlLower) != -1){
        var button = document.getElementById("navegar");
        button.hidden = false;
    }
	
}
 
function xpath(expression, node) {
	return document.evaluate(expression, node).iterateNext();
}
 
function displayLoader(bool) {
    
	var loader = document.getElementById('loader');
	if (bool) {
		loader.innerHTML = "Buscando...";        
	}
	else {		
        loader.innerHTML = "";
	}
}