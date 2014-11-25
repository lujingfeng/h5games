(function(d, params, env, apiHost, hosts) {
	// set params
	(function(regex, qs, tokens) {
		regex = /[?&]?([^=]+)=([^&]*)/g;
		qs = d.location && d.location.search ? d.location.search.split('+').join(' ') : '';

		while ((tokens = regex.exec(qs))) {
			params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
		}
	})();
	
	// Google Tag Manager
    /*
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','famobi_dataLayer','GTM-PBT7JT');
    
    */

	(function (d, url, fgJS, firstJS) {
        fgJS = d.createElement('script');
        firstJS = d.getElementsByTagName('script')[0];
        fgJS.src = url;
        firstJS.parentNode.insertBefore(fgJS, firstJS);
    })(d, 'js/script.js');
})(document, {}, '', '', {
	'dev': 'api.dev', 
	'staging': 'api.staging.aws', 
	'prod': 'api'
});