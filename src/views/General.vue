<template>
  <div class="page-section">
    <Chat
      title="General"
      description="General purpose chat"
      ></Chat>
  </div>
</template>
<script>
import Chat from '../components/Chat.vue'

export default {
  name: 'App',
  components: {
    Chat
  }
}
</script>
