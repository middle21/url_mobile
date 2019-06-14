import * as http from "http";

const appSettings = require("tns-core-modules/application-settings");

export default class BackendService {

	constructor(){
		this.baseUrl = 'https://f38a0742.ngrok.io/';
		this.email = appSettings.getString('email', '');
		this.password = appSettings.getString('password','');
		this.username = '';
		this.token = appSettings.getString('token');
		this.loggedInFlag = 0;

		/*if(this.email != '' && this.password != ''){
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
				if(resp.length < 1){
					dialog.alert({
						title: 'Error',
						message: 'Authentification failed.Tap the profile icon to retry.',
						okButtonText: 'Ok'
					});
				}else{
					appSettings.setString('token',resp);
					this.token = resp;
				}
			}, error => {
				dialog.alert({
					title: 'Error',
					message: error,
					okButtonText: 'Ok'
				});
			});
		}*/
	}

	isLoggedIn() {
		if(this.token.length < 1){
			return false;
		}else{
			return true;
		}
	}

	/*login(email, password){
		http.request({
			url: "https://f38a0742.ngrok.io/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			content: JSON.stringify({
				email,
				password
			})
		}).then(response => {
			let resp = JSON.parse(response.content);
			console.log(resp)
			if(resp.error != null || resp.error == 1){
				console.log(resp.error)
				return false;
			}else{
				appSettings.setString('token',resp);
				appSettings.setString('email',email);
				appSettings.setString('password',password);
				this.token = resp;
				this.email = email;
				this.password = password;
				return true;
			}
		}, error => {
			return false;
		});
	}*/

	logout(){
		appSettings.remove('email');
		appSettings.remove('password');
		appSettings.remove('username');
		appSettings.remove('token');

		this.email = '';
		this.username = '';
		this.password = '';
		this.token = '';

		return true;
	}

}