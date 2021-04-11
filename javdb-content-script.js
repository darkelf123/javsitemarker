
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
		box = document.getElementsByClassName("grid-item")[idx];
		button = htmlToElement('<span class="tag is-error">影片已存在</span>');
		box.getElementsByClassName("box")[0].attributes.removeNamedItem("href");
		tags = box.getElementsByClassName("tags")[0];
		let childs = tags.childNodes;
		for (var i = childs.length - 1; i >= 0; i--)
			tags.removeChild(childs[i]);
		tags.appendChild(button);
	}
}

(function () {
	boxes = document.getElementsByClassName("grid-item");
	for (let idx = 0; idx < boxes.length; idx++) {
		var box = boxes[idx];
		var uidNodes = box.getElementsByClassName("uid");
		if (uidNodes.length <= 0)
			continue;
		var code = uidNodes[0].innerHTML;

		chrome.runtime.sendMessage(chrome.runtime.id, {
			message: 'queryCode',
			data: { code, idx }
		});
	}
})();