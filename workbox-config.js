module.exports = {
	globDirectory: 'docs/',
	globPatterns: [
		'**/*.{png,js,svg,eot,ttf,woff,ico,css,html,woff2,webmanifest}'
	],
	swDest: 'docs/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};