
chrome.runtime.onMessage.addListener(function (e, sender, sendResponse) {
    const { message, data } = e
    switch (message) {
        case 'queryCode_response':
            response(data); break
    }
})

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function response({queryResult, idx}) {
	if(queryResult["TotalRecordCount"] >= 1) {
		box = document.getElementsByClassName("grid-item")[idx];
		button = htmlToElement('<span class="tag is-error">已存在</span>');
		tags = box.getElementsByClassName("tags")[0];
		tags.appendChild(button);
	}
}

(function() {
	boxes = document.getElementsByClassName("grid-item");
	for (let idx = 0 ; idx < boxes.length; idx++)
	{
		var box = boxes[idx];
		var uidNodes = box.getElementsByClassName("uid");
		if(uidNodes.length <= 0)
			continue;
		var code = uidNodes[0].innerHTML;
		//console.log(code);

		chrome.runtime.sendMessage('pfkimjioppkbfjiadejamoibamnhdplk', {
			message: 'queryCode',
			data: {code,idx}
		});
	}
	boxes = document.getElementsByClassName("magnet-name");
	console.log(boxes)
	for (let idx = 0; idx < boxes.length; idx++)
	{
		title = document.getElementsByClassName('title')[0].innerText
		magbox = boxes[idx].getElementsByTagName("a")[0]
		maglink = magbox.getAttribute('href')
		meta = magbox.getElementsByClassName('meta')[0].innerText
		chrome.runtime.sendMessage('pfkimjioppkbfjiadejamoibamnhdplk', {
			message: 'magReport',
			data: {title, maglink, meta}
		});
	}
})();