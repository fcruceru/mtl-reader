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
export default {
	name: "ChapterList",
	components: {},
	data() {
		return {
			chapters: [
				{
					index: 1,
					title: "Title one",
				},
			],
		};
	},
};
</script>
