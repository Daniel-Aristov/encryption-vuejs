<template>
  <div class="min-h-screen flex items-center justify-center">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Шифр Цезаря" name="caesar">
        <CaesarCipher />
      </el-tab-pane>
      <el-tab-pane label="Алгоритм RSA" name="rsa">
        <RSACipher />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CaesarCipher from '@/components/CaesarCipher.vue'
import RSACipher from '@/components/RSACipher.vue'

export default defineComponent({
  name: 'App',
  components: {
    CaesarCipher,
    RSACipher
  },
  data() {
    return {
      activeTab: 'caesar'
    }
  }
})
</script>
