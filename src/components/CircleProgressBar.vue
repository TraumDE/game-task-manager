<script lang="ts" setup>
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

interface Props {
  level: number
  filled: IntRange<0, 101>
}

const props = defineProps<Props>()
</script>

<template>
  <div class="progress-bar">
    <span class="progress-bar__number">{{ props.level }} Ур.</span>

    <svg
      class="progress-bar__svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 160 160"
    >
      <circle
        :style="{ 'stroke-dashoffset': ((100 - filled) * 450) / 100 }"
        class="progress-bar__circle"
        cx="80"
        cy="80"
        r="70"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  width: 160px;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &__number {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--pico-contrast);
    font-size: 30px;
  }

  &__svg {
    position: absolute;
    inset: 0;
    overflow: visible;
  }

  &__circle {
    fill: none;
    stroke: var(--pico-primary);
    stroke-width: 20px;
    stroke-dasharray: 450;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 2s ease-in-out;
  }
}
</style>
