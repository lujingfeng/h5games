(function (g) {
    function K(a, b) {
        var c = new XMLHttpRequest;
        c.onreadystatechange = function () {
            if (4 === c.readyState) {
                c.onreadystatechange = null;
                var a;
                200 === c.status && (a = c.responseText, 0 !== a.length && "<" !== a.charAt(0)) ? b(a) : b(!1)
            }
        };
        c.open("GET", a, !0);
        c.send(null)
    }
    function n(a, b) {
        var c;
        if (a && "object" === typeof a) {
            var d = a.length;
            if ("number" === typeof d) {
                if (0 === d) return;
                if (0 in a && [d - 1] in a) {
                    for (c = 0; c < d && !1 !== b(a[c], c); ++c);
                    return
                }
            }
            for (c in a) if (a.hasOwnProperty(c) && !1 === b(a[c], c)) break
        }
    }
    function q(a, b, c, d) {
        a.addEventListener(b, c, Boolean(d))
    }
    function V(a, b) {
        n(b, function (b, d) {
            a[d] = b
        });
        return a
    }
    function u() {
        return Date.now ? Date.now() : (new Date).getTime()
    }
    function A(a) {
        var b = !1,
            c, d = !1,
            e = [];
        return function (k) {
            b ? k(c) : (e.push(k), d || (d = !0, a(function (a) {
                b = !0;
                d = !1;
                c = a;
                n(e, function (a) {
                    a(c)
                });
                e.length = 0;
                e = null
            })))
        }
    }
    function L(a) {
        a = parseInt(a, 10);
        return isNaN(a) ? !1 : a
    }
    function W() {
        p(function (a) {
            function b() {
                var b = WeixinJSBridge;
                b.call("showOptionMenu");
                var d = a.toString();
                b.on("menu:share:appmessage", function (a) {
                    b.invoke("sendAppMessage", {
                        img_url: f.getImgUrl(),
                        link: f.getUrl(d),
                        desc: f.wxFriendDesc || f.desc,
                        title: f.title
                    }, function (a) {
                        v(["_trackEvent", "WXShareButton", "gameShareWXFriend"]);
                        B()
                    })
                });
                b.on("menu:share:timeline", function (a) {
                    b.invoke("shareTimeline", {
                        img_url: f.getImgUrl(),
                        img_width: "300",
                        img_height: "300",
                        link: f.getUrl(d),
                        desc: f.wxTimelineDesc || f.desc,
                        title: f.wxTimelineDesc || f.desc || f.title
                    }, function (a) {
                        v(["_trackEvent", "WXShareButton", "gameShareWX"]);
                        B()
                    })
                });
                b.on("menu:share:weibo", function (a) {
                    b.invoke("shareWeibo", {
                        content: f.getImgUrl(),
                        url: f.getUrl(d)
                    }, function (a) {
                        v(["_trackEvent", "WXShareButton", "gameShareWXweibo"]);
                        B()
                    })
                })
            }
            "undefined" !== typeof WeixinJSBridge ? b() : q(l, "WeixinJSBridgeReady", function d() {
                l.removeEventListener("WeixinJSBridgeReady", d, Boolean(void 0));
                "undefined" !== typeof WeixinJSBridge && b()
            })
        })
    }
    function v(a) {
        "undefined" !== typeof _hmt && _hmt.push(a)
    }
    function w(a) {
        var b = a[2];
        a = ["http://liebao.tjweb.ijinshan.com/click/__infoc.gif?actionname=liebao_", a[0], "&type=", a[1]].join("");
        var c = "";
        b && n(b, function (a, b) {
            c += "&" + encodeURIComponent(b) + "=" + encodeURIComponent(a)
        });
        (new Image).src = a + c + "&random=" + u()
    }
    function B() {
        t.hide();
        if (f.doneJump) location.href = C;
        else {
            var a = f.afterShare;
            a && a()
        }
    }
    function X(a) {
        M.lastIndex = 0;
        return a.replace(M, function (a, c) {
            n(Y, function (d) {
                if (d === c) return a = "", !1
            });
            return a
        })
    }
    function D(a) {
        var b = l.body;
        b && a(b)
    }
    function N(a, b) {
        function c() {
            k.removeEventListener("load", d, Boolean(void 0));
            k.removeEventListener("error", e, Boolean(void 0))
        }
        function d() {
            c();
            O[a] = !0;
            b(!0)
        }
        function e() {
            c();
            b(!1)
        }
        if (O[a]) return b(!0);
        var k =
        new Image;
        q(k, "load", d);
        q(k, "error", e);
        k.src = a
    }
    function P(a, b) {
        var c = this;
        N(b, function (d) {
            d && c.shown && D(function (d) {
                p(function (k) {
                    var f = c.conf;
                    c.href = a;
                    c.style.backgroundImage = "url(" + b + ")";
                    d.appendChild(c);
                    x(["_trackEvent", "ad_show", h + "_" + k.os + "_" + k.browser + "_" + f.p + "_" + f.n + "_show"]);
                    w([203, 80,
                    {
                        stype: 2,
                        name: h,
                        id: f.n,
                        ua: k.browser,
                        dev: k.os,
                        op: 0
                    }])
                })
            })
        })
    }
    function Z(a, b) {
        var c = this;
        N(b, function (d) {
            d && c.shown && D(function (d) {
                function k() {
                    var a = g.innerWidth,
                        b = g.innerHeight,
                        d = 0.8 * Math.min(a, b) | 0;
                    V(c.style, {
                        width: d + "px",
                        height: d + "px",
                        top: ((b - d) / 2 | 0) + "px",
                        left: ((a - d) / 2 | 0) + "px"
                    })
                }
                function f() {
                    d.removeEventListener("click", m, Boolean(void 0));
                    g.removeEventListener("resize", r, Boolean(void 0));
                    g.removeEventListener("orientationchange", r, Boolean(void 0));
                    c._oc = null
                }
                function m(a) {
                    a.target !== c && (c.shown && 1E3 < u() - c.shown) && (a.stopPropagation(), f(), E.hide("banner"))
                }
                function r() {
                    l || (l = !0, k(), setTimeout(k, 500), setTimeout(function () {
                        l = !1;
                        k()
                    }, 1E3))
                }
                var l = !1;
                c.href = a;
                c.style.backgroundImage = "url(" + b + ")";
                var F = c.conf;
                p(function (a) {
                    x(["_trackEvent", "ad_show", h + "_" + a.os + "_" + a.browser + "_" + F.p + "_" + F.n + "_show"]);
                    k();
                    d.appendChild(c);
                    q(g, "resize", r);
                    q(g, "orientationchange", r);
                    q(d, "click", m);
                    c._oc = f;
                    w([203, 80,
                    {
                        stype: 3,
                        name: h,
                        id: F.n,
                        ua: a.browser,
                        dev: a.os,
                        op: 0
                    }])
                })
            })
        })
    }
    function G(a) {
        y(function (b) {
            if (b = b[a]) {
                var c = H[a] = Math.random() * b.length | 0;
                b = b[c];
                (new Image).src = b.img_url
            }
        })
    }
    function $(a, b) {
        y(function (c) {
            if (c = c[a]) H.hasOwnProperty(a) || G(a), c = c[H[a]], G(a), b(c)
        })
    }
    var l = document,
        s = g.LBShare;
    s || (s = g.LBShare = {});
    var Q = {
        weixin: {
            check: function (a) {
                if (/MicroMessenger/.test(a)) return setTimeout(W, 0), !0
            }
        },
        cm: {
            check: function (a) {
                return g.android && /CM/.test(a)
            },
            updateData: function (a) {
                try {
                    g.android.updatesharedata(a.title, a.imgUrl, a.desc, a.url)
                } catch (b) {}
            },
            callShare: function () {
                try {
                    g.android.sharescore()
                } catch (a) {}
            },
            adOnClick: function (a) {
                if (/\.apk$/.test(a) && g.android && "undefined" !== typeof g.android.downloadapp) return setTimeout(function () {
                    try {
                        g.android.downloadapp("com.gkuwan.cm", a, "\u514d\u8d39\u5c0f\u6e38\u620f", "")
                    } catch (b) {}
                }, 0), !1
            }
        },
        kuwan: {
            check: function (a, b) {
                var c = a.match(/Gkuwan\/(\d+)/i);
                if (c) return c = b.kuwanVersion = L(c[1]), b.kuwanNew = c ? 301011 <= c : !1, !0
            },
            checkAsync: function (a) {
                var b = g.gkuwan;
                if (b) return b = a.kuwanVersion = L(b), a.kuwanNew = b ? 301011 <= b : !1, !0
            },
            updateData: function (a, b) {
                if (b.kuwanNew) prompt(JSON.stringify({
                    class_name: "com.ijinshan.browser.KInjectionJavaScriptObject",
                    params: {
                        function_name: "updateShareData",
                        title: a.title,
                        cont: a.desc,
                        imgurl: a.imgUrl,
                        url: a.url
                    },
                    sync: !1
                }), "3.1415926535");
                else try {
                    g.updateclient.updatesharedata(a.title, a.imgUrl, a.desc, a.url)
                } catch (c) {}
            },
            callShare: function (a) {
                if (a.kuwanNew) prompt(JSON.stringify({
                    class_name: "com.ijinshan.browser.KInjectionJavaScriptObject",
                    params: {
                        function_name: "shareScore"
                    },
                    sync: !1
                }), "3.1415926535");
                else try {
                    g.updateclient.sharescore()
                } catch (b) {}
            }
        },
        liebao: {
            check: function (a) {
                return /LieBaoFast/.test(a)
            },
            updateData: function (a) {
                var b = a.desc + " " + a.url + " @\u730e\u8c79\u6d4f\u89c8\u5668 http://m.liebao.cn/";
                if ("undefined" !== typeof __injectionJavaScriptObject___ && __injectionJavaScriptObject___.updateShareData) try {
                    __injectionJavaScriptObject___.updateShareData(a.title, a.imgUrl, b, a.url)
                } catch (c) {} else prompt(JSON.stringify({
                    class_name: "com.ijinshan.browser.KInjectionJavaScriptObject",
                    params: {
                        function_name: "updateShareData",
                        title: a.title,
                        cont: a.desc,
                        imgurl: a.imgUrl,
                        url: a.url
                    },
                    sync: !1
                }), "3.1415926535")
            },
            callShare: function () {
                if ("undefined" !== typeof __injectionJavaScriptObject___ && __injectionJavaScriptObject___.shareScore) try {
                    __injectionJavaScriptObject___.shareScore()
                } catch (a) {} else prompt(JSON.stringify({
                    class_name: "com.ijinshan.browser.KInjectionJavaScriptObject",
                    params: {
                        function_name: "shareScore"
                    },
                    sync: !1
                }), "3.1415926535")
            }
        }
    },
        p = A(function (a) {
            var b = {
                toString: function () {
                    return b.os + "_" + b.browser
                }
            },
                c = g.navigator.userAgent,
                d, e = "pc",
                k = ["adOnClick", "updateData", "callShare"];
            n(Q, function (a, e) {
                if (a.check(c, b)) return d = e, n(k, function (c) {
                    b[c] = a[c]
                }), !1
            });
            var f = l.referrer;
            f && -1 !== f.indexOf("LBGameCenter") && (b.LBGameCenter = !0);
            switch (!0) {
            case / iPad | iPhone / .test(c):
                e = "ios";
                break;
            case / Android / .test(c):
                e = "android";
                break;
            case / Mobile / .test(c):
                e = "mobile"
            }
            b.os = e;
            if (d) b.browser = d, a(b);
            else {
                var m = l.createElement("script");
                m.src = "client.js";
                var r = !1;
                m.onload = function () {
                    clearTimeout(h);
                    m.onload = null;
                    m.onerror = null;
                    if (!r) {
                        r = !0;
                        var c;
                        n(Q, function (a, d) {
                            var e = a.checkAsync;
                            if (e && e(b)) return c = b.browser = d, n(k, function (c) {
                                b[c] = a[c]
                            }), !1
                        });
                        c || (b.browser = "browser");
                        a(b)
                    }
                };
                m.onerror = function () {
                    clearTimeout(h);
                    m.onload = null;
                    m.onerror = null;
                    r || (r = !0, b.browser = "browser", a(b))
                };
                var h = setTimeout(function () {
                    m.onload = null;
                    m.onerror = null;
                    r || (r = !0, b.browser = "browser", a(b))
                }, 3E3);
                l.documentElement.appendChild(m)
            }
        }),
        R = u(),
        f = {},
        C = "http://dl.game.35go.net/weixin/game/kw.html",
        z = location.protocol + "//" + location.host,
        S = location.pathname,
        h = "unknownGame";
    (function () {
        var a = S.match(/^\/game\/([^\/]+)/);
        a ? h = a[1] : (a = l.getElementsByTagName("meta"), n(a, function (a) {
            if ("game-id" === a.getAttribute("name") && (a = a.getAttribute("content"))) return h = a, !1
        }));
        C += "?f=" + h
    })();
    var I = A(function (a) {
        K("jumpCloud.json?t=" + R, function (b) {
            if (b) {
                var c;
                try {
                    c = JSON.parse(b)
                } catch (d) {}
                z = "http://q" + Math.floor(5E3 * Math.random()) + "." + c.jumphost
            }
            a(z)
        })
    });
    I(function () {
        p(function (a) {
            "www.liebao.cn" === location.host && "weixin" === a.browser && (location.href = z + location.pathname)
        })
    });
    var x = function () {
        function a() {
            return c
        }
        var b = g.Image,
            c = {};
        return function (d) {
            "undefined" !== typeof _hmt && (Image = a, v(d), Image = b, d = c.src, (new b).src = d.replace(/si=[^&]+/, "si=b3fedc43bfd632b7ef6525e4b6930685"), (new b).src = d)
        }
    }(),
        M = /&?([^&\?=]+)(?:=[^&\?=]+)?/g,
        Y = "t f from code state _lw isappinstalled".split(" ");
    f.getUrl = function (a) {
        var b = l.createElement("a"),
            c = location.search;
        b.href = f.url || z + S + (c && -1 !== c.indexOf("?") ? c : "");
        var c = X(b.search),
            d = f.wxOpenId;
        d || "undefined" === typeof LBWx || (d = LBWx.getUserInfoLocal().openid);
        "?" === c && (c = "");
        b.search = c + (c ? "&" : "?") + ("f=" + (a ? a : "unknownShare")) + (d ? "&_lw=" + encodeURIComponent(d) : "") + "&t=" + R;
        return b.href
    };
    f.getImgUrl = function () {
        var a = f.imgUrl;
        if (a) {
            var b = l.createElement("a");
            b.href = a;
            return b.href
        }
        return "http://www.liebao.cn/game/img/icon.png"
    };
    var t = {
        t: 0,
        _div: void 0,
        show: function () {
            var a = t._div;
            if (!a) {
                var a = t._div = l.createElement("div"),
                    b = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:100;background:";
                p(function (c) {
                    b += "browser" === c.browser ? "url(http://www.liebao.cn/game/iq_test/images/share_tip_2.png?v=1) center bottom rgba(0,0,0,.6) no-repeat;" : "url(http://www.liebao.cn/game/iq_test/images/share_tip.png?v=1) 50% 0 rgba(0,0,0,.6) no-repeat;";
                    b += "background-size:contain";
                    a.style.cssText = b
                });
                q(a, "touchstart", t.hide);
                q(a, "mousedown", t.hide)
            }
            D(function (b) {
                t.t = u();
                b.appendChild(a)
            })
        },
        hide: function () {
            if (!(1E3 > u() - t.t)) {
                var a = t._div;
                if (a) {
                    var b = a.parentNode;
                    b && b.removeChild(a)
                }
            }
        }
    };
    s.updateData = function (a) {
        n(a, function (a, c) {
            f[c] = a
        });
        p(function (a) {
            var c = a.toString(),
                d = a.updateData;
            d && I(function () {
                d({
                    title: f.title,
                    imgUrl: f.getImgUrl(),
                    desc: f.desc,
                    url: f.getUrl(c)
                }, a)
            })
        })
    };
    s.callShare = function () {
        p(function (a) {
            v(["_trackEvent", "shareBtn", a.toString()]);
            var b = a.callShare;
            b ? I(function () {
                b(a)
            }) : t.show()
        })
    };
    s.more = function () {
        v(["_trackEvent", "button", "more"]);
        location.href = "/game/?f=" + h
    };
    s.statScore = function (a) {
        v(["_trackEvent", "button", "end", a])
    };
    s.getRank = function (a, b) {
        var c;
        if ("number" === typeof b) c = 100 * a / b;
        else {
            var d =
            Infinity,
                e = -d,
                f, g, m = e;
            n(b, function (b, l) {
                var h = parseInt(l, 10);
                if (!isNaN(h) && 0 <= h && 100 >= h) {
                    m = Math.max(m, b);
                    if (b === a) return c = h, !1;
                    b < a ? e < b && (f = h, e = b) : d > b && (g = h, d = b)
                }
            });
            void 0 === c && (void 0 === f && (e = f = 0), void 0 === g && (g = 100, d = 2 * m), c = f + (a - e) * (g - f) / (d - e))
        }
        return Math.max(0.1, Math.min(99.9, isNaN(c) ? 0 : c)).toFixed(1) + "%"
    };
    var y = A(function (a) {
        K( h + ".json?" + (u() / 5 / 60 / 1E3 | 0), function (b) {
            var c, d = !1;
            if (b) {
                var e;
                try {
                    e = JSON.parse(b)
                } catch (f) {}
                e ? p(function (b) {
                    if (c = "ios" === b.os ? e.ios : e.android) b = b.browser, (c = "weixin" === b || "kuwan" === b ? c[b] : c.other) && (d = c);
                    a(d)
                }) : a(!1)
            } else a(!1)
        })
    }),
        O = {},
        H = {},
        aa = 99,
        J = {},
        E = {
            show: function (a) {
                $(a, function (b) {
                    var c, d;
                    if (b && (c = b.img_url) && (d = b.link_url)) {
                        var e = J[a];
                        if (!e) {
                            e = J[a] = l.createElement("a");
                            e.target = "_blank";
                            var f;
                            p(function (a) {
                                f = a
                            });
                            q(e, "click", function (a) {
                                if (e === a.target && f) {
                                    var b = f.adOnClick;
                                    b && !1 === b(e.href) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                                }
                            });
                            q(l, "touchend", function (b) {
                                b.target === e && p(function (b) {
                                    var c = e.conf;
                                    x(["_trackEvent", "ad_click", h + "_" + b.os + "_" + b.browser + "_" + c.p + "_" + c.n + "_click"]);
                                    w([203, 80,
                                    {
                                        stype: "banner" === a ? 3 : 2,
                                        name: h,
                                        id: c.n,
                                        ua: b.browser,
                                        dev: b.os,
                                        op: 1
                                    }])
                                })
                            });
                            switch (a) {
                            case "top":
                                e.style.cssText = "-webkit-tap-highlight-color:rgba(0,0,0,0);position:fixed;height:0;background:#fff 50% 50% no-repeat;background-size:100% 100%;width:100%;padding-bottom:16.67%;left:0;top:0";
                                e.setImg = P;
                                break;
                            case "footer":
                                e.style.cssText = "-webkit-tap-highlight-color:rgba(0,0,0,0);position:fixed;height:0;background:#fff 50% 50% no-repeat;background-size:100% 100%;width:100%;padding-bottom:16.67%;left:0;bottom:0";
                                e.setImg = P;
                                break;
                            case "banner":
                                e.style.cssText = "-webkit-tap-highlight-color:rgba(0,0,0,0);position:fixed;height:0;background:#fff 50% 50% no-repeat;background-size:100% 100%;";
                                e.setImg = Z;
                                var g = l.createElement("div");
                                g.style.cssText = "position:absolute;top:2.5%;right:2.5%;width:12%;height:12%;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)";
                                e.appendChild(g);
                                q(l, "touchend", function (a) {
                                    a.target === g && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, a.stopPropagation(), e.shown && 1E3 < u() - e.shown && ((a = e._oc) && a(), E.hide("banner")))
                                }, !0)
                            }
                        }
                        e.shown || (e.shown = u(), e.style.zIndex = ++aa, e.setImg(d, c), b = b.hasOwnProperty("adid") ? b.adid : void 0, e.conf = {
                            n: b,
                            p: a
                        })
                    }
                })
            },
            hide: function (a) {
                var b = J[a];
                if (b && b.shown) {
                    var c = b._oc;
                    c && c();
                    b.shown = !1;
                    (c = b.parentNode) && c.removeChild(b);
                    p(function (c) {
                        var e = b.conf || {
                            p: -1,
                            n: -1
                        };
                        x(["_trackEvent", "ad_close", h + "_" + c.os + "_" + c.browser + "_" + e.p + "_" + e.n + "_close"]);
                        w([203, 80,
                        {
                            stype: "banner" === a ? 3 : 2,
                            name: h,
                            id: b.conf.n,
                            ua: c.browser,
                            dev: c.os,
                            op: 2
                        }])
                    })
                }
            }
        },
        ba = {
            top: 0,
            footer: 0,
            banner: 0
        },
        T = 0;
    s.showAd = function (a) {
        var b = a.pos,
            c = a.hide;
        p(function (d) {
            if (!d.LBGameCenter && ba.hasOwnProperty(b)) {
                if ("banner" === b && (d = a.bannerShowOps)) {
                    ++T;
                    var e = !1;
                    n(d, function (a) {
                        if (T === a) return e = !0, !1
                    });
                    if (!e) return
                }
                y(function (a) {
                    if (a) E[c ? "hide" : "show"](b)
                })
            }
        })
    };
    var U = s._sd;
    U && (s.updateData(U), s._sd = null);
    y(function (a) {
        a && n(a, function (a, c) {
            G(c)
        })
    });
    p(function (a) {
        w([203, 80,
        {
            stype: 1,
            name: h,
            ua: a.browser,
            dev: a.os
        }])
    })
})(window);