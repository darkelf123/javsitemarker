var url
var apikey

chrome.runtime.onMessage.addListener(function (e, sender) {
    //console.log(e);
    const { message, data } = e
    //console.log(data)
    const tabId = sender.tab.id
    switch (message) {
      case 'queryCode':
        queryCode(data, tabId); break
      case 'magReport':
        magReport(data, tabId); break
    }
})

function magReport({title, maglink, meta}, tabId) {
    console.log(title + ":" + meta)
    console.log(maglink)
}

function queryCode({code, idx}, tabId) {
    //console.log(code);
    //console.log("url:"+url);
    //console.log("apikey:"+apikey);
    fetch(url+'/Search/Hints?api_key='+apikey+'&SearchTerm='+code)
    .then(function(response) {
        return response.json();
    })
    .then(function(queryResult) {
        queryResult.SearchHints = queryResult.SearchHints.filter(item => item.Name.trim() == code.trim());
        queryResult.TotalRecordCount = queryResult.SearchHints.length
        console.log(queryResult)
        chrome.tabs.sendMessage(tabId, {
            message: 'queryCode_response',
            data: {queryResult,idx}
        })
    });
}

(function() {
	chrome.storage.local.get(['url'], function(result) {
        //console.log('url currently is ' + result.url);
        if(typeof(result.url) != undefined)
          url = result.url
    });
    chrome.storage.local.get(['apikey'], function(result) {
        //console.log('apikey currently is ' + result.apikey);
        if(typeof(result.apikey) != undefined)
            apikey = result.apikey
    });
})();