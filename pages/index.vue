<script setup>
import { ChevronDownIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

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
const userLogState = useState('userLogState', () => false)
const auth = useFirebaseAuth()

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

watch(userLogState, (newUserLogState) => {
    if (newUserLogState) {
        signOut(auth)
            .then(() => {
                userLogState.value = false
                navigateTo({
                    path: '/login'
                })
            })
            .catch(err => {
                alert(err.message)
            })
    }
})
</script>

<template>
    <section class="max-w-lg mx-auto my-4">
        <div>
            <label class="relative inline-flex justify-center items-center cursor-pointer">
                <input type="checkbox" v-model="userLogState" class="sr-only peer">
                <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                </div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Logout</span>
            </label>
        </div>
        <h1 class="text-7xl text-red-200 text-center">todos</h1>
        <div class="mt-4 flex bg-white space-x-2 border-b shadow-slate-400 shadow-lg">
            <ArrowPathIcon v-if="loading" class="w-6 text-gray-400 mx-2 animate-spin" />
            <ChevronDownIcon v-else class="w-6 text-gray-400 mx-2" />
            <input type="text"
                class="w-full py-3 placeholder:text-gray-300 placeholder:italic text-2xl bg-transparent border-0 outline-0"
                placeholder="What needs to be done?" @keyup.enter="addTodos" v-model="todo" />
        </div>
        <Todos />
    </section>
</template>
