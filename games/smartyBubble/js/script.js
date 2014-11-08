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
                    "language_name": "English",
                    "thousands_separator": ",",
                    "ok": "OK",
                    "cancel": "Cancel",
                    "restart": "Restart",
                    "main_menu": "Main Menu",
                    "continue": "Continue",
                    "resume": "Resume",
                    "paused": "Paused",
                    "main_menu_play": "Play",
                    "main_menu_statistics": "Statistics",
                    "main_menu_highscores": "Highscores",
                    "main_menu_more_games": "More Cool Games",
                    "update_optional_message": "A new and improved version of Smarty Bubbles is available! Update now for free!",
                    "update_optional_button_update": "Download",
                    "update_optional_button_later": "Later",
                    "update_forced_message": "A new and improved version of Smarty Bubbles is available! Update now for free!",
                    "update_forced_button_update": "Download",
                    "results_game_won": "All Cleared!",
                    "results_game_lost": "Game Over!",
                    "results_balls_shot": "Balls shot",
                    "results_bubbles_cleared": "Bubbles cleared",
                    "results_largest_group": "Largest group",
                    "results_hit_ratio": "Hit ratio",
                    "results_play_time": "Time",
                    "results_new_highscore": "New Highscore!",
                    "results_old_score": "Previous Best",
                    "statistics_title": "Statistics",
                    "statistics_bubbles_cleared": "Bubbles cleared",
                    "statistics_play_time": "Time played",
                    "statistics_games_played": "Games played",
                    "statistics_games_won": "Games won",
                    "statistics_fewest_balls": "Fewest shots",
                    "highscores_title": "Highscores",
                    "highscores_you": "Player",
                    "restart_dialog_message": "Restart the game? The current game will end.",
                    "quit_to_main_menu_dialog_message": "Quit to menu? The current game will end.",
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
                    "more_games_url": "http:\/\/html5games.com\/",
                    "preload_image": "html5games\/gameapi\/v1\/invisPreloadImage.png",
                    "test_preload_image": "html5games\/gameapi\/v1\/testPreloadImage.png"
                },
                "de": {
                    "language_name": "Deutsch",
                    "thousands_separator": ",",
                    "ok": "OK",
                    "cancel": "Abbrechen",
                    "restart": "Neustart",
                    "main_menu": "Hauptmen\u00fc",
                    "continue": "Weiter",
                    "resume": "Weiter",
                    "paused": "Pause",
                    "main_menu_play": "Spielen",
                    "main_menu_statistics": "Statistik",
                    "main_menu_highscores": "Highscores",
                    "main_menu_more_games": "Mehr Spiele",
                    "update_optional_message": "Eine neue und verbesserte Version von Smarty Bubbles ist verf\u00fcgbar! Jetzt kostenlos herunterladen!",
                    "update_optional_button_update": "Download",
                    "update_optional_button_later": "Sp\u00e4ter",
                    "update_forced_message": "Eine neue und verbesserte Version von Smarty Bubbles ist verf\u00fcgbar! Jetzt kostenlos herunterladen!",
                    "update_forced_button_update": "Download",
                    "results_game_won": "Gewonnen!",
                    "results_game_lost": "Spiel vorbei!",
                    "results_balls_shot": "Sch\u00fcsse",
                    "results_bubbles_cleared": "Zerplatzte Kugeln",
                    "results_largest_group": "Gr\u00f6sste Gruppe",
                    "results_hit_ratio": "Trefferrate",
                    "results_play_time": "Spielzeit",
                    "results_new_highscore": "Neuer Highscore!",
                    "results_old_score": "Bisheriger Rekord",
                    "statistics_title": "Statistik",
                    "statistics_bubbles_cleared": "Zerplatzte Kugeln",
                    "statistics_play_time": "Gespielte Zeit",
                    "statistics_games_played": "Gespielte Spiele",
                    "statistics_games_won": "Gewonnen",
                    "statistics_fewest_balls": "Wenigste Sch\u00fcsse",
                    "highscores_title": "Highscores",
                    "highscores_you": "Spieler",
                    "restart_dialog_message": "Wirklich neu starten? Das laufende Spiel wird beendet.",
                    "quit_to_main_menu_dialog_message": "Zur\u00fcck ins Men\u00fc? Das laufende Spiel wird beendet.",
                    "api.back": "&laquo; zur&uuml;ck",
                    "api.home": "&raquo; mehr Spiele",
                    "api.close": "Schlie&szling;en",
                    "api.ad_modal_header": "Werbung &ndash; schlie\u00dft automatisch in&hellip;"
                },
                "en": {
                    "language_name": "English",
                    "thousands_separator": ",",
                    "ok": "OK",
                    "cancel": "Cancel",
                    "restart": "Restart",
                    "main_menu": "Main Menu",
                    "continue": "Continue",
                    "resume": "Resume",
                    "paused": "Paused",
                    "main_menu_play": "Play",
                    "main_menu_statistics": "Statistics",
                    "main_menu_highscores": "Highscores",
                    "main_menu_more_games": "More Cool Games",
                    "update_optional_message": "A new and improved version of Smarty Bubbles is available! Update now for free!",
                    "update_optional_button_update": "Download",
                    "update_optional_button_later": "Later",
                    "update_forced_message": "A new and improved version of Smarty Bubbles is available! Update now for free!",
                    "update_forced_button_update": "Download",
                    "results_game_won": "All Cleared!",
                    "results_game_lost": "Game Over!",
                    "results_balls_shot": "Balls shot",
                    "results_bubbles_cleared": "Bubbles cleared",
                    "results_largest_group": "Largest group",
                    "results_hit_ratio": "Hit ratio",
                    "results_play_time": "Time",
                    "results_new_highscore": "New Highscore!",
                    "results_old_score": "Previous Best",
                    "statistics_title": "Statistics",
                    "statistics_bubbles_cleared": "Bubbles cleared",
                    "statistics_play_time": "Time played",
                    "statistics_games_played": "Games played",
                    "statistics_games_won": "Games won",
                    "statistics_fewest_balls": "Fewest shots",
                    "highscores_title": "Highscores",
                    "highscores_you": "Player",
                    "restart_dialog_message": "Restart the game? The current game will end.",
                    "quit_to_main_menu_dialog_message": "Quit to menu? The current game will end.",
                    "api.back": "&laquo; Back",
                    "api.home": "&raquo; More Games",
                    "api.close": "Close",
                    "api.ad_modal_header": "Advertisement &ndash; will close in&hellip;"
                },
                "tr": {
                    "language_name": "T\u00fcrkce",
                    "thousands_separator": ",",
                    "ok": "Tamam",
                    "cancel": "Iptal",
                    "restart": "Tekrar",
                    "main_menu": "Ana Men\u00fc",
                    "continue": "Devam",
                    "resume": "Devam",
                    "paused": "Durdur",
                    "main_menu_play": "Oyna",
                    "main_menu_statistics": "Istatistik",
                    "main_menu_highscores": "Skorlar",
                    "main_menu_more_games": "Daha Fazla Oyun",
                    "update_optional_message": "Smarty Kabarciklarin gelistirilmis yeni versiyonu cikti! Hemen \u00fccretsiz indir.",
                    "update_optional_button_update": "Indir",
                    "update_optional_button_later": "Sonra",
                    "update_forced_message": "Smarty Kabarciklarin gelistirilmis yeni versiyonu cikti! Hemen \u00fccretsiz indir.",
                    "update_forced_button_update": "Indir",
                    "results_game_won": "Kazandin!",
                    "results_game_lost": "Oyun Bitti!",
                    "results_balls_shot": "Atis",
                    "results_bubbles_cleared": "Patlatilan Balon",
                    "results_largest_group": "B\u00fcy\u00fck Grup",
                    "results_hit_ratio": "Patlatma Orani",
                    "results_play_time": "Oyun S\u00fcresi",
                    "results_new_highscore": "Yeni rekor!",
                    "results_old_score": "\u00d6ceki Rekor",
                    "statistics_title": "Istatistik",
                    "statistics_bubbles_cleared": "Patlatilan Balon",
                    "statistics_play_time": "Oynama S\u00fcresi",
                    "statistics_games_played": "Oynama Sayisi",
                    "statistics_games_won": "Kazanilan",
                    "statistics_fewest_balls": "En D\u00fcs\u00fck Atis",
                    "highscores_title": "Skorlar",
                    "highscores_you": "Oyuncu",
                    "restart_dialog_message": "Tekrar baslatmak icin emin misin? Oyunun sonlanacaktir.",
                    "quit_to_main_menu_dialog_message": "Men\u00fcye d\u00f6nmek icin emin misin? Oyunun sonlanacaktir",
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
                "header_image": "SmartyBubblesHeader.png"
            },
            "urlRoot": "",
            "assetsPath": "",
            "ads": {
                "min_s_between": 119,
                "adsense_channels": ["7657524996", "2610046591"]
            },
            "short_url": "http:\/\/play.famobi.com\/smarty-bubbles",
            "uuid": "d8f24956-dc91-4902-9096-a46cb1353b6f",
            "pid": "4638e320-4444-4514-81c4-d80a8c662371",
            "aid": "A1000-1",
            "name": "\"Smarty Bubbles\"",
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
            "headerHtml": "<header id=\"fg-header\"><div id=\"fg-back\" class=\"icon-arrow icon-arrow-left\" data-fg-module=\"navigation\" data-fg-method=\"show\"><\/div><div id=\"fg-logo\"><img src=\"http:\/\/games.cdn.famobi.com\/html5games\/branding\/html5games\/logo.png?v=5\" alt=\"\"><\/div><div class=\"fg-clip\" id=\"fg-clip\"><div class=\"fg-clip-btn\"><img src=\"http:\/\/games.cdn.famobi.com\/html5games\/branding\/html5games\/icon.png?v=5\" alt=\"\"><\/div><\/div><\/header>",
            "menuHtml": "<ul><li data-famobi-href=\"back\"><a href=\"javascript:void(0);\" data-i18n=\"api.back\"><\/a><\/li><li data-famobi-href=\"moreGames\"><a href=\"javascript:void(0);\" data-i18n=\"api.home\"><\/a><\/li><li class=\"fg-lang\" data-switch-lang=\"de\"><a href=\"javascript:void(0);\"><img class=\"fg-flag\" src=\"http:\/\/facdn.famobi.com\/flags\/flag_de.png\" alt=\"de\"><\/a><\/li><li class=\"fg-lang\" data-switch-lang=\"en\"><a href=\"javascript:void(0);\"><img class=\"fg-flag\" src=\"http:\/\/facdn.famobi.com\/flags\/flag_en.png\" alt=\"en\"><\/a><\/li><li class=\"fg-lang\" data-switch-lang=\"tr\"><a href=\"javascript:void(0);\"><img class=\"fg-flag\" src=\"http:\/\/facdn.famobi.com\/flags\/flag_tr.png\" alt=\"tr\"><\/a><\/li><\/ul>"
        },
        _fgq);

    }
    firstJS.parentNode.insertBefore(fgJS, firstJS);
})(document, 'js/gameapi.js?2321321');

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
