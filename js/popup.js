//Pure JS code with jQuery implementation
document.addEventListener('DOMContentLoaded', function() {
  var Button = document.getElementById('saveinfo');
  Button.addEventListener('click', function() {
    url = document.getElementById('url').value;
    apikey = document.getElementById('apikey').value;
    chrome.storage.local.set({"url": url}, function() {
      console.log('url is set to ' + url);
    });
    chrome.storage.local.set({"apikey": apikey}, function() {
      console.log('apikey is set to ' + apikey);
    });
  });
}, false);

document.addEventListener('DOMContentLoaded', function() {
  url = document.getElementById('url');
  console.log(url);
  apikey = document.getElementById('apikey');
	chrome.storage.local.get(['url'], function(result) {
    console.log('url currently is ' + result.url);
    if(typeof(result.url) != undefined)
      url.value = result.url
  });
  chrome.storage.local.get(['apikey'], function(result) {
    console.log('apikey currently is ' + result.apikey);
    if(typeof(result.apikey) != undefined)
      apikey.value = result.apikey
  });
}, false);