<script lang="ts">
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import { useScriptTag } from '@vueuse/core'
import { defineComponent } from 'vue'
import 'jquery'

export default defineComponent({
	name: 'BglVCarousel',
	props: {
		items: { default: 3, type: Number },
		margin: { default: 0, type: Number },
		loop: { default: false, type: Boolean },
		center: { default: false, type: Boolean },
		nav: { default: true, type: Boolean },
		autoplay: { default: false, type: Boolean },
		autoplaySpeed: { default: false, type: Boolean },
		rewind: { default: true, type: Boolean },
		mouseDrag: { default: true, type: Boolean },
		touchDrag: { default: true, type: Boolean },
		pullDrag: { default: true, type: Boolean },
		freeDrag: { default: false, type: Boolean },
		stagePadding: { default: 0 },
		autoWidth: { default: false, type: Boolean },
		autoHeight: { default: false, type: Boolean },
		dots: { default: true, type: Boolean },
		autoplayTimeout: { default: 5000, type: Number },
		autoplayHoverPause: { default: false, type: Boolean },
		rtl: { default: false, type: Boolean },
		responsive: { default: () => ({}), type: Object },
	},
	emits: ['change'],
	data() {
		return {
			prevHandler: `carousel_prev_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
			elementHandle: `carousel_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
			nextHandler: `carousel_next_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
			owl: null as any,
		}
	},
	created() {
		useScriptTag('https://code.jquery.com/jquery-3.5.1.min.js', async () => {
			await this.setOwlInstance()
			this.addListeners()
		})
	},
	methods: {
		async setOwlInstance() {
			// @ts-expect-error it doesn't work without this
			await import('owl.carousel')

			this.owl = ($(`#${this.elementHandle}`) as any).owlCarousel({
				items: this.items,
				margin: this.margin,
				loop: this.loop,
				center: this.center,
				nav: this.nav,
				autoplay: this.autoplay,
				autoplaySpeed: this.autoplaySpeed,
				rewind: this.rewind,
				mouseDrag: this.mouseDrag,
				touchDrag: this.touchDrag,
				pullDrag: this.pullDrag,
				freeDrag: this.freeDrag,
				stagePadding: this.stagePadding,
				autoWidth: this.autoWidth,
				autoHeight: this.autoHeight,
				dots: this.dots,
				autoplayTimeout: this.autoplayTimeout,
				autoplayHoverPause: this.autoplayHoverPause,
				rtl: this.rtl,
				responsive: this.responsive,
			})
		},
		addListeners() {
			$(`#${this.prevHandler}`).click(() => {
				this?.owl?.trigger?.('prev.owl.carousel')
			})

			$(`#${this.nextHandler}`).click(() => {
				this.owl.trigger('next.owl.carousel')
			})

			this.owl.on('changed.owl.carousel', this.onChange)
		},
		onChange(e: any) {
			this.$emit('change', e)
		},
	},
})
</script>

<template>
	<div class="sh-v-owl-carousel">
		<div
			:id="elementHandle"
			class="owl-carousel owl-theme"
		>
			<slot />
		</div>
		<span :id="prevHandler">
			<slot name="prev" />
		</span>
		<span :id="nextHandler">
			<slot name="next" />
		</span>
	</div>
</template>
