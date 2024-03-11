<script lang="ts">
  import type { Reward } from "$database/type";
  import { Calendar } from "$lib/components/ui/calendar";
  import Edit from "./edit.svelte";
  export let id: number;
  import Star from "lucide-svelte/icons/star";
  import Use from "lucide-svelte/icons/star-off";
  import { today, getLocalTimeZone } from "@internationalized/date";
  import * as Table from "$lib/components/ui/table";
  import { formatDate } from "../utils";
 
  let value = today(getLocalTimeZone());
  export let rewards: Reward[];
  $: currentRewards = rewards.filter((reward) => {
    const date = reward.date;
    return value.day === date.getDate()
      && value.month === date.getMonth() + 1 && value.year === date.getFullYear();
  }) || [];
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
  <Calendar bind:value={value} class="rounded-md border shadow w-full" />
  <Table.Root class="mt-2">
    <Table.Caption>Score within 2 days</Table.Caption>
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
              Delete
            </Edit>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
