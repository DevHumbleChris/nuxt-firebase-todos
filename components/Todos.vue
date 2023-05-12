<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const db = useFirestore()
const todos = useState('todos', () => [])

watchEffect(() => {
  const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const userTodos = []
    querySnapshot.forEach(doc => {
      userTodos.push({ ...doc.data(), id: doc.id })
    })
    todos.value = userTodos
    console.log(todos.value)
  })
  return () => unsub()
})
</script>

<template>
    <div>
        <div v-if="todos.length > 0">
            <Todo v-for="todo in todos" :key="todo.id" :todo="todo"/>
        </div>
        <div class="bg-white p-2 border-b shadow-slate-400 shadow-lg flex justify-between text-xs sm:text-sm items-center text-gray-500">
            <button>{{ todos?.length }} item left</button>
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
</template>
