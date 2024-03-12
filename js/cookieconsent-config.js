import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0/dist/cookieconsent.umd.js';

/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
window.onload = () => {

	CookieConsent.run({

		root: 'body',
		// autoShow: true,
		// disablePageInteraction: true,
		// hideFromBots: true,
		// mode: 'opt-in',
		revision: 1.0,

		cookie: {
			name: 'cc_cookie',
			// domain: location.hostname,
			// path: '/',
			// sameSite: "Lax",
			// expiresAfterDays: 365,
		},

		// https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
		guiOptions: {
			consentModal: {
				layout: 'cloud',
				position: 'middle center',
				equalWeightButtons: false,
				flipButtons: true
			},
			preferencesModal: {
				layout: 'box',
				equalWeightButtons: false,
				flipButtons: true
			}
		},

		onFirstConsent: ({cookie}) => {
			console.log('onFirstConsent fired',cookie);
		},

		onConsent: ({cookie}) => {
			//console.log('onConsent fired!', cookie)

			document.getElementById('show-preferencesModal').classList.remove('show-preferencesModal-hidden');

			sendCookieEvent();
		},

		onChange: ({changedCategories, changedServices}) => {
			console.log('onChange fired!', changedCategories, changedServices);

			sendCookieEvent();
		},

		onModalReady: ({modalName}) => {
			//console.log('ready:', modalName);
		},

		onModalShow: ({modalName}) => {
			//console.log('visible:', modalName);

			document.getElementById('show-preferencesModal').classList.add('show-preferencesModal-hidden');
		},

		onModalHide: ({modalName}) => {
			//console.log('hidden:', modalName);

			document.getElementById('show-preferencesModal').classList.remove('show-preferencesModal-hidden');
		},

		categories: {
			necessary: {
				autoClear: {
					cookies: [
						{
							name: 'cc_cookie',
						},
						{
							name: '_GRECAPTCHA',
						},
						{
							name: 'rc::a',
						},
						{
							name: 'rc::f',
						},
						{
							name: 'PHPSESSID',
						},
						{
							name: "wc_fragments_#",
						}
					]
				},
				enabled: true,  // this category is enabled by default
				readOnly: true  // this category cannot be disabled
			},
			analytics_storage: {
				autoClear: {
					cookies: [
						{
							name: /^_ga/,   // regex: match all cookies starting with '_ga'
						},
						{
							name: /^_gat/,   // string: exact cookie name
						},
						{
							name: '_gid',   // string: exact cookie name
						}
					]
				},

				// https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
				// services: {
				//     ga: {
				//         label: 'Google Analytics',
				//         onAccept: () => {},
				//         onReject: () => {}
				//     },
				//     youtube: {
				//         label: 'Youtube Embed',
				//         onAccept: () => {},
				//         onReject: () => {}
				//     },
				// }
			},
			ad_storage: {
				autoClear: {
					cookies: [
						{
							name: 'test_cookie',
						},
						{
							name: '_gcl_au',
						},
						{
							name: '_fbp',
						},
						{
							name: '_fbc',
						},
						{
							name: 'fr', 
						},
						{
							name: 'IDE', 
						},
						{
							name: 'NID', 
						},
						{
							name: 'RUL', 
						},
						{
							name: 'MSPTC', 
						},
						{
							name: 'MUID', 
						}
					]
				},
			},
			ad_user_data: {},
			ad_personalization: {},
		},

		language: {
			default: 'pl',
			autoDetect: 'document',
			translations: {
				'pl': {
					consentModal: {
						title: "Cenimy Państwa prywatność",
						description: "Do poprawnego działania naszej strony niezbędne są niektóre pliki cookies. Zachęcamy również do wyrażenia zgody na użycie plików cookie narzędzi analitycznych. Dzięki nim możemy nieustannie ulepszać stronę. Więcej informacji znajdą Państwo w <a href=\"./polityka-prywatnosci/\" title=\"Polityka prywatności\" target=\"_blank\">Polityce Prywatności</a>.<br><br>{{revisionMessage}}",
						revisionMessage: "Prosimy o ponowną zgodę na pliki cookie, ponieważ zaktualizowaliśmy działanie witryny.",
						acceptAllBtn: "Akceptuj wszystkie",
						acceptNecessaryBtn: "Odrzuć wszystkie",
						showPreferencesBtn: "Dostosuj"
					},
					preferencesModal: {
						title: "Dostosuj ustawienia",
						acceptAllBtn: "Akceptuj wszystkie",
						acceptNecessaryBtn: "Odrzuć wszystkie",
						savePreferencesBtn: "Zapisz",
						closeIconLabel: "Zamknij",
						sections: [
							{
								title: "\"Niezbędne\" pliki cookie",
								description: "<p>\"Niezbędne\" pliki cookie są wymagane dla działania strony. Zgoda na pozostałe kategorie, pomoże nam ulepszać działanie serwisu.</p> <p>Firmy trzecie, np.: Google, również zapisują pliki cookie. Więcej informacji: <a href=\"https://policies.google.com/technologies/partner-sites?hl=pl\" target=\"_blank\" rel=\"noopener\">użycie danych</a> oraz <a href=\"https://policies.google.com/technologies/cookies?hl=pl#types-of-cookies\" target=\"_blank\" rel=\"noopener\">prywatność</a>.</p>"
							},
							{
								title: "\"Niezbędne\" pliki cookie",
								description: "Niezbędne pliki cookies są konieczne do prawidłowego działania witryny.",
								linkedCategory: "necessary",
								cookieTable: {
									headers: {
										name: "Nazwa",
										domain: "Host",
										description: "Opis",
										expiration: "Czas trwania"
									},
									body: [
										{
											name: "cc_cookie",
											domain: "https://",
											description: "Przechowuje dane dotyczące zgody użytkownika.",
											expiration: "1 rok"
										},
										{
											name: "_GRECAPTCHA",
											domain: "Google",
											description: "Służy do ochrony przed spamem.",
											expiration: "6 miesięcy"
										},
										{
											name: "rc::a",
											domain: "Google",
											description: "Służy do odróżnienia użytkownika od bota.",
											expiration: "Trwały"
										},
										{
											name: "rc::f",
											domain: "Google",
											description: "Służy do odróżnienia użytkownika od bota.",
											expiration: "Trwały"
										},
										{
											name: "PHPSESSID",
											domain: "https://",
											description: "Plik PHPSESSID jest plikiem natywnym PHP i pozwala na zapamiętywanie danych dotyczących stanu sesji.",
											expiration: "Zamknięcie przeglądarki"
										},
										{
											name: "wc_fragments_#",
											domain: "https://",
											description: "Służy do zapamiętania przedmiotów w koszyku.",
											expiration: "Trwały"
										},
									]
								}
							},
							{
								title: "Analityczne pliki cookie",
								description: "Używamy plików cookie Google Analytics. Te pliki cookie będą przechowywane w przeglądarce tylko za Państwa uprzednią zgodą.",
								linkedCategory: "analytics_storage",
								cookieTable: {
									headers: {
										name: "Nazwa",
										domain: "Host",
										description: "Opis",
										expiration: "Czas trwania"
									},
									body: [
										{
											name: "_ga_#",
											domain: "Google Analytics",
											description: "Służy do zapisywania informacji o odsłonach strony.",
											expiration: "1 rok"
										},
										{
											name: "_ga",
											domain: "Google Analytics",
											description: "Służy do zapisywania informacji o odsłonach strony.",
											expiration: "2 lata"
										},
										{
											name: "_gid",
											domain: "Google Analytics",
											description: "Rejestruje identyfikator, który służy do generowania danych statystycznych dotyczących odwiedzin na stronie internetowej.",
											expiration: "1 dzień"
										},
										{
											name: "_ga_*",
											domain: "Google Analytics",
											description: "Rejestruje nowy identyfikator, który służy do generowania danych statystycznych dotyczących odwiedzin na stronie internetowej.",
											expiration: "1 rok"
										},
										{
											name: "_gat_*",
											domain: "Google Analytics",
											description: "Plik używany jest do kontrolowania liczby żądań przeglądarki użytkownika do serwera.",
											expiration: "1 dzień"
										}
									]
								}
							},
							{
								title: "Reklamowe pliki cookie",
								description: "Reklamowe pliki cookies służą m.in. do analizowania efektywności działań reklamowych i śledzenia konwersji.",
								linkedCategory: "ad_storage",
								cookieTable: {
									headers: {
										name: "Nazwa",
										domain: "Host",
										description: "Opis",
										expiration: "Czas trwania"
									},
									body: [
										{
											name: "_gcl_au",
											domain: "Google Adsense",
											description: "Służy do zapisywania i śledzenia konwersji użytkownika.",
											expiration: "Trwały"
										},
										{
											name: "test_cookie",
											domain: "DoubleClick",
											description: "Służy do weryfikacji czy pzeglądarka obsługuje ciasteczka.",
											expiration: "Trwały"
										},
										{
											name: "_fbp",
											domain: "Facebook",
											description: "Służy do zapisywania i śledzenia danych o wizytach użytkownika.",
											expiration: "3 miesiące"
										},
										{
											name: "_fbc",
											domain: "Facebook",
											description: "Służy do zapisywania ostatniej wizyty użytkownika.",
											expiration: "2 lata"
										},
										{
											name: "fr",
											domain: "Facebook",
											description: "Służy do dostarczania użytkownikom dostosowanych reklam oraz retargetingu.",
											expiration: "3 miesiące"
										},
										{
											name: "IDE",
											domain: "Google DoubleClick",
											description: "Służy do dostarczania użytkownikom dostosowanych reklam oraz retargetingu.",
											expiration: "2 lata"
										},
										{
											name: "NID",
											domain: "Google Ads",
											description: "Służy do dostarczania reklam, retargetowania i przechowywania preferencji użytkownika.",
											expiration: "6 miesięcy"
										},
										{
											name: "RUL",
											domain: "Google DoubleClick",
											description: "Służy do weryfikacji poprawności wyświetlania reklam w witrynie.",
											expiration: "1 rok"
										},
										{
											name: "MUID",
											domain: "Microsoft",
											description: "Powszechnie używany przez firmę Microsoft jako unikalny identyfikator użytkownika.",
											expiration: "1 rok"
										},
										{
											name: "MSPTC",
											domain: "Microsoft",
											description: "Służy do optymalizacji trafności reklam.",
											expiration: "1 rok"
										}
									]
								}
							},
							{
								title: "Dane użytkownika związane z reklamami",
								description: "Zarządza zgodą na wysyłanie do Google danych użytkownika związanych z reklamami.",
								linkedCategory: "ad_user_data"
							},
							{
								title: "Reklamy spersonalizowane",
								description: "Zarządza zgodą na wyświetlanie reklam spersonalizowanych.",
								linkedCategory: "ad_personalization"
							},
							{
								title: "Więcej informacji",
								description: "Jeżeli chcą się Państwo dowiedzieć więcej, zachęcamy do zapoznania się z <a href=\"/polityka-prywatnosci/\" title=\"Polityka prywatności\" target=\"_blank\">Polityką Prywatności</a>."
							}
						]
					}
				}
			}
		}
	});

	const cookieSettingsButton = document.createElement('div');
	cookieSettingsButton.innerHTML = '<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%"><defs><image  width="774" height="772" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwYAAAMECAMAAAAy0MLtAAAAAXNSR0IB2cksfwAAAwBQTFRF////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vy5IYQAAAQB0Uk5TAAsgNEBKUVhfZm10e4CDhoWHiImKi4xrY2J2NTMyMTCfwL+nKwknQl54j6S4zeL2/5EhuQ02gqC71vElaRxEbJW9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"/>	</defs>	<style>	</style>	<use id="Layer" href="#img1" x="129" y="123"/></svg>';
	cookieSettingsButton.id = "show-preferencesModal";
	cookieSettingsButton.classList.add('show-preferencesModal-hidden');
	cookieSettingsButton.dataset.cc = 'show-preferencesModal';
	document.body.appendChild(cookieSettingsButton);
};

function sendCookieEvent() {
	window.dataLayer = window.dataLayer || [];
	dataLayer.push({
		'event': 'CookiesSet'
	});
	
	let CookiesSetEvent = new CustomEvent('CookiesSet', { 'detail': CookieConsent.getCookie('categories') });

	document.dispatchEvent(CookiesSetEvent);
	console.log('sendCookieEvent with categories: ', CookieConsent.getCookie('categories'));
}

window.AddCookieSetCallback = function( callback ) {
	document.addEventListener('CookiesSet', function(event) {
		if (typeof callback == 'function' && event.detail) {
			callback(event.detail);
			console.log('CookiesSet callback called with data:', event.detail);
			window.dataLayer = window.dataLayer || [];
			dataLayer.push({'event': 'CookiesUpdated'});
		} else {
			console.log('Invalid data passed to CookiesSet callback:', event);
		}
	});
}
