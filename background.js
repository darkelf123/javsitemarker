var url
var apikey

chrome.runtime.onMessage.addListener(function (e, sender) {
    const { message, data } = e
    const tabId = sender.tab.id
    switch (message) {
        case 'queryCode':
            queryCode(data, tabId); break
    }
})

function queryCode({ code, idx }, tabId) {
    fetch(url + '/Search/Hints?api_key=' + apikey + '&SearchTerm=' + code)
        .then(function (response) {
            return response.json();
        })
        .then(function (queryResult) {
            queryResult.SearchHints = queryResult.SearchHints.filter(item => item.Name.trim() == code.trim());
            queryResult.TotalRecordCount = queryResult.SearchHints.length
            chrome.tabs.sendMessage(tabId, {
                message: 'queryCode_response',
                data: { queryResult, idx }
            })
        });
}

(function () {
    chrome.storage.local.get(['url'], function (result) {
        if (typeof (result.url) != undefined)
            url = result.url
    });
    chrome.storage.local.get(['apikey'], function (result) {
        if (typeof (result.apikey) != undefined)
            apikey = result.apikey
    });
})();