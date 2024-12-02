<script lang="ts">
    import {fade} from 'svelte/transition';
    import Icon from "@iconify/svelte";

    let projectName = '';
    let projectDescription = '';
    let selectedTags: string[] = [];
    let newTagInput = '';
    let isAddingTag = false;

    let availableTags = [
        'Web', 'Mobile', 'Desktop', 'API',
    ];

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(t => t !== tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
    }

    const addNewTag = () => {
        if (newTagInput.trim() && !availableTags.includes(newTagInput.trim())) {
            availableTags = [...availableTags, newTagInput.trim()];
            selectedTags = [...selectedTags, newTagInput.trim()];
            newTagInput = '';
        }
        isAddingTag = false;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addNewTag();
        } else if (event.key === 'Escape') {
            isAddingTag = false;
            newTagInput = '';
        }
    }

    const createProject = () => {
        console.log({
            name: projectName,
            description: projectDescription,
            tags: selectedTags
        });
        if (typeof window !== 'undefined') {
            window.electron.projects.create({
                name: projectName,
                description: projectDescription,
                tags: selectedTags
            });

            const dialog = document.querySelector('#create-project-dl');

            if (dialog && dialog.children.length > 0) {
                dialog.children[0].setAttribute('data-is-open', 'false');
            }

            window.location.reload();
        }
    }
</script>

<div class="flex flex-col justify-between px-4 pb-2 w-full h-full">
    <div class="custom-scroll w-full overflow-y-auto h-fit max-h-[360px] flex flex-col gap-4">
        <div class="flex flex-col relative">
            <label class="text-lg font-bold mb-2" for="project-name">Project Name</label>
            <input
                    bind:value={projectName}
                    class="w-full border-2 border-transparent border-b-sky-400 p-2 focus:outline-none rounded-lg bg-white"
                    id="project-name"
                    type="text"
            />
        </div>

        <div class="flex flex-col gap-2 relative">
            <label class="text-lg font-bold" for="project-description">Project Description</label>
            <input
                    bind:value={projectDescription}
                    class="w-full p-2 border-2 border-transparent border-b-sky-400 focus:outline-none"
                    id="project-description"
            />
        </div>

        <div class="flex flex-col gap-2 relative">
            <label class="text-lg font-bold" for="project-size">Project Size</label>
            <div class="flex flex-row gap-2">
                <input
                        class="w-1/2 border-2 border-transparent border-b-sky-400 p-2 focus:outline-none rounded-lg bg-white"
                        id="project-size"
                        type="number"
                        placeholder="Width"
                />
                <input
                        class="w-1/2 border-2 border-transparent border-b-sky-400 p-2 focus:outline-none rounded-lg bg-white"
                        id="project-size"
                        type="number"
                        placeholder="Height"
                />
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-lg font-bold" for="tags-input">Tags</label>
            <div class="flex flex-wrap gap-2 items-center">
                {#each availableTags as tag}
                    <button
                            class="px-3 py-1 rounded-full text-sm transition-all duration-200 {
                        selectedTags.includes(tag)
                            ? 'bg-sky-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }"
                            on:click={() => toggleTag(tag)}
                    >
                        {tag}
                    </button>
                {/each}

                {#if isAddingTag}
                    <div class="flex items-center gap-2" transition:fade>
                        <!-- svelte-ignore a11y-autofocus -->
                        <input
                                type="text"
                                bind:value={newTagInput}
                                placeholder="新しいタグ"
                                class="px-3 py-1 rounded-full text-sm border-2 border-sky-500 focus:outline-none focus:border-sky-600"
                                on:keydown={handleKeyDown}
                                autofocus
                        />
                        <button
                                class="p-1 rounded-full bg-sky-500 text-white hover:bg-sky-600"
                                on:click={addNewTag}
                        >
                            <Icon icon="ic:round-check" class="w-5 h-5"/>
                        </button>
                        <button
                                class="p-1 rounded-full bg-gray-300 text-white hover:bg-gray-400"
                                on:click={() => {
                            isAddingTag = false;
                            newTagInput = '';
                        }}
                        >
                            <Icon icon="ic:round-close" class="w-5 h-5"/>
                        </button>
                    </div>
                {:else}
                    <button
                            class="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1"
                            on:click={() => isAddingTag = true}
                    >
                        <Icon icon="ic:round-add" class="w-4 h-4"/>
                        タグを追加
                    </button>
                {/if}
            </div>
        </div>
    </div>

    <div class="flex justify-end items-end">
        <button
                class="w-20 h-10 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!projectName}
                on:click={() => {
                    createProject();
                }}
        >
            Create
        </button>
    </div>
</div>
