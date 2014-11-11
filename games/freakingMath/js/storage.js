<script>
	!function() {
		if (!window.parent){
			return;
		}

		function set(key, value){
			try{
				window.localStorage.setItem(key, value);
			} catch (e) {}
		}

		function setMax(key, value){
			var tmp_value =  parseInt(get(key),10);

			if(!tmp_value || parseInt(value,10) > tmp_value){
				set(key, value);
			}
		}

		function get(key){
			var value;

			try {
				value = window.localStorage.getItem(key);
			} catch (e) {}

			return value;
		}

		function del(key){
			try {
				return window.localStorage.removeItem(key);
			} catch (e) {}
		}

		window.addEventListener("message", function(e) {
			var messageObject = e.data;

			var localKey = messageObject["key"];

			if(messageObject["remove"]){
				del(localKey);
			} else if(messageObject["value"] || messageObject["value"] == ""){
				switch(messageObject.saveMethod){
					case "max":
						setMax(localKey, messageObject["value"])
						break;
					default:
						set(localKey, messageObject["value"]);
				}

			}

			var value = get(localKey);

			window.parent.postMessage({
				"type": "storage",
				"timestamp": messageObject["timestamp"],
				"key": localKey,
				"value": value
			}, "*");
		}, false);
	}()
</script>