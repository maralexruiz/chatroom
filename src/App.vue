<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div class="container">
            <a class="navbar-brand" href="#page-top">ChatRoom</a>
            <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/">Home</router-link></li>
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/general">General</router-link></li>
                    <li class="nav-item mx-0 mx-lg-1"><router-link to="/about">About</router-link></li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view />
  </div>
</template>
<style>
@import './assets/scss/app.scss';
</style>