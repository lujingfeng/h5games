var bd = "Hang";
var gN = "2.0";
var eo = "379135205474050";
var eO = 0;
var gh = 1;
var gf = 2;
var eE = 3;
var eN = 4;
var eF = 5;
var eD = 6;
var eT = 7;
var eC = 8;
var fu = 9;
var eP = 10;
var gg = 11;
var eJ = 12;
var eK = 13;
var fc = 14;
var eI = 15;
var eH = 16;
var eR = 17;
var gj = 18;
var eQ = 19;
var eU = 20;
var fa = 21;
var eZ = 22;
var eY = 23;
var eW = 24;
var eV = 25;
var eG = 26;
var eL = 27;
var eB = 28;
var gi = 29;
var eS = 30;
var eA = 31;
var gb = dsp[eO];
var fl = dsp[gh];
var dK = dsp[gf];
var aI = dsp[eE];
var cj = dsp[eN];
var de = dsp[eF];
var fN = dsp[eD];
var R = dsp[eT];
var gO = dsp[eC];
var bV = dsp[fu];
var ga = dsp[eP];
var gA = dsp[gg];
var fT = dsp[eJ];
var fS = dsp[eK];
var gn = dsp[fc];
var gm = dsp[eI];
var gr = dsp[eH];
var fj = dsp[eR];
var U = dsp[gj];
var aZ = dsp[eQ];
var au = dsp[eU];
var aY = dsp[fa];
var gp = dsp[eZ];
var gk = dsp[eY];
var fJ = dsp[eW];
var gl = dsp[eV];
var fH = dsp[eG];
var fV = dsp[eL];
var cV = dsp[eB];
var dG = dsp[gi];
var cA = dsp[eS];
var db = dsp[eA];
var aJ = "";
var f = 0;
var c = 2;
var ca = 0;
var bZ = 1;
var bu = 2;
var dw = 3;
var du = 4;
var gE = 5;
var dv = 8;
var ds = 30;
var cX = new Array();
var bH = 0.0;
for (var i = 0; i < 50; i++) {
    cX[i] = bH;
    bH += 0.02
}
bH = 1.0;
for (var i = 50; i < 100; i++) {
    cX[i] = bH;
    bH -= 0.02
}
var cu = 0;
var i = 0;
var ao = 50;
var J = ca;
var gK = "iphone";
var ae = "onmousedown";
var H = "onclick";
var av = "onmousemove";
var az = "onmouseup";
var bo = "touchmove";
var O = 0;
var cG = fj;

function L(name) {
    if (navigator.userAgent.indexOf(name) != -1) {
        return true
    }
    return false
};
var ef = 0;
var bC = 1;
var ad = 2;
var aF = 3;
var V = 4;
var aA = 5;
var ag = 6;
var bs = 7;
var bi = 0;
if (L("iPhone") || L("iPad") || L("iPod")) f = bC;
else if (L("Android")) f = ad;
else if (L("MSIE")) {
    if (typeof document.documentElement.style.opacity != 'undefined') {
        f = aF;
        if (L("IEMobile")) bi = 1
    } else f = ag
} else if (L("Firefox")) f = V;
else if (L("Opera")) f = aA;
else if (L("RIM") || L("BB10")) f = bs;
else f = ef;
if (f == bC) {
    ae = "ontouchstart";
    H = "onclick";
    az = "ontouchend";
    av = "ontouchmove";
    ao = 50
}
if (f == bs) {
    ae = "ontouchstart";
    H = "ontouchstart";
    az = "ontouchend";
    av = "ontouchmove";
    ao = 50
}
if (f == ad) {
    if (L("Android 2.0") || L("Android 2.1")) {
        bo = "touchstart";
        ae = "ontouchstart";
        az = "ontouchend";
        H = "ontouchstart";
        av = "ontouchmove";
        ao = 50;
        O = 2
    } else if (L("Android 1.6")) {
        bo = "touchstart";
        ae = "ontouchstart";
        az = "ontouchend";
        H = "ontouchstart";
        av = "ontouchmove";
        ao = 20;
        O = 1
    } else {
        bo = "touchmove";
        ae = "ontouchstart";
        H = "onclick";
        az = "ontouchend";
        av = "ontouchmove";
        ao = 50;
        if (L("Android 2.2") || L("Android 2.3")) O = 3;
        else O = 2
    }
}
if ((f == aF) || (f == ag)) {
    ae = "onmousedown";
    H = "onclick";
    az = "onmouseup";
    av = "onmousemove";
    ao = 50;
    if (f == ag) {
        ao = 50;
        c = 1
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement) {
            "use strict";
            if (this == null) {
                throw new TypeError()
            }
            var cq = Object(this);
            var bR = cq.length >>> 0;
            if (bR === 0) {
                return -1
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n != n) {
                    n = 0
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n))
                }
            }
            if (n >= bR) {
                return -1
            }
            var bB = n >= 0 ? n : Math.max(bR - Math.abs(n), 0);
            for (; bB < bR; bB++) {
                if (bB in cq && cq[bB] === searchElement) {
                    return bB
                }
            }
            return -1
        }
    }
}
if (f == V) {
    ae = "onmousedown";
    H = "onclick";
    az = "onmouseup";
    av = "onmousemove";
    ao = 50
}
if (f == aA) {
    ae = "onmousedown";
    H = "onclick";
    az = "onmouseup";
    av = "onmousemove";
    ao = 50
}
var aW = 0;
if ((f != 3) && (f != 6)) aW = 1;

function ek(e) {
    if (aW) e.preventDefault()
};
var bU = 0;
if (L("Firefox") && L("Android")) bU = 1;
if (bU) {
    f = V;
    bo = "touchmove";
    ae = "ontouchstart";
    H = "onclick";
    az = "ontouchend";
    av = "ontouchmove";
    ao = 50
}
if ((f == bC) || (f == ad) || bi || bU) {
    if (window.innerWidth < 600) c = 1
}
if (de == 1) c = 1;
else if (de == 2) c = 2;
if (fN) if (top.location.href != self.location.href) top.location.href = self.location.href;
par_game = bd;
var bD = 0;
var dB = 0;
var dD = 0;
if (c == 1) {
    var dA = 384;
    var dF = 512;
    R += "zz_"
} else {
    var dA = 768;
    var dF = 1024
}
var l = dA - dB;
var r = dF - dD;
var G = dB + (l >> 1);
var fk = dD + (r >> 1);
var gc;
var fm;
var ff;
var fK;
var gL;
var dq;
var dg;
var fe;
var fi;
var cJ = 1;
var dz = 0;
var fp = 'k66b';
var fz = fp.split('');
var fA = 'c5-a';
var ft = fA.split('');
var ce = location.hostname;
var as = ce.split(".");
var bq = "";
if (as.length > 2) {
    if ((as.length == 3) && (as[as.length - 1].length < 3) && (as[as.length - 2].length < 3)) bq = ce;
    else {
        for (i = 1; i < as.length - 1; i++) bq += as[i] + ".";
        bq += as[as.length - 1]
    }
} else bq = ce;
var fd = '://';
var fs = 'r-crrc';
var fq = fs.split('');
var bn = dz;
var fw = 'eeesf23hh3r62sray';
var fv = fw.split('');
var fy = 'r5-b6';
var fx = fy.split('');
var fD = 'v7';
var eq = '9fg7hjklz6xc.v8bn1m0';
var fC = fD.split('');
var dL = 'q2se4rtyu3i5opa-wd' + eq;
var am = dL.split('');
var F = '';
var gq = 'ible';
var ei = 'abcdefghijklmnopqrstuvwxyz';
var fg = 'ank';
var aL = cG.length;
var ea = '0123456789-.';
var bt = cG.split('');
var fo = 'den';
var aB = ea + ei;
var gR = aB.split('');
var dm = 'hid';
var fh = 'bl';
var gs = 'vis';
var cw = '';
var cI = bq;
var dY = cI.toLowerCase();
var gu = dY.split('');
var gd = 'ow';
var fn = 'e';
var ge = 'sh';
for (i = 0; i < 5; i++) F += am[aB.indexOf(fx[i])];
bW = 'S' + F;
F = '';
for (i = 0; i < 17; i++) F += am[aB.indexOf(fv[i])];
dq = F;
fi = '_' + fh + fg;
F = '-';
for (i = 0; i < 2; i++) F += am[aB.indexOf(fC[i])];
bW += F;
F = '-D';
for (i = 0; i < 4; i++) F += am[aB.indexOf(ft[i])];
bW += F;
F = '-S';
for (i = 0; i < 6; i++) F += am[aB.indexOf(fq[i])];
bW += F;
F = '';
for (i = 0; i < 4; i++) F += am[aB.indexOf(fz[i])];
dg = F;
F = '';
for (i = 2; i < aL - 2; i++) {
    F += am[aB.indexOf(bt[i])]
}
cw = cI;
fe = dg + fd + dq;
gc = ge + gd;
fm = dm + fo;
bn = cJ;
ff = dm + fn;
fK = gs + gq;
var bk = 1;
var I = 0;
var aT = "00000";
var bM = 0;
var D;
var T;
var C;
if (aW) {
    D = window.innerWidth;
    T = window.innerHeight
} else {
    D = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    T = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight
}
if (D / T > l / (r)) {
    C = T / (r)
} else {
    C = D / (l)
}
var ap = "position:absolute;top:0px;left:0px;z-Index:1;visibility:hidden;";
var bQ = ap + "white-space:nowrap;";

function gP(A, col) {
    document.getElementById(A).style.color = "#" + col;
    document.getElementById(A).style.fontWeight = "bold";
    document.getElementById(A).style.filter = "alpha(opacity=50)"
};
document.write('<div id=\'all\' style=\'position:absolute;left:0px;top:0px;clip:rect(0px,' + l + 'px,' + (r) + 'px,0px);\'>');
if ((D < T) && ((f == bC) || (f == ad) || (f == bs) || bi)) dj("all", 0, 0, D / (l), T / (r));
else dn("all", ((D - l * C) / 2), 0, C);
if (bV) {
    par_adx2 = ((D - l) / 2);
    par_adx3 = ((D - l * C) / 2);
    par_adx4 = ((D - l * C) / 2) + (l * C);
    ds_RZ()
}
var bJ = new Array();
var bl = 0;
var cZ = fl;
bJ[bl] = new Image();
bJ[bl].src = cZ;
bl++;
var cY = "img/" + R + "info.png";
bJ[bl] = new Image();
bJ[bl].src = cY;
bl++;
var fL = 40 * c;
var fM = 40 * c;
document.write('<img id=\'lo\' style=\'position:absolute;top:0px;left:0px;visibility:visible;z-Index:1;opacity:1;-webkit-transition-property: opacity;-webkit-transition-duration: 1s;\' src=\'' + cZ + '\' width=' + 1 + ' height=' + r + '>');
if (cA) {
    aZ *= c;
    au *= c;
    document.write('<div id=\'lob1\' style=\'position:absolute;top:' + (r - (r >> 3)) + 'px;left:' + ((l >> 1) - (aZ >> 1)) + 'px;visibility:visible;z-Index:2;opacity:' + aY + ';-moz-opacity:' + aY + ';filter:alpha(opacity=' + (aY * 100) + ');background-color:#' + fJ + ';border:1px solid #000;width:' + (aZ) + 'px;height:' + au + 'px;font-size:' + (au - (au >> 2)) + 'px;color:#' + gk + ';text-align:center;-moz-border-radius:' + (au >> 1) + ';-webkit-border-radius:' + (au >> 1) + 'px;\'>' + gp + '</div>');
    document.write('<div id=\'lob2\' style=\'position:absolute;top:' + (r - (r >> 3)) + 'px;left:' + ((l >> 1) - (aZ >> 1)) + 'px;visibility:visible;z-Index:3;opacity:' + aY + ';-moz-opacity:' + aY + ';filter:alpha(opacity=' + (aY * 100) + ');background-color:#' + gl + ';width:0px;height:' + au + 'px;-moz-border-radius:' + (au >> 1) + ';-webkit-border-radius:' + (au >> 1) + 'px;\'></div>')
}
var v = new Array();
var m = 0;
var cH = aZ / 22;
if (U == ai) cH = aZ / (22 + 4);
var dc = new Array();
var bE = 0;

function ab() {
    if (cA) {
        if (v[bE].width > 0) {
            clearTimeout(dc[bE]);
            bE++;
            document.getElementById("lob2").style.border = "1px solid #000";
            document.getElementById("lob2").style.width = (bE * cH) + "px"
        } else dc[bE] = setTimeout('ab()', 20)
    }
};
var ai = 5;
var gJ = "";
var K = 0;
if (U == ai) {
    var cQ = "img/" + R + "fli.png";
    v[m] = new Image();
    v[m].src = cQ;
    ab();
    m++;
    var cL = "img/" + R + "flo.png";
    v[m] = new Image();
    v[m].src = cL;
    ab();
    m++;
    var by = "img/" + R + "fng.png";
    v[m] = new Image();
    v[m].src = by;
    ab();
    m++;
    var bz = "img/" + R + "fhi.png";
    v[m] = new Image();
    v[m].src = bz;
    ab();
    m++
}
var dr = "img/" + R + "t.jpg";
v[m] = new Image();
v[m].src = dr;
ab();
m++;
var bw = "img/" + R + "ng.png";
v[m] = new Image();
v[m].src = bw;
ab();
m++;
var bx = "img/" + R + "hi.png";
v[m] = new Image();
v[m].src = bx;
ab();
m++;
var ba = "img/" + R + "submit.png";
v[m] = new Image();
v[m].src = ba;
ab();
m++;
var cW = "img/" + R + "continue.png";
v[m] = new Image();
v[m].src = cW;
ab();
m++;
var dE = ".png";
if (f == ag) dE = ".gif";
var cB = "img/" + R + "l1.jpg";
v[m] = new Image();
v[m].src = cB;
ab();
m++;
var cE = "img/" + R + "l2.jpg";
v[m] = new Image();
v[m].src = cE;
ab();
m++;
var cD = "img/" + R + "l3.jpg";
v[m] = new Image();
v[m].src = cD;
ab();
m++;
var bv = new Array();
for (i = 0; i < 14; i++) {
    bv[i] = "img/" + R + "s" + i + dE;
    v[m + i] = new Image();
    v[m + i].src = bv[i];
    ab()
}
m += 14;
if (bV) {}
if ((f != ag) && (f != bs) && (f != ad)) {
    document.write('<div style=\'position:absolute;top:0px;left:' + (l) + 'px;width:' + (l * 2) + 'px;height:' + (r) + 'px;background-Color:#000000;visibility:visible;z-Index:10000;\'></div>');
    document.write('<div style=\'position:absolute;top:0px;left:' + (-l * 2) + 'px;width:' + (l * 2) + 'px;height:' + (r) + 'px;background-Color:#000000;visibility:visible;z-Index:10000;\'></div>')
}
if (aI) {
    var af = aJ + "&hi=1";
    if (cV) af = ds_urlhiscore + dG;
    document.write('<img id=\'hi\' style=\'' + ap + 'display:none;opacity:0.6;-moz-opacity:0.6;filter:alpha(opacity=60);\' ' + H + '=\'goHome()\' src=\'' + bx + '\' >')
}
document.write('<div id=\'hs\' style=\'' + bQ + 'color:#ffffff;font-family:Arial;font-size:' + (14 * c) + 'px;\'></div>');
document.write('<img id=\'ng\' style=\'' + ap + 'opacity:0.6;-moz-opacity:0.6;filter:alpha(opacity=60);\' ' + H + '=\'ej()\'  src=\'' + bw + '\' >');
document.write('<div id=\'su\' style=\'' + ap + '\'><a href=\'#\' ' + ae + '=\'go()\'><img  src=\'' + ba + '\' border=0></a></div>');
document.write('<img id=\'co\' style=\'' + ap + '\' ' + H + '=\'bg()\' src=\'' + cW + '\' >');
document.write('<img id=\'myinf\' style=\'position:absolute;left:0px;top:0px;display:none;visibility:visible;z-Index:100000;\' ' + ae + '=\'info()\'  src=\'' + cY + '\' >');
if (ga) {
    g("myinf", -10000, -10000)
} else g("myinf", l - fL, r - fM);
if (U == ai) {
    document.write('<div id="fb-root" ></div>');
    (function () {
        var e = document.createElement('script');
        e.async = true;
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e)
    }());
    window.fbAsyncInit = function () {
        FB.init({
            appId: eo,
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true
        });
        FB.Event.subscribe('auth.statusChange', ec);
        FB.Event.subscribe('auth.logout', function (bI) {
            K = 0;
            document.getElementById("ng").src = bw;
            document.getElementById("hi").src = bx
        });
        FB.Event.subscribe('auth.login', function (bI) {
            K = 1;
            dp();
            document.getElementById("ng").src = by;
            document.getElementById("hi").src = bz
        })
    };

    function ec(bI) {
        if (bI.authResponse) {
            K = 1;
            dp();
            document.getElementById("ng").src = by;
            document.getElementById("hi").src = bz
        } else {
            K = 0;
            document.getElementById("ng").src = bw;
            document.getElementById("hi").src = bx
        }
    };

    function dp() {
        if (K) {
            FB.api('/me', function (bp) {
                if (!bp.error) {
                    cg = bp.id;
                    P = bp.name;
                    bj = P.charAt(1) + ah(9) + (ak * 89) + ah(9) + P.charAt(3) + 'fc1' + ah(9) + P.charAt(0) + ah(9) + P.charAt(1) + '4z3' + (ak * 7) + '3247z11';
                    document.getElementById("f_n0").innerHTML = bp.name;
                    document.getElementById("f_p0").src = "http://graph.facebook.com/" + bp.id + "/picture?type=small"
                }
            })
        }
    };

    function dT() {
        if ((aW) && (f != V)) window.event.preventDefault();
        FB.login(function (bI) {})
    };

    function dN() {
        if ((aW) && (f != V)) window.event.preventDefault();
        g("f_lo", -1000, -1000);
        g("su", -1000, -1000);
        g("hs", -1000, -1000);
        g("f_p0", -1000, -1000);
        g("f_n0", -1000, -1000);
        K = 0;
        document.getElementById("ng").src = bw;
        document.getElementById("hi").src = bx;
        FB.logout()
    };
    if (K == 1) {
        document.getElementById("ng").src = by;
        document.getElementById("hi").src = bz
    }
    document.write('<img id=\'f_p0\' style="' + ap + '"  width=' + (50 * c) + ' height=' + (50 * c) + ' border=1>');
    document.write('<div id=\'f_n0\' style=\'' + bQ + 'font-family:Arial;font-size:' + (16 * c) + 'px;color:#4fefff;\'></div>');
    document.write('<div id=\'f_ba\' style=\'position:absolute;top:0px;left:0px;width:' + (l) + 'px;height:' + (42 * c) + 'px;background-Color:#000000;visibility:hidden;z-Index:1;\'></div>');
    document.write('<img id=\'f_li\' style=\'' + ap + '\' ' + H + '=\'dT()\'  src=\'' + cQ + '\' >');
    document.write('<img id=\'f_lo\' style=\'' + ap + '\' ' + H + '=\'dN()\'  src=\'' + cL + '\' >');
    cr("f_ba", 0.7)
}
document.write('<div id=\'s1\'  style=\'' + bQ + 'z-Index:0;color:#ffffff;font-family:Arial;font-size:' + (16 * c) + 'px;text-shadow: 2px 2px 3px #ff0000;\'></div>');
document.write('<div id=\'g1\' style=\'' + bQ + 'z-Index:0;color:#ffff00;font-family:Arial;font-size:' + (48 * c) + 'px;text-shadow: 2px 2px 6px #7f4f00;\'><img src="img/retry.png" width="320" height="120"></div>');
document.write('<img id=\'ti\' style=\'' + ap + '\' src=\'' + dr + '\' >');
document.write('<img id=\'l1\' ' + ae + '=\'dI()\' style=\'' + ap + '\' src=\'' + cB + '\' >');
document.write('<div id=\'li\' style=\'position:absolute;top:0px;left:0px;width:1px;height:1px;color:#7f7f7f;border-Width:' + (2 * c) + 'px 0px 0px 0px;border-Style:solid;visibility:hidden;z-Index:9;\'></div>');
for (var i = 0; i < 8; i++) {
    document.write('<img id=\'spr' + i + '\' ' + ae + '=\'dI()\'    style=\'position:absolute;top:0px;left:0px;visibility:hidden;z-Index:5;\' src=\'' + bv[i] + '\' >')
}
document.write('</div>');

function B(A) {
    document.getElementById(A).style.visibility = 'hidden'
};

function gH(A, xx, j, o, eg) {
    cr(A, eg);
    document.getElementById(A).style.left = xx + "px";
    document.getElementById(A).style.top = j + "px";
    document.getElementById(A).style.visibility = 'visible';
    document.getElementById(A).style.zIndex = o
};

function t(A, xx, j, o) {
    document.getElementById(A).style.left = xx + "px";
    document.getElementById(A).style.top = j + "px";
    document.getElementById(A).style.visibility = 'visible';
    document.getElementById(A).style.zIndex = o
};

function gC(A, xx, j, cx, cy, o) {
    document.getElementById(A).style.left = xx + "px";
    document.getElementById(A).style.top = j + "px";
    document.getElementById(A).style.width = (cx - xx) + "px";
    document.getElementById(A).style.height = (cy - j) + "px";
    document.getElementById(A).style.visibility = 'visible';
    document.getElementById(A).style.zIndex = o
};

function cr(A, bf) {
    if (f != ag) document.getElementById(A).style.opacity = bf;
    else document.getElementById(A).style.filter = "alpha(opacity=" + (bf * 100 + ")")
};

function bK(A) {
    return document.getElementById(A).offsetWidth
};

function dR(A) {
    return document.getElementById(A).offsetHeight
};

function ah(bf) {
    return (Math.floor(Math.random() * bf))
};

function gv(d, xx, j, o) {
    if (f == ag) {
        document.getElementById(d).style.left = xx + "px";
        document.getElementById(d).style.top = j + "px"
    } else if (f == aA) document.getElementById(d).style.OTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ",1)";
    else if (f == V) document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ",1)";
    else if (f == aF) document.getElementById(d).style.msTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ",1)";
    else if (f == ad) {
        if (O == 1) document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ",1)";
        else if (O == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = j + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + o + ",1)"
        } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + o + ",1)"
    } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + o + ",1)"
};

function gB(d, xx, j, o, M) {
    if (f == aA) document.getElementById(d).style.OTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ") rotate(" + M + "deg)";
    else if (f == V) document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ") rotate(" + M + "deg)";
    else if (f == aF) document.getElementById(d).style.msTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ") rotate(" + M + "deg)";
    else if (f == ad) {
        if (O == 1) document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ") rotate(" + M + "deg)";
        else if (O == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = j + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + o + ") rotate(" + M + "deg)"
        } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + o + ") rotate(" + M + "deg)"
    } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + o + ") rotate(" + M + "deg)"
};

function dj(d, xx, j, aV, aM) {
    if (f == ag) {} else if (f == aA) document.getElementById(d).style.OTransform = "translate(" + xx + "px," + j + "px) scale(" + aV + "," + aM + ")";
    else if (f == V) document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + j + "px) scale(" + aV + "," + aM + ")";
    else if (f == aF) document.getElementById(d).style.msTransform = "translate(" + xx + "px," + j + "px) scale(" + aV + "," + aM + ")";
    else if (f == ad) {
        if (O == 1) document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + j + "px) scale(" + aV + "," + aM + ")";
        else if (O == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = j + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + aV + "," + aM + ")"
        } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + aV + "," + aM + ")"
    } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + aV + "," + aM + ")"
};

function gD(d, xx, j, cx, cy, o) {
    document.getElementById(d).style.left = ((xx)) + "px";
    document.getElementById(d).style.top = ((j)) + "px";
    document.getElementById(d).style.width = (cx * o) + "px";
    document.getElementById(d).style.height = (cy * o) + "px"
};

function gw(d, xx, j, dM, o) {
    document.getElementById(d).style.left = ((xx)) + "px";
    document.getElementById(d).style.top = ((j)) + "px";
    document.getElementById(d).style.fontSize = (dM * o) + "px"
};

function dn(d, xx, j, o) {
    if (f == ag) {
        document.getElementById(d).style.zoom = o;
        document.getElementById(d).style.left = xx + "px";
        document.getElementById(d).style.top = j + "px"
    } else if (f == aA) document.getElementById(d).style.OTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ")";
    else if (f == V) document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ")";
    else if (f == aF) document.getElementById(d).style.msTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ")";
    else if (f == ad) {
        if (O == 1) document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + j + "px) scale(" + o + ")";
        else if (O == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = j + "px";
            document.getElementById(d).style.webkitTransform = "scale(" + o + ")"
        } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + o + ")"
    } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) scale(" + o + ")"
};

function gz(d, xx, j, M) {
    if (f == ag) {
        gT = "filter";
        var cK = Math.cos(M * Math.PI * 2 / 360);
        var di = Math.sin(M * Math.PI * 2 / 360);
        dX = cK;
        dW = -di;
        dO = di;
        dP = cK;
        document.getElementById(d).style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + dX + ",M12=" + dW + ",M21=" + dO + ",M22=" + dP + ", sizingMethod='auto expand');";
        document.getElementById(d).style.left = xx - (bK(d) >> 1) + "px";
        document.getElementById(d).style.top = j - (dR(d) >> 1) + "px"
    } else if (f == aA) document.getElementById(d).style.OTransform = "translate(" + xx + "px," + j + "px) rotate(" + M + "deg)";
    else if (f == V) document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + j + "px) rotate(" + M + "deg)";
    else if (f == aF) document.getElementById(d).style.msTransform = "translate(" + xx + "px," + j + "px) rotate(" + M + "deg)";
    else if (f == ad) {
        if (O == 1) document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + j + "px) rotate(" + M + "deg)";
        else if (O == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = j + "px";
            document.getElementById(d).style.webkitTransform = "rotate(" + M + "deg)"
        } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) rotate(" + M + "deg)"
    } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px) rotate(" + M + "deg)"
};

function g(d, xx, j) {
    if (f == ag) {
        document.getElementById(d).style.left = xx + "px";
        document.getElementById(d).style.top = j + "px"
    } else if (f == aA) document.getElementById(d).style.OTransform = "translate(" + xx + "px," + j + "px)";
    else if (f == V) {
        document.getElementById(d).style.MozTransform = "translate(" + xx + "px," + j + "px)"
    } else if (f == aF) {
        document.getElementById(d).style.msTransform = "translate(" + xx + "px," + j + "px)"
    } else if (f == ad) {
        if (O == 1) document.getElementById(d).style.webkitTransform = "translate(" + xx + "px," + j + "px)";
        else if (O == 3) {
            document.getElementById(d).style.left = xx + "px";
            document.getElementById(d).style.top = j + "px"
        } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px)"
    } else document.getElementById(d).style.webkitTransform = "translate3d(" + xx + "px," + j + "px,0px)"
};
var bh;

function ej() {
    if (U == ai) {
        if ((db > 0) && (K == 0) && (typeof(window.localStorage) != 'undefined')) {
            bh = window.localStorage.getItem("ds_" + bd + "_0");
            if (bh == null) bh = 0;
            if (bh > db - 1) {
                alert("PLEASE LOGIN WITH FACEBOOK TO PLAY AGAIN");
                return
            } else {
                bh++;
                window.localStorage.setItem("ds_" + bd + "_0", bh)
            }
        }
        B("f_li");
        B("f_lo");
        B("f_ba")
    }
    mydisable();
    B("ti");
    if (aI) B("hi");
    B("ng");
    bk = 1;
    I = 0;
    aT = "00000";
    cc(0);
    dh();
    if (bn) J = bu
};

function dQ() {
    t("s1", G - (document.getElementById("s1").offsetWidth >> 1), r - (document.getElementById("s1").offsetHeight), 1001)
};

function cc(ew) {
    I += ew;
    if (I < 10) aT = "0000" + I;
    else if (I >= 10 && I < 100) aT = "000" + I;
    else if (I >= 100 && I < 1000) aT = "00" + I;
    else if (I >= 1000 && I < 10000) aT = "0" + I;
    else aT = "" + I;
    var eu = 'Score: ' + aT;
    document.getElementById("s1").innerHTML = eu
};

function dk(ay, ax, aU, aE) {
    if (aU < ay) {
        var cz = ay;
        ay = aU;
        aU = cz;
        cz = ax;
        ax = aE;
        aE = cz
    }
    var ar = document.getElementById("li");
    var length = Math.sqrt((ay - aU) * (ay - aU) + (ax - aE) * (ax - aE));
    ar.style.width = length + "px";
    if (f == ag) {
        ar.style.top = (aE > ax) ? ax + "px" : aE + "px";
        ar.style.left = ay + "px";
        var da = (aU - ay) / length;
        var cF = (aE - ax) / length;
        ar.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + da + ", M12=" + -1 * cF + ", M21=" + cF + ", M22=" + da + ")"
    } else {
        var an = Math.atan((aE - ax) / (aU - ay));
        ar.style.top = ax + 0.5 * length * Math.sin(an) + "px";
        ar.style.left = ay - 0.5 * length * (1 - Math.cos(an)) + "px";
        ar.style.msTransform = ar.style.MozTransform = ar.style.WebkitTransform = ar.style.OTransform = "rotate(" + an + "rad)"
    }
};
var gG = 0;
var bA = 0;
var ck = new Array();
for (var i = 0; i < v.length; i++) ck[i] = false;

function dU() {
    if (J == ca) {
        window.scroll(0, 1);
        if (bA == v.length) {
            if (cA) {
                B("lob1");
                B("lob2")
            }
            if (bn) J = ds;
            return
        } else if (ck[bA] == false && v[bA].complete) {
            ck[bA] = true;
            bA++
        }
    } else if (J == ds) {
        cu += 5;
        if (cu == 55) {
            t("ti", 0, 0, 0);
            g("ti", 0, 0);
            cr("lo", 0)
        }
        if (cu == 100) {
            J = bZ;
            B("lo");
            t("ng", 0, 0, 11);
            g("ng", -1000, -1000);
            if (aI) {
                t("hi", 0, 0, 11);
                g("hi", -1000, -1000)
            }
            if (U == ai) {
                if (K == 1) {
                    document.getElementById("ng").src = by;
                    document.getElementById("hi").src = bz
                }
                t("f_li", 0, 0, 11);
                g("f_li", -1000, -1000);
                t("f_lo", 0, 0, 11);
                g("f_lo", -1000, -1000);
                t("f_ba", 0, 0, 10);
                g("f_ba", 0, r - 42 * c)
            }
        }
    } else if (J == bZ) {
        if (U == ai) {
            if (K == 0) {
                g("f_li", G - (bK("f_li") >> 1), r - 37 * c);
                g("f_lo", -1000, -1000)
            } else {
                g("f_lo", G - (bK("f_lo") >> 1), r - 37 * c);
                g("f_li", -1000, -1000)
            }
            g("ng", (l >> 1) - (64 * c), r - (38 * c) - (64 * c) - (64 * c));
            if (aI) g("hi", (l >> 1) - (64 * c), r - (38 * c) - (64 * c))
        } else {
            g("ng", (l >> 1) - (64 * c), r - (38 * c) - (64 * c) - (16 * c));
            if (aI) g("hi", (l >> 1) - (64 * c), r - (38 * c) - (16 * c))
        }
    } else if (J == bu) {
        er()
    } else if (J == dw) {
        if (bM++ > 50) {
            bM = 0;
            dh();
            J = bu
        }
    } else if (J == du) {
        var cS = 0;
        var cN = 0;
        cS = G - (document.getElementById("g1").offsetWidth >> 1);
        cN = fk - (document.getElementById("g1").offsetHeight >> 1);
        t("g1", 0, 0, 501);
        if (bM++ > 60) {
            bM = 0;
            B("g1");
            B("s1");
            B("li");
            B("l1");
            for (var d = 0; d < 8; d++) B("spr" + d);
            if (aI) J = dv;
            else bg()
        }
    } else if (J == dv) {
        ed()
    }
};
var fP = 0;
var fR = 1;
var fQ = 2;
var fX = 3;

function ey() {
    var be = false;
    try {
        be = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (e) {
        try {
            be = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (gQ) {
            be = false
        }
    }
    if (!be && typeof XMLHttpRequest != 'undefined') {
        be = new XMLHttpRequest()
    }
    return be
};

function dV() {
    var gM = new Date();
    if (at) {
        at.open("POST", aJ + '&hi=2&fb=' + K, true);
        at.onreadystatechange = ev;
        at.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var cf = "n=" + P + "&s=" + ak + "&c=" + bj;
        if (U == ai) {
            cf = "n=" + dC(P) + "&s=" + ak + "&c=" + bj + '&i=' + cg
        }
        at.setRequestHeader("Content-length", cf.length);
        at.setRequestHeader("Connection", "close");
        at.send(cf)
    }
};

function ev() {
    if (at.readyState == 4) {
        if (at.status == 200) {
            bg();
            if (fV) {
                var af = aJ + '&hi=1&fb="+K;';
                location.href = af
            }
        } else {
            alert("Error ...");
            bg()
        }
    }
};
var at;
var ez = "Submit your Score";
var fZ = "Insert your name: ";
var es = "The name must be at least 4 characters!<br>Please insert only charachers and numbers!";

function ee(bf) {
    if (bf.match(/^[a-zA-Z0-9]+$/)) return true;
    else return false
};
var P = "";
var ak;
var cs = 0;
var bc = "";
var cg;

function ep() {
    if (typeof(window.localStorage) != 'undefined') {
        bc = window.localStorage.getItem("ds_username");
        if (bc == null) bc = ""
    }
};

function dZ() {
    if (typeof(window.localStorage) != 'undefined') {
        bc = P;
        window.localStorage.setItem("ds_username", bc)
    }
};

function ed() {
    if (cs == 0) {
        cs = 1;
        B("ng");
        B("hi");
        B("ti");
        ep();
        par_score = I;
        par_level = bk;
        par_game = bd;
        ds_HS();
        var aX = '<center><font color=\'#ff0000\'><b>' + ez + '</b></font><br>to <b>' + dK + '</b><br><br><font color=\'#ffff00\'>' + I + '</font>';
        if (U == fP) {
            document.getElementById("hs").innerHTML = w596_rank(I);
            t("hs", 0, 0, 200);
            t('co', 0, 0, 200);
            g("hs", 0, 0);
            g('co', G - (document.getElementById('co').offsetWidth >> 1), 428 * c)
        } else if (U == fR) {
            document.getElementById('su').innerHTML = '<img ' + H + '=\'bS();\' src=\'' + ba + '\' >';
            t('su', 0, 0, 200);
            g('su', G - (document.getElementById('su').offsetWidth >> 1), 220 * c);
            document.getElementById("hs").innerHTML = aX;
            t("hs", 0, 0, 200);
            t('co', 0, 0, 200);
            g("hs", 0, 0);
            g('co', G - (document.getElementById('co').offsetWidth >> 1), 428 * c)
        } else if (U == fQ) {
            bg()
        } else if (U == fX) {
            aX += ds_SHS();
            document.getElementById("hs").innerHTML = aX;
            t("hs", 0, 0, 200);
            t('co', 0, 0, 200);
            g("hs", 0, 0);
            g('co', G - (document.getElementById('co').offsetWidth >> 1), 428 * c)
        } else if (U == ai) {
            if (K == 1) {
                ak = I;
                document.getElementById('su').innerHTML = '<img ' + H + '=\'bS();\' src=\'' + ba + '\' >';
                t('su', 0, 0, 200);
                g('su', G - (document.getElementById('su').offsetWidth >> 1), 220 * c);
                t('f_p0', 0, 0, 200);
                g('f_p0', G - (document.getElementById('f_p0').offsetWidth >> 1), 130 * c);
                t('f_n0', 0, 0, 200);
                g('f_n0', G - (document.getElementById('f_n0').offsetWidth >> 1), 190 * c);
                t("f_lo", 0, 0, 11);
                g("f_lo", G - (bK("f_lo") >> 1), 2 * c)
            } else aX = "<br><br><br><br><br><br><br><br><br>Please <b>LOGIN WITH FACEBOOK</b> to submit your Score";
            document.getElementById("hs").innerHTML = aX;
            t("hs", 0, 0, 200);
            t('co', 0, 0, 200);
            g("hs", 0, 0);
            g('co', G - (document.getElementById('co').offsetWidth >> 1), 428 * c)
        }
    }
};

function bS() {
    if (fH) {
        at = new ey();
        dV()
    } else {
        bg();
        var af = aJ + '&hi=2&fb=' + K + '&n=' + P + '&s=' + ak + '&c=' + bj + '&r=1';
        if (U == ai) {
            af = aJ + '&hi=2&fb=' + K + '&n=' + dC(P) + '&s=' + ak + '&c=' + bj + '&r=1&i=' + cg;
            location.href = af
        } else if (cj == 0);
        else location.href = af
    }
};

function go() {
    var ct = document.getElementById('user').value;
    P = ct;
    if ((ct.length > 3) && ee(ct)) {
        dZ();
        ak = I;
        bj = P.charAt(1) + ah(9) + (ak * 89) + ah(9) + P.charAt(3) + 'fc1' + ah(9) + P.charAt(0) + ah(9) + P.charAt(1) + '4z3' + (ak * 7) + '3247z11';
        if (cj == 0) {
            var af = aJ + '&hi=2&n=' + P + '&s=' + ak + '&c=' + bj + '&r=1';
            document.getElementById('su').innerHTML = '<a href="' + af + '"><img ' + H + '=\'bS();\' src=\'' + ba + '\' border=0></a>'
        } else document.getElementById('su').innerHTML = '<img ' + H + '=\'bS();\' src=\'' + ba + '\' >';
        t('su', 0, 0, 200);
        g('su', G - (document.getElementById('su').offsetWidth >> 1), 220 * c)
    }
};

function dC(bX) {
    bX = (bX + '').toString();
    return encodeURIComponent(bX).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
};

function bg() {
    myshow();
    bD = (60 * c);
    for (i = 0; i < 100; i++) window.scroll(0, 1);
    cs = 0;
    B("su");
    B("co");
    B("hs");
    t("ti", 0, 0, 1);
    g("ti", 0, 0);
    t("ng", 0, 0, 11);
    g("ng", -1000, -1000);
    if (aI) {
        t("hi", 0, 0, 11);
        g("hi", -1000, -1000)
    }
    if (U == ai) {
        B("f_n0");
        B("f_p0");
        t("f_li", 0, 0, 11);
        g("f_li", -1000, -1000);
        t("f_lo", 0, 0, 11);
        g("f_lo", -1000, -1000);
        t("f_ba", 0, 0, 10);
        g("f_ba", 0, r - 42 * c)
    }
    J = bZ
};
var gI;
var step;

function dh() {
    t("li", 0, 0, 16);
    g("li", -1000, -1000);
    var cU = bk % 3;
    if (cU == 1) {
        document.getElementById('l1').src = cB;
        aw[0] = 8;
        aw[1] = 9
    } else if (cU == 2) {
        document.getElementById('l1').src = cE;
        aw[0] = 10;
        aw[1] = 11
    } else {
        document.getElementById('l1').src = cD;
        aw[0] = 12;
        aw[1] = 13
    }
    t("l1", 0, 0, 1);
    g("l1", 0, 0);
    for (i = 0; i < 8; i++) {
        t("spr" + i, 0, 0, 20 - i);
        g("spr" + i, -1000, -1000)
    }
    ac = G;
    Q = r - 70 * c;
    for (i = 0; i < cd; i++) {
        aj[i] = 0;
        aR[i] = 77 * c;
        bT[i] = 25 * c;
        aO[i] = ah(l - aR[i]);
        aN[i] = 104 * c + eh * i;
        document.getElementById("spr" + (5 + i)).src = bv[aw[aj[i]]]
    }
    aO[2] = (l >> 1) - (aR[2] >> 1);
    aC = aH = 0;
    aG = 0;
    aK = 0;
    bF = false;
    aD = false;
    start = false;
    bm = false;
    cb = 0;
    en = 750 + bk * 250;
    bN = (15 + bk) * c
};
var cb;
var aj = [];
var aO = [];
var aN = [];
var cd = 3;
var bT = [];
var aR = [];
var eh = 182 * c;
var scrollY = 240 * c;
var bG = 24;
var start;
var df = 0.017;
var cT = 15 * c;
var ac, Q, gF, aK, aG, bF, aP, aQ, cv, aH, aC, bm, start, aq, al, an, cp, aD;
var aS;
var bP;
var cC = 2 * c;
var cR = -10;
var cP = -170;
var bN;
var aw = [8, 9, 5, 6, 7];

function er() {
    for (i = 0; i < cd; i++) {
        if (aN[i] > r) {
            aj[i] = ah(5);
            if (aj[i] < 2) {
                aR[i] = 77 * c;
                bT[i] = 25 * c
            } else {
                aR[i] = 42 * c;
                bT[i] = 42 * c
            }
            document.getElementById("spr" + (5 + i)).src = bv[aw[aj[i]]];
            aO[i] = ah(l - aR[i]);
            aN[i] -= (r + 42 * c)
        };
        if (bm) aN[i] -= aC * bN;
        var gS = aw[aj[i]];
        g("spr" + (5 + i), aO[i], aN[i])
    }
    if (start) {
        if (bm == 1) {
            aG -= aC * bN;
            cc(1);
            cb++
        }
        aP = ac - aK;
        aQ = Q - aG;
        cv = Math.sqrt(aP * aP + aQ * aQ);
        if ((bF) && (Q > aG)) {
            dk(ac, Q, aK, aG);
            if (aj[aS] == 1) {
                aK += bP;
                aO[aS] += bP
            } else if (aj[aS] == 3) bG = 50;
            else if (aj[aS] == 4) bG = 10;
            else bG = 25;
            g("spr4", aK - 12 * c, aG - 12 * c);
            aH += (aK - ac) / (cv * bG);
            aC += (aG - Q) / (cv * bG)
        } else {
            bF = false;
            g("li", -1000, -1000);
            g("spr4", -1000, -1000)
        }
        if (aD) {
            aq += Math.cos(cp * df) * cT;
            al -= Math.sin(an * -df) * cT;
            dk(ac, Q, aq, al);
            g("spr4", aq - 12 * c, al - 12 * c);
            for (i = 0; i < cd; i++) {
                if (aq > aO[i] && aq < aO[i] + aR[i] && al > aN[i] && al < aN[i] + bT[i]) {
                    aD = 0;
                    bF = 1;
                    aK = aq;
                    aG = al;
                    aS = i;
                    if (aj[aS] == 1) {
                        if (ah(2) == 0) bP = -cC;
                        else bP = cC
                    } else if (aj[aS] == 2) cc(100);
                    return
                }
                bF = false
            }
            if (al < 0) aD = false
        }
        if (aC > 0) bm = false;
        aC += 0.01;
        if (!bm) Q += aC * bN;
        ac += aH;
        if (Q < scrollY) bm = true;
        if ((ac < 24 * c) || (ac > l - 24 * c)) aH = -aH
    }
    if (aC <= 0) {
        g("spr2", -1000, -1000);
        g("spr3", -1000, -1000);
        if (aH > 0) {
            g("spr0", ac - 16 * c, Q - 27 * c);
            g("spr1", -1000, -1000)
        } else {
            g("spr1", ac - 16 * c, Q - 27 * c);
            g("spr0", -1000, -1000)
        }
    } else {
        g("spr0", -1000, -1000);
        g("spr1", -1000, -1000);
        if (aH > 0) {
            g("spr2", ac - 16 * c, Q - 27 * c);
            g("spr3", -1000, -1000)
        } else {
            g("spr3", ac - 16 * c, Q - 27 * c);
            g("spr2", -1000, -1000)
        }
    }
    if (Q > r + 100 * c) {
        J = du
    }
    if (cb >= en) {
        bk++;
        J = dw;
        B("g1");
        B("s1");
        B("l1");
        B("li");
        for (i = 0; i < 8; i++) B("spr" + i);
        return
    }
    dQ()
};
var bb = 31 * c;

function dI() {
    if ((f == V) || bi) return;
    if ((aW) && (f != V)) window.event.preventDefault();
    if (window.event.touches) e = window.event.touches[0];
    else e = window.event;
    if (e.clientX) {
        var fF = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        var fE = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        var bL = ((fF - ((D - l * C) / 2)) / C) - (bb >> 1);
        var bO = ((fE - ((T - r * C) / 2)) / C) - (bb >> 1)
    } else {
        var bL = ((e.pageX - ((D - l * C) / 2)) / C) - (bb >> 1);
        var bO = ((e.pageY - ((T - r * C) / 2)) / C) - (bb >> 1)
    }
    if (J == bu) {
        if (!aD) {
            start = true;
            aq = ac;
            al = Q;
            aP = (bL - aq);
            aQ = (bO - al);
            cp = an = Math.atan2(aQ, aP) * 180 / Math.PI;
            if ((an < cR) && (an > cP)) aD = true
        }
    }
};

function dH(e) {
    var bL = ((e.pageX - ((D - l * C) / 2)) / C) - (bb >> 1);
    var bO = ((e.pageY - ((T - r * C) / 2)) / C) - (bb >> 1);
    if (J == bu) {
        if (!aD) {
            start = true;
            aq = ac;
            al = Q;
            aP = (bL - aq);
            aQ = (bO - al);
            cp = an = Math.atan2(aQ, aP) * 180 / Math.PI;
            if ((an < cR) && (an > cP)) aD = true
        }
    }
};
if ((f == V) || bi) {
    document.getElementById("l1").addEventListener('mousedown', function (e) {
        dH(e)
    }, false);
    for (var i = 0; i < 8; i++) document.getElementById("spr" + i).addEventListener('mousedown', function (e) {
        dH(e)
    }, false)
}
function ci() {
    for (i = 0; i < 100; i++) window.scroll(0, 1);
    if (aW) {
        D = window.innerWidth;
        T = window.innerHeight
    } else {
        D = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        T = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight
    }
    if (D / T > l / (r)) {
        C = T / (r)
    } else {
        C = D / (l)
    }
    document.getElementById("all").style.clip = "rect(0px," + l + "px," + (r) + "px,0px)";
    if ((D < T) && ((f == bC) || (f == ad) || (f == bs) || bi)) dj("all", 0, 0, D / (l), T / (r));
    else dn("all", ((D - l * C) / 2), 0, C);
    if (bV) {
        if (par_ad2) bD = (60 * c) / C;
        else bD = (60 * c);
        par_adx2 = ((D - l) / 2);
        par_adx3 = ((D - l * C) / 2);
        par_adx4 = ((D - l * C) / 2) + (l * C);
        ds_RZ()
    }
};

function dJ() {
    var dS = new Date();
    var fY = dS.getTime();
    dU();
    var fW = new Date();
    var fU = fW.getTime();
    bY = ao - (fU - fY);
    if (bY < sp_a) bY = sp_a;
    if (bY > sp_b) bY = sp_b;
    cl = setTimeout('dJ()', bY)
};
var cl;

function test() {
    if (cl) clearTimeout(cl);
    if ((f == ad) && (fS));
    else document.body.style.overflow = 'hidden';
    if ((f != 3) && (f != 6)) document.addEventListener(bo, ek, false);
    for (i = 0; i < 200; i++) window.scroll(0, 1);
    ci();
    J = ca;
    document.body.style.backgroundColor = "#000000";
    dJ()
};

function eb() {
    if ((f == ad) && (fT)) window.location.reload();
    ci()
};
window.onorientationchange = eb;
window.onresize = ci;
window.onload = test;