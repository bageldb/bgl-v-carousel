<script setup lang="ts">
import { Carousel } from 'bgl-v-owl-carousel'
import { ref } from 'vue';

const carousel = ref<typeof Carousel | null>(null)
const numSlides = ref(10)
const currentSlideIndex = ref(0)
function onChange(e: any) {
  // console.log(e)
}
setTimeout(() => {
  carousel.value?.slideIntoView(5)
}, 400);
</script>

<template>
	<Carousel
		ref="carousel"
		v-model:currentSlideIndex="currentSlideIndex"
		:speed="500"
		:items="3"
		@change="onChange"
	>
		<div
			v-for="i in numSlides"
			:key="i"
			class="wrapper"
		>
			<span :class="{ active: currentSlideIndex === i - 1 }">
				{{ i - 1 }}
			</span>
			<img src="https://loremflickr.com/640/480">
		</div>
	</Carousel>
	<button @click="carousel?.triggerPrev">
		Prev
	</button>
	<button @click="carousel?.triggerNext">
		Next
	</button>

	<input
		v-model="currentSlideIndex"
		:min="0"
		:max="numSlides"
		type="number"
	>
</template>

<style>
.wrapper {
	position: relative;

}

.wrapper span {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
	font-size: 4rem;
	color: #fff;
	text-shadow: #fff 0 0 10px;
}

.wrapper span.active {
	color: darkturquoise !important;
}
</style>
