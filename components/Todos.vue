<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

const db = useFirestore()
const todos = useState('todos', () => [])
const uiState = useState('uiState', () => 'all')
const user = useCurrentUser()

watchEffect(() => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
        const userTodos = []
        querySnapshot.forEach(doc => {
            userTodos.push({ ...doc.data(), id: doc.id })
        })
        let allTodos = userTodos
        todos.value = allTodos.filter((todo) => todo.userUID == user.value.uid)
    })
    return () => unsub()
})

const taskCompleted = async () => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    await onSnapshot(q, (querySnapshot) => {
        const userTodos = []
        querySnapshot.forEach(doc => {
            userTodos.push({ ...doc.data(), id: doc.id })
        })
        let allTodos = userTodos
        let filtetedTodos = allTodos.filter((todo) => todo.userUID == user.value.uid)
        todos.value = filtetedTodos?.filter(todo => todo.isCompleted == true)
        uiState.value = 'completed'
    })
}

const tasksActive = async () => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    await onSnapshot(q, (querySnapshot) => {
        const userTodos = []
        querySnapshot.forEach(doc => {
            userTodos.push({ ...doc.data(), id: doc.id })
        })
        let allTodos = userTodos
        let filtetedTodos = allTodos.filter((todo) => todo.userUID == user.value.uid)
        todos.value = filtetedTodos.filter(todo => todo.isCompleted == false)
        uiState.value = 'active'
    })
}

const allTasks = async () => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    await onSnapshot(q, (querySnapshot) => {
        const userTodos = []
        querySnapshot.forEach(doc => {
            userTodos.push({ ...doc.data(), id: doc.id })
        })
        let allTodos = userTodos
        todos.value = allTodos.filter((todo) => todo.userUID == user.value.uid)
        uiState.value = 'all'
    })
}

const noOfTasksIncompleted = computed(() => {
    let userTodos = todos?.value.filter(todo => todo.isCompleted == false)
    return userTodos?.length || 0
})
</script>

<template>
    <div>
        <div v-if="todos.length > 0">
            <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
        </div>
        <div
            class="bg-white p-2 border-b shadow-slate-400 shadow-lg flex justify-between text-xs sm:text-sm items-center text-gray-500">
            <button>{{ noOfTasksIncompleted }} item left</button>
            <div class="flex space-x-2 justify-between">
                <button @click="allTasks"
                    :class="uiState == 'all' ? 'p-0.5 hover:border-red-600 border border-red-300 rounded' : 'p-0.5 hover:border-red-300 hover:border rounded'">All</button>
                <button @click="tasksActive"
                    :class="uiState == 'active' ? 'p-0.5 hover:border-red-600 border border-red-300 rounded' : 'p-0.5 hover:border-red-300 hover:border rounded'">Active</button>
                <button @click="taskCompleted"
                    :class="uiState == 'completed' ? 'p-0.5 hover:border-red-600 border border-red-300 rounded' : 'p-0.5 hover:border-red-300 hover:border rounded'">Completed</button>
            </div>
        </div>
        <div class="mx-1">
            <div class="w-full bg-white py-0.5 border-b shadow-slate-400 shadow-lg"></div>
            <div class="mx-1">
                <div class="w-full bg-white py-0.5 border-b shadow-slate-400 shadow-lg"></div>
            </div>
        </div>
    </div>
</template>
