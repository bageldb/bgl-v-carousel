# bgl-v-owl-carousel

Features:

- Build with [unbuild](https://github.com/unjs/unbuild)
- File-to-file transpilation via [mkdist](https://github.com/unjs/mkdist)
- Playground with [vite](https://vitejs.dev/)

## Usage

Install all components (as a plugin)

```ts
// src/main.ts

import { createApp } from 'vue';
import BglVOwlCarousel from 'bgl-v-owl-carousel';

import App from './App.vue';

const app = createApp(App);
app.use(BglVOwlCarousel);
app.mount('#app');
```

Import some components

```vue
<script setup lang="ts">
import { Carousel } from 'bgl-v-owl-carousel';
</script>

<template>
	<Carousel>
		<img src="https://loremflickr.com/640/480">
		<img src="https://loremflickr.com/640/480">
		<img src="https://loremflickr.com/640/480">
		<img src="https://loremflickr.com/640/480">
	</Carousel>
</template>
```

## Contributing

```bash
# install dependencies with pnpm recursively
pnpm i -r -f

# start the dev app with hot reload, great for testing components
pnpm run dev:app

# build the library, available under dist
pnpm run build

# build the dev app, available under dev/dist
pnpm run dev:build

# preview the dev app locally from dev/dist
pnpm run dev:preview
```

## License

MIT
