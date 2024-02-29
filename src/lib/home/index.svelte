<script lang="ts">
  import ms from "ms";
  import {
    AvatarImage,
    AvatarFallback,
    Avatar,
  } from "$lib/components/ui/avatar";
  import * as Tabs from "$lib/components/ui/tabs";
  import StarIcon from "../star.svelte";
  import UserPanel from "./user.svelte";
  import type { User } from "../../database/type";
  export let users: User[];
  /**
   * @type {number}
   */
  export let duration: number;

  function timeAgo(timestamp: Date, timeOnly = false) {
    if (!timestamp) return "never";
    return `${ms(Date.now() - new Date(timestamp).getTime())}${
      timeOnly ? "" : " ago"
    }`;
  }
</script>

<div class="w-full max-w-xl p-4">
  <Tabs.Root class="divide-y divide-gray-900/5">
    <Tabs.List class="w-full">
      {#each users as user (user.id)}
        <Tabs.Trigger value={user.name} class="w-1/2">
          <Avatar>
            <AvatarImage alt={user.name} src={user.image} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div class="text-left pl-2">
            <h2 class="text-lg font-semibold">{user.name}</h2>
            <div class="flex items-center">
              <StarIcon className="text-yellow-400 w-5 h-5" />
              <span class="text-yellow-600 font-semibold mx-1">2</span>
              <StarIcon className="text-gray-400 w-5 h-5" />
              <span class="text-gray-600 font-semibold">0</span>
            </div>
          </div>
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
		{#each users as user (user.id)}
			<Tabs.Content value={user.name}><UserPanel /></Tabs.Content>
		{/each}
  </Tabs.Root>
</div>
