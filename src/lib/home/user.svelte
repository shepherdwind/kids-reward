<script lang="ts">
  import type { Reward } from "$database/type";
  import { Calendar } from "$lib/components/ui/calendar";
  import Edit from "./edit.svelte";
  export let id: number;
  import Star from "lucide-svelte/icons/star";
  import Use from "lucide-svelte/icons/star-off";
  import Trash from "lucide-svelte/icons/trash";
  import { today, getLocalTimeZone } from "@internationalized/date";
  import * as Table from "$lib/components/ui/table";
  import { formatDate, invariant } from "../utils";
 
  let value = today(getLocalTimeZone());
  export let rewards: Reward[];
  $: currentRewards = rewards.filter((reward) => {
    if (!value) return false;
    const date = reward.date;
    return value.day === date.getDate()
      && value.month === date.getMonth() + 1 && value.year === date.getFullYear();
  }) || [];

  $: config = rewards.reduce((acc, reward) => {
    const date = reward.date;
    const day = date.getDate();
    if (!acc[day]) {
      acc[day] = { score: 0, used: 0 };
    }

    if (reward.score > 0) {
      acc[day].score += reward.score;
    } else {
      acc[day].used += -reward.score;
    }

    return acc;
  }, {} as Record<string, { score: number; used: number }>);
  $: initRaward = { user_id: id };
</script>

<div class="w-full">
  <div class="flex gap-x-4 mb-4 pt-2">
    <Edit reward={initRaward} className="flex-1">
      Add<Star class="ml-2 h-4 w-4" />
    </Edit>
    <Edit reward={initRaward} mode="use" >
      Use
      <Use class="ml-2 h-4 w-4" />
    </Edit>
  </div>
  <Calendar data={config} bind:value={value} class="rounded-md border shadow w-full" />
  <Table.Root class="mt-2">
    <Table.Caption>Score within 1 days</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>Reason</Table.Head>
        <Table.Head>Score</Table.Head>
        <Table.Head>Date</Table.Head>
        <Table.Head>Edit</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each currentRewards as reward (reward.id)}
        <Table.Row>
          <Table.Cell class="font-medium">{reward.reason}</Table.Cell>
          <Table.Cell>{reward.score}</Table.Cell>
          <Table.Cell>{formatDate(reward.date)}</Table.Cell>
          <Table.Cell>
            <Edit reward={reward} mode="delete" className="text-red-500">
              <Trash />
            </Edit>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
