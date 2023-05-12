<script setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { doc, updateDoc } from 'firebase/firestore'

const props = defineProps({
    todo: Object
})

const todo = computed(() => {
    return props?.todo
})

const markDone = async () => {
    await updateDoc(doc(db, 'todos', todo?.value.id), {
        isCompleted: !false
    })
}
</script>

<template>
    <div class="py-3 bg-white px-4 border-b shadow-slate-400 shadow-lg flex items-center justify-between">
        <div>{{ todo?.task }}</div>
        <div class="space-x-1">
            <button>
                <CheckCircleIcon @click="markDone" class="w-7 text-green-600" />
            </button>
            <button>
                <XCircleIcon class="w-7 text-red-600" />
            </button>
        </div>
    </div>
</template>
