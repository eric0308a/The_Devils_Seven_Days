var _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function (){
	_Scene_Boot_start.call(this);
	var fs = require("fs");
	var saver = require('path').dirname(process.mainModule.filename) + "\\文本提取.txt";
	fs.writeFileSync(saver, "");
	getAll();
}

function getAll (){
	for (var i=0;i<$dataMapInfos.length;i++){
		if ($dataMapInfos[i]){
			getText($dataMapInfos[i].id);
		}
	}
}

function getText (mapId){
	var filename = 'Map%1.json'.format(mapId.padZero(3));
	var xhr = new XMLHttpRequest();
	var url = 'data/' + filename; 
	xhr.open('GET', url);
	xhr.overrideMimeType('application/json');
	xhr.onload = function (){
		var map =JSON.parse(xhr.responseText);
		var events = map.events;
		console.log("地图" + mapId + "【" + map.displayName + "】加载完成");
		for (var i=0;i<events.length;i++){
			if (events[i]){
				var pages = events[i].pages;
				for (var j=0;j<pages.length;j++){
					if(pages[j]){
						var list = pages[j].list;
						for (var k=0;k<list.length;k++){
							var code = list[k];
							if (code && code.code === 401){
								if (code.parameters[0]){
									var fs = require("fs");
									var saver = require('path').dirname(process.mainModule.filename) + "\\文本提取.txt";
									fs.appendFileSync(saver, code.parameters[0]);
								}
							}
						}
					}
				}
			}
		}
	}
	xhr.onerror = function (){
		$gameMessage.add("地图不存在");
	}
	xhr.send();
}