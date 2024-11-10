<template>
  <div class="mx-auto p-4">
    <div
      class="w-full min-h-[600px] max-h-[600px] border-[2px] border-[#6C38CC] rounded-2xl px-[70px] py-[40px]"
    >
      <h2 class="text-xl font-semibold mb-[20px]">Шифр Цезаря</h2>
      <p class="max-w-[1000px] text-[16px] mb-[20px]">
        Для шифрования и дешифрования поддерживаются только буквы русского
        алфавита. Заглавные и строчные буквы шифруются одинаково. Специальные
        символы и числа остаются без изменений.
        <b>Ограничение на длину сообщения составляет 500 000 символов!</b>
      </p>
      <form :model="form">
        <div class="flex justify-between items-center gap-x-[30px] mb-[10px]">
          <div>
            <p class="mb-2">
              {{
                isEncryption
                  ? 'Введите текст для шифрования:'
                  : 'Введите текст для расшифрования:'
              }}
            </p>
            <textarea
              v-model="form.text"
              @input="validateInput"
              class="w-[500px] max-w-[500px] text-[16px] color-[#F7F7F7] bg-[#1E1F29] border-[2px] border-[#999999] focus:border-[#6C38CC] transition-all outline-none rounded-md p-[10px] resize-none"
              :rows="8"
              maxlength="500000"
              :placeholder="
                isEncryption
                  ? 'Текст для шифрования'
                  : 'Текст для расшифрования'
              "
            />
          </div>
          <button class="mt-[20px]" @click="switchMode" type="button">
            <el-icon><Switch /></el-icon>
          </button>
          <div :class="enumerationResult.length ? 'mt-[-5px]' : ''">
            <p class="mb-2">Результат:</p>
            <div
              v-if="enumerationResult.length"
              class="w-[500px] max-w-[500px] h-[215px] overflow-x-hidden overflow-y-auto scroll-smooth border-[2px] border-[#999999] rounded-md p-[10px]"
            >
              <ul class="list-disc pl-5">
                <li
                  v-for="(result, index) in enumerationResult"
                  :key="index"
                  class="mb-[7px] text-[16px] color-[#F7F7F7]"
                >
                  <b>Ключ {{ result.key }}:</b> {{ result.text }}
                </li>
              </ul>
            </div>
            <textarea
              v-else
              v-model="result"
              class="w-[500px] max-w-[500px] text-[16px] color-[#F7F7F7] bg-[#1E1F29] border-[2px] border-[#999999] outline-none rounded-md p-[10px] resize-none"
              :rows="8"
              maxlength="500000"
              readonly
              :placeholder="
                isEncryption ? 'Зашифрованный текст' : 'Расшифрованный текст'
              "
            />
          </div>
        </div>
        <div>
          <div class="flex justify-start items-center flex-row gap-[20px]">
            <p>
              {{
                isEncryption
                  ? 'Введите ключ шифрования (1-32):'
                  : 'Введите ключ дешифрования (1-32):'
              }}
            </p>
            <el-input-number
              v-model="form.key"
              :min="1"
              :max="32"
              :disabled="form.notHaveKey"
              class="color-[#1E1F29]"
              controls-position="right"
              size="large"
            />
          </div>
          <el-switch
            v-if="!isEncryption"
            v-model="form.notHaveKey"
            class="text-[18px] mt-[8px]"
            inactive-text="Точный ключ для дешифрования отсутствует"
          />
        </div>
        <div :class="isEncryption ? 'mt-[30px]' : 'mt-[15px]'">
          <el-button
            v-if="!form.notHaveKey"
            class="bg-[#6C38CC] hover:bg-[#5930a5] transition-all rounded-md border-none px-[50px] py-[20px]"
            @click.prevent="handleEncryption"
            >{{ isEncryption ? 'Зашифровать' : 'Расшифровать' }}</el-button
          >
          <el-button
            v-if="!isEncryption && form.notHaveKey"
            class="bg-[#6C38CC] hover:bg-[#5930a5] transition-all rounded-md border-none px-[50px] py-[20px]"
            @click.prevent="getEnumeration"
            >Перебор вариантов</el-button
          >
          <el-button
            class="bg-[#e60c6a] hover:bg-[#d5206f] transition-all rounded-md border-none px-[50px] py-[20px]"
            @click.prevent="clearData"
            >Очистить поля</el-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { caesarCipher } from '../utils/caesarCipher'

interface FormData {
  text: string
  key: number
  notHaveKey: boolean
}

interface EnumerationResult {
  key: number
  text: string
}

export default defineComponent({
  name: 'CaesarCipher',
  data() {
    return {
      form: {
        text: '',
        key: 1,
        notHaveKey: false
      } as FormData,
      result: '' as string,
      isEncryption: true as boolean,
      enumerationResult: [] as EnumerationResult[]
    }
  },
  methods: {
    switchMode(): void {
      if (this.form.text && this.result) {
        this.form.text = this.result
        this.result = ''
        this.enumerationResult = []
      }
      this.form.notHaveKey = false
      this.isEncryption = !this.isEncryption
    },
    validateInput(): void {
      this.form.text = this.form.text.replace(/[A-Za-z]/g, '')
    },
    getEnumeration(): void {
      if (this.form.text === '') return
      this.enumerationResult = []
      for (let key = 1; key <= 32; key++) {
        const decryptedText = caesarCipher(this.form.text, -key)
        this.enumerationResult.push({ key, text: decryptedText })
      }
    },
    handleEncryption(): void {
      this.enumerationResult = []
      this.result = ''
      if (this.form.key === null) this.form.key = 1
      this.form.text = this.form.text.replace(/\s+/g, ' ')
      this.result = this.isEncryption
        ? caesarCipher(this.form.text, this.form.key)
        : caesarCipher(this.form.text, -this.form.key)
    },
    clearData(): void {
      this.form.text = ''
      this.result = ''
      this.form.key = 1
      this.enumerationResult = []
    }
  }
})
</script>
