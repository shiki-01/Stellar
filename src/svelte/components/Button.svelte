<script lang="ts">
    export let onClick: () => void = () => {};
</script>

<button
    class="w-fit h-fit p-2 bg-sky-500 rounded-full shadow-lg shadow-sky-500/40 transition-shadow hover:shadow-sky-500/60"
    on:click={onClick}
    {...$$props}
>
    <slot />
</button>