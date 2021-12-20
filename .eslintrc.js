export default {
	env: {
		browser: true,
		es6: true,
		node: true,
		jquery: true,
	},
	extends: ["eslint:recommended", "airbnb-base", "prettier"],
	rules: {
		// indent: ["error", 2, {SwitchCase: 1}],
		"no-underscore-dangle": "off",
		"no-param-reassign": ["error", { props: false }],
		"no-mixed-operators": "off",
		"no-restricted-syntax": "off",
		"no-await-in-loop": "off",
		"no-unused-vars": "warn",
		"no-plusplus": "off",
		"no-continue": "off",
		"no-import-module-exports": "off",
		"global-require": "off",
		"object-curly-newline": ["error", { consistent: true }],
		"prefer-destructuring": ["error", { object: true, array: false }],
		"no-console": "off",
		"comma-dangle": ["error", "always-multiline"],
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: [
					"scripts/**",
					"test/**",
					"tests/**",
					"spec/**",
					"**/__tests__/**",
					"test.{js,jsx}",
					"test-*.{js,jsx}",
					"**/*.{test,spec}.{js,jsx}",
					"**/jest.config.js",
					"**/webpack.config.js",
					"**/webpack.config.*.js",
					"**/rollup.config.js",
					"**/rollup.config.*.js",
					"**/gulpfile.js",
					"**/gulpfile.*.js",
					"**/Gruntfile{,.js}",
					"**/protractor.conf.js",
					"**/protractor.conf.*.js",
				],
				optionalDependencies: false,
			},
		],
		"no-alert": "off",
	},
};
