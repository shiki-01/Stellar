<script lang="ts">
    import {onMount} from "svelte";
    import type {Project} from "/lib";

    let projects: Project[] = [];

    onMount(async () => {
        if (typeof window !== "undefined") {
            projects = await window.electron.projects.gets();
        }
    });

    const formatDate = (inputDate: Date) => {
        const padZero = (value) => (value < 10 ? `0${value}` : `${value}`);

        const parts = {
            yyyy: inputDate.getFullYear(),
            MM: padZero(inputDate.getMonth() + 1),
            dd: padZero(inputDate.getDate()),
            hh: padZero(inputDate.getHours()),
            mm: padZero(inputDate.getMinutes())
        };

        return `${parts.yyyy}/${parts.MM}/${parts.dd} ${parts.hh}:${parts.mm}`;
    };

    const loadProject = (project: Project) => {
        console.log(project);
        if (typeof window !== "undefined") {
            window.location.href = `/project?id=${project.id}`;
        }
    };
</script>

<div class="w-full h-full custom-scroll overflow-y-auto">
    <div class="flex flex-wrap gap-6 w-full h-full">
        {#if projects.length === 0}
            <div class="flex flex-col gap-2 text-center">
                <p>No projects</p>
                <p>create new project</p>
            </div>
        {:else}
            {#each projects as project}
                <div
                        role="button"
                        tabindex="0"
                        class="w-52 max-w-52 h-52 flex-grow bg-white rounded-xl shadow-md flex flex-col"
                        on:click={() => loadProject(project)}
                >
                    <div class="w-full h-32 rounded-t-xl overflow-hidden">
                        <img src={project.settings.thumbnail || "https://placehold.jp/300x300.png"}
                             alt={project.settings.name} class="w-full h-full object-cover"/>
                    </div>
                    <div class="flex flex-col gap-2 px-4 py-2">
                        <h2 class="font-bold text-lg">{project.settings.name}</h2>
                        <p class="text-sm">{formatDate(new Date(project.settings.created))}</p>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .custom-scroll {
        scrollbar-width: thin;
        scrollbar-color: #38bdf8 #f1f1f1;
    }

    .custom-scroll::-webkit-scrollbar {
        width: 8px;
    }

    .custom-scroll::-webkit-scrollbar-track {
        background: #38bdf8;
    }

    .custom-scroll::-webkit-scrollbar-thumb {
        background: #38bdf8;
        border-radius: 4px;
    }

    .custom-scroll::-webkit-scrollbar-thumb:hover {
        background: #38bdf8;
    }
</style>
