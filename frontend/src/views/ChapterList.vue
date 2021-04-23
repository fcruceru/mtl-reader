<template>
	<div>
		<router-link
			v-for="chapter in chapters"
			:key="chapter.index"
			:to="{
				path: '/series/' + $route.params.name + '/' + chapter.index,
			}"
		>
			{{ chapter.title }}
		</router-link>
	</div>
</template>

<script>
import { getChapterList } from "../utils/api";

export default {
	name: "ChapterList",
	components: {},
	data() {
		return {
			chapters: [],
		};
	},
	async mounted() {
		let chapterList = (await getChapterList(this.$route.params.name)).data;
		this.chapters = chapterList;
	},
};
</script>
