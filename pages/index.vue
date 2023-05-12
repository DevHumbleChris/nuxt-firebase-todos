<script setup>
import { ChevronDownIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

useHead({
    title: 'Nuxt-Firebase Todos'
})

definePageMeta({
    middleware: ['auth']
})

const todo = useState('todo', () => '')
const user = useCurrentUser()
const db = useFirestore()
const loading = useState('loading', () => false)

const addTodos = async () => {
    loading.value = !loading.value
    const docRef = await addDoc(collection(db, 'todos'), {
        task: todo.value,
        isCompleted: false,
        userUID: user.value.uid,
        timestamp: serverTimestamp()
    })
    if (docRef) {
        todo.value = ''
        loading.value = !loading.value
    }
}
</script>

<template>
    <section class="max-w-lg mx-auto my-16">
        <h1 class="text-7xl text-red-200 text-center">todos</h1>
        <div class="mt-4 flex bg-white space-x-2 border-b shadow-slate-400 shadow-lg">
            <ArrowPathIcon v-if="loading" class="w-6 text-gray-400 mx-2 animate-spin" />
            <ChevronDownIcon v-else class="w-6 text-gray-400 mx-2" />
            <input type="text" class="w-full py-3 placeholder:text-gray-300 placeholder:italic text-2xl bg-transparent border-0 outline-0" placeholder="What needs to be done?" @keyup.enter="addTodos" v-model="todo" />
        </div>
        <Todos />
    </section>
</template>
