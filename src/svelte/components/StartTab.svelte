<script lang="ts">
    import {onMount} from "svelte";
    import Icon from "@iconify/svelte";
    import Tooltip from "@sc/Tooltip.svelte";
    import ProjectTab from "@sc/ProjectTab.svelte";
    import {Tabs} from "bits-ui";
    import {flip} from "svelte/animate";
    import type {Project} from "/lib";
    import {cubicOut} from "svelte/easing";

    const {Root: TabsRoot, List: TabsList, Trigger: TabsTrigger, Content: TabsContent} = Tabs;
    let projects: Project[] = [];
    let activeTab = "projects";
    let mouseX = 0;
    let mouseY = 0;
    let tooltipVisible = false;
    let tooltipText = "";

    const tabs = [
        {value: "projects", icon: "ic:outline-folder-copy", label: "Projects"},
        {value: "library", icon: "ic:outline-library-books", label: "Library"}
    ];

    const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    };

    const showTooltip = (label: string, value: string) => {
        if (activeTab !== value) {
            tooltipVisible = true;
            tooltipText = label;
        }
    };

    const hideTooltip = () => {
        tooltipVisible = false;
        tooltipText = "";
    };

    const handleTabClick = (tabValue: string) => {
        activeTab = tabValue;
    };

    onMount(async () => {
        if (typeof window !== "undefined") {
            projects = await window.electron.projects.gets();
        }
    });

    $: sortedTabs = [...tabs].sort((a, b) => {
        if (a.value === activeTab) return -1;
        if (b.value === activeTab) return 1;
        return 0;
    });
</script>

<svelte:window on:mousemove={handleMouseMove}/>

{#if tooltipVisible}
    <Tooltip x={mouseX} y={mouseY} title={tooltipText}/>
{/if}

<TabsRoot
        onValueChange={(value) => activeTab = value}
        value={activeTab}
        class="w-full h-full flex flex-col"
>
    <TabsList class="flex flex-row gap-2 font-bold text-lg relative" style="z-index: 1;">
        {#each sortedTabs as tab (tab.value)}
            <div
                    animate:flip={{duration: 400, easing: cubicOut}}
                    style="z-index: {tab.value === activeTab ? 2 : 1};"
                    class="relative"
                    on:pointerenter={() => showTooltip(tab.label, tab.value)}
                    on:pointerleave={hideTooltip}
            >
                <TabsTrigger
                        value={tab.value}
                        class="px-5 pt-2 border-2 border-b-0 border-sky-400 rounded-t-2xl transition-all duration-300 mt-0 data-[state=active]:pb-2 bg-white relative"
                        on:click={() => handleTabClick(tab.value)}
                >
                    <div class="flex flex-row gap-2 items-center">
                        <Icon icon={tab.icon} class="text-xl"/>
                        {#if tab.value === activeTab}
                            <span class="transition-all duration-300">{tab.label}</span>
                        {/if}
                    </div>
                </TabsTrigger>
            </div>
        {/each}
    </TabsList>
    <div class="w-full max-w-full h-[calc(100%-46px+2px)] p-6 overflow-hidden border-2 border-sky-400 rounded-2xl rounded-tl-none relative -mt-[2px]">
        <TabsContent class="w-full h-full" value="projects">
            <ProjectTab/>
        </TabsContent>
        <TabsContent class="pt-3" value="library">
        </TabsContent>
    </div>
</TabsRoot>