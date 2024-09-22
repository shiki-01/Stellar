<script lang="ts">
    import { icons } from "/lib";

    export let onClick: string;

    const action = () => icons[onClick].action();

    const eventHandler = (action: () => void) => {
        if (typeof window !== 'undefined' && action) {
            action()
        }
    }
</script>

<div class="w-[40px] h-[40px] flex justify-center items-center">
    <button class="w-[24px] h-24px" on:click={() => eventHandler(action)}>
        <slot />
    </button>
</div>
