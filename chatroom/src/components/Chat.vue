<template>
	<div>
		<br>
		<div class="container">
			<div class="row text-center">
				<h3 class="section-heading text-uppercase">{{title}} Chat</h3>
				<p class="section-subheading text-muted">{{description}}</p>
			</div>
			<div class="row text-center">
				<form class="row">
				<div class="col-auto">
					<label for="userName" class="visually-hidden">Username</label>
					<input type="text" readonly class="form-control-plaintext" id="userName" v-bind:value="username">
				</div>
				<div class="col-auto">
					<label for="UserID" class="visually-hidden">UserID</label>
					<input type="text" readonly class="form-control-plaintext" id="UserID" v-bind:value="useridsmall">
				</div>
				<div class="col-auto">
					<label for="updateUserName" class="visually-hidden">Username</label>
					<input type="text" class="form-control" id="updateUserName" ref="updateUserName"  placeholder="Username">
				</div>
				<div class="col-auto">
					<button type="submit" v-on:click="updateName($event)" class="btn btn-primary mb-3" id="changeUsername">Change Username</button>
				</div>
				</form>
			</div>
			<div class="row">
				<div class="col-12 jumbotron chatbox" id="chatbox">
					<div class="col-12 inner-chatbox" id="inner-chatbox">
						<ChatMessage
						v-for="message in messages"
						v-bind:key=message._id
						v-bind:id=message._id
						v-bind:date="message.date"
						v-bind:msgbody="message.message"
						v-bind:userid="message.user._id"
						v-bind:sessionid="userid"
						v-bind:username="message.user.name"
						></ChatMessage>
					</div>
				</div> 
			</div>
			<div class="row ">
				<div class="form-group">
					<!--<label for="newEntryMessage"></label>-->
					<textarea class="form-control" ref="newEntryMessage"  placeholder="Say something!" id="newEntryMessage" rows="2"></textarea>
				</div>
			</div>
			<br>
			<div class="row text-right">
				<div class="form-group">
					<button type="submit" v-on:click="sendMessage" class="btn btn-primary col-md-2">Send</button>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
import ChatMessage from './ChatMessage.vue';
import axios from "axios";
export default {
	name: "Chat",
	components: {
		ChatMessage
	},
	props: {
		id: String,
		title: String,
		description: String
	},
	methods: {
		sendMessage() {
			let entryMessage = this.$refs.newEntryMessage.value;
			if (entryMessage && entryMessage.trim().length > 0) {
				const body = {
					userid: sessionStorage.userid,
					message: entryMessage
				}
				axios
				.post('http://localhost:3000/chats/' + this.id, body)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
		updateName(event) {
			if (event) event.preventDefault();
			let body = {username: this.$refs.updateUserName.value};
			let self = this;
			axios
			.put('http://localhost:3000/users/' + this.userid, body)
			.then(function (response) {
				console.log(response);
				sessionStorage.username = response.data.name;
				document.getElementById("userName").value =  response.data.name;
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
	beforeCreate() {
		/** If not SeassonStorage we redirect to Home. */
		this.username = "";
		this.userid = "";
		this.useridsmall = "";
		if (sessionStorage.userid) {
			this.username = sessionStorage.username ? sessionStorage.username : 'Anonymous';
			this.userid = sessionStorage.userid;
			this.useridsmall = sessionStorage.userid.slice(0, 8);
		} else {
			// Necesary for create user(session);
			window.location.href = '/';
		}
	},
	data() {
		return { messages: []}
	},
	mounted () {
		axios
		.get('http://localhost:3000/chats/' + this.id)
		.then(response => (this.messages = response.data))
	}
}
</script>
<style lang="scss">
div.chatbox {
	height: 400px;
	background-color: #e9ecef;
	overflow: auto;
	margin: 1em 0 1em 0;
	border-radius: 10px;
	padding-top: 0.5em 0 0.5em 0;
}

div.inner-chatbox {
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}

div.inner-chatbox > div.alert-info {
	text-align: right;
}
</style>