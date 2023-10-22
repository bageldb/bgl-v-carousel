<script lang="ts">
import { useScriptTag } from '@vueuse/core'
import { defineComponent } from 'vue'
import 'jquery'
import '../assets/owl.carousel.css'
import '../assets/owl.theme.default.css'

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
		// eslint-disable-next-line vue/prop-name-casing
		URLhashListener: { default: false, type: Boolean },
		animateOut: { default: '', type: String },

		rtl: { default: false, type: Boolean },
		responsive: { default: () => ({}), type: Object },
		navSpeed: { default: false, type: [Number, Boolean] },

		extraOwlProps: { default: () => ({}), type: Object },

		currentSlideIndex: { default: 0, type: Number },
	},
	emits: ['change', 'update:currentSlideIndex', 'owlReady'],
	data() {
		return {
			elementHandleRef: null as HTMLElement | null,
			prevHandlerRef: null as HTMLElement | null,
			nextHandlerRef: null as HTMLElement | null,
			owl: null as any,

		}
	},
	// watch: {
	// currentSlideIndex(newValue, oldValue) {
	// 	if (newValue !== oldValue)
	// 		this.slideIntoView(newValue)
	// },
	// },

	async mounted() {
		const { load: loadJQ, unload: unloadJQ } = useScriptTag('https://code.jquery.com/jquery-3.7.1.slim.min.js', async (scriptTag) => {
			console.debug('jquery loaded', { $, scriptTag });
		},
			{
				manual: true,
				async: false,
				crossOrigin: 'anonymous',
			},
		)
		const { load: loadOwl, unload: unloadOwl } = useScriptTag('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', async (scriptTag) => {
			console.debug('owl loaded', { scriptTag });
		},
			{
				manual: true,
				async: false,
				crossOrigin: 'anonymous',
			},
		)

		unloadJQ()
		unloadOwl()
		await loadJQ()
		await loadOwl()
		await this.init()
	},
	methods: {
		async init() {
			await this.setOwlInstance()
			this.addListeners()
			this.$emit('owlReady')
		},
		async setOwlInstance() {
			this.owl = ($(this.$refs.elementHandleRef as HTMLElement) as any).owlCarousel({
				items: this.items,
				margin: this.margin,
				loop: this.loop,
				center: this.center,
				nav: this.nav,
				autoplay: this.autoplay,
				autoplayNavSpeed: this.autoplaySpeed,
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
				animateOut: this.animateOut,
				URLhashListener: this.URLhashListener,
				rtl: this.rtl,
				responsive: this.responsive,
				navSpeed: this.navSpeed,

				...this.extraOwlProps,
			})
		},
		addListeners() {
			$(this.$refs.prevHandlerRef as HTMLElement).on('click', () => {
				this.owl.trigger('prev.owl.carousel')
			})

			$(this.$refs.nextHandlerRef as HTMLElement).on('click', () => {
				this.owl.trigger('next.owl.carousel')
			})

			this.owl.on('change.owl.carousel', this.onChange)
			this.owl.on('changed.owl.carousel', this.onChanged)
			this.owl.on('next.owl.carousel', this.onNext)
			this.owl.on('prev.owl.carousel', this.onPrev)
			this.owl.on('to.owl.carousel', this.onTo)
		},
		onChange(e: any) {
			// console.log({ ...e });
		},
		onChanged(e: any) {
			this.$emit('change', e)
			this.$emit('update:currentSlideIndex', e.item.index)
		},
		onNext(e: any) {
			// console.debug({ e });
		},
		onPrev(e: any) {
			// console.debug({ e });
		},
		onTo(e: any) {
			// console.debug({ ...e });
		},
		triggerNext(navSpeed?: number) {
			// const _navSpeed = [navSpeed !== undefined ? navSpeed : this.navSpeed]
			this.owl.trigger('next.owl.carousel')
		},
		triggerPrev(navSpeed?: number) {
			// const _navSpeed = [navSpeed !== undefined ? navSpeed : this.navSpeed]
			this.owl.trigger('prev.owl.carousel')
		},
		triggerRefresh() {
			this.owl.trigger('refresh.owl.carousel');
		},
		slideIntoView(index: number, navSpeed?: number) {
			this.owl?.trigger('to.owl.carousel', [index, navSpeed || this.navSpeed]);
		},

	},
})
</script>

<template>
	<div class="sh-v-owl-carousel">
		<div
			ref="elementHandleRef"
			class="owl-carousel owl-theme"
		>
			<slot />
		</div>
		<span ref="prevHandlerRef">
			<slot name="prev" />
		</span>
		<span ref="nextHandlerRef">
			<slot name="next" />
		</span>
	</div>
</template>
