import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	entries: [

		// { builder: 'mkdist', input: './src', pattern: ['**/*.gif', ' **/*.png'] },
		// // *.css -> *.css
		// { builder: 'mkdist', input: './src', pattern: ['**/*.css'], loaders: ['sass'] },

		// // *.vue -> *.vue
		// { builder: 'mkdist', input: './src', pattern: ['**/*.vue'], loaders: ['vue'] },

		// // *.ts -> *.js & *.cjs
		// // plz keep `esm` after `cjs`
		// { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'cjs', loaders: ['js'] },
		// { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'] },

		{ builder: 'mkdist', input: './src/', format: 'cjs' },
		{ builder: 'mkdist', input: './src/', format: 'esm' },
	],
	declaration: true,
	clean: true,
	externals: ['vue'],
})
