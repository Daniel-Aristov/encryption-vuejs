<template>
  <div class="mx-auto p-4">
    <div
      class="w-full min-h-[685px] border-[2px] border-[#6C38CC] rounded-2xl px-[70px] py-[40px]"
    >
      <h2 class="text-xl font-semibold mb-[20px]">Алгоритм RSA</h2>
      <p class="max-w-[1000px] text-[16px] mb-[30px]">
        Для шифрования и дешифрования поддерживаются буквы русского и
        английского алфавита. Заглавные и строчные буквы шифруются одинаково.
        Специальные символы и числа также шифруются.
        <b>Ограничение на длинну сообщения составляет 500 000 символов!</b>
      </p>
      <div class="flex justify-between items-center gap-x-[30px] mb-[20px]">
        <div>
          <p class="mb-2">Введите текст:</p>
          <textarea
            v-model="form.text"
            class="min-w-[450px] text-[16px] color-[#F7F7F7] bg-[#1E1F29] border-[2px] border-[#999999] focus:border-[#6C38CC] transition-all outline-none rounded-md p-[10px] resize-none"
            :rows="8"
            placeholder="Текст для шифрования/дешифрования"
          />
        </div>
        <div>
          <p class="mb-2">Результат:</p>
          <textarea
            v-model="result"
            class="min-w-[450px] text-[16px] color-[#F7F7F7] bg-[#1E1F29] border-[2px] border-[#999999] outline-none rounded-md p-[10px] resize-none"
            :rows="8"
            readonly
            placeholder="Результат шифрования/дешифрования"
          />
        </div>
      </div>
      <div class="flex flex-col gap-[15px]">
        <el-button
          @click="generateKeys"
          class="max-w-[300px] bg-[#6C38CC] hover:bg-[#5930a5] transition-all rounded-md border-none px-[50px] py-[20px]"
          >Сгенерировать ключи</el-button
        >
        <div>
          <p class="text-[17px]">Открытый ключ (e, n): {{ publicKey.e }}, {{ publicKey.n }}</p>
          <p class="text-[17px]">Закрытый ключ (d, n): {{ privateKey.d }}, {{ privateKey.n }}</p>
        </div>
      </div>
      <div class="mt-[30px]">
        <el-button
          @click.prevent="handleEncryption"
          :disabled="publicKey.e === 0"
          class="bg-[#6C38CC] hover:bg-[#5930a5] disabled:bg-[#6e579b] disabled:hover:bg-[#6e579b] transition-all rounded-md border-none px-[50px] py-[20px]"
        >
          Зашифровать
        </el-button>
        <el-button
          @click.prevent="handleDecryption"
          :disabled="publicKey.e === 0"
          class="bg-[#6C38CC] hover:bg-[#5930a5] disabled:bg-[#6e579b] disabled:hover:bg-[#6e579b] transition-all rounded-md border-none px-[50px] py-[20px]"
        >
          Расшифровать
        </el-button>
        <el-button
          v-if="publicKey.e !== 0"
          class="bg-[#e60c6a] hover:bg-[#d5206f] transition-all rounded-md border-none px-[50px] py-[20px]"
          @click.prevent="clearData"
          >Очистить поля</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateRSAKeys, rsaEncrypt, rsaDecrypt } from '../utils/rsa'

export default defineComponent({
  name: 'RSACipher',
  data() {
    return {
      form: {
        text: ''
      },
      result: '',
      publicKey: { e: 0, n: 0 },
      privateKey: { d: 0, n: 0 }
    }
  },
  methods: {
    generateKeys(): void {
      const { publicKey, privateKey } = generateRSAKeys()
      this.publicKey = publicKey
      this.privateKey = privateKey
    },
    handleEncryption(): void {
      if (this.publicKey.e && this.publicKey.n) {
        this.result = rsaEncrypt(this.form.text, this.publicKey)
      } else {
        alert('Сначала сгенерируйте ключи')
      }
    },
    handleDecryption(): void {
      if (this.privateKey.d && this.privateKey.n) {
        this.result = rsaDecrypt(this.result, this.privateKey)
      } else {
        alert('Сначала сгенерируйте ключи')
      }
    },
    clearData() {
      this.form.text = ''
      this.result = ''
      this.publicKey = { e: 0, n: 0 }
      this.privateKey = { d: 0, n: 0 }
    }
  }
})
</script>
