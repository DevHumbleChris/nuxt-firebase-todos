<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore';

const db = useFirestore()

const todos = useCollection(collection(db, 'todos'))
</script>

<template>
    <div>
        <Todo />
    </div>
</template>
