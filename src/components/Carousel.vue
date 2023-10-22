<!-- eslint-disable vue/prop-name-casing -->
<script lang="ts">
import { useScriptTag } from '@vueuse/core'
import { defineComponent } from 'vue'
import 'jquery'
import '../assets/owl.carousel.css'
import '../assets/owl.theme.default.css'

export default defineComponent({
  name: 'BglVCarousel',
  props: {
    /** *  The number of items you want to see on the screen. */
    items: { type: Number, default: 3 },
    /** *  margin-right(px) on item. */
    margin: { type: Number, default: 0 },
    /** *  Infinity loop. Duplicate last and first items to get loop illusion. */
    loop: { type: Boolean, default: false },
    /** *  Center item. Works well with even an odd number of items. */
    center: { type: Boolean, default: false },
    /** *  Mouse drag enabled. */
    mouseDrag: { type: Boolean, default: true },
    /** *  Touch drag enabled. */
    touchDrag: { type: Boolean, default: true },
    /** *  Stage pull to edge. */
    pullDrag: { type: Boolean, default: true },
    /** *  Item pull to edge. */
    freeDrag: { type: Boolean, default: false },
    /** *  Padding left and right on stage (can see neighbours). */
    stagePadding: { type: Number, default: 0 },
    /** *  Merge items. Looking for data-merge='{number}' inside item.. */
    merge: { type: Boolean, default: false },
    /** *  Fit merged items if screen is smaller than items value. */
    mergeFit: { type: Boolean, default: true },
    /** *  Set non grid content. Try using width style on divs. */
    autoWidth: { type: Boolean, default: false },
    /** *  Start position or URL Hash string like '#id'. */
    startPosition: { type: [Number, String], default: 0 },
    /** *  Listen to url hash changes. data-hash on items is required. */
    URLhashListener: { type: Boolean, default: false },
    /** *  Show next/prev buttons. */
    nav: { type: Boolean, default: true },
    /** *  Go backwards when the boundary has reached. */
    rewind: { type: Boolean, default: true },
    /** *  HTML allowed. */
    navText: { type: Array, default: () => ['next', 'prev'] },
    /** *  DOM element type for a single directional navigation link. */
    navElement: { type: String, default: 'div' },
    /** *  Navigation slide by x. 'page' string can be set to slide by page. */
    slideBy: { type: [Number, String], default: 1 },
    /** *  You can define the transition for the stage you want to use eg. linear. */
    slideTransition: { type: String, default: '' },
    /** *  Show dots navigation. */
    dots: { type: Boolean, default: true },
    /** *  Show dots each x item. */
    dotsEach: { type: [Number, Boolean], default: false },
    /** *  Used by data-dot content. */
    dotsData: { type: Boolean, default: false },
    /** *  Lazy load images. data-src and data-src-retina for highres. Also load images into background inline style if element is not <img> */
    lazyLoad: { type: Boolean, default: false },
    /** *  Eagerly pre-loads images to the right (and left when loop is enabled) based on how many items you want to preload. */
    lazyLoadEager: { type: Number, default: 0 },
    /** *  Autoplay. */
    autoplay: { type: Boolean, default: false },
    /** *  Autoplay interval timeout. */
    autoplayTimeout: { type: Number, default: 5000 },
    /** *  Pause on mouse hover. */
    autoplayHoverPause: { type: Boolean, default: false },
    /** *  Speed Calculate. More info to come.. */
    smartSpeed: { type: Number, default: 250 },
    /** *  Speed Calculate. More info to come.. */
    fluidSpeed: { type: [Boolean, Number], default: false },
    /** *  autoplay speed. */
    autoplaySpeed: { type: [Number, Boolean], default: false },
    /** *  Navigation speed. */
    navSpeed: { type: [Number, Boolean], default: false },
    /** *  Pagination speed. */
    dotsSpeed: { type: [Boolean, Number], default: false },
    /** *  Drag end speed. */
    dragEndSpeed: { type: [Number, Boolean], default: false },
    /** *  Enable callback events. */
    callbacks: { type: Boolean, default: true },
    /** *  Object containing responsive options. Can be set to false to remove responsive capabilities. */
    responsive: { type: Object, default: () => ({}) },
    /** *  Responsive refresh rate. */
    responsiveRefreshRate: { type: Number, default: 200 },
    /** *  Set on any DOM element. If you care about non responsive browser (like ie8) then use it on main wrapper. This will prevent from crazy resizing. */
    // responsiveBaseElement: { type: Object, default: () => window },
    /** *  Enable fetching YouTube/Vimeo/Vzaar videos. */
    video: { type: Boolean, default: false },
    /** *  Set height for videos. */
    videoHeight: { type: [Number, Boolean], default: false },
    /** *  Set width for videos. */
    videoWidth: { type: [Number, Boolean], default: false },
    /** *  Class for CSS3 animation out. */
    animateOut: { type: [String, Boolean], default: false },
    /** *  Class for CSS3 animation in. */
    animateIn: { type: [String, Boolean], default: false },
    /** *  Easing for CSS2 $.animate. */
    fallbackEasing: { type: String, default: 'swing' },
    /** *  Callback to retrieve basic information (current item/pages/widths). Info function second parameter is Owl DOM object reference. */
    info: { type: Function, default: () => {} },
    /** *  Use it if owl items are deep nested inside some generated content. E.g 'youritem'. Dont use dot before class name. */
    nestedItemSelector: { type: String, default: '' },
    /** *  DOM element type for owl-item. */
    itemElement: { type: String, default: 'div' },
    /** *  DOM element type for owl-stage. */
    stageElement: { type: String, default: 'div' },
    /** *  Set your own container for nav. */
    navContainer: { type: [String, Boolean], default: false },
    /** *  Set your own container for nav. */
    dotsContainer: { type: [String, Boolean], default: false },
    /** *  If you know the carousel will always be visible you can set `checkVisibility` to `false` to prevent the expensive browser layout forced reflow the $element.is(':visible') does. */
    checkVisible: { type: Boolean, default: true },

    autoHeight: { default: false, type: Boolean },

    rtl: { default: false, type: Boolean },

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
  // if (newValue !== oldValue)
  // this.slideIntoView(newValue)
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

        merge: this.merge,
        mergeFit: this.mergeFit,

        startPosition: this.startPosition,

        navText: this.navText,
        navElement: this.navElement,
        slideBy: this.slideBy,
        slideTransition: this.slideTransition,

        dotsEach: this.dotsEach,
        dotsData: this.dotsData,
        lazyLoad: this.lazyLoad,
        lazyLoadEager: this.lazyLoadEager,
        smartSpeed: this.smartSpeed,
        fluidSpeed: this.fluidSpeed,
        autoplaySpeed: this.autoplaySpeed,

        dotsSpeed: this.dotsSpeed,
        dragEndSpeed: this.dragEndSpeed,
        callbacks: this.callbacks,

        responsiveRefreshRate: this.responsiveRefreshRate,
        video: this.video,
        videoHeight: this.videoHeight,
        videoWidth: this.videoWidth,

        animateIn: this.animateIn,
        fallbackEasing: this.fallbackEasing,
        info: this.info,
        nestedItemSelector: this.nestedItemSelector,
        itemElement: this.itemElement,
        stageElement: this.stageElement,
        navContainer: this.navContainer,
        dotsContainer: this.dotsContainer,

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
