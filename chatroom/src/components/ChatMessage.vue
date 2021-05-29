<template>
    <div v-bind:class="(userid == sessionid)?'alert alert-info text-sm-left':'alert alert-secondary'">
        <p class="msg-date">{{date}}<strong class="msg-username">{{userid==sessionid?'You':username?username:'Anonymous'}}</strong> </p>
        <p class="msg-body">{{msgbody}}</p>
    </div>
</template>

<script>
export default {
    name: "ChatMessage",
    props: {
        id: String,
        userid: String,
        sessionid: String,
        date: String,
        msgbody: String,
        username: String
    }
}
</script>
<style lang="scss">
p.msg-date {
    color: #999999;
    font-size: x-small;
    margin: 0;
}
p.msg-body {
    margin-bottom: 0 !important;
}
strong.msg-username {
    margin-left: 1em;
    color: #000;
}
</style>