<script setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'

const props = defineProps({
    todo: Object
})

const db = useFirestore()

const todo = computed(() => {
    return props?.todo
})

const isCompleted = computed(() => {
    return todo?.value.isCompleted
})

const markDone = async () => {
    await updateDoc(doc(db, 'todos', todo?.value.id), {
        isCompleted: !isCompleted.value
    })
}

const deleteTask = async () => {
    await deleteDoc(doc(db, 'todos', todo?.value.id))
}
</script>

<template>
    <div class="py-3 bg-white px-4 border-b shadow-slate-400 shadow-lg flex items-center justify-between">
        <div :class="todo.isCompleted ? 'line-through text-green-600': ''">{{ todo?.task }}</div>
        <div class="space-x-1">
            <button @click="markDone">
                <CheckCircleIcon class="w-7 text-green-600" />
            </button>
            <button @click="deleteTask">
                <XCircleIcon class="w-7 text-red-600" />
            </button>
        </div>
    </div>
</template>
