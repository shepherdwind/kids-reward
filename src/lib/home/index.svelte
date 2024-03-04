<script lang="ts">
  import {
    AvatarImage,
    AvatarFallback,
    Avatar,
  } from "$lib/components/ui/avatar";
  import * as Tabs from "$lib/components/ui/tabs";
  import StarIcon from "../star.svelte";
  import UserPanel from "./user.svelte";
  import type { User, Reward } from "../../database/type";
  export let users: User[];
  export let rewards: Reward[];
  /**
   * @type {number}
   */
  export let duration: number;

  console.log('cost', duration);
  let currentUser = users?.[0]?.name || '';

  const getUserScore = (userId: number) => {
    const data = rewards.filter((reward) => reward.user_id === userId);
    const gain = data.filter((reward) => reward.score > 0).reduce((acc, reward) => acc + reward.score, 0);
    const cost = data.filter((reward) => reward.score < 0).reduce((acc, reward) => acc - reward.score, 0);
    return [gain, cost];
  };

  const scores = users.map((user) => {
    const [gain, cost] = getUserScore(user.id);
    return {
      id: user.id,
      gain,
      cost,
    };
  });

  console.log(rewards, users, scores);
</script>

<div class="w-full max-w-xl p-4">
  <Tabs.Root value={currentUser} onValueChange={(value) => currentUser = value || ''}>
    <Tabs.List class="w-full">
      {#each users as user, index (user.id)}
        <Tabs.Trigger value={user.name} class={currentUser === user.name ? 'h-24 w-2/3' :  'w-1/3 h-24'}>
          {#if user.name === currentUser}
          <Avatar class={currentUser === user.name ? '' : ''}>
            <AvatarImage alt={user.name} src={user.image} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          {:else}
            <div class="h-24 w-1" />
          {/if}
          <div class="text-left pl-2">
            <h2 class="text-lg font-semibold">{user.name}</h2>
            <div class="flex items-center">
              <StarIcon className="text-yellow-400 w-5 h-5" />
              <span class="text-yellow-600 font-semibold mx-1">{scores[index]?.gain || 0}</span>
              <StarIcon className="text-gray-400 w-5 h-5" />
              <span class="text-gray-600 font-semibold">{scores[index]?.cost || 0}</span>
            </div>
          </div>
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
		{#each users as user (user.id)}
			<Tabs.Content value={user.name}><UserPanel id={user.id} /></Tabs.Content>
		{/each}
  </Tabs.Root>
</div>
