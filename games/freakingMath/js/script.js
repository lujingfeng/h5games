/*<script>*/
var _fgq = [];

(function(d, url, fgJS, firstJS) {
	fgJS = d.createElement('script');
	firstJS = d.getElementsByTagName('script')[0];
	fgJS.src = url;
	fgJS.onload = function() {
		famobi = new fg_api({
			"features": {
				"highscores": 1,
				"menu": 1,
				"ads": 0
			},
			"game_i18n": {
				"default": {
					"logo-sheet0.png": "fg_i18n\/{lang}\/images\/logo-sheet0.png",
					"scoremenubg-sheet0.png": "fg_i18n\/{lang}\/images\/scoremenubg-sheet0.png",
					"Points:": "Points:",
					"api.back": "&laquo; Back",
					"api.home": "&raquo; More Games",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement &ndash; will close in&hellip;",
					"more_games_image": "html5games\/branding\/html5games\/More_Games600x253_onWhite.png",
					"more_games_image2": "html5games\/branding\/html5games\/More_Games600x253_SimpleDark.png",
					"more_games_image3": "html5games\/branding\/html5games\/More_Games600x253_SimpleWhite.png",
					"more_games_image\u00b2": "html5games\/branding\/html5games\/More_Games600x603_onWhite.png",
					"more_games_image2\u00b2": "html5games\/branding\/html5games\/More_Games600x603_SimpleDark.png",
					"more_games_image3\u00b2": "html5games\/branding\/html5games\/More_Games600x603_SimpleWhite.png",
					"more_games_url": "http://www.h5game.net",
					"preload_image": "html5games\/gameapi\/v1\/invisPreloadImage.png",
					"test_preload_image": "html5games\/gameapi\/v1\/testPreloadImage.png"
				},
				"de": {
					"logo-sheet0.png": "fg_i18n\/{lang}\/images\/logo-sheet0.png",
					"scoremenubg-sheet0.png": "fg_i18n\/{lang}\/images\/scoremenubg-sheet0.png",
					"Points:": "Punkte:",
					"api.back": "&laquo; zur&uuml;ck",
					"api.home": "&raquo; mehr Spiele",
					"api.close": "Schlie&szling;en",
					"api.ad_modal_header": "Werbung &ndash; schlie\u00dft automatisch in&hellip;"
				},
				"en": {
					"logo-sheet0.png": "fg_i18n\/{lang}\/images\/logo-sheet0.png",
					"scoremenubg-sheet0.png": "fg_i18n\/{lang}\/images\/scoremenubg-sheet0.png",
					"Points:": "Points:",
					"api.back": "&laquo; Back",
					"api.home": "&raquo; More Games",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement &ndash; will close in&hellip;"
				},
				"tr": {
					"logo-sheet0.png": "fg_i18n\/{lang}\/images\/logo-sheet0.png",
					"scoremenubg-sheet0.png": "fg_i18n\/{lang}\/images\/scoremenubg-sheet0.png",
					"Points:": "Skor:",
					"api.back": "&laquo; Geri",
					"api.home": "&raquo; Daha Fazla Oyun",
					"api.close": "Kapat",
					"api.ad_modal_header": "Reklam &ndash; otomatik kapanacakt\u0131r&hellip;"
				}
			},
			"gameParams": {
				"languages_available": ["de", "tr", "en"],
				"orientation": "portrait",
				"highscores_enabled": 1,
				"header_image": ""
			},
			"urlRoot": "",
			"assetsPath": "",
			"ads": {
				"min_s_between": 118,
				"adsense_channels": ["7657524996", "2610046591"]
			},
			"short_url": "",
			"uuid": "d74391d3-05e0-4437-94b2-a00cb9a7e3cd",
			"pid": "4638e320-4444-4514-81c4-d80a8c662371",
			"aid": "A1000-1",
			"name": "\"Freaking Math\"",
			"languages": ["de", "en", "tr"],
			"i18n": {
				"default": {
					"api.back": "&laquo; Back",
					"api.home": "&raquo; More Games",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement &ndash; will close in&hellip;"
				},
				"de": {
					"api.back": "&laquo; zur&uuml;ck",
					"api.home": "&raquo; mehr Spiele",
					"api.close": "Schlie&szling;en",
					"api.ad_modal_header": "Werbung &ndash; schlie\u00dft automatisch in&hellip;"
				},
				"en": {
					"api.back": "&laquo; Back",
					"api.home": "&raquo; More Games",
					"api.close": "Close",
					"api.ad_modal_header": "Advertisement &ndash; will close in&hellip;"
				},
				"tr": {
					"api.back": "&laquo; Geri",
					"api.home": "&raquo; Daha Fazla Oyun",
					"api.close": "Kapat",
					"api.ad_modal_header": "Reklam &ndash; otomatik kapanacakt\u0131r&hellip;"
				}
			},
			"style": "\t<style type=\"text\/css\">\n\t\t#fg-root #fg-splash-screen { background-color: #e54d26; }\n\t<\/style>",
			"headerHtml": "<header></header>",
			"menuHtml": "<ul><\/ul>"
		},
		_fgq);

	}
	firstJS.parentNode.insertBefore(fgJS, firstJS);
})(document, 'js/gameapi.js');

// Third-Party API Integration
/*
var googletag = googletag || {};
	googletag.cmd = googletag.cmd || [];
(function() {
	var gads = document.createElement('script');
	gads.async = true;
	gads.type = 'text/javascript';
	gads.src = '//www.googletagservices.com/tag/js/gpt.js';
	var node = document.getElementsByTagName('script')[0];
	node.parentNode.insertBefore(gads, node);
})();
*/
