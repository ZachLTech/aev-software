<script>
    import {io} from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
    let data;
    let error;
    const socket = io('http://localhost:3000', {  reconnectionDelayMax: 10000,});
    socket.on('data', (content) => {
        data = content;
    });
    socket.on('error', (content) => {
        console.error(err);
        error = content;
    });
    export default {
        data() {
            return {
                data: data,
                error: error
            }
        }
    }
</script>
<template>
    {{ JSON.stringify(data) }}
</template>
