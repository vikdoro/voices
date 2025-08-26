<template>
    <section id="contact-section">
        <header>
            <h1 class="intro">Contact</h1>
            <a href="mailto:univestity@uni.lu">email: univestity@uni.lu</a>
        </header>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use '../styles/breakpoints' as *;

section#contact-section {
    background: white;
    margin-left: 150px;
    width: calc(100% - 150px);
    color: black;
    padding: 24px 32px 140px;
    margin-top: 150px;

    @media (max-width: $tablet) {
        width: calc(100% - 80px);
        margin-left: 80px;
        padding: 20px 24px 140px;
    }

    @media (max-width: $mobile) {
        width: calc(100% - 16px);
        margin-left: 16px;
        padding: 16px 20px 100px;
    }

    h1, a {
        color: black;
    }

    a {
        font-size: 32px;
    }

}    



</style>