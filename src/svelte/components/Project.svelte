<script lang="ts">
    import {onMount} from "svelte";
    import type {Project} from "/lib";

    export let id: string;

    let project: Project;

    onMount(async () => {
        if (typeof window !== "undefined") {
            project = await window.electron.projects.get(id);
            console.log(project);
        }
    });
</script>

{#if project}
    <div class="w-full h-full flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <h1 class="text-2xl font-bold">Project</h1>
            <p>Project ID: {id}</p>
        </div>
        <div class="flex flex-col gap-2">
            <h2 class="text-lg font-bold">Settings</h2>
            <div class="flex flex-col gap-2">
                <p>Project Name: {project.settings.name}</p>
                <p>Created: {project.settings.created}</p>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <h2 class="text-lg font-bold">Description</h2>
            <p>{project.settings.description}</p>
        </div>
    </div>
{/if}