<template>
    <button type="button" class="cta-button" :class="`cta-button--${variant}`" @click="$emit('click')">
        <div class="cta-border-top">
            <div class="cta-border-3px"></div>
            <div class="cta-border-1px"></div>
        </div>
        <svg
            class="cta-arrow"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.5 12H18.8868M18.8868 12L14 7M18.8868 12L14 17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
        <span>{{ text }}</span>
        <div class="cta-border-bottom">
            <div class="cta-border-3px-bottom"></div>
            <div class="cta-border-1px-bottom"></div>
        </div>
    </button>
</template>

<script setup lang="ts">
interface Props {
    text: string;
    variant?: 'accent' | 'black';
}

withDefaults(defineProps<Props>(), {
    variant: 'accent'
});

defineEmits<{
    click: [];
}>();
</script>

<style scoped lang="scss">
@use '../styles/vars';

.cta-button {
    padding: 16px 32px 16px 0;
    background: transparent;
    border: none;
    transition: transform 0.3s ease;

    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    position: relative;
    padding: 12px 0;
    cursor: pointer;
    text-align: center;
    line-height: normal;
    text-transform: uppercase;

    // Default accent variant
    &--accent {
        color: vars.$accent;

        .cta-border-3px,
        .cta-border-1px,
        .cta-border-1px-bottom,
        .cta-border-3px-bottom {
            background: vars.$accent;
        }

        .cta-arrow {
            color: vars.$accent;
        }
    }

    // Black variant
    &--black {
        color: #000;

        .cta-border-3px,
        .cta-border-1px,
        .cta-border-1px-bottom,
        .cta-border-3px-bottom {
            background: #000;
        }

        .cta-arrow {
            color: #000;
        }
    }

    .cta-border-top {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% + 26px);
        height: 3px;
        display: flex;
        overflow: hidden;
    }

    .cta-border-3px {
        width: 100%;
        height: 3px;
        flex-shrink: 0;
        transition: transform 0.5s;
    }

    .cta-border-1px {
        width: 100%;
        height: 1px;
        flex-shrink: 0;
        transition: transform 0.5s;
    }

    &:hover .cta-border-3px,
    &:hover .cta-border-1px {
        transform: translateX(-100%);
    }

    .cta-border-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: calc(100% + 26px);
        height: 3px;
        display: flex;
        overflow: hidden;
    }

    .cta-border-1px-bottom {
        width: 100%;
        height: 1px;
        flex-shrink: 0;
        transition: transform 0.5s;
        align-self: flex-end;
        transform: translateX(-100%);
    }

    .cta-border-3px-bottom {
        width: 100%;
        height: 3px;
        flex-shrink: 0;
        transition: transform 0.5s;
        transform: translateX(-100%);
    }

    &:hover .cta-border-1px-bottom,
    &:hover .cta-border-3px-bottom {
        transform: translateX(0);
    }

    .cta-arrow {
        width: 25px;
        height: 24px;
        opacity: 0;
        position: absolute;
        left: 0;
        transform: translateX(-24px);
        transition: all 0.3s ease;
        margin-right: 4px;
    }

    &:hover .cta-arrow {
        opacity: 1;
        transform: translateX(0);
    }

    span {
        transition: transform 0.3s ease;
    }

    &:hover span {
        transform: translateX(26px);
    }
}
</style>
