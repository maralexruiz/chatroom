<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div class="container">
            <router-link to="/" class="navbar-brand">ChatRoom</router-link>
            <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/general" class="nav-link py-3 px-0 px-lg-3 rounded">General</router-link></li>
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/random" class="nav-link py-3 px-0 px-lg-3 rounded">Random</router-link></li>
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/announcements" class="nav-link py-3 px-0 px-lg-3 rounded">Announcements</router-link></li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view />
  </div>
</template>
<script>


// Mongo db Generatior
// var mongoObjectId = function () {
//     var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
//     return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
//         return (Math.random() * 16 | 0).toString(16);
//     }).toLowerCase();
// };
import axios from "axios";

export default {
    beforeCreate() {
        // if (!sessionStorage.userid) sessionStorage.setItem('userid', mongoObjectId());
        /** HERE SHOULD BE START A LOADER OR A SPLASH SCREEN */
        if (!sessionStorage.userid) {
            axios
            .post('http://localhost:3000/users/', {})
            .then(function (response) {
                console.log(response);
                sessionStorage.setItem('userid', response.data._id)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style>
@import './assets/scss/app.scss';
</style>