<script setup>
const user = await getCurrentUser()
console.log(user)
</script>

<template>
    <section class="max-w-md mx-auto my-16">
        <h1 class="text-7xl text-red-200 text-center">todos</h1>
        <div class="my-4">
            <input type="text" class="w-full py-3 placeholder:text-gray-300 placeholder:italic text-2xl" placeholder="What needs to be done?"/>
        </div>
    </section>
</template>
