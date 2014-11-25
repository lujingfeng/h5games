var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var co = co || {}
if(!co.doubleduck) co.doubleduck = {}
co.doubleduck.BaseAssets = $hxClasses["co.doubleduck.BaseAssets"] = function() {
};
co.doubleduck.BaseAssets.__name__ = ["co","doubleduck","BaseAssets"];
co.doubleduck.BaseAssets.loader = function() {
	if(co.doubleduck.BaseAssets._loader == null) {
		co.doubleduck.BaseAssets._loader = new createjs.LoadQueue(true);
		co.doubleduck.BaseAssets._loader.installPlugin(createjs.LoadQueue.SOUND);
		co.doubleduck.BaseAssets._loader.onFileLoad = co.doubleduck.BaseAssets.handleFileLoaded;
		co.doubleduck.BaseAssets._loader.onError = co.doubleduck.BaseAssets.handleLoadError;
		co.doubleduck.BaseAssets._loader.setMaxConnections(10);
	}
	return co.doubleduck.BaseAssets._loader;
}
co.doubleduck.BaseAssets.loadAndCall = function(uri,callbackFunc) {
	co.doubleduck.BaseAssets.loader().loadFile(uri);
	co.doubleduck.BaseAssets._loadCallbacks[uri] = callbackFunc;
}
co.doubleduck.BaseAssets.finishLoading = function(manifest,sounds) {
	if(co.doubleduck.SoundManager.available) {
		var _g1 = 0, _g = sounds.length;
		while(_g1 < _g) {
			var currSound = _g1++;
			manifest.push(sounds[currSound] + co.doubleduck.SoundManager.EXTENSION);
			co.doubleduck.SoundManager.initSound(sounds[currSound]);
		}
	}
	if(co.doubleduck.BaseAssets._useLocalStorage) co.doubleduck.BaseAssets.loadFromLocalStorage(manifest);
	if(manifest.length == 0) {
		if(co.doubleduck.BaseAssets.onLoadAll != null) co.doubleduck.BaseAssets.onLoadAll();
	}
	co.doubleduck.BaseAssets.loader().onProgress = co.doubleduck.BaseAssets.handleProgress;
	co.doubleduck.BaseAssets.loader().onFileLoad = co.doubleduck.BaseAssets.manifestFileLoad;
	co.doubleduck.BaseAssets.loader().loadManifest(manifest);
	co.doubleduck.BaseAssets.loader().load();
}
co.doubleduck.BaseAssets.loadAll = function(manifest,sounds) {
	manifest[manifest.length] = "images/duckling/orientation_error_port.png";
	manifest[manifest.length] = "images/duckling/orientation_error_land.png";
	manifest[manifest.length] = "images/duckling/page_marker.png";
}
co.doubleduck.BaseAssets.audioLoaded = function(event) {
	co.doubleduck.BaseAssets._cacheData[event.item.src] = event;
}
co.doubleduck.BaseAssets.manifestFileLoad = function(event) {
	if(co.doubleduck.BaseAssets._useLocalStorage && event != null) {
		var utils = new ddjsutils();
		try {
			var fileName = event.item.src;
			if(HxOverrides.substr(fileName,fileName.length - 3,null) == "jpg") return;
			co.doubleduck.BasePersistence.setValue(event.item.src,utils.getBase64Image(event.result));
		} catch( err ) {
		}
	}
}
co.doubleduck.BaseAssets.loadFromLocalStorage = function(manifest) {
	var entriesToRemove = new Array();
	var _g1 = 0, _g = manifest.length;
	while(_g1 < _g) {
		var i = _g1++;
		var entry = manifest[i];
		var value = co.doubleduck.BasePersistence.getValue(entry);
		if(value != null) {
			var bmp = new createjs.Bitmap("data:image/png;base64," + value);
			co.doubleduck.BaseAssets._cacheData[entry] = bmp.image;
			entriesToRemove.push(manifest[i]);
		}
	}
	var _g1 = 0, _g = entriesToRemove.length;
	while(_g1 < _g) {
		var j = _g1++;
		HxOverrides.remove(manifest,entriesToRemove[j]);
	}
}
co.doubleduck.BaseAssets.handleProgress = function(event) {
	co.doubleduck.BaseAssets.loaded = event.loaded;
	if(event.loaded == event.total) {
		co.doubleduck.BaseAssets.loader().onProgress = null;
		co.doubleduck.BaseAssets.onLoadAll();
	}
}
co.doubleduck.BaseAssets.handleLoadError = function(event) {
}
co.doubleduck.BaseAssets.handleFileLoaded = function(event) {
	if(event != null) {
		co.doubleduck.BaseAssets._cacheData[event.item.src] = event.result;
		var callbackFunc = Reflect.field(co.doubleduck.BaseAssets._loadCallbacks,event.item.src);
		if(callbackFunc != null) callbackFunc();
	}
}
co.doubleduck.BaseAssets.getAsset = function(uri) {
	var cache = Reflect.field(co.doubleduck.BaseAssets._cacheData,uri);
	if(cache == null) {
		if(co.doubleduck.BaseAssets.loader().getResult(uri) != null) {
			cache = co.doubleduck.BaseAssets.loader().getResult(uri);
			co.doubleduck.BaseAssets._cacheData[uri] = cache;
		}
	}
	return cache;
}
co.doubleduck.BaseAssets.getRawImage = function(uri) {
	var cache = co.doubleduck.BaseAssets.getAsset(uri);
	if(cache == null) {
		var bmp = new createjs.Bitmap(uri);
		co.doubleduck.BaseAssets._cacheData[uri] = bmp.image;
		cache = bmp.image;
		null;
	}
	return cache;
}
co.doubleduck.BaseAssets.getImage = function(uri,mouseEnabled) {
	if(mouseEnabled == null) mouseEnabled = false;
	var result = new createjs.Bitmap(co.doubleduck.BaseAssets.getRawImage(uri));
	result.mouseEnabled = mouseEnabled;
	return result;
}
co.doubleduck.BaseAssets.prototype = {
	__class__: co.doubleduck.BaseAssets
}
co.doubleduck.Assets = $hxClasses["co.doubleduck.Assets"] = function() {
	co.doubleduck.BaseAssets.call(this);
};
co.doubleduck.Assets.__name__ = ["co","doubleduck","Assets"];
co.doubleduck.Assets.getVictoryBackgroundName = function(bg) {
	return "images/end_screen/end_screen_" + bg + ".png";
}
co.doubleduck.Assets.getBackgroundName = function(bg) {
	return "images/session/bg/bg" + bg + ".png";
}
co.doubleduck.Assets.getForegroundName = function(fg) {
	return "images/session/fg/fg" + fg + ".png";
}
co.doubleduck.Assets.getCoverName = function(cover) {
	return "images/session/cover/cover" + cover + ".png";
}
co.doubleduck.Assets.getBrickName = function(world,brick) {
	var w = "a";
	if(world == 2) w = "b"; else if(world == 3) w = "c";
	return "images/session/bricks/" + w + brick + ".png";
}
co.doubleduck.Assets.getObstacleName = function(obstacle) {
	return "images/session/bricks/obstacle" + obstacle + ".png";
}
co.doubleduck.Assets.loadAll = function() {
	var manifest = new Array();
	var sounds = new Array();
	sounds.push("sound/button");
	sounds.push("sound/menu-theme");
	sounds.push("sound/KeyInput");
	sounds.push("sound/softBoom");
	sounds.push("sound/swipingPart");
	sounds.push("sound/tuneLose");
	sounds.push("sound/tuneWin");
	sounds.push("sound/safeDoorBends");
	sounds.push("sound/safeDoorCrash");
	co.doubleduck.BaseAssets.loadAll(manifest,sounds);
	manifest.push("images/splash/splash_1.png");
	manifest.push("images/splash/splash_2.png");
	manifest.push("images/splash/splash_3.png");
	manifest.push("images/splash/logo.png");
	manifest.push("images/splash/tap2play.png");
	manifest.push("images/menu/bg.jpg");
	manifest.push("images/menu/arrow_menu.png");
	manifest.push("images/menu/button_help.png");
	manifest.push("images/menu/button_sound.png");
	var _g = 1;
	while(_g < 4) {
		var i = _g++;
		manifest.push("images/menu/frame_" + i + ".png");
		manifest.push("images/menu/level_icon_" + i + ".png");
	}
	manifest.push("images/menu/safe_explosion.png");
	manifest.push("images/menu/V.png");
	manifest.push("images/menu/lock.png");
	manifest.push("images/menu/star.png");
	manifest.push("images/menu/help_screen/help_screen.png");
	manifest.push("images/menu/help_screen/button_got_it.png");
	var _g = 0;
	while(_g < 10) {
		var f = _g++;
		manifest.push("images/menu/menu_font/" + f + ".png");
	}
	var _g = 1;
	while(_g < 4) {
		var bg = _g++;
		manifest.push(co.doubleduck.Assets.getBackgroundName(bg));
	}
	var _g = 1;
	while(_g < 4) {
		var fg = _g++;
		manifest.push(co.doubleduck.Assets.getForegroundName(fg));
	}
	var _g = 1;
	while(_g < 4) {
		var cover = _g++;
		manifest.push(co.doubleduck.Assets.getCoverName(cover));
	}
	var _g = 1;
	while(_g < 4) {
		var world = _g++;
		var _g1 = 1;
		while(_g1 < 7) {
			var brick = _g1++;
			manifest.push(co.doubleduck.Assets.getBrickName(world,brick));
		}
	}
	var _g = 1;
	while(_g < 4) {
		var obstacle = _g++;
		manifest.push(co.doubleduck.Assets.getObstacleName(obstacle));
	}
	manifest.push("images/session/key/key.png");
	manifest.push("images/session/key/key_green.png");
	manifest.push("images/session/key/lock.png");
	manifest.push("images/session/key/lock_green.png");
	manifest.push("images/session/UI/button_pause.png");
	manifest.push("images/session/UI/UI.png");
	var _g = 0;
	while(_g < 10) {
		var number = _g++;
		manifest.push("images/session/UI/UI_font/" + number + ".png");
	}
	manifest.push("images/session/UI/pause_screen/button_menu.png");
	manifest.push("images/session/UI/pause_screen/button_restart.png");
	manifest.push("images/session/UI/pause_screen/button_play.png");
	manifest.push("images/session/UI/pause_screen/pause.png");
	manifest.push("images/session/police_alert/walkie_talkie.png");
	manifest.push("images/session/police_alert/red_button.png");
	manifest.push("images/session/police_alert/police_bar.png");
	manifest.push("images/session/police_alert/push_button.png");
	var _g = 1;
	while(_g < 4) {
		var bg = _g++;
		manifest.push(co.doubleduck.Assets.getVictoryBackgroundName(bg));
	}
	var _g = 1;
	while(_g < 7) {
		var treasure = _g++;
		manifest.push("images/end_screen/treasure_" + treasure + ".png");
	}
	manifest.push("images/end_screen/button_menu.png");
	manifest.push("images/end_screen/button_next.png");
	manifest.push("images/end_screen/perfect_solution.png");
	manifest.push("images/session/game_won/end_game.png");
	manifest.push("images/session/game_won/back_to_menu.png");
	manifest.push("images/session/lose_screen/bars.png");
	manifest.push("images/session/lose_screen/busted.png");
	manifest.push("images/session/lose_screen/button_restart.png");
	manifest.push("images/session/lose_screen/buttons_block.png");
	co.doubleduck.BaseAssets.finishLoading(manifest,sounds);
}
co.doubleduck.Assets.__super__ = co.doubleduck.BaseAssets;
co.doubleduck.Assets.prototype = $extend(co.doubleduck.BaseAssets.prototype,{
	__class__: co.doubleduck.Assets
});
co.doubleduck.BaseGame = $hxClasses["co.doubleduck.BaseGame"] = function(stage) {
	this._waitingToStart = false;
	this._orientError = null;
	this._prevWinSize = new createjs.Rectangle(0,0,1,1);
	if(this._wantLandscape) {
		co.doubleduck.BaseGame.MAX_HEIGHT = 427;
		co.doubleduck.BaseGame.MAX_WIDTH = 915;
	} else {
		co.doubleduck.BaseGame.MAX_HEIGHT = 760;
		co.doubleduck.BaseGame.MAX_WIDTH = 427;
	}
	if(co.doubleduck.BaseGame.DEBUG) co.doubleduck.BasePersistence.clearAll();
	var isGS3Stock = /Android 4.0.4/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && /GT-I9300/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && !/Chrome/.test(navigator.userAgent);
	
	/*if(isGS3Stock) {
		var loc = window.location.href;
		if(loc.lastIndexOf("index.html") != -1) loc = HxOverrides.substr(loc,0,loc.lastIndexOf("index.html"));
		loc += "error.html";
		window.location.href=loc;
		return;
	}
	*/
	co.doubleduck.Persistence.initGameData();
	co.doubleduck.BaseGame._stage = stage;
	co.doubleduck.BaseGame._stage.onTick = $bind(this,this.handleStageTick);
	co.doubleduck.BaseGame._viewport = new createjs.Rectangle(0,0,1,1);
	co.doubleduck.BaseGame.hammer = new Hammer(js.Lib.document.getElementById("stageCanvas"));
	viewporter.preventPageScroll = true;
	viewporter.change($bind(this,this.handleViewportChanged));
	if(viewporter.ACTIVE) {
		viewporter.preventPageScroll = true;
		viewporter.change($bind(this,this.handleViewportChanged));
		if(this._wantLandscape != viewporter.isLandscape()) {
			if(this._wantLandscape) co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.ORIENT_LAND_URI,$bind(this,this.waitForOrientation)); else co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.ORIENT_PORT_URI,$bind(this,this.waitForOrientation));
		} else co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill));
	} else co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill));
};
co.doubleduck.BaseGame.__name__ = ["co","doubleduck","BaseGame"];
co.doubleduck.BaseGame._stage = null;
co.doubleduck.BaseGame.MAX_HEIGHT = null;
co.doubleduck.BaseGame.MAX_WIDTH = null;
co.doubleduck.BaseGame.hammer = null;
co.doubleduck.BaseGame.getViewport = function() {
	return co.doubleduck.BaseGame._viewport;
}
co.doubleduck.BaseGame.getScale = function() {
	return co.doubleduck.BaseGame._scale;
}
co.doubleduck.BaseGame.getStage = function() {
	return co.doubleduck.BaseGame._stage;
}
co.doubleduck.BaseGame.prototype = {
	setScale: function() {
		var fixedVal = co.doubleduck.BaseGame._viewport.width;
		var varVal = co.doubleduck.BaseGame._viewport.height;
		var idealFixed = co.doubleduck.BaseGame.MAX_WIDTH;
		var idealVar = co.doubleduck.BaseGame.MAX_HEIGHT;
		if(this._wantLandscape) {
			fixedVal = co.doubleduck.BaseGame._viewport.height;
			varVal = co.doubleduck.BaseGame._viewport.width;
			idealFixed = co.doubleduck.BaseGame.MAX_HEIGHT;
			idealVar = co.doubleduck.BaseGame.MAX_WIDTH;
		}
		var regScale = varVal / idealVar;
		if(fixedVal >= varVal) co.doubleduck.BaseGame._scale = regScale; else if(idealFixed * regScale < fixedVal) co.doubleduck.BaseGame._scale = fixedVal / idealFixed; else co.doubleduck.BaseGame._scale = regScale;
	}
	,handleViewportChanged: function() {
		if(this._wantLandscape != viewporter.isLandscape()) {
			if(this._orientError == null) {
				var err = co.doubleduck.BaseGame.ORIENT_PORT_URI;
				if(this._wantLandscape) err = co.doubleduck.BaseGame.ORIENT_LAND_URI;
				this._orientError = co.doubleduck.BaseAssets.getImage(err);
				this._orientError.regX = this._orientError.image.width / 2;
				this._orientError.regY = this._orientError.image.height / 2;
				this._orientError.x = co.doubleduck.BaseGame._viewport.height / 2;
				this._orientError.y = co.doubleduck.BaseGame._viewport.width / 2;
				co.doubleduck.BaseGame._stage.addChildAt(this._orientError,co.doubleduck.BaseGame._stage.getNumChildren());
				co.doubleduck.BaseGame._stage.update();
			}
		} else if(this._orientError != null) {
			co.doubleduck.BaseGame._stage.removeChild(this._orientError);
			this._orientError = null;
			if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame._stage.update();
			if(this._waitingToStart) {
				this._waitingToStart = false;
				co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOGO_URI,$bind(this,this.loadBarFill));
			}
		}
	}
	,focused: function() {
		co.doubleduck.SoundManager.unmute();
	}
	,blured: function(e) {
		co.doubleduck.SoundManager.mute();
	}
	,handleResize: function(e) {
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isAndroid = /Android/.test(navigator.userAgent);
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		co.doubleduck.BaseGame._stage.canvas.width = screenW;
		co.doubleduck.BaseGame._stage.canvas.height = screenH;
		var shouldResize = this._wantLandscape == viewporter.isLandscape() || !viewporter.ACTIVE;
		if(shouldResize) {
			if(isFirefox) {
				screenH = Math.floor(co.doubleduck.Main.getFFHeight());
				var ffEstimate = Math.ceil((js.Lib.window.screen.height - 110) * (screenW / js.Lib.window.screen.width));
				if(!isAndroid) ffEstimate = Math.ceil((js.Lib.window.screen.height - 30) * (screenW / js.Lib.window.screen.width));
				if(ffEstimate < screenH) screenH = Math.floor(ffEstimate);
			}
			var wrongSize = screenH < screenW;
			if(this._wantLandscape) wrongSize = screenH > screenW;
			if(!viewporter.ACTIVE || !wrongSize) {
				co.doubleduck.BaseGame._viewport.width = screenW;
				co.doubleduck.BaseGame._viewport.height = screenH;
				this.setScale();
			}
			if(this._orientError != null && isFirefox) this.handleViewportChanged();
		} else if(isFirefox) this.handleViewportChanged();
		if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame._stage.update();
	}
	,handleBackToMenu: function() {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.BaseGame._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,handleRestart: function(properties) {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this.startSession(properties);
	}
	,handleSessionEnd: function() {
	}
	,handlePlayClick: function(properties) {
		co.doubleduck.BaseGame._stage.removeChild(this._menu);
		this.startSession(properties);
		this._menu.destroy();
		this._menu = null;
	}
	,startSession: function(properties) {
		this._session = new co.doubleduck.Session(properties);
		this._session.onBackToMenu = $bind(this,this.handleBackToMenu);
		this._session.onRestart = $bind(this,this.handleRestart);
		this._session.onSessionEnd = $bind(this,this.handleSessionEnd);
		co.doubleduck.BaseGame._stage.addChild(this._session);
	}
	,showMenu: function() {
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.BaseGame._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,alphaFade: function(fadeElement) {
		if(fadeElement != null && js.Boot.__instanceof(fadeElement,createjs.Bitmap)) this._fadedText = fadeElement; else if(this._fadedText == null) return;
		if(this._fadedText.alpha == 0) createjs.Tween.get(this._fadedText).to({ alpha : 1},750).call($bind(this,this.alphaFade)); else if(this._fadedText.alpha == 1) createjs.Tween.get(this._fadedText).to({ alpha : 0},1500).call($bind(this,this.alphaFade));
	}
	,showGameSplash: function() {
	}
	,splashEnded: function() {
		js.Lib.document.body.bgColor = "#000000";
		co.doubleduck.BaseGame._stage.removeChild(this._splash);
		this._splash = null;
		js.Lib.window.onresize = $bind(this,this.handleResize);
		this.handleResize(null);
		this.showGameSplash();
	}
	,handleDoneLoading: function() {
		createjs.Tween.get(this._splash).wait(200).to({ alpha : 0},800).call($bind(this,this.splashEnded));
		co.doubleduck.BaseGame._stage.removeChild(this._loadingBar);
		co.doubleduck.BaseGame._stage.removeChild(this._loadingStroke);
	}
	,updateLoading: function() {
		if(co.doubleduck.BaseAssets.loaded != 1) {
			this._loadingBar.visible = true;
			var percent = co.doubleduck.BaseAssets.loaded;
			var barMask = new createjs.Shape();
			barMask.graphics.beginFill("#00000000");
			barMask.graphics.drawRect(this._loadingBar.x - this._loadingBar.image.width / 2,this._loadingBar.y,this._loadingBar.image.width * percent | 0,this._loadingBar.image.height);
			barMask.graphics.endFill();
			this._loadingBar.mask = barMask;
			co.doubleduck.Utils.waitAndCall(this,10,$bind(this,this.updateLoading));
		}
	}
	,exitFocus: function() {
		var hidden = document.mozHidden;
		if(hidden) co.doubleduck.SoundManager.mute(false); else if(!co.doubleduck.SoundManager.getPersistedMute()) co.doubleduck.SoundManager.unmute(false);
	}
	,showSplash: function() {
		if(viewporter.ACTIVE) js.Lib.document.body.bgColor = "#00A99D"; else js.Lib.document.body.bgColor = "#D94D00";
		this._splash = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOGO_URI);
		this._splash.regX = this._splash.image.width / 2;
		this._splash.x = js.Lib.window.innerWidth / 2;
		if(this._wantLandscape) this._splash.y = 20; else this._splash.y = 90;
		co.doubleduck.BaseGame._stage.addChild(this._splash);
		this._loadingStroke = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOAD_STROKE_URI);
		this._loadingStroke.regX = this._loadingStroke.image.width / 2;
		co.doubleduck.BaseGame._stage.addChildAt(this._loadingStroke,0);
		this._loadingBar = co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.LOAD_FILL_URI);
		this._loadingBar.regX = this._loadingBar.image.width / 2;
		co.doubleduck.BaseGame._stage.addChildAt(this._loadingBar,1);
		this._loadingBar.x = js.Lib.window.innerWidth / 2;
		this._loadingBar.y = this._splash.y + 192;
		this._loadingStroke.x = this._loadingBar.x;
		this._loadingStroke.y = this._loadingBar.y;
		this._loadingBar.visible = false;
		this.updateLoading();
		co.doubleduck.BaseGame._stage.canvas.width = js.Lib.window.innerWidth;
		co.doubleduck.BaseGame._stage.canvas.height = js.Lib.window.innerHeight;
		co.doubleduck.BaseAssets.onLoadAll = $bind(this,this.handleDoneLoading);
		co.doubleduck.Assets.loadAll();
		document.addEventListener('mozvisibilitychange', this.exitFocus);
	}
	,waitForOrientation: function() {
		this._waitingToStart = true;
		if(this._orientError == null) {
			this._orientError = this.getErrorImage();
			this._orientError.regX = this._orientError.image.width / 2;
			this._orientError.regY = this._orientError.image.height / 2;
			this._orientError.x = js.Lib.window.innerWidth / 2;
			this._orientError.y = js.Lib.window.innerHeight / 2;
			co.doubleduck.BaseGame._stage.addChildAt(this._orientError,co.doubleduck.BaseGame._stage.getNumChildren());
		}
	}
	,getErrorImage: function() {
		if(this._wantLandscape) return co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.ORIENT_LAND_URI); else return co.doubleduck.BaseAssets.getImage(co.doubleduck.BaseGame.ORIENT_PORT_URI);
	}
	,loadBarStroke: function() {
		co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOAD_STROKE_URI,$bind(this,this.showSplash));
	}
	,loadBarFill: function() {
		co.doubleduck.BaseAssets.loadAndCall(co.doubleduck.BaseGame.LOAD_FILL_URI,$bind(this,this.loadBarStroke));
	}
	,handleStageTick: function() {
		if(js.Lib.window.innerWidth != this._prevWinSize.width || js.Lib.window.innerHeight != this._prevWinSize.height) {
			this._prevWinSize.width = js.Lib.window.innerWidth;
			this._prevWinSize.height = js.Lib.window.innerHeight;
			this.handleResize(null);
		}
	}
	,_prevWinSize: null
	,_fadedText: null
	,_loadingStroke: null
	,_loadingBar: null
	,_waitingToStart: null
	,_orientError: null
	,_wantLandscape: null
	,_session: null
	,_menu: null
	,_splash: null
	,__class__: co.doubleduck.BaseGame
}
co.doubleduck.BaseMenu = $hxClasses["co.doubleduck.BaseMenu"] = function() {
	createjs.Container.call(this);
};
co.doubleduck.BaseMenu.__name__ = ["co","doubleduck","BaseMenu"];
co.doubleduck.BaseMenu.__super__ = createjs.Container;
co.doubleduck.BaseMenu.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		this.onPlayClick = null;
	}
	,onPlayClick: null
	,__class__: co.doubleduck.BaseMenu
});
co.doubleduck.BasePersistence = $hxClasses["co.doubleduck.BasePersistence"] = function() { }
co.doubleduck.BasePersistence.__name__ = ["co","doubleduck","BasePersistence"];
co.doubleduck.BasePersistence.localStorageSupported = function() {
	var result = null;
	try {
		localStorage.setItem("test","test");
		localStorage.removeItem("test");
		result = true;
	} catch( e ) {
		result = false;
	}
	return result;
}
co.doubleduck.BasePersistence.getValue = function(key) {
	if(!co.doubleduck.BasePersistence.available) return "0";
	var val = localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.BasePersistence.setValue = function(key,value) {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key] = value;
}
co.doubleduck.BasePersistence.clearAll = function() {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage.clear();
}
co.doubleduck.BasePersistence.initVar = function(initedVar,defaultVal) {
	if(defaultVal == null) defaultVal = "0";
	var value = co.doubleduck.BasePersistence.getValue(initedVar);
	if(value == null) try {
		co.doubleduck.BasePersistence.setValue(initedVar,defaultVal);
	} catch( e ) {
		co.doubleduck.BasePersistence.available = false;
	}
}
co.doubleduck.BasePersistence.getDynamicValue = function(key) {
	if(!co.doubleduck.BasePersistence.available) return { };
	var val = localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.BasePersistence.setDynamicValue = function(key,value) {
	if(!co.doubleduck.BasePersistence.available) return;
	localStorage[co.doubleduck.BasePersistence.GAME_PREFIX + key] = value;
}
co.doubleduck.BasePersistence.initDynamicVar = function(initedVar,defaultVal) {
	var value = co.doubleduck.BasePersistence.getDynamicValue(initedVar);
	if(value == null) try {
		co.doubleduck.BasePersistence.setDynamicValue(initedVar,defaultVal);
	} catch( e ) {
		co.doubleduck.BasePersistence.available = false;
	}
}
co.doubleduck.BasePersistence.printAll = function() {
	var ls = localStorage;
	var localStorageLength = ls.length;
	var _g = 0;
	while(_g < localStorageLength) {
		var entry = _g++;
		null;
	}
}
co.doubleduck.BaseSession = $hxClasses["co.doubleduck.BaseSession"] = function() {
	createjs.Container.call(this);
};
co.doubleduck.BaseSession.__name__ = ["co","doubleduck","BaseSession"];
co.doubleduck.BaseSession.__super__ = createjs.Container;
co.doubleduck.BaseSession.prototype = $extend(createjs.Container.prototype,{
	destroy: function() {
		createjs.Ticker.removeListener(this);
		this.onRestart = null;
		this.onBackToMenu = null;
		this.onSessionEnd = null;
		this.onNextLevel = null;
	}
	,sessionEnded: function() {
		if(this.onSessionEnd != null) {
			createjs.Ticker.setPaused(false);
			this.onSessionEnd();
		}
	}
	,handleReplayClick: function(properties) {
		if(this.onRestart != null) {
			createjs.Ticker.setPaused(false);
			//window.mobileAPI.events.resume();
			this.onRestart(properties);
		}
	}
	,handleMenuClick: function() {
		if(this.onBackToMenu != null) {
			createjs.Ticker.setPaused(false);
			this.onBackToMenu();
		}
	}
	,_replayBtn: null
	,_menuBtn: null
	,onNextLevel: null
	,onBackToMenu: null
	,onSessionEnd: null
	,onRestart: null
	,__class__: co.doubleduck.BaseSession
});
co.doubleduck.TiledObject = $hxClasses["co.doubleduck.TiledObject"] = function() { }
co.doubleduck.TiledObject.__name__ = ["co","doubleduck","TiledObject"];
co.doubleduck.TiledObject.prototype = {
	adjacentTo: function(rect) {
		if(rect.x == this.getBounds().x + this.getBounds().width && rect.y == this.getBounds().y) return true;
		if(rect.x + rect.width == this.getBounds().x && rect.y == this.getBounds().y) return true;
		if(rect.y == this.getBounds().y + this.getBounds().height && rect.x == this.getBounds().x) return true;
		if(rect.y + rect.height == this.getBounds().y && rect.x == this.getBounds().x) return true;
		return false;
	}
	,intersectsWith: function(rect) {
		if(rect.x >= this.getBounds().x + this.getBounds().width) return false;
		if(rect.x + rect.width <= this.getBounds().x) return false;
		if(rect.y >= this.getBounds().y + this.getBounds().height) return false;
		if(rect.y + rect.height <= this.getBounds().y) return false;
		return true;
	}
	,containtsPoint: function(point) {
		var x1 = this.getBounds().x;
		var y1 = this.getBounds().y;
		var x2 = x1 + this.getBounds().width;
		var y2 = y1 + this.getBounds().height;
		var contains = point.x > x1 && point.y > y1 && point.x < x2 && point.y < y2;
		return contains;
	}
	,getBounds: function() {
		return this._bounds;
	}
	,add: function() {
		this.onAdd(this.getGraphic());
	}
	,setLocation: function(tileX,tileY) {
		this.getGraphic().x = tileX * co.doubleduck.TiledObject.TILE_WIDTH;
		this.getGraphic().y = tileY * co.doubleduck.TiledObject.TILE_HEIGHT;
		this._bounds.x = tileX;
		this._bounds.y = tileY;
		if(this._isVertical) this.getGraphic().y += co.doubleduck.TiledObject.TILE_HEIGHT;
	}
	,init: function(tileX,tileY,isVertical) {
		if(isVertical != null) {
			this._isVertical = isVertical;
			this.getGraphic().rotation = isVertical?-90:0;
		}
		if(this._isVertical) this._bounds = new createjs.Rectangle(0,0,this._size,1); else this._bounds = new createjs.Rectangle(0,0,1,this._size);
		this.setLocation(tileX,tileY);
	}
	,isVertical: function() {
		return this._isVertical;
	}
	,getGraphic: function() {
		return Reflect.field(this,"_graphic");
	}
	,_bounds: null
	,_isVertical: null
	,_size: null
	,onAdd: null
	,__class__: co.doubleduck.TiledObject
}
co.doubleduck.Movable = $hxClasses["co.doubleduck.Movable"] = function() {
	this._pointInObject = new createjs.Point(0,0);
};
co.doubleduck.Movable.__name__ = ["co","doubleduck","Movable"];
co.doubleduck.Movable.__super__ = co.doubleduck.TiledObject;
co.doubleduck.Movable.prototype = $extend(co.doubleduck.TiledObject.prototype,{
	moveTo: function(tileX,tileY) {
		this._bounds.x = tileX;
		this._bounds.y = tileY;
		var toX = tileX * co.doubleduck.TiledObject.TILE_WIDTH;
		var toY = tileY * co.doubleduck.TiledObject.TILE_HEIGHT;
		this.getGraphic().x = toX;
		if(!this._isVertical) this.getGraphic().y = toY; else this.getGraphic().y = toY + co.doubleduck.TiledObject.TILE_HEIGHT;
	}
	,snapToGrid: function() {
		this.setLocation(Math.round(this._bounds.x),Math.round(this._bounds.y));
	}
	,getPointInObject: function(point) {
		this._pointInObject.x = point.x - this.getBounds().x;
		this._pointInObject.y = point.y - this.getBounds().y;
		return this._pointInObject;
	}
	,setLastDirection: function(dir) {
		this._lastDirection = dir;
	}
	,_lastDirection: null
	,_pointInObject: null
	,__class__: co.doubleduck.Movable
});
co.doubleduck.Brick = $hxClasses["co.doubleduck.Brick"] = function(id,world,tileX,tileY,isVertical) {
	co.doubleduck.Movable.call(this);
	var data = co.doubleduck.DataLoader.getBrick(id);
	this._size = data.size;
	this._graphic = co.doubleduck.BaseAssets.getImage(co.doubleduck.Assets.getBrickName(world,data.image));
	this.init(tileX,tileY,isVertical);
};
co.doubleduck.Brick.__name__ = ["co","doubleduck","Brick"];
co.doubleduck.Brick.__super__ = co.doubleduck.Movable;
co.doubleduck.Brick.prototype = $extend(co.doubleduck.Movable.prototype,{
	_graphic: null
	,__class__: co.doubleduck.Brick
});
co.doubleduck.LabeledContainer = $hxClasses["co.doubleduck.LabeledContainer"] = function(bmp) {
	createjs.Container.call(this);
	this._bitmap = bmp;
	if(this._bitmap != null) {
		if(js.Boot.__instanceof(this._bitmap,createjs.Bitmap)) {
			this._bmp = this._bitmap;
			this.image = this._bmp.image;
		} else if(js.Boot.__instanceof(this._bitmap,createjs.BitmapAnimation)) {
			this.anim = this._bitmap;
			this.image = { width : this.anim.spriteSheet._frameWidth, height : this.anim.spriteSheet._frameHeight};
		}
	}
};
co.doubleduck.LabeledContainer.__name__ = ["co","doubleduck","LabeledContainer"];
co.doubleduck.LabeledContainer.__super__ = createjs.Container;
co.doubleduck.LabeledContainer.prototype = $extend(createjs.Container.prototype,{
	getLabel: function() {
		return this._label;
	}
	,addBitmap: function() {
		this.addChild(this._bitmap);
	}
	,addCenteredBitmap: function() {
		this._bitmap.regX = this.image.width / 2;
		this._bitmap.regY = this.image.height / 2;
		this._bitmap.x = this.image.width / 2;
		this._bitmap.y = this.image.height / 2;
		this.addChild(this._bitmap);
	}
	,addBitmapLabel: function(label,fontType,padding,centered) {
		if(centered == null) centered = true;
		if(padding == null) padding = 0;
		if(fontType == null) fontType = "";
		if(this._bitmapText != null) this.removeChild(this._bitmapText);
		var fontHelper = new co.doubleduck.FontHelper(fontType);
		this._bitmapText = fontHelper.getNumber(Std.parseInt(label),1,true,null,padding,centered);
		if(this.image != null) {
			this._bitmapText.x = this.image.width / 2;
			this._bitmapText.y = this.image.height / 2;
		}
		this._label = label;
		this.addChild(this._bitmapText);
	}
	,scaleBitmapFont: function(scale) {
		this._bitmapText.scaleX = this._bitmapText.scaleY = scale;
	}
	,shiftLabel: function(shiftX,shiftY) {
		this._bitmapText.x *= shiftX;
		this._bitmapText.y *= shiftY;
	}
	,setBitmapLabelY: function(ly) {
		this._bitmapText.y = ly;
	}
	,setBitmapLabelX: function(lx) {
		this._bitmapText.x = lx;
	}
	,getBitmapLabelWidth: function() {
		var maxWidth = 0;
		var _g1 = 0, _g = this._bitmapText.getNumChildren();
		while(_g1 < _g) {
			var digit = _g1++;
			var currentDigit = js.Boot.__cast(this._bitmapText.getChildAt(digit) , createjs.Bitmap);
			var endsAt = currentDigit.x + currentDigit.image.width;
			if(endsAt > maxWidth) maxWidth = endsAt;
		}
		return maxWidth;
	}
	,setLabelY: function(ly) {
		this._text.y = ly;
	}
	,setLabelX: function(lx) {
		this._text.x = lx;
	}
	,addLabel: function(label,color) {
		if(color == null) color = "#000000";
		if(this._text != null) this.removeChild(this._text);
		this._label = label;
		this._text = new createjs.Text(label,"bold 22px Arial",color);
		this._text.regY = this._text.getMeasuredHeight() / 2;
		this._text.textAlign = "center";
		if(this._bitmap != null) {
			this._text.x = this._bitmap.x;
			this._text.y = this._bitmap.y;
		}
		this.addChild(this._text);
	}
	,changeText: function(txt) {
	}
	,_bitmapText: null
	,_text: null
	,_bmp: null
	,_bitmap: null
	,_label: null
	,anim: null
	,image: null
	,__class__: co.doubleduck.LabeledContainer
});
co.doubleduck.Button = $hxClasses["co.doubleduck.Button"] = function(bmp,pauseAffected,clickType,clickSound) {
	if(clickType == null) clickType = 2;
	if(pauseAffected == null) pauseAffected = true;
	this._lastClickTime = 0;
	co.doubleduck.LabeledContainer.call(this,bmp);
	if(clickSound == null && co.doubleduck.Button._defaultSound != null) this._clickSound = co.doubleduck.Button._defaultSound; else this._clickSound = clickSound;
	this._bitmap.mouseEnabled = true;
	this._clickType = clickType;
	this._pauseAffected = pauseAffected;
	if(clickType == co.doubleduck.Button.CLICK_TYPE_TOGGLE) {
		var initObject = { };
		var size = this.image.width / 2;
		initObject.images = [this.image];
		initObject.frames = { width : size, height : this.image.height, regX : size / 2, regY : this.image.height / 2};
		this._states = new createjs.BitmapAnimation(new createjs.SpriteSheet(initObject));
		this._states.gotoAndStop(0);
		this.onClick = $bind(this,this.handleToggle);
		this.addChild(this._states);
	} else this.addCenteredBitmap();
	this.onPress = $bind(this,this.handlePress);
};
co.doubleduck.Button.__name__ = ["co","doubleduck","Button"];
co.doubleduck.Button.setDefaultSound = function(sound) {
	co.doubleduck.Button._defaultSound = sound;
}
co.doubleduck.Button.__super__ = co.doubleduck.LabeledContainer;
co.doubleduck.Button.prototype = $extend(co.doubleduck.LabeledContainer.prototype,{
	handleEndPressTint: function() {
		co.doubleduck.Utils.tintBitmap(this._bmp,1,1,1,1);
		if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame.getStage().update();
	}
	,setToggle: function(flag) {
		if(flag) this._states.gotoAndStop(0); else this._states.gotoAndStop(1);
	}
	,handleToggle: function(e) {
		if(this.onToggle == null) return;
		if(this._lastClickPos == null) this._lastClickPos = new createjs.Point(0,0);
		if((this._lastClickPos.x < e.stageX + 1 || this._lastClickPos.x > e.stageX + 1) && (this._lastClickPos.y < e.stageY + 1 || this._lastClickPos.y > e.stageY + 1)) {
			var now = createjs.Ticker.getTime(true);
			if(now < this._lastClickTime + 500) return;
		}
		this._lastClickPos.x = e.stageX;
		this._lastClickPos.y = e.stageY;
		this._lastClickTime = createjs.Ticker.getTime(true);
		this._states.gotoAndStop(1 - this._states.currentFrame);
		this.onToggle();
	}
	,handlePress: function(event) {
		if(createjs.Ticker.getPaused() && this._pauseAffected) return;
		if(this._clickType == co.doubleduck.Button.CLICK_TYPE_HOLD) {
			if(this.onHoldStart != null) {
				this.onHoldStart();
				event.onMouseUp = this.onHoldFinish;
			}
		}
		if(this.onClick != null) {
			if(this._clickSound != null) co.doubleduck.SoundManager.playEffect(this._clickSound);
			switch(this._clickType) {
			case co.doubleduck.Button.CLICK_TYPE_TINT:
				if(this._bmp != null) {
					co.doubleduck.Utils.tintBitmap(this._bmp,0.55,0.55,0.55,1);
					var tween = createjs.Tween.get(this._bmp);
					tween.ignoreGlobalPause = true;
					tween.wait(200).call($bind(this,this.handleEndPressTint));
					if(createjs.Ticker.getPaused()) co.doubleduck.BaseGame.getStage().update();
				}
				break;
			case co.doubleduck.Button.CLICK_TYPE_JUICY:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.25;
				this._bitmap.scaleY = startScaleY * 0.75;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},500,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_SCALE:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.18;
				this._bitmap.scaleY = startScaleY * 1.18;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},200,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_TOGGLE:
				break;
			case co.doubleduck.Button.CLICK_TYPE_NONE:
				break;
			case co.doubleduck.Button.CLICK_TYPE_HOLD:
				throw "Use onHoldStart with CLICK_TYPE_HOLD, not onClick";
				break;
			}
		}
	}
	,setNoSound: function() {
		this._clickSound = null;
	}
	,_lastClickPos: null
	,_lastClickTime: null
	,_clickSound: null
	,_juiceTween: null
	,_clickType: null
	,_pauseAffected: null
	,_states: null
	,onHoldFinish: null
	,onHoldStart: null
	,onToggle: null
	,__class__: co.doubleduck.Button
});
co.doubleduck.DataLoader = $hxClasses["co.doubleduck.DataLoader"] = function() { }
co.doubleduck.DataLoader.__name__ = ["co","doubleduck","DataLoader"];
co.doubleduck.DataLoader.getBrick = function(id) {
	var bricks = co.doubleduck.DataLoader.getAllBricks();
	var _g = 0;
	while(_g < bricks.length) {
		var brick = bricks[_g];
		++_g;
		if((brick.id | 0) == id) return brick;
	}
	throw "Error: no such brick!";
}
co.doubleduck.DataLoader.getLevel = function(id) {
	var levels = co.doubleduck.DataLoader.getAllLevels();
	var _g = 0;
	while(_g < levels.length) {
		var level = levels[_g];
		++_g;
		if((level.id | 0) == id) return level;
	}
	throw "Error: no such level!";
}
co.doubleduck.DataLoader.getAllBricks = function() {
	return new GameplayDB().getAllBricks();
}
co.doubleduck.DataLoader.getAllLevels = function() {
	return new LevelDB().getAllLevels();
}
co.doubleduck.DataLoader.getLevelCount = function() {
	return co.doubleduck.DataLoader.getAllLevels().length;
}
co.doubleduck.FontHelper = $hxClasses["co.doubleduck.FontHelper"] = function(type) {
	this._fontType = type;
};
co.doubleduck.FontHelper.__name__ = ["co","doubleduck","FontHelper"];
co.doubleduck.FontHelper.prototype = {
	getNumber: function(num,scale,forceContainer,dims,padding,centered) {
		if(centered == null) centered = true;
		if(padding == null) padding = 0;
		if(forceContainer == null) forceContainer = false;
		if(scale == null) scale = 1;
		if(num >= 0 && num < 10) {
			var result = new createjs.Container();
			var bmp = this.getDigit(num);
			bmp.scaleX = bmp.scaleY = scale;
			result.addChild(bmp);
			if(centered) {
				result.regX = bmp.image.width / 2;
				result.regY = bmp.image.height / 2;
			}
			if(forceContainer) {
				if(dims != null) {
					dims.width = bmp.image.width;
					dims.height = bmp.image.height;
				}
				return result;
			} else return bmp;
		} else {
			var result = new createjs.Container();
			var numString = "" + num;
			var digits = new Array();
			var totalWidth = 0;
			digits[digits.length] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,0,1)));
			digits[0].scaleX = digits[0].scaleY = scale;
			result.addChild(digits[0]);
			totalWidth += digits[0].image.width * scale;
			if(numString.length == 4 || numString.length == 7) {
				this._lastComma = this.getComma();
				this._lastComma.scaleX = this._lastComma.scaleY = scale;
				this._lastComma.x = digits[0].x + digits[0].image.width + padding;
				result.addChild(this._lastComma);
				totalWidth += this._lastComma.image.width * scale;
			}
			var _g1 = 1, _g = numString.length;
			while(_g1 < _g) {
				var i = _g1++;
				var index = digits.length;
				digits[index] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,i,1)));
				if(numString.length - i == 3 || numString.length - i == 6) digits[index].x = this._lastComma.x + this._lastComma.image.width + padding; else digits[index].x = digits[index - 1].x + digits[index - 1].image.width + padding;
				digits[index].scaleX = digits[index].scaleY = scale;
				result.addChild(digits[index]);
				totalWidth += digits[index].image.width * scale + padding;
				if(numString.length - i == 4 || numString.length - i == 7) {
					this._lastComma = this.getComma();
					this._lastComma.scaleX = this._lastComma.scaleY = scale;
					this._lastComma.x = digits[index].x + digits[index].image.width + padding;
					result.addChild(this._lastComma);
					totalWidth += this._lastComma.image.width * scale + padding;
				}
			}
			if(centered) {
				result.regX = totalWidth / 2;
				result.regY = digits[0].image.height / 2;
			}
			if(dims != null) {
				dims.width = totalWidth;
				dims.height = digits[0].image.height;
			}
			return result;
		}
	}
	,getDigit: function(digit) {
		var digit1 = co.doubleduck.BaseAssets.getImage(this._fontType + digit + ".png");
		return digit1;
	}
	,getComma: function() {
		return co.doubleduck.BaseAssets.getImage(this._fontType + "comma.png");
	}
	,_fontType: null
	,_lastComma: null
	,__class__: co.doubleduck.FontHelper
}
co.doubleduck.Game = $hxClasses["co.doubleduck.Game"] = function(stage) {
	this._wantLandscape = false;
	co.doubleduck.BaseGame.call(this,stage);
	co.doubleduck.Button.setDefaultSound("sound/button");
};
co.doubleduck.Game.__name__ = ["co","doubleduck","Game"];
co.doubleduck.Game.__super__ = co.doubleduck.BaseGame;
co.doubleduck.Game.prototype = $extend(co.doubleduck.BaseGame.prototype,{
	handleNextLevel: function(properties) {
		this._session.destroy();
		co.doubleduck.BaseGame._stage.removeChild(this._session);
		this._session = null;
		this.startSession(properties);
	}
	,startSession: function(properties) {
		co.doubleduck.BaseGame.prototype.startSession.call(this,properties);
		this._session.onNextLevel = $bind(this,this.handleNextLevel);
	}
	,removeSplashElements: function() {
		co.doubleduck.BaseGame._stage.removeChild(this._splashBackClosed);
		co.doubleduck.BaseGame._stage.removeChild(this._splashBackOpened);
		co.doubleduck.BaseGame._stage.removeChild(this._splashBackLight);
		co.doubleduck.BaseGame._stage.removeChild(this._splashLogo);
		co.doubleduck.BaseGame._stage.removeChild(this._tapToPlay);
		//window.mobileAPI.events.started();
	}
	,switchToMenu: function() {
		this._splashBackOpened.onClick = null;
		this._splashBackOpened.mouseEnabled = false;
		this.showMenu();
		createjs.Tween.removeTweens(this._tapToPlay);
		createjs.Tween.get(this._tapToPlay).to({ alpha : 0},200);
		createjs.Tween.get(this._splashBackOpened).to({ alpha : 0},200);
		createjs.Tween.get(this._splashBackLight).to({ alpha : 0},200);
		createjs.Tween.get(this._splashLogo).to({ alpha : 0},200).call($bind(this,this.removeSplashElements));
	}
	,showTap2Play: function() {
		this.alphaFade(this._tapToPlay);
		this._splashBackOpened.mouseEnabled = true;
		this._splashBackOpened.onClick = $bind(this,this.switchToMenu);
	}
	,showLogo: function() {
		createjs.Tween.get(this._splashLogo).to({ alpha : 1},300).call($bind(this,this.showTap2Play));
	}
	,showBackLights: function() {
		var targetScale = co.doubleduck.BaseGame.getViewport().height * 0.12;
		createjs.Tween.get(this._lightsMask).wait(250).to({ scaleX : targetScale, scaleY : targetScale},300).wait(200).call($bind(this,this.showLogo));
		createjs.Tween.get(this._splashBackLight).wait(150).to({ alpha : 1},350);
	}
	,showGameSplash: function() {
		this._splashBackOpened = co.doubleduck.Utils.getCenteredImage("images/splash/splash_2.png",true);
		this._splashBackOpened.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._splashBackOpened.y = co.doubleduck.BaseGame.getViewport().height / 2;
		co.doubleduck.BaseGame._stage.addChild(this._splashBackOpened);
		this._splashBackLight = co.doubleduck.Utils.getCenteredImage("images/splash/splash_3.png",true);
		this._splashBackLight.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._splashBackLight.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this._splashBackLight.alpha = 0;
		co.doubleduck.BaseGame._stage.addChild(this._splashBackLight);
		this._lightsMask = new createjs.Shape();
		this._lightsMask.graphics.beginFill("#000000");
		this._lightsMask.graphics.drawRect(0,0,10,20);
		this._lightsMask.graphics.endFill();
		this._lightsMask.regX = 5;
		this._lightsMask.regY = 10;
		this._lightsMask.x = this._splashBackLight.x;
		this._lightsMask.y = this._splashBackLight.y;
		this._splashBackLight.mask = this._lightsMask;
		this._splashBackClosed = co.doubleduck.Utils.getCenteredImage("images/splash/splash_1.png",true);
		this._splashBackClosed.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._splashBackClosed.y = co.doubleduck.BaseGame.getViewport().height / 2;
		co.doubleduck.BaseGame._stage.addChild(this._splashBackClosed);
		this._splashLogo = co.doubleduck.Utils.getCenteredImage("images/splash/logo.png",true);
		this._splashLogo.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._splashLogo.y = co.doubleduck.BaseGame.getViewport().height * 0.18;
		this._splashLogo.alpha = 0;
		co.doubleduck.BaseGame._stage.addChild(this._splashLogo);
		this._tapToPlay = co.doubleduck.Utils.getCenteredImage("images/splash/tap2play.png",true);
		this._tapToPlay.x = co.doubleduck.BaseGame.getViewport().width * 0.55;
		this._tapToPlay.y = this._splashBackOpened.y - this._splashBackOpened.image.height * co.doubleduck.BaseGame.getScale() * 0.5;
		this._tapToPlay.y += this._splashBackOpened.image.height * co.doubleduck.BaseGame.getScale() * 0.76;
		this._tapToPlay.alpha = 0;
		co.doubleduck.BaseGame._stage.addChild(this._tapToPlay);
		createjs.Tween.get(this._splashBackClosed).wait(650).to({ alpha : 0},350).call($bind(this,this.showBackLights));
	}
	,_tapToPlay: null
	,_splashLogo: null
	,_lightsMask: null
	,_splashBackLight: null
	,_splashBackOpened: null
	,_splashBackClosed: null
	,__class__: co.doubleduck.Game
});
co.doubleduck.HelpScreen = $hxClasses["co.doubleduck.HelpScreen"] = function() {
	createjs.Container.call(this);
	this.alpha = 0;
	this._background = co.doubleduck.Utils.getCenteredImage("images/menu/help_screen/help_screen.png",true);
	this._background.x = co.doubleduck.BaseGame.getViewport().width / 2;
	this._background.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this.addChild(this._background);
	this._continueButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/help_screen/button_got_it.png"),true);
	this._continueButton.scaleX = this._continueButton.scaleY = co.doubleduck.BaseGame.getScale();
	this._continueButton.x = co.doubleduck.BaseGame.getViewport().width * 0.65;
	this._continueButton.y = co.doubleduck.BaseGame.getViewport().height * 0.8;
	this.addChild(this._continueButton);
	this._continueButton.mouseEnabled = true;
	this._continueButton.onClick = $bind(this,this.handleContinue);
};
co.doubleduck.HelpScreen.__name__ = ["co","doubleduck","HelpScreen"];
co.doubleduck.HelpScreen.__super__ = createjs.Container;
co.doubleduck.HelpScreen.prototype = $extend(createjs.Container.prototype,{
	show: function() {
		createjs.Tween.get(this).to({ alpha : 1},400);
	}
	,handleContinue: function() {
		createjs.Tween.get(this).to({ alpha : 0},400).call(this.onContinue);
	}
	,_continueButton: null
	,_background: null
	,onContinue: null
	,__class__: co.doubleduck.HelpScreen
});
co.doubleduck.Key = $hxClasses["co.doubleduck.Key"] = function(tileX,tileY) {
	co.doubleduck.Movable.call(this);
	this._size = 2;
	this._graphic = new createjs.Container();
	this._graphic.addChild(co.doubleduck.BaseAssets.getImage("images/session/key/key.png"));
	this.init(tileX,tileY,false);
};
co.doubleduck.Key.__name__ = ["co","doubleduck","Key"];
co.doubleduck.Key.__super__ = co.doubleduck.Movable;
co.doubleduck.Key.prototype = $extend(co.doubleduck.Movable.prototype,{
	activate: function() {
		this._graphic.addChild(co.doubleduck.BaseAssets.getImage("images/session/key/key_green.png"));
	}
	,_graphic: null
	,__class__: co.doubleduck.Key
});
co.doubleduck.Lock = $hxClasses["co.doubleduck.Lock"] = function(tileX,tileY) {
	this._size = 1;
	this._graphic = new createjs.Container();
	this._graphic.addChild(co.doubleduck.BaseAssets.getImage("images/session/key/lock.png"));
	this.init(tileX,tileY,false);
};
co.doubleduck.Lock.__name__ = ["co","doubleduck","Lock"];
co.doubleduck.Lock.__super__ = co.doubleduck.TiledObject;
co.doubleduck.Lock.prototype = $extend(co.doubleduck.TiledObject.prototype,{
	activate: function() {
		this._graphic.addChild(co.doubleduck.BaseAssets.getImage("images/session/key/lock_green.png"));
	}
	,_graphic: null
	,__class__: co.doubleduck.Lock
});
co.doubleduck.LossScreen = $hxClasses["co.doubleduck.LossScreen"] = function(properties) {
	createjs.Container.call(this);
	this._background = co.doubleduck.Utils.getCenteredImage("images/session/lose_screen/bars.png",true);
	this._busted = co.doubleduck.Utils.getCenteredImage("images/session/lose_screen/busted.png",true);
	this._busted.x = this._background.x = co.doubleduck.BaseGame.getViewport().width / 2;
	this._busted.y = this._background.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this._busted.y -= 160 * co.doubleduck.BaseGame.getScale();
	this.addChild(this._background);
	this.addChild(this._busted);
	this._menuButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(co.doubleduck.LossScreen.MENU),true);
	this._menuButton.scaleX = this._menuButton.scaleY = co.doubleduck.BaseGame.getScale();
	this._menuButton.x = this._background.x - this._menuButton.image.width * 1.15 * co.doubleduck.BaseGame.getScale();
	this._menuButton.y = this._background.y - this._background.image.height / 10 * co.doubleduck.BaseGame.getScale();
	this._menuButton.mouseEnabled = true;
	this._menuButton.onClick = $bind(this,this.handleMenu);
	this._restartButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(co.doubleduck.LossScreen.RESTART),true);
	this._restartButton.scaleX = this._restartButton.scaleY = co.doubleduck.BaseGame.getScale();
	this._restartButton.x = this._menuButton.x + this._menuButton.image.width * 1.25 * co.doubleduck.BaseGame.getScale();
	this._restartButton.y = this._menuButton.y;
	this._restartButton.mouseEnabled = true;
	this._restartButton.onClick = $bind(this,this.handleContinue);
	this._buttonBackground = co.doubleduck.Utils.getCenteredImage("images/session/lose_screen/buttons_block.png");
	this._buttonBackground.x = this._background.x;
	this._buttonBackground.y = this._background.y - 50 * co.doubleduck.BaseGame.getScale();
	this.addChild(this._buttonBackground);
	this.addChild(this._menuButton);
	this.addChild(this._restartButton);
	this.y = -co.doubleduck.BaseGame.getViewport().height;
	createjs.Tween.get(this).to({ y : 0},1000,createjs.Ease.sineInOut);
};
co.doubleduck.LossScreen.__name__ = ["co","doubleduck","LossScreen"];
co.doubleduck.LossScreen.__super__ = createjs.Container;
co.doubleduck.LossScreen.prototype = $extend(createjs.Container.prototype,{
	handleContinue: function() {
		this.onRestart();
	}
	,handleMenu: function() {
		this.onMenu();
	}
	,onRestart: null
	,onMenu: null
	,_restartButton: null
	,_menuButton: null
	,_buttonBackground: null
	,_busted: null
	,_background: null
	,__class__: co.doubleduck.LossScreen
});
co.doubleduck.Main = $hxClasses["co.doubleduck.Main"] = function() { }
co.doubleduck.Main.__name__ = ["co","doubleduck","Main"];
co.doubleduck.Main._stage = null;
co.doubleduck.Main._game = null;
co.doubleduck.Main._ffHeight = null;
co.doubleduck.Main.main = function() {
	co.doubleduck.Main.testFFHeight();
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
	co.doubleduck.Main._stage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	co.doubleduck.Main._game = new co.doubleduck.Game(co.doubleduck.Main._stage);
	createjs.Ticker.addListener(co.doubleduck.Main._stage);
	createjs.Touch.enable(co.doubleduck.Main._stage,true,false);
}
co.doubleduck.Main.testFFHeight = function() {
	var isAplicable = /Firefox/.test(navigator.userAgent);
	if(isAplicable && viewporter.ACTIVE) co.doubleduck.Main._ffHeight = js.Lib.window.innerHeight;
}
co.doubleduck.Main.getFFHeight = function() {
	return co.doubleduck.Main._ffHeight;
}
co.doubleduck.Map = $hxClasses["co.doubleduck.Map"] = function(bricks,obstacles,key,lock,moves,world) {
	this._graphic = new createjs.Container();
	this._moves = moves;
	this._obstacles = new Array();
	this._bricks = new Array();
	var _g = 0;
	while(_g < bricks.length) {
		var brick = bricks[_g];
		++_g;
		var currBrick = new co.doubleduck.Brick(brick.id,world,brick.x,brick.y,brick.isVertical);
		this._bricks.push(currBrick);
		currBrick.onAdd = $bind(this,this.handleAdd);
		currBrick.add();
	}
	var _g = 0;
	while(_g < obstacles.length) {
		var obstacle = obstacles[_g];
		++_g;
		var currObstacle = new co.doubleduck.Obstacle(obstacle.id,obstacle.x,obstacle.y);
		this._obstacles.push(currObstacle);
		currObstacle.onAdd = $bind(this,this.handleAdd);
		currObstacle.add();
	}
	this._key = new co.doubleduck.Key(key.x,key.y);
	this._key.onAdd = $bind(this,this.handleAdd);
	this._key.add();
	this._lock = new co.doubleduck.Lock(lock.x,lock.y);
	this._lock.onAdd = $bind(this,this.handleAdd);
	this._lock.add();
};
co.doubleduck.Map.__name__ = ["co","doubleduck","Map"];
co.doubleduck.Map.prototype = {
	dragIfYouCan: function(draggedBrick,dragTo) {
		var objects = this.getAllObjects();
		HxOverrides.remove(objects,draggedBrick);
		if(!draggedBrick.isVertical()) dragTo.x = draggedBrick.getBounds().x; else dragTo.y = draggedBrick.getBounds().y;
		var canMove = true;
		var bounds = draggedBrick.getBounds().clone();
		var dx = dragTo.x - bounds.x;
		var dy = dragTo.y - bounds.y;
		if(Math.abs(dx) > 1) {
			if(dx < 0) dx = -0.5; else dx = 0.5;
		}
		if(Math.abs(dy) > 1) {
			if(dy < 0) dy = -0.5; else dy = 0.5;
		}
		if(this._dragSound != null) {
			var delta = dx + dy;
			if(delta != 0) {
				this._dragSound.playEffect(1,true);
				this._dragSound = null;
			}
		}
		bounds.x += dx;
		bounds.y += dy;
		dragTo.x = bounds.x;
		dragTo.y = bounds.y;
		var _g = 0;
		while(_g < objects.length) {
			var otherObjects = objects[_g];
			++_g;
			if(otherObjects.intersectsWith(bounds)) {
				canMove = false;
				break;
			}
		}
		if(canMove) draggedBrick.moveTo(dragTo.x,dragTo.y); else draggedBrick.snapToGrid();
	}
	,handleDrag: function(startPixel,endPixel,direction) {
		var tileStart = new createjs.Point(startPixel.x / co.doubleduck.TiledObject.TILE_WIDTH,startPixel.y / co.doubleduck.TiledObject.TILE_HEIGHT);
		var tileEnd = new createjs.Point(endPixel.x / co.doubleduck.TiledObject.TILE_WIDTH,endPixel.y / co.doubleduck.TiledObject.TILE_HEIGHT);
		var firstDrag = !this._isDragging;
		if(firstDrag) {
			this.startDragging();
			var _g = 0, _g1 = this.getMovables();
			while(_g < _g1.length) {
				var brick = _g1[_g];
				++_g;
				if(brick.containtsPoint(tileStart)) {
					this._draggedBrick = brick;
					this._draggedBrickOriginalBounds = brick.getBounds().clone();
					this._pointInBrick = this._draggedBrick.getPointInObject(tileStart);
					break;
				}
			}
		}
		if(this._draggedBrick == null) return;
		this._draggedBrick.setLastDirection(direction);
		this.clipToBounds(tileEnd,this._pointInBrick,this._draggedBrick);
		tileEnd.x -= this._pointInBrick.x;
		tileEnd.y -= this._pointInBrick.y;
		if(this._draggedBrick != null) this.dragIfYouCan(this._draggedBrick,tileEnd);
	}
	,clipToBounds: function(destination,pointInBrick,brick) {
		if(!brick.isVertical()) {
			var lowerBound = destination.y - pointInBrick.y;
			if(js.Boot.__instanceof(brick,co.doubleduck.Key)) lowerBound = Math.max(lowerBound,-1); else lowerBound = Math.max(lowerBound,0);
			lowerBound = Math.min(lowerBound,co.doubleduck.Map.ROWS - brick.getBounds().height);
			destination.y = lowerBound + pointInBrick.y;
		} else {
			var lowerBound = destination.x - pointInBrick.x;
			lowerBound = Math.max(lowerBound,0);
			lowerBound = Math.min(lowerBound,co.doubleduck.Map.COLUMNS - brick.getBounds().width);
			destination.x = lowerBound + pointInBrick.x;
		}
	}
	,endDragging: function() {
		this._isDragging = false;
		this._hasMovedBrick = false;
		if(this._draggedBrick != null) {
			this._draggedBrick.snapToGrid();
			if(this._draggedBrickOriginalBounds.x == this._draggedBrick.getBounds().x && this._draggedBrickOriginalBounds.y == this._draggedBrick.getBounds().y) this._hasMovedBrick = false; else this._hasMovedBrick = true;
		} else return false;
		if(this._draggedBrick == this._key && this._lock.intersectsWith(this._key.getBounds())) {
			co.doubleduck.SoundManager.playEffect("sound/KeyInput");
			this._key.activate();
			this._lock.activate();
			this._hasWon = true;
		}
		this._draggedBrick = null;
		this._pointInBrick = null;
		return true;
	}
	,startDragging: function() {
		this._draggedBrick = null;
		this._pointInBrick = null;
		this._isDragging = true;
		if(this._dragSound == null && !co.doubleduck.SoundManager.isMuted()) this._dragSound = co.doubleduck.SoundManager.getAudioInstance("sound/swipingPart");
	}
	,setLocation: function(x,y) {
		this._graphic.x = x;
		this._graphic.y = y;
	}
	,getY: function() {
		return this._graphic.y;
	}
	,getX: function() {
		return this._graphic.x;
	}
	,setScale: function(scale) {
		this._graphic.scaleX = this._graphic.scaleY = scale;
	}
	,handleAdd: function(graphic) {
		this._graphic.addChild(graphic);
	}
	,add: function() {
		this.onAdd(this._graphic);
	}
	,getAllObjects: function() {
		var objects = new Array();
		objects.push(this._key);
		var _g = 0, _g1 = this._bricks;
		while(_g < _g1.length) {
			var brick = _g1[_g];
			++_g;
			objects.push(brick);
		}
		var _g = 0, _g1 = this._obstacles;
		while(_g < _g1.length) {
			var obstacle = _g1[_g];
			++_g;
			objects.push(obstacle);
		}
		return objects;
	}
	,getMovables: function() {
		var objects = new Array();
		objects.push(this._key);
		var _g = 0, _g1 = this._bricks;
		while(_g < _g1.length) {
			var brick = _g1[_g];
			++_g;
			objects.push(brick);
		}
		return objects;
	}
	,getGraphic: function() {
		return this._graphic;
	}
	,hasWon: function() {
		return this._hasWon;
	}
	,hasMovedBrick: function() {
		return this._hasMovedBrick;
	}
	,isDragging: function() {
		return this._isDragging;
	}
	,_dragSound: null
	,_hasMovedBrick: null
	,_pointInBrick: null
	,_draggedBrickOriginalBounds: null
	,_draggedBrick: null
	,onAdd: null
	,_hasWon: null
	,_isDragging: null
	,_moves: null
	,_lock: null
	,_key: null
	,_obstacles: null
	,_bricks: null
	,_graphic: null
	,__class__: co.doubleduck.Map
}
co.doubleduck.Menu = $hxClasses["co.doubleduck.Menu"] = function() {
	co.doubleduck.BaseMenu.call(this);
	this._page = 0;
	this._active = true;
	this._buttons = new Array();
	co.doubleduck.Menu.LEVELS = co.doubleduck.DataLoader.getLevelCount();
	this._background = co.doubleduck.Utils.getCenteredImage("images/menu/bg.jpg",true);
	this._background.x = co.doubleduck.BaseGame.getViewport().width / 2;
	this._background.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this._background.mouseEnabled = true;
	this.addChild(this._background);
	this._lvlButtonsLayer = new createjs.Container();
	this.addChild(this._lvlButtonsLayer);
	var _g1 = 1, _g = co.doubleduck.Menu.LEVELS + 1;
	while(_g1 < _g) {
		var level = _g1++;
		this.addLevelButton(level);
	}
	this._page = Math.floor((co.doubleduck.Session.getLastLevelId() - 1) / co.doubleduck.Menu.LEVELS_PER_SCREEN);
	if(this._page == -1) this._page = Math.floor((co.doubleduck.Persistence.getUnlockedLevel() - 1) / co.doubleduck.Menu.LEVELS_PER_SCREEN);
	if(this._page > Math.floor(co.doubleduck.Menu.LEVELS / co.doubleduck.Menu.LEVELS_PER_SCREEN) - 1) this._page = Math.floor(co.doubleduck.Menu.LEVELS / co.doubleduck.Menu.LEVELS_PER_SCREEN) - 1;
	this._lvlButtonsLayer.x = this._page * -co.doubleduck.BaseGame.getViewport().width;
	this._leftArrow = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/arrow_menu.png"));
	this._leftArrow.scaleX = this._leftArrow.scaleY = co.doubleduck.BaseGame.getScale();
	this._leftArrow.regY = this._leftArrow.image.height / 2;
	this._leftArrow.x = co.doubleduck.BaseGame.getScale() * 10;
	this._leftArrow.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this.addChild(this._leftArrow);
	this._leftArrow.onClick = $bind(this,this.goLeft);
	this._leftArrow.visible = false;
	this._rightArrow = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/arrow_menu.png"));
	this._rightArrow.scaleX = this._rightArrow.scaleY = co.doubleduck.BaseGame.getScale();
	this._rightArrow.scaleX *= -1;
	this._rightArrow.regY = this._rightArrow.image.height / 2;
	this._rightArrow.x = co.doubleduck.BaseGame.getViewport().width - this._leftArrow.x;
	this._rightArrow.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this.addChild(this._rightArrow);
	this._rightArrow.onClick = $bind(this,this.goRight);
	this.setupArrowVisibility();
	var ham = co.doubleduck.BaseGame.hammer;
	ham.option("swipe",true);
	co.doubleduck.BaseGame.hammer.onswipe = $bind(this,this.handleSwipe);
	this._helpBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/button_help.png"));
	this.addChild(this._helpBtn);
	this._helpBtn.regX = this._helpBtn.image.width / 2;
	this._helpBtn.regY = this._helpBtn.image.height;
	this._helpBtn.scaleX = this._helpBtn.scaleY = co.doubleduck.BaseGame.getScale();
	this._helpBtn.x = co.doubleduck.BaseGame.getViewport().width * 0.145;
	this._helpBtn.y = co.doubleduck.BaseGame.getViewport().height * 0.93;
	this._helpBtn.onClick = $bind(this,this.handleHelp);
	this._helpBtn.alpha = 0;
	this.addChild(this._helpBtn);
	createjs.Tween.get(this._helpBtn).to({ alpha : 1},200);
	if(co.doubleduck.SoundManager.available) {
		this._muteBtn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/button_sound.png"),true,co.doubleduck.Button.CLICK_TYPE_TOGGLE);
		this.addChild(this._muteBtn);
		this._muteBtn.regX = this._muteBtn.image.width / 2;
		this._muteBtn.regY = this._muteBtn.image.height / 2;
		this._muteBtn.scaleX = this._muteBtn.scaleY = co.doubleduck.BaseGame.getScale();
		this._muteBtn.x = co.doubleduck.BaseGame.getViewport().width * 0.4;
		this._muteBtn.y = this._helpBtn.y;
		this._muteBtn.setToggle(!co.doubleduck.SoundManager.isMuted());
		this._muteBtn.onToggle = $bind(this,this.handleMuteToggle);
		this._muteBtn.alpha = 0;
		this.addChild(this._muteBtn);
		createjs.Tween.get(this._muteBtn).to({ alpha : 1},200);
	}
	this._help = new co.doubleduck.HelpScreen();
	this._help.onContinue = $bind(this,this.handleBackFromHelp);
	this.addChild(this._help);
	this._menuTheme = co.doubleduck.SoundManager.playMusic("sound/menu-theme");
};
co.doubleduck.Menu.__name__ = ["co","doubleduck","Menu"];
co.doubleduck.Menu._blastSheet = null;
co.doubleduck.Menu._levelToStart = null;
co.doubleduck.Menu._largeScale = null;
co.doubleduck.Menu._button = null;
co.doubleduck.Menu.__super__ = co.doubleduck.BaseMenu;
co.doubleduck.Menu.prototype = $extend(co.doubleduck.BaseMenu.prototype,{
	destroy: function() {
		co.doubleduck.BaseMenu.prototype.destroy.call(this);
		if(this._menuTheme != null) this._menuTheme.stop();
	}
	,onExplosionEnd: function(explosionGraphic,animationName) {
		explosionGraphic.stop();
		explosionGraphic.visible = false;
		var container = js.Boot.__cast(explosionGraphic.parent , createjs.Container);
		if(this.onPlayClick != null) {
			var properties = { level : co.doubleduck.Menu._levelToStart};
			var shiftX = -co.doubleduck.Menu._button.x * co.doubleduck.Menu._largeScale - (this._frame.image.width - this._fakeLevel.image.width) * co.doubleduck.BaseGame.getScale() / 2;
			var shiftY = -co.doubleduck.Menu._button.y * co.doubleduck.Menu._largeScale - (this._frame.image.height - this._fakeLevel.image.height) * co.doubleduck.BaseGame.getScale() / 2;
			var bgShiftX = -(this._fakeLevel.image.width * co.doubleduck.BaseGame.getScale() - co.doubleduck.BaseGame.getViewport().width) / 2;
			var bgShiftY = -(this._fakeLevel.image.height * co.doubleduck.BaseGame.getScale() - co.doubleduck.BaseGame.getViewport().height) / 2;
			shiftX += bgShiftX;
			shiftY += bgShiftY;
			createjs.Tween.get(container).to({ scaleX : co.doubleduck.Menu._largeScale, scaleY : co.doubleduck.Menu._largeScale, x : shiftX, y : shiftY},1000,createjs.Ease.sineInOut).call(this.onPlayClick,[properties]);
		}
	}
	,handlePlayClick: function(level,btn) {
		if(!this._active) return;
		this._active = false;
		createjs.Tween.removeTweens(this._lvlButtonsLayer);
		co.doubleduck.BaseGame.hammer.onswipe = null;
		this._rightArrow.visible = false;
		this._leftArrow.visible = false;
		if(this._muteBtn != null) this._muteBtn.visible = false;
		this._helpBtn.visible = false;
		co.doubleduck.Menu._button = btn;
		if(co.doubleduck.Menu._blastSheet == null) {
			var bmp = co.doubleduck.BaseAssets.getImage("images/menu/safe_explosion.png");
			var initObject = { };
			initObject.images = [bmp.image];
			initObject.frames = { width : 300, height : 300, regX : 150, regY : 150};
			initObject.animations = { };
			initObject.animations.explode = { frames : [0,1,2,3,4,5,6,7,8,9], frequency : 1};
			co.doubleduck.Menu._blastSheet = new createjs.SpriteSheet(initObject);
		}
		var explosionGraphic = new createjs.BitmapAnimation(co.doubleduck.Menu._blastSheet);
		var pageContainer = null;
		var _g = 0, _g1 = this._buttons;
		while(_g < _g1.length) {
			var button = _g1[_g];
			++_g;
			if(btn == button) {
				pageContainer = js.Boot.__cast(btn.parent , createjs.Container);
				pageContainer.addChildAt(explosionGraphic,3);
				explosionGraphic.x = btn.x + btn.image.width * co.doubleduck.BaseGame.getScale();
				explosionGraphic.y = btn.y + btn.image.height * co.doubleduck.BaseGame.getScale();
				explosionGraphic.regX = btn.regX;
				explosionGraphic.regY = btn.regY;
				explosionGraphic.scaleX = explosionGraphic.scaleY = co.doubleduck.BaseGame.getScale();
			} else {
			}
		}
		co.doubleduck.Menu._levelToStart = level;
		explosionGraphic.onAnimationEnd = $bind(this,this.onExplosionEnd);
		this._frame = co.doubleduck.BaseAssets.getImage("images/menu/frame_" + this.getType(level) + ".png");
		this._fakeLevel = co.doubleduck.BaseAssets.getImage(co.doubleduck.Assets.getBackgroundName(this.getType(level)));
		this._cover = co.doubleduck.BaseAssets.getImage(co.doubleduck.Assets.getCoverName(this.getType(level)));
		var smallScale = co.doubleduck.BaseGame.getScale() * btn.image.height / this._frame.image.height;
		co.doubleduck.Menu._largeScale = this._frame.image.height / btn.image.height;
		this._frame.scaleX = this._frame.scaleY = this._fakeLevel.scaleX = this._fakeLevel.scaleY = smallScale;
		this._fakeLevel.x = this._frame.x = btn.x;
		this._fakeLevel.y = this._frame.y = btn.y;
		this._fakeLevel.x += smallScale * (this._frame.image.width - this._fakeLevel.image.width) / 2;
		this._fakeLevel.y += smallScale * (this._frame.image.height - this._fakeLevel.image.height) / 2;
		this._cover.x = this._fakeLevel.x + (this._fakeLevel.image.width - this._cover.image.width + 3) * smallScale / 2;
		this._cover.y = this._fakeLevel.y + 238 * smallScale;
		this._cover.scaleX = this._cover.scaleY = smallScale;
		co.doubleduck.SoundManager.playEffect("sound/softBoom");
		explosionGraphic.gotoAndPlay("explode");
		pageContainer.removeChild(btn);
		var toRemove = [];
		var _g1 = 0, _g = pageContainer.getNumChildren();
		while(_g1 < _g) {
			var child = _g1++;
			var childObject = pageContainer.getChildAt(child);
			if(childObject != explosionGraphic) toRemove.push(childObject);
		}
		var _g = 0;
		while(_g < toRemove.length) {
			var child = toRemove[_g];
			++_g;
			createjs.Tween.get(child).to({ alpha : 0},800,createjs.Ease.sineInOut).call($bind(pageContainer,pageContainer.removeChild),[child]);
		}
		pageContainer.addChildAt(this._frame,0);
		pageContainer.addChildAt(this._fakeLevel,1);
		pageContainer.addChildAt(this._cover,2);
		pageContainer.x -= btn.regX * co.doubleduck.BaseGame.getScale();
		pageContainer.y -= btn.regY * co.doubleduck.BaseGame.getScale();
		var _g = 0, _g1 = pageContainer.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child != this._frame && child != this._fakeLevel && child != this._cover && child != explosionGraphic) {
				child.x += btn.regX * co.doubleduck.BaseGame.getScale();
				child.y += btn.regY * co.doubleduck.BaseGame.getScale();
			}
		}
	}
	,_cover: null
	,_fakeLevel: null
	,_frame: null
	,getType: function(level) {
		try {
			return co.doubleduck.DataLoader.getLevel(level).bg;
		} catch( msg ) {
			if( js.Boot.__instanceof(msg,String) ) {
				return 1;
			} else throw(msg);
		}
	}
	,addLevelButton: function(level) {
		var _g = this;
		var btn = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/menu/level_icon_" + this.getType(level) + ".png"),true,co.doubleduck.Button.CLICK_TYPE_NONE);
		btn.regX = btn.image.width / 2;
		btn.regY = btn.image.height / 2;
		btn.addBitmapLabel("" + level,"images/menu/menu_font/",2);
		if(this.getType(level) == 2) btn.shiftLabel(1,1.13); else if(this.getType(level) == 3) btn.shiftLabel(1,1.18);
		btn.x = Math.floor((level - 1) / co.doubleduck.Menu.LEVELS_PER_SCREEN) * co.doubleduck.BaseGame.getViewport().width;
		var pandeId = (level - 1) % co.doubleduck.Menu.LEVELS_PER_SCREEN;
		if(pandeId == 0 || pandeId == 2) btn.x += co.doubleduck.BaseGame.getViewport().width * 0.31; else btn.x += co.doubleduck.BaseGame.getViewport().width * 0.69;
		if(pandeId <= 1) btn.y += co.doubleduck.BaseGame.getViewport().height * 0.28; else btn.y += co.doubleduck.BaseGame.getViewport().height * 0.64;
		this._lvlButtonsLayer.addChild(btn);
		btn.scaleX = btn.scaleY = co.doubleduck.BaseGame.getScale();
		btn.onClick = function() {
			createjs.Tween.get(_g).call($bind(_g,_g.handlePlayClick),[level,btn]);
		};
		var marker = null;
		if(level < co.doubleduck.Persistence.getUnlockedLevel()) {
			var lvlData = co.doubleduck.DataLoader.getLevel(level);
			if(co.doubleduck.Persistence.getBestForLevel(level) != null && co.doubleduck.Persistence.getBestForLevel(level) <= (lvlData.perfectMovesCount | 0)) marker = co.doubleduck.BaseAssets.getImage("images/menu/star.png"); else marker = co.doubleduck.BaseAssets.getImage("images/menu/V.png");
		} else if(level > co.doubleduck.Persistence.getUnlockedLevel()) {
			marker = co.doubleduck.BaseAssets.getImage("images/menu/lock.png");
			btn.onClick = null;
			btn.alpha = 0.5;
		}
		if(marker != null) {
			marker.scaleX = marker.scaleY = co.doubleduck.BaseGame.getScale();
			marker.regX = marker.image.width;
			marker.x = btn.x + btn.regX * co.doubleduck.BaseGame.getScale() * 1.3;
			marker.y = btn.y - btn.regY * co.doubleduck.BaseGame.getScale() * 1.15;
			this._lvlButtonsLayer.addChild(marker);
		}
		this._buttons.push(btn);
	}
	,setupArrowVisibility: function() {
		if(this._page >= Math.floor(co.doubleduck.Menu.LEVELS / co.doubleduck.Menu.LEVELS_PER_SCREEN) - 1) this._rightArrow.visible = false; else this._rightArrow.visible = true;
		if(this._page <= 0) this._leftArrow.visible = false; else this._leftArrow.visible = true;
	}
	,goRight: function() {
		if(this._isPaging || !this._active || this._page >= Math.floor(co.doubleduck.Menu.LEVELS / co.doubleduck.Menu.LEVELS_PER_SCREEN) - 1) return;
		this._isPaging = true;
		this._page++;
		createjs.Tween.get(this._lvlButtonsLayer).to({ x : this._page * -co.doubleduck.BaseGame.getViewport().width},350,createjs.Ease.sineInOut).call($bind(this,this.setPaging),[false]);
		if(this._page >= Math.floor(co.doubleduck.Menu.LEVELS / co.doubleduck.Menu.LEVELS_PER_SCREEN) - 1) this._rightArrow.visible = false; else this._rightArrow.visible = true;
		this._leftArrow.visible = true;
	}
	,goLeft: function() {
		if(this._isPaging || !this._active || this._page <= 0) return;
		this._isPaging = true;
		this._page--;
		createjs.Tween.get(this._lvlButtonsLayer).to({ x : this._page * -co.doubleduck.BaseGame.getViewport().width},350,createjs.Ease.sineInOut).call($bind(this,this.setPaging),[false]);
		if(this._page <= 0) this._leftArrow.visible = false; else this._leftArrow.visible = true;
		this._rightArrow.visible = true;
	}
	,setPaging: function(p) {
		this._isPaging = p;
	}
	,_isPaging: null
	,_page: null
	,handleMuteToggle: function() {
		if(!this._active) return;
		co.doubleduck.SoundManager.toggleMute();
	}
	,handleHelp: function() {
		this._active = false;
		this._help.show();
		createjs.Tween.get(this._helpBtn).to({ alpha : 0},200);
		if(this._muteBtn != null) this._muteBtn.onToggle = null;
	}
	,handleBackFromHelp: function() {
		this._active = true;
		createjs.Tween.get(this._helpBtn).to({ alpha : 1},200);
		if(this._muteBtn != null) this._muteBtn.onToggle = $bind(this,this.handleMuteToggle);
	}
	,handleSwipe: function(event) {
		if(event.direction == "left") this.goRight(); else if(event.direction == "right") this.goLeft();
	}
	,_menuTheme: null
	,_active: null
	,_helpBtn: null
	,_muteBtn: null
	,_help: null
	,_rightArrow: null
	,_leftArrow: null
	,_lvlButtonsLayer: null
	,_buttons: null
	,_background: null
	,__class__: co.doubleduck.Menu
});
co.doubleduck.Obstacle = $hxClasses["co.doubleduck.Obstacle"] = function(id,tileX,tileY) {
	this._size = 1;
	this._graphic = co.doubleduck.BaseAssets.getImage(co.doubleduck.Assets.getObstacleName(id));
	this.init(tileX,tileY,false);
};
co.doubleduck.Obstacle.__name__ = ["co","doubleduck","Obstacle"];
co.doubleduck.Obstacle.__super__ = co.doubleduck.TiledObject;
co.doubleduck.Obstacle.prototype = $extend(co.doubleduck.TiledObject.prototype,{
	_graphic: null
	,__class__: co.doubleduck.Obstacle
});
co.doubleduck.Persistence = $hxClasses["co.doubleduck.Persistence"] = function() { }
co.doubleduck.Persistence.__name__ = ["co","doubleduck","Persistence"];
co.doubleduck.Persistence.initGameData = function() {
	co.doubleduck.BasePersistence.GAME_PREFIX = "SAFE_";
	if(!co.doubleduck.BasePersistence.available) return;
	co.doubleduck.BasePersistence.initVar("unlockedLevel","1");
}
co.doubleduck.Persistence.getUnlockedLevel = function() {
	return Std.parseInt(co.doubleduck.BasePersistence.getValue("unlockedLevel"));
}
co.doubleduck.Persistence.setUnlockedLevel = function(level) {
	co.doubleduck.BasePersistence.setValue("unlockedLevel","" + level);
}
co.doubleduck.Persistence.getBestForLevel = function(level) {
	var best = co.doubleduck.BasePersistence.getValue("best_for_" + level);
	if(best == null) return null;
	return Std.parseInt(best);
}
co.doubleduck.Persistence.setBestForLevel = function(level,best) {
	co.doubleduck.BasePersistence.setValue("best_for_" + level,"" + best);
}
co.doubleduck.Persistence.__super__ = co.doubleduck.BasePersistence;
co.doubleduck.Persistence.prototype = $extend(co.doubleduck.BasePersistence.prototype,{
	__class__: co.doubleduck.Persistence
});
co.doubleduck.PoliceAlertPopUp = $hxClasses["co.doubleduck.PoliceAlertPopUp"] = function(interval,clickPower) {
	createjs.Container.call(this);
	this.visible = false;
	if(co.doubleduck.PoliceAlertPopUp._hintSpriteSheet == null) {
		var initObject = { };
		var bmp = co.doubleduck.BaseAssets.getImage("images/session/police_alert/push_button.png");
		initObject.images = [bmp.image];
		initObject.frames = { width : 179, height : 123, regX : 0, regY : 0};
		initObject.animations = { };
		initObject.animations.hinting = { frames : [0,1], frequency : 8};
		co.doubleduck.PoliceAlertPopUp._hintSpriteSheet = new createjs.SpriteSheet(initObject);
	}
	this._hint = new createjs.BitmapAnimation(co.doubleduck.PoliceAlertPopUp._hintSpriteSheet);
	this._interval = interval;
	this._clickPower = clickPower;
	this._background = co.doubleduck.Utils.getCenteredImage("images/session/police_alert/walkie_talkie.png");
	this.addChild(this._background);
	this._button = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/police_alert/red_button.png"));
	this._button.y = this._button.image.height * 1.1;
	this._button.x = -this._button.image.width * 0.4;
	this._button.onClick = $bind(this,this.handleTap);
	this.addChild(this._button);
	this._barFill = co.doubleduck.BaseAssets.getImage("images/session/police_alert/police_bar.png");
	this._barFill.y = 70;
	this._barFill.x = -60;
	this.addChild(this._barFill);
	this._barMask = new createjs.Shape();
	this._barMask.graphics.beginFill("#000000");
	this._barMask.graphics.drawRect(this._barFill.x,this._barFill.y,this._barFill.image.width,this._barFill.image.height);
	this._barMask.graphics.endFill();
	this._barMask.regX = this._barFill.image.width;
	this._barFill.mask = this._barMask;
	this._barFillPercent = 0.5;
	this.setBar(this._barFillPercent);
	this._hint.x = this._button.x + this._button.image.width * 2 / 3;
	this._hint.y = this._button.y - 20;
	this.addChild(this._hint);
	this._hint.gotoAndPlay("hinting");
};
co.doubleduck.PoliceAlertPopUp.__name__ = ["co","doubleduck","PoliceAlertPopUp"];
co.doubleduck.PoliceAlertPopUp._hintSpriteSheet = null;
co.doubleduck.PoliceAlertPopUp.__super__ = createjs.Container;
co.doubleduck.PoliceAlertPopUp.prototype = $extend(createjs.Container.prototype,{
	handleTap: function() {
		this._barFillPercent -= this._clickPower;
		this.taps++;
		if(this.taps > 8) this._hint.visible = false;
		if(this._barFillPercent <= 0) this.end();
	}
	,setBar: function(fill) {
		this._barMask.x = this._barFill.image.width * fill;
	}
	,setInvisible: function() {
		this.visible = false;
	}
	,end: function() {
		createjs.Tween.removeTweens(this);
		this.removeChild(this._hint);
		this.onTick = null;
		var tween = createjs.Tween.get(this).to({ scaleX : co.doubleduck.BaseGame.getScale() * 1.1, scaleY : co.doubleduck.BaseGame.getScale() * 1.1},200,createjs.Ease.sineInOut);
		tween.to({ y : -co.doubleduck.BaseGame.getViewport().height, scaleX : co.doubleduck.BaseGame.getScale(), scaleY : co.doubleduck.BaseGame.getScale()},750,createjs.Ease.circOut);
		if(this.onAlertFinished != null) tween = tween.call(this.onAlertFinished);
		return tween;
	}
	,busted: function() {
		this.onTick = null;
		createjs.Tween.removeTweens(this);
		this.removeChild(this._hint);
		var tween = createjs.Tween.get(this).to({ scaleX : co.doubleduck.BaseGame.getScale() * 1.1, scaleY : co.doubleduck.BaseGame.getScale() * 1.1},200,createjs.Ease.sineInOut);
		tween = tween.to({ y : -co.doubleduck.BaseGame.getViewport().height, scaleX : co.doubleduck.BaseGame.getScale(), scaleY : co.doubleduck.BaseGame.getScale()},750,createjs.Ease.circOut);
		tween.call((js.Boot.__cast(this.parent , co.doubleduck.Session)).gameOver());
	}
	,start: function() {
		this._barFillPercent = 0.5;
		this.setBar(this._barFillPercent);
		this.y = -co.doubleduck.BaseGame.getViewport().height / 2;
		createjs.Tween.get(this).to({ y : co.doubleduck.BaseGame.getViewport().height / 2},600,createjs.Ease.sineOut);
		this.visible = true;
		this._hint.visible = true;
		this.taps = 0;
		this.sinceLastIncrement = 0;
		this.onTick = $bind(this,this.handleTick);
	}
	,increment: function() {
		this._barFillPercent += 0.005;
		this._barFillPercent = Math.min(1,this._barFillPercent);
		this.setBar(this._barFillPercent);
		if(this._barFillPercent >= 1) this.busted();
	}
	,handleTick: function(sinceLastTick) {
		this.sinceLastIncrement += sinceLastTick;
		if(this.sinceLastIncrement >= this._interval) {
			this.sinceLastIncrement = 0;
			this.increment();
		}
	}
	,taps: null
	,sinceLastIncrement: null
	,_clickPower: null
	,_interval: null
	,_barFillPercent: null
	,_barMask: null
	,_barFill: null
	,_hint: null
	,_button: null
	,_background: null
	,onAlertFinished: null
	,__class__: co.doubleduck.PoliceAlertPopUp
});
co.doubleduck.Popup = $hxClasses["co.doubleduck.Popup"] = function(backgroundImage) {
	createjs.Container.call(this);
	this.visible = false;
	this._background = co.doubleduck.Utils.getCenteredImage(backgroundImage);
	this.addChild(this._background);
	this._menuButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(co.doubleduck.Popup.MENU),true);
	this._menuButton.x = -this._menuButton.image.width * 1.75;
	this._menuButton.regY = this._menuButton.image.height;
	this._menuButton.y = this._background.image.height / 2 - this._menuButton.image.height * 0.4;
	this.addChild(this._menuButton);
	this._menuButton.mouseEnabled = true;
	this._menuButton.onClick = $bind(this,this.handleMenu);
	this._replayButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(co.doubleduck.Popup.RESTART),true);
	this._replayButton.x = this._menuButton.x + this._menuButton.image.width * 1.15;
	this._replayButton.regY = this._replayButton.image.height;
	this._replayButton.y = this._menuButton.y;
	this.addChild(this._replayButton);
	this._replayButton.mouseEnabled = true;
	this._replayButton.onClick = $bind(this,this.handleRestart);
	this._continueButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(co.doubleduck.Popup.NEXT),true);
	this._continueButton.x = this._replayButton.x + this._replayButton.image.width * 1.15;
	this._continueButton.regY = this._continueButton.image.height;
	this._continueButton.y = this._menuButton.y;
	this.addChild(this._continueButton);
	this._continueButton.mouseEnabled = true;
	this._continueButton.onClick = $bind(this,this.handleContinue);
};
co.doubleduck.Popup.__name__ = ["co","doubleduck","Popup"];
co.doubleduck.Popup.__super__ = createjs.Container;
co.doubleduck.Popup.prototype = $extend(createjs.Container.prototype,{
	handleContinue: function() {
		this.onContinue();
	}
	,handleRestart: function() {
		this.onRestart();
	}
	,handleMenu: function() {
		this.onMenu();
	}
	,_continueButton: null
	,_replayButton: null
	,_menuButton: null
	,_background: null
	,onNext: null
	,onMenu: null
	,onContinue: null
	,onRestart: null
	,__class__: co.doubleduck.Popup
});
co.doubleduck.Session = $hxClasses["co.doubleduck.Session"] = function(properties) {
	co.doubleduck.BaseSession.call(this);
	this._properties = properties;
	var ham = co.doubleduck.BaseGame.hammer;
	ham.option("swipe",false);
	co.doubleduck.BaseGame.hammer.onswipe = null;
	this._movesTaken = 0;
	this._levelData = co.doubleduck.DataLoader.getLevel(properties.level);
	this._levelId = properties.level | 0;
	co.doubleduck.Session._lastLevelId = this._levelId;
	var scale = co.doubleduck.BaseGame.getScale();
	this._background = co.doubleduck.BaseAssets.getImage(co.doubleduck.Assets.getBackgroundName(this._levelData.bg));
	this._background.scaleX = this._background.scaleY = scale;
	var backgroundShiftX = -(this._background.image.width * scale - co.doubleduck.BaseGame.getViewport().width) / 2;
	var backgroundShiftY = -(this._background.image.height * scale - co.doubleduck.BaseGame.getViewport().height) / 2;
	this._background.x = backgroundShiftX;
	this._background.y = backgroundShiftY;
	this.addChild(this._background);
	this._foreground = co.doubleduck.BaseAssets.getImage(co.doubleduck.Assets.getForegroundName(this._levelData.bg));
	this._foreground.scaleX = this._foreground.scaleY = scale;
	this._foreground.x = backgroundShiftX;
	this._foreground.y = backgroundShiftY;
	this._foreground.alpha = 0;
	this._map = new co.doubleduck.Map(this._levelData.bricks,this._levelData.obstacles,this._levelData.key,this._levelData.lock,this._levelData.moves,this._levelData.bg);
	this._map.setScale(scale);
	this._map.onAdd = $bind(this,this.handleMapAdd);
	this._map.add();
	this._map.setLocation(43 * scale + backgroundShiftX,301 * scale + backgroundShiftY);
	this._cover = co.doubleduck.BaseAssets.getImage(co.doubleduck.Assets.getCoverName(this._levelData.bg));
	this._cover.scaleX = this._cover.scaleY = scale;
	this._cover.x = 43 * scale + backgroundShiftX + this._cover.image.width * scale;
	this._cover.y = 301 * scale + backgroundShiftY - co.doubleduck.TiledObject.TILE_HEIGHT * 1.1 * scale;
	this._cover.regX = this._cover.image.width;
	this._hud = new createjs.Container();
	this._hud.x = backgroundShiftX;
	this._hud.y = backgroundShiftY;
	this._hudBg = co.doubleduck.BaseAssets.getImage("images/session/UI/UI.png");
	this._hudBg.scaleX = this._hudBg.scaleY = scale;
	this._hudBg.y = this._hudBg.image.height * scale;
	this._hud.addChild(this._hudBg);
	this.setMovesDisplay(0);
	this.setBestDisplay(co.doubleduck.Persistence.getBestForLevel(properties.level));
	if(this._hudBg.y + this._hud.y <= 1) this._hud.y += -(this._hudBg.y + this._hud.y);
	this.addChild(this._cover);
	this.playCoverFall();
	this.addChild(this._foreground);
	this._pauseButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/UI/button_pause.png"),false);
	this._pauseButton.scaleX = this._pauseButton.scaleY = scale;
	this._pauseButton.x = this._hudBg.image.width * scale * 0.82;
	this._pauseButton.y = this._hudBg.y * 1.2;
	this._pauseButton.onClick = $bind(this,this.handlePause);
	this._hud.addChild(this._pauseButton);
	this.addChild(this._hud);
	this._pauseContainer = new co.doubleduck.Popup("images/session/UI/pause_screen/pause.png");
	this._pauseContainer.x = co.doubleduck.BaseGame.getViewport().width / 2;
	this._pauseContainer.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this._pauseContainer.scaleX = this._pauseContainer.scaleY = scale;
	this._pauseContainer.onMenu = $bind(this,this.handleMenuClick);
	this._pauseContainer.onContinue = $bind(this,this.handleUnpause);
	this._pauseContainer.onRestart = $bind(this,this.handleRepClick);
	this._policeAlertsRemaining = this._levelData.police_alert.max_appearing | 0;
	this._waitBeforeAlert = this._levelData.police_alert.waitBeforeAlert | 0;
	this._policeAlertContainer = new co.doubleduck.PoliceAlertPopUp(this._levelData.police_alert.interval,this._levelData.police_alert.clickPower);
	this._policeAlertContainer.x = co.doubleduck.BaseGame.getViewport().width / 2;
	this._policeAlertContainer.y = co.doubleduck.BaseGame.getViewport().height / 2;
	this._policeAlertContainer.scaleX = this._policeAlertContainer.scaleY = scale;
	this._policeAlertContainer.onAlertFinished = $bind(this,this.handleAlertFinished);
	this.addChild(this._policeAlertContainer);
	co.doubleduck.BaseGame.hammer.ondrag = $bind(this,this.handleDrag);
	co.doubleduck.BaseGame.hammer.ondragend = $bind(this,this.handleDragEnd);
	this.addChild(this._pauseContainer);
	createjs.Tween.get(this._foreground).to({ alpha : 1},1000);
	this.setupWaitForNextAlert();
};
co.doubleduck.Session.__name__ = ["co","doubleduck","Session"];
co.doubleduck.Session.getLastLevelId = function() {
	return co.doubleduck.Session._lastLevelId;
}
co.doubleduck.Session.__super__ = co.doubleduck.BaseSession;
co.doubleduck.Session.prototype = $extend(co.doubleduck.BaseSession.prototype,{
	handleMapAdd: function(mapGraphic) {
		this.addChild(mapGraphic);
	}
	,handleDrag: function(event) {
		var start = new createjs.Point(event.position.x - event.distanceX,event.position.y - event.distanceY);
		var end = new createjs.Point(event.position.x,event.position.y);
		var direction = event.direction;
		start.x -= this._map.getX();
		start.y -= this._map.getY();
		end.x = start.x + event.distanceX;
		end.y = start.y + event.distanceY;
		start.x /= co.doubleduck.BaseGame.getScale();
		start.y /= co.doubleduck.BaseGame.getScale();
		end.x /= co.doubleduck.BaseGame.getScale();
		end.y /= co.doubleduck.BaseGame.getScale();
		this._map.handleDrag(start,end,direction);
	}
	,victoryScreen: function() {
		createjs.Ticker.setPaused(false);
		var victory = new co.doubleduck.VictoryScreen(this._properties);
		if(this._movesTaken <= (this._levelData.perfectMovesCount | 0)) victory.addPerfectNotice();
		victory.onMenu = $bind(this,this.handleMenuClick);
		victory.onNext = $bind(this,this.handleNextClick);
		victory.onRetry = $bind(this,this.handleRepClick);
		this.addChildAt(victory,0);
		co.doubleduck.SoundManager.playEffect("sound/tuneWin");
	}
	,lossScreen: function() {
		var loss = new co.doubleduck.LossScreen(this._properties);
		loss.onMenu = $bind(this,this.handleMenuClick);
		loss.onRestart = $bind(this,this.handleRepClick);
		this.addChild(loss);
		co.doubleduck.SoundManager.playEffect("sound/tuneLose");
	}
	,gameOver: function() {
		co.doubleduck.BaseGame.hammer.ondrag = null;
		co.doubleduck.BaseGame.hammer.ondragend = null;
		this.lossScreen();
		//window.mobileAPI.events.gameover();
	}
	,triggerVictory: function() {
		if(co.doubleduck.Persistence.getUnlockedLevel() == this._levelId) co.doubleduck.Persistence.setUnlockedLevel(this._levelId + 1);
		var best = co.doubleduck.Persistence.getBestForLevel(this._properties.level) | 0;
		if(best == 0 || best > this._movesTaken) co.doubleduck.Persistence.setBestForLevel(this._properties.level,this._movesTaken);
		this.victoryScreen();
		createjs.Tween.get(this._hud).to({ x : -co.doubleduck.BaseGame.getViewport().width},750,createjs.Ease.sineInOut);
		createjs.Tween.get(this._background).to({ x : -co.doubleduck.BaseGame.getViewport().width},750,createjs.Ease.sineInOut);
		createjs.Tween.get(this._map.getGraphic()).to({ x : -co.doubleduck.BaseGame.getViewport().width},750,createjs.Ease.sineInOut);
		//window.mobileAPI.events.levelup();
	}
	,handleDragEnd: function(event) {
		var wasDragging = this._map.endDragging();
		if(wasDragging && this._map.hasMovedBrick()) {
			this._movesTaken++;
			this.setMovesDisplay(this._movesTaken);
		}
		if(this._map.hasWon()) {
			co.doubleduck.BaseGame.hammer.ondrag = null;
			co.doubleduck.BaseGame.hammer.ondragend = null;
			createjs.Tween.removeTweens(this._policeAlertContainer);
			createjs.Tween.get(this).wait(750).call($bind(this,this.triggerVictory));
		}
	}
	,setMovesDisplay: function(moves) {
		if(this._movesDisplay != null) this._hud.removeChild(this._movesDisplay);
		this._movesDisplay = co.doubleduck.Utils.getBitmapLabel("" + moves,"images/session/UI/UI_font/",1);
		this._movesDisplay.scaleX = this._movesDisplay.scaleY = co.doubleduck.BaseGame.getScale();
		this._movesDisplay.y = this._hudBg.y * 1.37;
		this._movesDisplay.x = this._hudBg.y * 1.3;
		this._hud.addChild(this._movesDisplay);
	}
	,setBestDisplay: function(best) {
		if(this._bestDisplay != null) this._hud.removeChild(this._bestDisplay);
		if(best != null) {
			this._bestDisplay = co.doubleduck.Utils.getBitmapLabel("" + best,"images/session/UI/UI_font/",1);
			this._bestDisplay.scaleX = this._bestDisplay.scaleY = co.doubleduck.BaseGame.getScale();
			this._bestDisplay.y = this._movesDisplay.y + 26 * co.doubleduck.BaseGame.getScale();
			this._bestDisplay.x = this._movesDisplay.x;
			this._hud.addChild(this._bestDisplay);
		}
	}
	,handleUnpause: function() {
		this._pauseContainer.visible = false;
		createjs.Ticker.setPaused(false);
		//window.mobileAPI.events.resume();
	}
	,handlePause: function() {
		this._pauseContainer.visible = true;
		createjs.Tween.get(this._pauseButton).wait(50).call(createjs.Ticker.setPaused,[true]);
		//window.mobileAPI.events.paused();
	}
	,handleNextClick: function() {
		if(this.onNextLevel != null) {
			this._properties.level++;
			createjs.Ticker.setPaused(false);
			this.onNextLevel(this._properties);
		}
	}
	,handleRepClick: function() {
		if(this.onRestart != null) {
			createjs.Ticker.setPaused(false);
			this.onRestart(this._properties);
		}
	}
	,destroy: function() {
		createjs.Tween.removeTweens(this._policeAlertContainer);
		co.doubleduck.BaseSession.prototype.destroy.call(this);
	}
	,handleAlertFinished: function() {
		this._policeAlertContainer.visible = false;
		this.setupWaitForNextAlert();
	}
	,raiseAlert: function() {
		if(this._policeAlertsRemaining > 0) {
			if(this._map.isDragging()) createjs.Tween.get(this._policeAlertContainer).wait(500).call($bind(this,this.raiseAlert)); else {
				this._policeAlertsRemaining--;
				this._policeAlertContainer.start();
			}
		}
	}
	,setupWaitForNextAlert: function() {
		if(this._policeAlertsRemaining > 0) {
			var waitTime = this._waitBeforeAlert;
			waitTime = waitTime * 0.8 + Math.random() * 0.4 * waitTime;
			createjs.Tween.get(this._policeAlertContainer).wait(Math.floor(waitTime * 1000)).call($bind(this,this.raiseAlert));
		}
	}
	,playCoverFall: function() {
		createjs.Tween.get(this._cover).wait(500).call(co.doubleduck.SoundManager.playEffect,["sound/safeDoorBends"]).to({ rotation : -50},1300,createjs.Ease.elasticOut).to({ y : co.doubleduck.BaseGame.getViewport().height},300,createjs.Ease.circIn).call($bind(this,this.removeChild),[this._cover]).call(co.doubleduck.SoundManager.playEffect,["sound/safeDoorCrash"]);
	}
	,_waitBeforeAlert: null
	,_policeAlertsRemaining: null
	,_policeAlertContainer: null
	,_pauseContainer: null
	,_pauseButton: null
	,_bestDisplay: null
	,_movesDisplay: null
	,_hudBg: null
	,_hud: null
	,_levelId: null
	,_movesTaken: null
	,_map: null
	,_foreground: null
	,_cover: null
	,_background: null
	,_levelData: null
	,_properties: null
	,__class__: co.doubleduck.Session
});
co.doubleduck.SoundType = $hxClasses["co.doubleduck.SoundType"] = { __ename__ : ["co","doubleduck","SoundType"], __constructs__ : ["WEB_AUDIO","AUDIO_FX","AUDIO_NO_OVERLAP","HOWLER","NONE"] }
co.doubleduck.SoundType.WEB_AUDIO = ["WEB_AUDIO",0];
co.doubleduck.SoundType.WEB_AUDIO.toString = $estr;
co.doubleduck.SoundType.WEB_AUDIO.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_FX = ["AUDIO_FX",1];
co.doubleduck.SoundType.AUDIO_FX.toString = $estr;
co.doubleduck.SoundType.AUDIO_FX.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP = ["AUDIO_NO_OVERLAP",2];
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.toString = $estr;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.HOWLER = ["HOWLER",3];
co.doubleduck.SoundType.HOWLER.toString = $estr;
co.doubleduck.SoundType.HOWLER.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.NONE = ["NONE",4];
co.doubleduck.SoundType.NONE.toString = $estr;
co.doubleduck.SoundType.NONE.__enum__ = co.doubleduck.SoundType;
if(!co.doubleduck.audio) co.doubleduck.audio = {}
co.doubleduck.audio.AudioAPI = $hxClasses["co.doubleduck.audio.AudioAPI"] = function() { }
co.doubleduck.audio.AudioAPI.__name__ = ["co","doubleduck","audio","AudioAPI"];
co.doubleduck.audio.AudioAPI.prototype = {
	setVolume: null
	,pause: null
	,stop: null
	,playMusic: null
	,playEffect: null
	,init: null
	,__class__: co.doubleduck.audio.AudioAPI
}
co.doubleduck.audio.WebAudioAPI = $hxClasses["co.doubleduck.audio.WebAudioAPI"] = function(src) {
	this._src = src;
	this.loadAudioFile(this._src);
};
co.doubleduck.audio.WebAudioAPI.__name__ = ["co","doubleduck","audio","WebAudioAPI"];
co.doubleduck.audio.WebAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.WebAudioAPI.context = null;
co.doubleduck.audio.WebAudioAPI.webAudioInit = function() {
	co.doubleduck.audio.WebAudioAPI.context = new webkitAudioContext();
}
co.doubleduck.audio.WebAudioAPI.saveBuffer = function(buffer,name) {
	co.doubleduck.audio.WebAudioAPI._buffers[name] = buffer;
}
co.doubleduck.audio.WebAudioAPI.decodeError = function() {
	null;
}
co.doubleduck.audio.WebAudioAPI.prototype = {
	setVolume: function(volume) {
		if(this._gainNode != null) this._gainNode.gain.value = volume;
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._source != null) this._source.noteOff(0);
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playBuffer: function(name,loop) {
		if(loop == null) loop = false;
		if(this._gainNode == null) {
			this._gainNode = co.doubleduck.audio.WebAudioAPI.context.createGainNode();
			this._gainNode.connect(co.doubleduck.audio.WebAudioAPI.context.destination);
		}
		this._buffer = Reflect.getProperty(co.doubleduck.audio.WebAudioAPI._buffers,this._src);
		if(this._buffer == null) return;
		this._source = co.doubleduck.audio.WebAudioAPI.context.createBufferSource();
		this._source.buffer = this._buffer;
		this._source.loop = loop;
		this._source.connect(this._gainNode);
		this._source.noteOn(0);
	}
	,loadAudioFile: function(src) {
		var request = new XMLHttpRequest();
		request.open("get",src,true);
		request.responseType = "arraybuffer";
		request.onload = function() { co.doubleduck.audio.WebAudioAPI.context.decodeAudioData(request.response, function(decodedBuffer) { buffer = decodedBuffer; co.doubleduck.audio.WebAudioAPI.saveBuffer(buffer,src); }, co.doubleduck.audio.WebAudioAPI.decodeError) }
		request.send();
	}
	,init: function() {
	}
	,_source: null
	,_gainNode: null
	,_buffer: null
	,_src: null
	,__class__: co.doubleduck.audio.WebAudioAPI
}
co.doubleduck.SoundManager = $hxClasses["co.doubleduck.SoundManager"] = function() {
};
co.doubleduck.SoundManager.__name__ = ["co","doubleduck","SoundManager"];
co.doubleduck.SoundManager.engineType = null;
co.doubleduck.SoundManager.EXTENSION = null;
co.doubleduck.SoundManager.getPersistedMute = function() {
	var mute = co.doubleduck.BasePersistence.getValue("mute");
	if(mute == "0") {
		mute = "false";
		co.doubleduck.SoundManager.setPersistedMute(false);
	}
	return mute == "true";
}
co.doubleduck.SoundManager.setPersistedMute = function(mute) {
	var val = "true";
	if(!mute) val = "false";
	co.doubleduck.BasePersistence.setValue("mute",val);
}
co.doubleduck.SoundManager.isSoundAvailable = function() {
	var isFirefox = /Firefox/.test(navigator.userAgent);
	var isChrome = /Chrome/.test(navigator.userAgent);
	var isMobile = /Mobile/.test(navigator.userAgent);
	var isAndroid = /Android/.test(navigator.userAgent);
	var isAndroid4 = /Android 4/.test(navigator.userAgent);
	var isSafari = /Safari/.test(navigator.userAgent);
	var agent = navigator.userAgent;
	var reg = new EReg("iPhone OS 6","");
	var isIOS6 = reg.match(agent) && isSafari && isMobile;
	var isIpad = /iPad/.test(navigator.userAgent);
	isIpad = isIpad && /OS 6/.test(navigator.userAgent);
	isIOS6 = isIOS6 || isIpad;
	if(isFirefox) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.AUDIO_FX;
		co.doubleduck.SoundManager.EXTENSION = ".ogg";
		return true;
	}
	if(isChrome && (!isAndroid && !isMobile)) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.WEB_AUDIO;
		co.doubleduck.audio.WebAudioAPI.webAudioInit();
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	}
	if(isIOS6) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.WEB_AUDIO;
		co.doubleduck.audio.WebAudioAPI.webAudioInit();
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	} else if(isAndroid4 && !isChrome) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.AUDIO_NO_OVERLAP;
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	}
	co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.NONE;
	co.doubleduck.BasePersistence.initVar("mute");
	return false;
}
co.doubleduck.SoundManager.mute = function(persisted) {
	if(persisted == null) persisted = true;
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = true;
	var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
	while(_g1 < _g) {
		var currSound = _g1++;
		var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
		if(mySound != null) mySound.setVolume(0);
	}
	if(persisted) co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.unmute = function(persisted) {
	if(persisted == null) persisted = true;
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = false;
	try {
		var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
		while(_g1 < _g) {
			var currSound = _g1++;
			var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
			if(mySound != null) mySound.setVolume(1);
		}
	} catch( e ) {
		null;
	}
	if(persisted) co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.toggleMute = function() {
	if(co.doubleduck.SoundManager._muted) co.doubleduck.SoundManager.unmute(); else co.doubleduck.SoundManager.mute();
}
co.doubleduck.SoundManager.isMuted = function() {
	co.doubleduck.SoundManager._muted = co.doubleduck.SoundManager.getPersistedMute();
	return co.doubleduck.SoundManager._muted;
}
co.doubleduck.SoundManager.getAudioInstance = function(src) {
	if(!co.doubleduck.SoundManager.available) return new co.doubleduck.audio.DummyAudioAPI();
	src += co.doubleduck.SoundManager.EXTENSION;
	var audio = Reflect.getProperty(co.doubleduck.SoundManager._cache,src);
	if(audio == null) {
		switch( (co.doubleduck.SoundManager.engineType)[1] ) {
		case 1:
			audio = new co.doubleduck.audio.AudioFX(src);
			break;
		case 0:
			audio = new co.doubleduck.audio.WebAudioAPI(src);
			break;
		case 2:
			audio = new co.doubleduck.audio.NonOverlappingAudio(src);
			break;
		case 3:
			audio = new co.doubleduck.audio.HowlerAudio(src);
			break;
		case 4:
			return new co.doubleduck.audio.DummyAudioAPI();
		}
		Reflect.setProperty(co.doubleduck.SoundManager._cache,src,audio);
	}
	return audio;
}
co.doubleduck.SoundManager.playEffect = function(src,volume,optional) {
	if(optional == null) optional = false;
	if(volume == null) volume = 1;
	if(optional && co.doubleduck.SoundManager.engineType == co.doubleduck.SoundType.AUDIO_NO_OVERLAP) return new co.doubleduck.audio.DummyAudioAPI();
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playEffect(playVolume);
	return audio;
}
co.doubleduck.SoundManager.playMusic = function(src,volume,loop) {
	if(loop == null) loop = true;
	if(volume == null) volume = 1;
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playMusic(playVolume,loop);
	return audio;
}
co.doubleduck.SoundManager.initSound = function(src) {
	co.doubleduck.SoundManager.getAudioInstance(src);
}
co.doubleduck.SoundManager.prototype = {
	__class__: co.doubleduck.SoundManager
}
co.doubleduck.Utils = $hxClasses["co.doubleduck.Utils"] = function() { }
co.doubleduck.Utils.__name__ = ["co","doubleduck","Utils"];
co.doubleduck.Utils.dateDeltaInDays = function(day1,day2) {
	var delta = Math.abs(day2.getTime() - day1.getTime());
	return delta / 86400000;
}
co.doubleduck.Utils.getTodayDate = function() {
	var newDate = new Date();
	return HxOverrides.dateStr(newDate);
}
co.doubleduck.Utils.getHour = function() {
	var newDate = new Date();
	return newDate.getHours();
}
co.doubleduck.Utils.rectOverlap = function(r1,r2) {
	var r1TopLeft = new createjs.Point(r1.x,r1.y);
	var r1BottomRight = new createjs.Point(r1.x + r1.width,r1.y + r1.height);
	var r1TopRight = new createjs.Point(r1.x + r1.width,r1.y);
	var r1BottomLeft = new createjs.Point(r1.x,r1.y + r1.height);
	var r2TopLeft = new createjs.Point(r2.x,r2.y);
	var r2BottomRight = new createjs.Point(r2.x + r2.width,r2.y + r2.height);
	var r2TopRight = new createjs.Point(r2.x + r2.width,r2.y);
	var r2BottomLeft = new createjs.Point(r2.x,r2.y + r2.height);
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r2TopLeft,r2BottomRight,r1BottomLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(r1TopLeft,r1BottomRight,r2BottomLeft)) return true;
	return false;
}
co.doubleduck.Utils.overlap = function(obj1,obj1Width,obj1Height,obj2,obj2Width,obj2Height) {
	var o1TopLeft = new createjs.Point(obj1.x - obj1.regX * co.doubleduck.BaseGame.getScale(),obj1.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1BottomRight = new createjs.Point(o1TopLeft.x - obj1.regX * co.doubleduck.BaseGame.getScale() + obj1Width * co.doubleduck.BaseGame.getScale(),o1TopLeft.y + obj1Height * co.doubleduck.BaseGame.getScale() - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1TopRight = new createjs.Point(o1BottomRight.x - obj1.regX * co.doubleduck.BaseGame.getScale(),o1TopLeft.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o1BottomLeft = new createjs.Point(o1TopLeft.x - obj1.regX * co.doubleduck.BaseGame.getScale(),o1BottomRight.y - obj1.regY * co.doubleduck.BaseGame.getScale());
	var o2TopLeft = new createjs.Point(obj2.x - obj2.regX * co.doubleduck.BaseGame.getScale(),obj2.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2BottomRight = new createjs.Point(o2TopLeft.x + obj2Width * co.doubleduck.BaseGame.getScale() - obj2.regX * co.doubleduck.BaseGame.getScale(),o2TopLeft.y + obj2Height * co.doubleduck.BaseGame.getScale() - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2TopRight = new createjs.Point(o2BottomRight.x - obj2.regX * co.doubleduck.BaseGame.getScale(),o2TopLeft.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	var o2BottomLeft = new createjs.Point(o2TopLeft.x - obj2.regX * co.doubleduck.BaseGame.getScale(),o2BottomRight.y - obj2.regY * co.doubleduck.BaseGame.getScale());
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o2TopLeft,o2BottomRight,o1BottomLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2TopLeft)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2BottomRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2TopRight)) return true;
	if(co.doubleduck.Utils.rectContainPoint(o1TopLeft,o1BottomRight,o2BottomLeft)) return true;
	return false;
}
co.doubleduck.Utils.rectContainPoint = function(rectTopLeft,rectBottomRight,point) {
	return point.x >= rectTopLeft.x && point.x <= rectBottomRight.x && point.y >= rectTopLeft.y && point.y <= rectBottomRight.y;
}
co.doubleduck.Utils.objectContains = function(dyn,memberName) {
	return Reflect.hasField(dyn,memberName);
}
co.doubleduck.Utils.contains = function(arr,obj) {
	var _g = 0;
	while(_g < arr.length) {
		var element = arr[_g];
		++_g;
		if(element == obj) return true;
	}
	return false;
}
co.doubleduck.Utils.isMobileFirefox = function() {
	var isFirefox = /Firefox/.test(navigator.userAgent);
	return isFirefox && viewporter.ACTIVE;
}
co.doubleduck.Utils.get = function(x,y,tiles,columns) {
	return tiles[columns * y + x];
}
co.doubleduck.Utils.getBitmapLabel = function(label,fontType,padding) {
	if(padding == null) padding = 0;
	if(fontType == null) fontType = "";
	var fontHelper = new co.doubleduck.FontHelper(fontType);
	var bitmapText = fontHelper.getNumber(Std.parseInt(label),1,true,null,padding);
	return bitmapText;
}
co.doubleduck.Utils.concatWithoutDuplicates = function(array,otherArray) {
	var _g = 0;
	while(_g < otherArray.length) {
		var element = otherArray[_g];
		++_g;
		co.doubleduck.Utils.addToArrayWithoutDuplicates(array,element);
	}
	return array;
}
co.doubleduck.Utils.addToArrayWithoutDuplicates = function(array,element) {
	var _g = 0;
	while(_g < array.length) {
		var currElement = array[_g];
		++_g;
		if(currElement == element) return array;
	}
	array.push(element);
	return array;
}
co.doubleduck.Utils.getImageData = function(image) {
	var ctx = co.doubleduck.Utils.getCanvasContext();
	var img = co.doubleduck.BaseAssets.getImage(image);
	ctx.drawImage(img.image,0,0);
	return ctx.getImageData(0,0,img.image.width,img.image.height);
}
co.doubleduck.Utils.getCanvasContext = function() {
	var dom = js.Lib.document.createElement("Canvas");
	var canvas = dom;
	return canvas.getContext("2d");
}
co.doubleduck.Utils.joinArrays = function(a1,a2) {
	var arr = a1.slice();
	var _g = 0;
	while(_g < a2.length) {
		var el = a2[_g];
		++_g;
		arr.push(el);
	}
	return arr;
}
co.doubleduck.Utils.getRandomElement = function(arr) {
	return arr[Std.random(arr.length)];
}
co.doubleduck.Utils.splitArray = function(arr,parts) {
	var arrs = new Array();
	var _g = 0;
	while(_g < parts) {
		var p = _g++;
		arrs.push(new Array());
	}
	var currArr = 0;
	while(arr.length > 0) {
		arrs[currArr].push(arr.pop());
		currArr++;
		currArr %= parts;
	}
	return arrs;
}
co.doubleduck.Utils.map = function(value,aMin,aMax,bMin,bMax) {
	if(bMax == null) bMax = 1;
	if(bMin == null) bMin = 0;
	if(value <= aMin) return bMin;
	if(value >= aMax) return bMax;
	return (value - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
co.doubleduck.Utils.waitAndCall = function(parent,delay,func,args) {
	createjs.Tween.get(parent).wait(delay).call(func,args);
}
co.doubleduck.Utils.tintBitmap = function(src,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	var colorFilter = new createjs.ColorFilter(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
	src.cache(src.x,src.y,src.image.width,src.image.height);
	src.filters = [colorFilter];
	src.updateCache();
}
co.doubleduck.Utils.containBitmaps = function(bitmapList,spacing,isRow,dims) {
	if(isRow == null) isRow = true;
	if(spacing == null) spacing = 0;
	var totalWidth = 0;
	var totalHeight = 0;
	var result = new createjs.Container();
	var _g1 = 0, _g = bitmapList.length;
	while(_g1 < _g) {
		var currBitmap = _g1++;
		var bmp = bitmapList[currBitmap];
		bmp.regY = bmp.image.height / 2;
		if(currBitmap != 0) {
			if(isRow) {
				bmp.x = bitmapList[currBitmap - 1].x + bitmapList[currBitmap - 1].image.width + spacing;
				if(bmp.image.height > totalHeight) totalHeight = bmp.image.height;
				totalWidth += bmp.image.width + spacing;
			} else {
				bmp.y = bitmapList[currBitmap - 1].y + bitmapList[currBitmap - 1].image.height + spacing;
				if(bmp.image.width > totalWidth) totalWidth = bmp.image.width;
				totalHeight += bmp.image.height + spacing;
			}
		} else {
			totalWidth = bmp.image.width;
			totalHeight = bmp.image.height;
		}
		result.addChild(bmp);
	}
	result.regX = totalWidth / 2;
	result.regY = totalHeight / 2;
	if(dims != null) {
		dims.width = totalWidth;
		dims.height = totalHeight;
	}
	return result;
}
co.doubleduck.Utils.getCenteredImage = function(name,scaleToGame) {
	if(scaleToGame == null) scaleToGame = false;
	var img = co.doubleduck.BaseAssets.getImage(name);
	img.regX = img.image.width / 2;
	img.regY = img.image.height / 2;
	if(scaleToGame) img.scaleX = img.scaleY = co.doubleduck.BaseGame.getScale();
	return img;
}
co.doubleduck.Utils.setCenterReg = function(bmp) {
	bmp.regX = bmp.image.width / 2;
	bmp.regY = bmp.image.height / 2;
}
co.doubleduck.Utils.shuffleArray = function(arr) {
	var tmp, j, i = arr.length;
	while(i > 0) {
		j = Math.random() * i | 0;
		tmp = arr[--i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
}
co.doubleduck.Utils.scaleObject = function(obj) {
	obj.scaleX = obj.scaleY = co.doubleduck.BaseGame.getScale();
}
co.doubleduck.VictoryScreen = $hxClasses["co.doubleduck.VictoryScreen"] = function(properties) {
	createjs.Container.call(this);
	if(properties.level == co.doubleduck.DataLoader.getLevelCount()) {
		this._background = co.doubleduck.Utils.getCenteredImage("images/session/game_won/end_game.png",true);
		this._background.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._background.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this.addChild(this._background);
		this._menuButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/game_won/back_to_menu.png"),true);
		this._menuButton.regX = this._menuButton.image.width / 2;
		this._menuButton.scaleX = this._menuButton.scaleY = co.doubleduck.BaseGame.getScale();
		this._menuButton.x = this._background.x;
		this._menuButton.y = this._background.y;
		this.addChild(this._menuButton);
		this._menuButton.mouseEnabled = true;
		this._menuButton.onClick = $bind(this,this.handleMenu);
	} else {
		var levelData = co.doubleduck.DataLoader.getLevel(properties.level);
		this._background = co.doubleduck.Utils.getCenteredImage(co.doubleduck.Assets.getVictoryBackgroundName(levelData.bg),true);
		this._treasure = co.doubleduck.Utils.getCenteredImage("images/end_screen/treasure_" + (1 + Std.random(6)) + ".png",true);
		this._treasure.regY = this._treasure.image.height;
		this._treasure.x = this._background.x = co.doubleduck.BaseGame.getViewport().width / 2;
		this._treasure.y = this._background.y = co.doubleduck.BaseGame.getViewport().height / 2;
		this._treasure.y += 210 * co.doubleduck.BaseGame.getScale();
		this.addChild(this._background);
		this.addChild(this._treasure);
		this._menuButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(co.doubleduck.VictoryScreen.MENU),true);
		this._menuButton.scaleX = this._menuButton.scaleY = co.doubleduck.BaseGame.getScale();
		this._menuButton.regX = this._menuButton.image.width / 2;
		this._menuButton.x = co.doubleduck.BaseGame.getViewport().width * 0.37;
		this._menuButton.y = this._background.y - this._background.image.height / 10 * co.doubleduck.BaseGame.getScale();
		this.addChild(this._menuButton);
		this._menuButton.mouseEnabled = true;
		this._menuButton.onClick = $bind(this,this.handleMenu);
		this._retryButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage("images/session/lose_screen/button_restart.png"),true);
		this._retryButton.scaleX = this._retryButton.scaleY = co.doubleduck.BaseGame.getScale();
		this._retryButton.regX = this._retryButton.image.width / 2;
		this._retryButton.x = co.doubleduck.BaseGame.getViewport().width * 0.5;
		this._retryButton.y = this._menuButton.y;
		this.addChild(this._retryButton);
		this._retryButton.mouseEnabled = true;
		this._retryButton.onClick = $bind(this,this.handleRetry);
		this._continueButton = new co.doubleduck.Button(co.doubleduck.BaseAssets.getImage(co.doubleduck.VictoryScreen.NEXT),true);
		this._continueButton.scaleX = this._continueButton.scaleY = co.doubleduck.BaseGame.getScale();
		this._continueButton.regX = this._continueButton.image.width / 2;
		this._continueButton.x = co.doubleduck.BaseGame.getViewport().width * 0.63;
		this._continueButton.y = this._menuButton.y;
		this.addChild(this._continueButton);
		this._continueButton.mouseEnabled = true;
		this._continueButton.onClick = $bind(this,this.handleContinue);
	}
};
co.doubleduck.VictoryScreen.__name__ = ["co","doubleduck","VictoryScreen"];
co.doubleduck.VictoryScreen.__super__ = createjs.Container;
co.doubleduck.VictoryScreen.prototype = $extend(createjs.Container.prototype,{
	handleRetry: function() {
		this.onRetry();
	}
	,handleContinue: function() {
		this.onNext();
	}
	,handleMenu: function() {
		this.onMenu();
	}
	,addPerfectNotice: function() {
		var notice = co.doubleduck.Utils.getCenteredImage("images/end_screen/perfect_solution.png",true);
		notice.rotation = -20;
		notice.x = co.doubleduck.BaseGame.getViewport().width * 0.3;
		notice.y = co.doubleduck.BaseGame.getViewport().height * 0.14;
		this.addChild(notice);
	}
	,onRetry: null
	,onNext: null
	,onMenu: null
	,_retryButton: null
	,_continueButton: null
	,_menuButton: null
	,_treasure: null
	,_background: null
	,__class__: co.doubleduck.VictoryScreen
});
co.doubleduck.audio.AudioFX = $hxClasses["co.doubleduck.audio.AudioFX"] = function(src) {
	this._jsAudio = null;
	this._src = src;
	this._loop = false;
	this._volume = 1;
};
co.doubleduck.audio.AudioFX.__name__ = ["co","doubleduck","audio","AudioFX"];
co.doubleduck.audio.AudioFX.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.AudioFX._currentlyPlaying = null;
co.doubleduck.audio.AudioFX.prototype = {
	setVolume: function(volume) {
		this._volume = volume;
		if(this._jsAudio != null) this._jsAudio.setVolume(volume);
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		this._jsAudio.stop();
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop,2);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,load: function(isLoop,pool) {
		if(pool == null) pool = 1;
		var pathNoExtension = this._src;
		this._jsAudio = AudioFX(pathNoExtension, { loop: isLoop, pool: pool });
	}
	,init: function() {
	}
	,_volume: null
	,_loop: null
	,_jsAudio: null
	,_src: null
	,__class__: co.doubleduck.audio.AudioFX
}
co.doubleduck.audio.DummyAudioAPI = $hxClasses["co.doubleduck.audio.DummyAudioAPI"] = function() {
};
co.doubleduck.audio.DummyAudioAPI.__name__ = ["co","doubleduck","audio","DummyAudioAPI"];
co.doubleduck.audio.DummyAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.DummyAudioAPI.prototype = {
	setVolume: function(volume) {
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
	}
	,init: function() {
	}
	,__class__: co.doubleduck.audio.DummyAudioAPI
}
co.doubleduck.audio.HowlerAudio = $hxClasses["co.doubleduck.audio.HowlerAudio"] = function(src) {
	this._jsAudio = null;
	this._src = src;
	this._loop = false;
	this._volume = 1;
};
co.doubleduck.audio.HowlerAudio.__name__ = ["co","doubleduck","audio","HowlerAudio"];
co.doubleduck.audio.HowlerAudio.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.HowlerAudio._currentlyPlaying = null;
co.doubleduck.audio.HowlerAudio.prototype = {
	setVolume: function(volume) {
		this._volume = volume;
		if(this._jsAudio != null) this._jsAudio.volume = volume;
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		this._jsAudio.stop();
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop,1);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,load: function(isLoop,pool) {
		if(pool == null) pool = 1;
		var pathNoExtension = this._src;
		var myUrls = new Array();
		myUrls.push(this._src + ".mp3");
		myUrls.push(this._src + ".ogg");
		this._jsAudio = new Howl({urls: myUrls, loop: false});
	}
	,init: function() {
	}
	,_volume: null
	,_loop: null
	,_jsAudio: null
	,_src: null
	,__class__: co.doubleduck.audio.HowlerAudio
}
co.doubleduck.audio.NonOverlappingAudio = $hxClasses["co.doubleduck.audio.NonOverlappingAudio"] = function(src) {
	this._src = src;
	this.load();
	this._isMusic = false;
};
co.doubleduck.audio.NonOverlappingAudio.__name__ = ["co","doubleduck","audio","NonOverlappingAudio"];
co.doubleduck.audio.NonOverlappingAudio.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = null;
co.doubleduck.audio.NonOverlappingAudio.prototype = {
	getSrc: function() {
		return this._src;
	}
	,audio: function() {
		return this._audio;
	}
	,setVolume: function(volume) {
		if(this._audio != null) this._audio.volume = volume;
	}
	,pause: function() {
		if(this._audio != null) this._audio.pause();
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._isMusic) co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
		if(this._audio != null) {
			this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
			this._audio.currentTime = 0;
			this._audio.pause();
		}
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._isMusic = true;
		co.doubleduck.audio.NonOverlappingAudio._musicPlaying = true;
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
	}
	,handleEnded: function() {
		this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
		this._audio.currentTime = 0;
	}
	,handleTimeUpdate: function() {
		if(this._audio.currentTime >= this._audio.duration - 0.3) this.stop();
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._musicPlaying) return;
		if(overrideOtherEffects && co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
		co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = this;
	}
	,handleError: function() {
	}
	,handleCanPlay: function() {
	}
	,load: function() {
		this._audio = new Audio();
		this._audio.src = this._src;
		this._audio.initialTime = 0;
		this._audio.addEventListener("canplaythrough",$bind(this,this.handleCanPlay));
		this._audio.addEventListener("onerror",$bind(this,this.handleError));
	}
	,init: function() {
	}
	,_isMusic: null
	,_audio: null
	,_src: null
	,__class__: co.doubleduck.audio.NonOverlappingAudio
}
var haxe = haxe || {}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Public = $hxClasses["haxe.Public"] = function() { }
haxe.Public.__name__ = ["haxe","Public"];
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.Stack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += Std.string("\nCalled from ");
		haxe.Stack.itemToString(b,s);
	}
	return b.b;
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += Std.string("a C function");
		break;
	case 1:
		var m = $e[2];
		b.b += Std.string("module ");
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b += Std.string(" (");
		}
		b.b += Std.string(file);
		b.b += Std.string(" line ");
		b.b += Std.string(line);
		if(s1 != null) b.b += Std.string(")");
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += Std.string(".");
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += Std.string("local function #");
		b.b += Std.string(n);
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
if(!haxe.unit) haxe.unit = {}
haxe.unit.TestCase = $hxClasses["haxe.unit.TestCase"] = function() {
};
haxe.unit.TestCase.__name__ = ["haxe","unit","TestCase"];
haxe.unit.TestCase.__interfaces__ = [haxe.Public];
haxe.unit.TestCase.prototype = {
	assertEquals: function(expected,actual,c) {
		this.currentTest.done = true;
		if(actual != expected) {
			this.currentTest.success = false;
			this.currentTest.error = "expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "'";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertFalse: function(b,c) {
		this.currentTest.done = true;
		if(b == true) {
			this.currentTest.success = false;
			this.currentTest.error = "expected false but was true";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertTrue: function(b,c) {
		this.currentTest.done = true;
		if(b == false) {
			this.currentTest.success = false;
			this.currentTest.error = "expected true but was false";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,print: function(v) {
		haxe.unit.TestRunner.print(v);
	}
	,tearDown: function() {
	}
	,setup: function() {
	}
	,currentTest: null
	,__class__: haxe.unit.TestCase
}
haxe.unit.TestResult = $hxClasses["haxe.unit.TestResult"] = function() {
	this.m_tests = new List();
	this.success = true;
};
haxe.unit.TestResult.__name__ = ["haxe","unit","TestResult"];
haxe.unit.TestResult.prototype = {
	toString: function() {
		var buf = new StringBuf();
		var failures = 0;
		var $it0 = this.m_tests.iterator();
		while( $it0.hasNext() ) {
			var test = $it0.next();
			if(test.success == false) {
				buf.b += Std.string("* ");
				buf.b += Std.string(test.classname);
				buf.b += Std.string("::");
				buf.b += Std.string(test.method);
				buf.b += Std.string("()");
				buf.b += Std.string("\n");
				buf.b += Std.string("ERR: ");
				if(test.posInfos != null) {
					buf.b += Std.string(test.posInfos.fileName);
					buf.b += Std.string(":");
					buf.b += Std.string(test.posInfos.lineNumber);
					buf.b += Std.string("(");
					buf.b += Std.string(test.posInfos.className);
					buf.b += Std.string(".");
					buf.b += Std.string(test.posInfos.methodName);
					buf.b += Std.string(") - ");
				}
				buf.b += Std.string(test.error);
				buf.b += Std.string("\n");
				if(test.backtrace != null) {
					buf.b += Std.string(test.backtrace);
					buf.b += Std.string("\n");
				}
				buf.b += Std.string("\n");
				failures++;
			}
		}
		buf.b += Std.string("\n");
		if(failures == 0) buf.b += Std.string("OK "); else buf.b += Std.string("FAILED ");
		buf.b += Std.string(this.m_tests.length);
		buf.b += Std.string(" tests, ");
		buf.b += Std.string(failures);
		buf.b += Std.string(" failed, ");
		buf.b += Std.string(this.m_tests.length - failures);
		buf.b += Std.string(" success");
		buf.b += Std.string("\n");
		return buf.b;
	}
	,add: function(t) {
		this.m_tests.add(t);
		if(!t.success) this.success = false;
	}
	,success: null
	,m_tests: null
	,__class__: haxe.unit.TestResult
}
haxe.unit.TestRunner = $hxClasses["haxe.unit.TestRunner"] = function() {
	this.result = new haxe.unit.TestResult();
	this.cases = new List();
};
haxe.unit.TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe.unit.TestRunner.print = function(v) {
	var msg = StringTools.htmlEscape(js.Boot.__string_rec(v,"")).split("\n").join("<br/>");
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("haxe:trace element not found"); else d.innerHTML += msg;
}
haxe.unit.TestRunner.customTrace = function(v,p) {
	haxe.unit.TestRunner.print(p.fileName + ":" + p.lineNumber + ": " + Std.string(v) + "\n");
}
haxe.unit.TestRunner.prototype = {
	runCase: function(t) {
		var old = haxe.Log.trace;
		haxe.Log.trace = haxe.unit.TestRunner.customTrace;
		var cl = Type.getClass(t);
		var fields = Type.getInstanceFields(cl);
		haxe.unit.TestRunner.print("Class: " + Type.getClassName(cl) + " ");
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe.unit.TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					field.apply(t,new Array());
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe.unit.TestRunner.print(".");
					} else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe.unit.TestRunner.print("W");
					}
				} catch( $e0 ) {
					if( js.Boot.__instanceof($e0,haxe.unit.TestStatus) ) {
						var e = $e0;
						haxe.unit.TestRunner.print("F");
						t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					} else {
					var e = $e0;
					haxe.unit.TestRunner.print("E");
					if(e.message != null) t.currentTest.error = "exception thrown : " + Std.string(e) + " [" + Std.string(e.message) + "]"; else t.currentTest.error = "exception thrown : " + Std.string(e);
					t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
		haxe.unit.TestRunner.print("\n");
		haxe.Log.trace = old;
	}
	,run: function() {
		this.result = new haxe.unit.TestResult();
		var $it0 = this.cases.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.runCase(c);
		}
		haxe.unit.TestRunner.print(this.result.toString());
		return this.result.success;
	}
	,add: function(c) {
		this.cases.add(c);
	}
	,cases: null
	,result: null
	,__class__: haxe.unit.TestRunner
}
haxe.unit.TestStatus = $hxClasses["haxe.unit.TestStatus"] = function() {
	this.done = false;
	this.success = false;
};
haxe.unit.TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe.unit.TestStatus.prototype = {
	backtrace: null
	,posInfos: null
	,classname: null
	,method: null
	,error: null
	,success: null
	,done: null
	,__class__: haxe.unit.TestStatus
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
co.doubleduck.BaseAssets.onLoadAll = null;
co.doubleduck.BaseAssets._loader = null;
co.doubleduck.BaseAssets._cacheData = { };
co.doubleduck.BaseAssets._loadCallbacks = { };
co.doubleduck.BaseAssets.loaded = 0;
co.doubleduck.BaseAssets._useLocalStorage = false;
co.doubleduck.BaseGame._viewport = null;
co.doubleduck.BaseGame._scale = 1;
co.doubleduck.BaseGame.DEBUG = false;
co.doubleduck.BaseGame.LOGO_URI = "images/duckling/splash_logo.png";
co.doubleduck.BaseGame.LOAD_STROKE_URI = "images/duckling/loading_stroke.png";
co.doubleduck.BaseGame.LOAD_FILL_URI = "images/duckling/loading_fill.png";
co.doubleduck.BaseGame.ORIENT_PORT_URI = "images/duckling/orientation_error_port.png";
co.doubleduck.BaseGame.ORIENT_LAND_URI = "images/duckling/orientation_error_land.png";
co.doubleduck.BasePersistence.GAME_PREFIX = "DUCK";
co.doubleduck.BasePersistence.available = co.doubleduck.BasePersistence.localStorageSupported();
co.doubleduck.TiledObject.TILE_WIDTH = 57;
co.doubleduck.TiledObject.TILE_HEIGHT = 57;
co.doubleduck.Button.CLICK_TYPE_NONE = 0;
co.doubleduck.Button.CLICK_TYPE_TINT = 1;
co.doubleduck.Button.CLICK_TYPE_JUICY = 2;
co.doubleduck.Button.CLICK_TYPE_SCALE = 3;
co.doubleduck.Button.CLICK_TYPE_TOGGLE = 4;
co.doubleduck.Button.CLICK_TYPE_HOLD = 5;
co.doubleduck.Button._defaultSound = null;
co.doubleduck.LossScreen.MENU = "images/end_screen/button_menu.png";
co.doubleduck.LossScreen.RESTART = "images/session/lose_screen/button_restart.png";
co.doubleduck.Map.COLUMNS = 6;
co.doubleduck.Map.ROWS = 6;
co.doubleduck.Menu.LEVELS = 1;
co.doubleduck.Menu.COLS = 2;
co.doubleduck.Menu.ROWS = 2;
co.doubleduck.Menu.LEVELS_PER_SCREEN = 4;
co.doubleduck.Popup.MENU = "images/session/UI/pause_screen/button_menu.png";
co.doubleduck.Popup.RESTART = "images/session/UI/pause_screen/button_restart.png";
co.doubleduck.Popup.NEXT = "images/session/UI/pause_screen/button_play.png";
co.doubleduck.Session._lastLevelId = -1;
co.doubleduck.audio.WebAudioAPI._buffers = { };
co.doubleduck.SoundManager._muted = false;
co.doubleduck.SoundManager._cache = { };
co.doubleduck.SoundManager.available = co.doubleduck.SoundManager.isSoundAvailable();
co.doubleduck.VictoryScreen.MENU = "images/end_screen/button_menu.png";
co.doubleduck.VictoryScreen.NEXT = "images/end_screen/button_next.png";
co.doubleduck.audio.AudioFX._muted = false;
co.doubleduck.audio.HowlerAudio._muted = false;
co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
js.Lib.onerror = null;
co.doubleduck.Main.main();
