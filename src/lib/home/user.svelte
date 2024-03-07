<script lang="ts">
  import type { Reward } from "$database/type";
  import { Calendar } from "$lib/components/ui/calendar";
  import Edit from "./edit.svelte";
  export let id: number;
  import { today, getLocalTimeZone } from "@internationalized/date";
  import * as Table from "$lib/components/ui/table";
 
  let value = today(getLocalTimeZone());
  export let rewards: Reward[];
  $: currentRewards = rewards.filter((reward) => {
    const date = reward.date;
    // show rewards for the within 2 days of the selected date
    return (
      value.day === date.getDate()
      || value.day - date.getDate() === 1)
      && value.month === date.getMonth() + 1 && value.year === date.getFullYear();
  }) || [];
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
</script>

<div class="w-full">
  <div class="flex gap-x-4 mb-4 pt-2">
    <Edit id={id} />
    <Edit id={id} isAdd={false} />
  </div>
  <Calendar bind:value={value} class="rounded-md border shadow w-full" />
  <Table.Root class="mt-2">
    <Table.Caption>Score within 2 days</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>Reason</Table.Head>
        <Table.Head>Score</Table.Head>
        <Table.Head>Date</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each currentRewards as reward (reward.id)}
        <Table.Row>
          <Table.Cell class="font-medium">{reward.reason}</Table.Cell>
          <Table.Cell>{reward.score}</Table.Cell>
          <Table.Cell>{formatDate(reward.date)}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
