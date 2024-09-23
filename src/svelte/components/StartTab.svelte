<script lang="ts">
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    import {Tabs} from "bits-ui";
    import type { Project } from "/lib";

    const {Root: TabsRoot, List: TabsList, Trigger: TabsTrigger, Content: TabsContent} = Tabs;
    let projects: Project[] = [];

    onMount(async () => {
        if (typeof window !== "undefined") {
            projects = await window.electron.projects.get();
        }
    });
</script>

<TabsRoot
        value="projects"
        class="w-full h-full flex flex-col"
>
    <TabsList
            class="flex flex-row gap-2 font-bold text-lg"
    >
        <TabsTrigger
                value="projects"
                class="px-5 pt-2 border-2 border-b-0 border-sky-400 rounded-t-2xl transition-[padding,margin] mt-2 data-[state=active]:mt-0 data-[state=active]:pb-2"
        >
            <div class="flex flex-row gap-2 items-center">
                <Icon icon="ic:outline-folder-copy" class="text-xl"/>
                <span>Projects</span>
            </div>
        </TabsTrigger
        >
        <TabsTrigger
                value="library"
                class="px-5 pt-2 border-2 border-b-0 border-sky-400 rounded-t-2xl transition-[padding,margin] mt-2 data-[state=active]:mt-0 data-[state=active]:pb-2"
        >
            <div class="flex flex-row gap-2 items-center">
                <Icon icon="ic:outline-library-books" class="text-xl"/>
                <span>Library</span>
            </div>
        </TabsTrigger
        >
    </TabsList>
    <TabsContent value="projects" class="w-full h-full">
        <div class="w-full h-full flex justify-center items-center">
            {#if projects.length === 0}
                <div class="flex flex-col gap-2 text-center">
                    <p>No projects</p>
                    <p>create new project</p>
                </div>
            {:else}
                <div class="grid grid-cols-3 gap-4">
                    {#each projects as project}
                        <div class="bg-white rounded-lg shadow-md p-4">
                            <h2 class="font-bold text-lg">{project.name}</h2>
                            <p>{project.created}</p>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </TabsContent>
    <TabsContent value="library" class="pt-3">
    </TabsContent>
</TabsRoot>