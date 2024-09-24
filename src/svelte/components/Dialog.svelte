<script lang="ts">
    import Icon from '@iconify/svelte'
</script>

<div class="relative w-screen h-screen {$$props.class}" {...$$props}>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="relative z-10 bg-white p-4">
            <slot />
        </div>
    </div>
    <div class="fixed">
        <button class="fixed inset-0 z-0 w-screen h-screen bg-black opacity-50">
            <Icon icon="akar-icons:close" class="absolute top-4 right-4 w-8 h-8 text-white" />
        </button>
    </div>
</div>