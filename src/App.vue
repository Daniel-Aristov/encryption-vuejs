<template>
  <div class="h-screen overflow-hidden flex items-center justify-center">
    <div class="w-full max-w-[1200px] mt-[30px]">
      <div class="flex justify-center max-w-[1120px] gap-[30px] items-center mx-auto border-b-2 border-[#f7f7f7]">
        <button
          :class="activeTab === 'caesar' ? 'border-[#6c38cc] bg-[#6c38cc] text-[#f7f7f7]' : ''"
          class="min-w-[354px] relative border-[2px] border-[#f7f7f7] rounded-b-none py-[10px] px-[45px] rounded-xl text-[16px] top-[2px] transition-all text-[#f7f7f7]"
          @click="activeTab = 'caesar'"
        >
          Шифр Цезаря
        </button>
        <button
          :class="activeTab === 'rsa' ? 'border-[#6c38cc] bg-[#6c38cc] text-[#f7f7f7]' : ''"
          class="min-w-[354px] relative border-[2px] border-[#f7f7f7] rounded-b-none py-[10px] rounded-xl px-[45px] text-[16px] top-[2px] transition-all text-[#f7f7f7]"
          @click="activeTab = 'rsa'"
        >
          Алгоритм RSA
        </button>
        <button
          :class="activeTab === 'diffineHellman' ? 'border-[#6c38cc] bg-[#6c38cc] text-[#f7f7f7]' : ''"
          class="min-w-[354px] relative border-[2px] border-[#f7f7f7] rounded-b-none rounded-xl py-[10px] px-[45px] text-[16px] top-[2px] transition-all text-[#f7f7f7]"
          @click="activeTab = 'diffineHellman'"
        >
          Протокол Диффи-Хеллмана
        </button>
      </div>
      <div class="p-[20px]">
        <CaesarCipher v-if="activeTab === 'caesar'" />
        <RSACipher v-if="activeTab === 'rsa'" />
        <DiffieHellman v-if="activeTab === 'diffineHellman'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CaesarCipher from '@/components/CaesarCipher.vue'
import RSACipher from '@/components/RSACipher.vue'
import DiffieHellman from './components/DiffieHellman.vue';

export default defineComponent({
  name: 'App',
  components: {
    CaesarCipher,
    RSACipher,
    DiffieHellman
  },
  data() {
    return {
      activeTab: 'caesar'
    }
  }
})
</script>
