<script lang="ts">
  import type { Reward } from "$database/type";
  import { Calendar } from "$lib/components/ui/calendar";
  import Edit from "./edit.svelte";
  export let id: number;
  import Star from "lucide-svelte/icons/star";
  import Use from "lucide-svelte/icons/star-off";
  import Trash from "lucide-svelte/icons/trash";
  import { toast } from "svelte-sonner";

  import {
    today,
    getLocalTimeZone,
    type DateValue,
    parseDate,
    CalendarDate,
  } from "@internationalized/date";
  import { goto } from "$app/navigation";

  export let value: CalendarDate;
  export let rewards: Reward[];
  export let setDate: (date: DateValue) => void;

  $: currentRewards =
    rewards.filter((reward) => {
      if (!value) return false;
      const date = reward.date;
      return (
        value.day === date.getDate() &&
        value.month === date.getMonth() + 1 &&
        value.year === date.getFullYear()
      );
    }) || [];

  $: config = rewards.reduce(
    (acc, reward) => {
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
    },
    {} as Record<string, { score: number; used: number }>,
  );
  $: initRaward = { user_id: id };

  const handleDateChange = (date?: DateValue) => {
    if (!date) return;
    setDate(date);
  };
</script>

<div class="w-full">
  <Calendar
    data={config}
    {value}
    class="rounded-md border shadow w-full mt-3"
    onValueChange={handleDateChange}
    onPlaceholderChange={(date) => {
      if (!date) return;
      if (date.year === value.year && date.month === value.month) return;

      const newDate = `${date.year}-${date.month}-${value.day}`;

      const t = toast.loading("Loading...");
      setDate(new CalendarDate(date.year, date.month, value.day));

      goto(`?date=${newDate}`).then(() => {
        toast.dismiss(t);
      });
    }}
    pagedNavigation
  />
  <div class="mt-3">
    {#each currentRewards as reward (reward.id)}
      <div class="flex items-center space-x-4 rounded-md border p-2 mt-2">
        {#if reward.score > 0}
          <Star class="h-4 w-4" />
        {:else}
          <Use class="h-4 w-4" />
        {/if}
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none">{reward.reason}</p>
          <p class="text-sm text-muted-foreground">
            {reward.score}
          </p>
        </div>
        <Edit {reward} mode="delete">
          <Trash />
        </Edit>
      </div>
    {/each}
  </div>
</div>

<div class="left-0 bottom-0 bg-background fixed flex w-full justify-center">
  <div class="flex gap-x-4 px-4 border w-full max-w-xl">
    <Edit reward={initRaward} className="border-r">
      Add <Star class="ml-2 h-4 w-4" />
    </Edit>
    <Edit reward={initRaward} mode="use">
      Use <Use class="ml-2 h-4 w-4" />
    </Edit>
  </div>
</div>
