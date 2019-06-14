<template>
    <StackLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/assets/images/me.png"></Image>

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="1" class="input-field">
                        
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="2" class="input-field">
                        
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                </GridLayout>


                <Button :text="'Reset your password'" @tap="resetPassword"
                     class="btn btn-primary m-t-20" backgroundColor="#7957D5"></Button>

                <Button :text="'Your links'" @tap="links"
                class="btn btn-primary m-t-20" backgroundColor="#7957D5"></Button>

                <Button :text="'Logout'" @tap="logout"
                class="btn btn-primary m-t-20" backgroundColor="#7957D5"></Button>

            </StackLayout>

            
        </StackLayout>
</template>

<script>
export default {
    methods: {
        resetPassword(){

        },
        links(){
            this.$parent.$emit('links',1);
        },
        logout(){
            this.$parent.$emit('logout',1);
        }
    }
}
</script>

<style>
</style>