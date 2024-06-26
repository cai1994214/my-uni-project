<template>
	<swiper class="banner" indicator-dots circular :autoplay="true">
		<swiper-item v-for="{url, id} in pictures" :key="id">
			<image @tap="onPreviewIamge(url)" :src="url"/>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			const path = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/'
			return {
				pictures: [
					{id: 1, url: path+`goods_preview_1.jpg`},
					{id: 2, url: path+`goods_preview_2.jpg`},
					{id: 3, url: path+`goods_preview_3.jpg`},
					{id: 4, url: path+`goods_preview_4.jpg`},
				]
			}
		},
		onLoad() {

		},
		methods: {
			onPreviewIamge(url) {
				uni.previewImage({
					urls: this.pictures.map(e => e.url),
					current: url
				})
			}
		}
	}
</script>

<style>
	.banner, .banner image {
		width: 750rpx;
		height: 750rpx;
	}
</style>
