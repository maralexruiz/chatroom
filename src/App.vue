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
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/general" class="nav-link py-3 px-0 px-lg-3 rounded">Random</router-link></li>
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/about" class="nav-link py-3 px-0 px-lg-3 rounded">Announcements</router-link></li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view />
  </div>
</template>
<script>

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export default {
    beforeCreate() {
        if (!sessionStorage.userid) sessionStorage.setItem('userid', create_UUID());
    }
}
</script>

<style>
@import './assets/scss/app.scss';
</style>