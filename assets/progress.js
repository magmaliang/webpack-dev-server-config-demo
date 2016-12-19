//生成一个带有button控制的requestAnimationFrame实现的进度条
module.exports = function(){
	var container = document.createElement("div");
	container.setAttribute("style","width:80%;margin:0 auto;")

	//构建button
	var button = document.createElement("input");
	button.setAttribute("type","button");
	button.setAttribute("value","演示");

	//构建进度条
	var progress = document.createElement("div");
	progress.setAttribute("id","progress");
	progress.setAttribute("style","height:20px;background-color:#0f0;text-align:left;width:0%;");

	//拼装
	container.append(progress);
	container.append(button);

	//事件
	var _percentage = 0;
	function gogogo(){
		_percentage++;
		if (_percentage<=100) {
			progress.setAttribute("style","height:20px;background-color:#0f0;text-align:left;width:"+_percentage+"%;")
			progress.innerHTML = _percentage+"%";

			window.requestAnimationFrame(gogogo);
		}
	}

	button.addEventListener("click",function(){
		if (_percentage >= 100) {
			_percentage = 0;
		}

		gogogo()
	})

	return container;
}