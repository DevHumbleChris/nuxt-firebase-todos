<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

definePageMeta({
    middleware: ['auth'],
    title: 'Nuxt-Firebase Todos'
})

const todo = useState('todo', () => '')
const addTodos = () => {
    console.log(todo.value)
}
</script>

<template>
    <section class="max-w-lg mx-auto my-16">
        <h1 class="text-7xl text-red-200 text-center">todos</h1>
        <div class="mt-4 flex bg-white space-x-2 border-b shadow-slate-400 shadow-lg">
            <ChevronDownIcon class="w-6 text-gray-400 mx-2"/>
            <input type="text" class="w-full py-3 placeholder:text-gray-300 placeholder:italic text-2xl bg-transparent border-0 outline-0" placeholder="What needs to be done?" @keyup.enter="addTodos" v-model="todo" />
        </div>
        <Todos />
    </section>
</template>
