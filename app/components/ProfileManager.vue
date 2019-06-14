<template>
	<FlexboxLayout>

		<Login v-if="token.length > 1 ? false : true"  @loggedinevent="loggedin"></Login>
		<Profile v-else></Profile>

	</FlexboxLayout>

</template>

<script>
import Login from './Login.vue';
import Profile from './Profile.vue';

export default{
	props: ['token'],
	components: {
		Login,
		Profile
	},
	data(){
		return {
		
		}
	},
	methods: {
		loggedin(e){
			this.$emit('updateToken',e);
			this.$emit('getLinks',1);
		}
	},
	created(){
	},
	mounted(){
		this.$on('links', () => {
			this.$parent.$emit('links', 1);
		});

		this.$on('logout', () => {
			this.$parent.$emit('logout', 1);
		});
	}
	
}
</script>


<style>
</style>