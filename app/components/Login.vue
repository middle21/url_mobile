<template>

        <StackLayout class="page">
            <StackLayout v-if="!toggleRegister" class="form">
                <Label class="header" text="Login"></Label>

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="1" class="input-field">
                        <TextField class="input" style="margin-bottom: 20;" ref="email" :isEnabled="!processing"
                            hint="Email" v-model="email"
                        ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="2" class="input-field">
                        <TextField class="input" ref="password" :isEnabled="!processing"
                            hint="Password" secure="true" v-model="password"
                        ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
                </GridLayout>


                <Button text="Login" :isEnabled="!processing" @tap="login"
                     class="btn btn-primary m-t-20" backgroundColor="#7957D5"></Button>


                <Label style="horizontal-align:center;" text="Don't have an account ?"></Label>
                <Label style="horizontal-align:center;" text="Sign up" @tap="register"></Label>

            </StackLayout>

            <StackLayout v-else class="form">
                <Label class="header" text="Register"></Label>

                <GridLayout rows="auto, auto, auto, auto, auto">
                    <StackLayout row="1" class="input-field">
                        <TextField class="input" ref="email" :isEnabled="!processing"
                            hint="Email" v-model="email"
                        ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="2" class="input-field">
                        <TextField class="input" ref="username" :isEnabled="!processing"
                            hint="Username" v-model="username"
                        ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="3" class="input-field">
                        <TextField class="input" ref="password" :isEnabled="!processing"
                            hint="Password" secure="true" v-model="password"
                        ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="4" class="input-field">
                        <TextField class="input" ref="password2" :isEnabled="!processing"
                            hint="Re-type password" secure="true" v-model="password2"
                        ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="5" :busy="processing"></ActivityIndicator>
                </GridLayout>

                <Button text="Register" :isEnabled="!processing" @tap="registerPost"
                     class="btn btn-primary m-t-20" backgroundColor="#7957D5"></Button>    

                <Label style="horizontal-align:center;" text="Back to login" @tap="toggleRegister = false"></Label>
            </StackLayout>

            
        </StackLayout>
           

</template>

<script>
import * as http from "http";
const dialog = require("tns-core-modules/ui/dialogs");
const appSettings = require("tns-core-modules/application-settings");
    export default {
        data() {
            return {
                processing: false,
                email: '',
                password: '',
                password2: '',
                username: '',
                toggleRegister: false
            }
        },
        methods: {
            register(){
                this.toggleRegister = true;
            },
            registerPost(){

            },
            login(){
                this.processing = true;
                http.request({
                    url: "https://f38a0742.ngrok.io/login",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    content: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                }).then(response => {
                    let resp = JSON.parse(response.content);
                    if(!resp.error){
                        this.$emit('loggedinevent', resp);
                        this.processing = false;
                    }else{
                        this.processing = false;
                        dialog.alert({
                            title: 'Error',
                            message: 'Authentification failed.',
                            okButtonText: 'Retry'
                        });
                
                        return false;
                    }
                }, error => {
                    this.processing = false;
                    dialog.alert({
                        title: 'Error',
                        message: 'Error.',
                        okButtonText: 'Ok'
                    });

                    return false;
                });

            }
        }
    };
</script>

<style scoped>
    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    } 
</style>
