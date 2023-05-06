<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
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
        <div>
            <Todos />
            <div class="bg-white p-2 border-b shadow-slate-400 shadow-lg flex justify-between text-xs sm:text-sm items-center text-gray-500">
                <button>0 item left</button>
                <div class="flex space-x-2 justify-between">
                    <button class="p-0.5 hover:border-red-300 hover:border rounded">All</button>
                    <button class="p-0.5 hover:border-red-300 hover:border rounded">Active</button>
                    <button class="p-0.5 hover:border-red-300 hover:border rounded">Completed</button>
                </div>
                <button class="hover:underline">Clear Completed</button>
            </div>
            <div class="mx-1">
                <div class="w-full bg-white py-0.5 border-b shadow-slate-400 shadow-lg"></div>
                <div class="mx-1">
                    <div class="w-full bg-white py-0.5 border-b shadow-slate-400 shadow-lg"></div>
                </div>
            </div>
        </div>
    </section>
</template>
