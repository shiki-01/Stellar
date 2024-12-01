<script lang="ts">
    import Icon from "@iconify/svelte";

    export let x: number;
    export let y: number;
    export let icon: string = "";
    export let title: string;
    export let description: string = "";
</script>

<style>
    .tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        z-index: 1000;
        pointer-events: none;
        font-size: 0.875rem;
    }

    .tooltip h3 {
        margin: 0;
        font-size: 0.875rem;
    }

    .tooltip p {
        margin-top: 5px;
        font-size: 0.75rem;
    }
</style>

<div
        class="tooltip"
        style="left: {Math.min(x + 10, window.innerWidth - 200)}px; top: {Math.min(y + 10, window.innerHeight - 50)}px;"
>
    <div class="flex items-center gap-2">
        {#if icon}
            <Icon icon={icon}/>
        {/if}
        <h3>{title}</h3>
    </div>
    {#if description}
        <p>{description}</p>
    {/if}
</div>