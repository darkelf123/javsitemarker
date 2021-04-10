
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

function response({ queryResult, idx }) {
	if (queryResult["TotalRecordCount"] >= 1) {
		box = document.getElementsByClassName("movie-box")[idx];
		button = htmlToElement('<button class="btn btn-xs btn-success" disabled="disabled" title="jellyfin已存在">已存在</button>');
		tags = box.getElementsByClassName("item-tag")[0];
		tags.appendChild(button);
	}
}

(function () {
	boxes = document.getElementsByClassName("movie-box");
	for (var idx = 0; idx < boxes.length; idx++) {
		var box = boxes[idx];
		url = box.getAttribute("href");
		items = url.split("/");
		code = items[items.length - 1];
		console.log(code);

		chrome.runtime.sendMessage(chrome.runtime.id, {
			message: 'queryCode',
			data: { code, idx }
		});
	}
})();