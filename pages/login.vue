<script setup>
import { useFirebaseAuth } from 'vuefire'
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth'

const auth = useFirebaseAuth()
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const signWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
        .then((user) => {
            console.log(user)
        })
        .catch(err => {
            console.log(err.message)
        })
}

const signWithGithub = async () => {
    signInWithPopup(auth, githubProvider)
        .then((user) => {
            console.log(user)
        })
        .catch(err => {
            console.log(err.message, 'Hello')
        })
}
</script>

<template>
    <div class="relative py-16">
        <div class="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
            <div class="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                <div
                    class="rounded-3xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                    <div class="p-8 py-12 sm:p-16">
                        <div class="space-y-4">
                            <h2 class="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-white">
                                Sign in to <span class="block text-green-700">Nuxt-Firebase Todos</span>
                            </h2>
                        </div>
                        <div class="mt-4 grid space-y-4">
                            <button @click="signWithGoogle"
                                class="group relative flex h-11 items-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-700 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
                                <span
                                    class="w-full relative flex justify-center items-center gap-3 text-base font-medium text-gray-600 dark:text-gray-200">
                                    <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                                        class="absolute left-0 w-5" alt="google logo" />
                                    <span>Continue with Google</span>
                                </span>
                            </button>
                            <button @click="signWithGithub"
                                class="group relative flex h-11 items-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-700 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
                                <span
                                    class="w-full relative flex justify-center items-center gap-3 text-base font-medium text-gray-600 dark:text-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        class="w-5 h-5 absolute left-0" viewBox="0 0 16 16">
                                        <path
                                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                    </svg>
                                    <span>Continue with Github</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
