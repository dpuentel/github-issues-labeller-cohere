const { withAnimations } = require('animated-tailwindcss') // eslint-disable-line
const defaultTheme = require('tailwindcss/defaultTheme') // eslint-disable-line

/** @type {import('tailwindcss').Config} */
module.exports = withAnimations({
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				gray: {
					50: '#fafbfa',
					100: '#f4f1f4',
					200: '#e6dae7',
					300: '#cab5ca',
					400: '#ad8aa6',
					500: '#906585',
					600: '#744a65',
					700: '#57374b',
					800: '#3b2532',
					900: '#22171e'
				},
				blue: {
					50: '#fafafa',
					100: '#f1f1f7',
					200: '#e0dbee',
					300: '#bfb6d7',
					400: '#9e8cba',
					500: '#81689e',
					600: '#684c7f',
					700: '#4e395f',
					800: '#352640',
					900: '#1e1726'
				},
				indigo: {
					50: '#fafafa',
					100: '#f2f1f7',
					200: '#e2daee',
					300: '#c3b5d7',
					400: '#a48ab9',
					500: '#87669d',
					600: '#6d4a7d',
					700: '#51375e',
					800: '#37253f',
					900: '#1f1725'
				},
				mauve: {
					50: '#fafbfa',
					100: '#f4f1f6',
					200: '#e7d9ec',
					300: '#ccb3d3',
					400: '#b287b3',
					500: '#966395',
					600: '#7a4775',
					700: '#5b3556',
					800: '#3d243a',
					900: '#231622'
				},
				beaver: {
					50: '#fbfbfa',
					100: '#f5f1f5',
					200: '#e9d9e9',
					300: '#cfb2cd',
					400: '#b786ab',
					500: '#9b628b',
					600: '#7f476b',
					700: '#5e344f',
					800: '#402335',
					900: '#25151f'
				}
			},
			sans: {
				fontFamily: ['Montserrat', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
})
