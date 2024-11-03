<template>
  <div class="mx-auto p-4">
    <div
      class="w-full min-h-[685px] border-[2px] border-[#6C38CC] rounded-2xl px-[70px] py-[40px]"
    >
      <h2 class="text-xl font-semibold mb-[20px]">Протокол Диффи-Хеллмана</h2>
      <div class="flex justify-center items-start gap-[20px]">
        <div>
          <p class="max-w-[900px] text-[16px] mb-[25px]">
            Протокол Диффи-Хеллмана — это криптографический алгоритм,
            позволяющий двум сторонам безопасно обменяться общим секретным
            ключом через открытый канал, не раскрывая его третьим лицам. Он
            использует свойства модульной арифметики и сложность вычисления
            дискретного логарифма для защиты ключа. Этот общий секретный ключ
            затем может быть использован для шифрования данных в дальнейшем
            обмене между сторонами.
          </p>
          <div class="mb-[25px]">
            <div class="mb-[10px]">
              <p>Значение w: {{ w }}</p>
              <p>Значение n: {{ n }}</p>
            </div>
            <div class="mb-[10px]">
              <p>Секретный ключ A (xA): {{ xA }}</p>
              <p>Секретный ключ B (xB): {{ xB }}</p>
            </div>
            <div class="mb-[10px]">
              <p>Публичное значение A (yA): {{ yA }}</p>
              <p>Публичное значение B (yB): {{ yB }}</p>
            </div>
            <p>
              <b>Общий секретный ключ (KAB): {{ kab }}</b>
            </p>
          </div>
          <el-button
            @click="generateKeys"
            class="bg-[#6C38CC] hover:bg-[#5930a5] transition-all rounded-md border-none px-[50px] py-[20px]"
          >
            Сгенерировать новые значения
          </el-button>
        </div>
        <div>
          <img
            class="min-w-[450px] min-h-[480px] rounded-2xl"
            src="../assets/ДиффиХилман.png"
            alt="Алгоритм Диффи-Хеллмана"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  getUniqueRandomPrime,
  generatePublicKey,
  computeSharedSecret
} from '@/utils/diffieHellman'

export default defineComponent({
  name: 'DiffieHellman',
  data() {
    return {
      w: 0 as number,
      n: 0 as number,
      xA: 0 as number,
      xB: 0 as number,
      yA: 0 as number,
      yB: 0 as number,
      kab: 0 as number
    }
  },
  methods: {
    generateKeys() {
      this.w = getUniqueRandomPrime(101, 199, [])
      this.n = getUniqueRandomPrime(101, 199, [this.w])
      this.xA = getUniqueRandomPrime(101, 199, [this.w, this.n])
      this.xB = getUniqueRandomPrime(101, 199, [this.w, this.n, this.xA])

      this.yA = generatePublicKey(this.w, this.xA, this.n)
      this.yB = generatePublicKey(this.w, this.xB, this.n)

      this.kab = computeSharedSecret(this.yB, this.xA, this.n)
    }
  },
  mounted() {
    this.generateKeys()
  }
})
</script>
