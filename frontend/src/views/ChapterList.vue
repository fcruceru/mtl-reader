<template>
	<div>
		<ul>
			<li v-for="chapter in chapters" :key="chapter.title">
				<router-link
					:to="{
						path:
							'/series/' +
							$route.params.name +
							'/' +
							chapter.title,
					}"
				>
					{{ chapter.title }}
				</router-link>
			</li>
		</ul>
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
			maxPages: 1,
		};
	},
	async mounted() {
		let name = this.$route.params.name + "";
		let response = (
			await getChapterList({
				series: name,
				page: 1, // Change
			})
		).data;
		this.chapters = response.chapters;
		this.maxPages = response.maxPages;
	},
};
</script>
