<template>
  <div class="mx-auto p-4">
    <div
      class="w-full border-[2px] border-[#6C38CC] rounded-2xl px-[70px] py-[40px]"
    >
      <h2 class="text-xl font-semibold mb-[20px]">Шифр Цезаря</h2>
      <p class="max-w-[800px] text-[16px] mb-[30px]">
        Для шифрования и дешифрования поддерживаются только буквы русского
        алфавита. Заглавные и строчные буквы шифруются одинаково. Специальные
        символы и числа остаются без изменений.
        <b>Ограничение на длинну сообщения составляет 500 000 символов!</b>
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
              class="min-w-[400px] text-[16px] color-[#F7F7F7] bg-[#1E1F29] border-[2px] border-[#999999] focus:border-[#6C38CC] transition-all outline-none rounded-md p-[10px] resize-none"
              :rows="9"
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
          <div>
            <p class="mb-2">Результат:</p>
            <div
              v-if="enumerationResult.length"
              class="min-w-[400px] h-[240px] overflow-x-hidden overflow-y-auto scroll-smooth border-[2px] border-[#999999] rounded-md p-[10px]"
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
              class="min-w-[400px] text-[16px] color-[#F7F7F7] bg-[#1E1F29] border-[2px] border-[#999999] outline-none rounded-md p-[10px] resize-none"
              :rows="9"
              readonly
              :placeholder="
                isEncryption ? 'Зашифрованный текст' : 'Расшифрованный текст'
              "
            />
          </div>
        </div>
        <div>
          <p class="mb-2">
            {{
              isEncryption
                ? 'Введите ключ шифрования (1-32):'
                : 'Введите ключ дешифрования (1-32):'
            }}
          </p>
          <div class="flex flex-col justify-start gap-[10px]">
            <el-input-number
              v-model="form.key"
              :min="1"
              :max="32"
              :disabled="form.notHaveKey"
              class="color-[#1E1F29]"
              controls-position="right"
              size="large"
            />
            <el-switch
              v-if="!isEncryption"
              v-model="form.notHaveKey"
              class="text-[18px]"
              inactive-text="Точный ключ для дешифрования отсутствует"
            />
          </div>
        </div>
        <div class="mt-[30px]">
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
      this.enumerationResult = []
      for (let key = 1; key <= 32; key++) {
        const decryptedText = caesarCipher(this.form.text, -key)
        this.enumerationResult.push({ key, text: decryptedText })
      }
    },
    handleEncryption(): void {
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

<style scoped>
.el-icon {
  height: 2em;
  width: 2em;
}

.el-icon svg {
  height: 2em;
  width: 2em;
}

.el-input {
  --el-input-text-color: #f7f7f7;
}

.el-input.is-disabled {
  --el-input-border-color: #f7f7f7;
  opacity: 0.7;
}

.el-input__wrapper {
  background-color: #1e1f29;
}

.el-input.is-disabled .el-input__wrapper {
  background-color: #1e1f29;
}

.el-input-number__decrease,
.el-input-number__increase {
  background: #1e1f29;
}

.el-switch__label * {
  font-size: 16px;
}

.el-switch__core {
  background: #1e1f29;
}

.el-switch.is-checked .el-switch__core {
  background-color: #6c38cc;
  border-color: #6c38cc;
}
</style>
