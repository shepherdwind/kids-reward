<script lang="ts">
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from ".";
  import { cn } from "$lib/utils";

  type $$Props = CalendarPrimitive.Props & {
    data: Record<string, { score: number; used: number }>;
  };
  type $$Events = CalendarPrimitive.Events;

  export let value: $$Props["value"] = undefined;
  export let placeholder: $$Props["placeholder"] = undefined;
  export let weekdayFormat: $$Props["weekdayFormat"] = "short";
  export let data: Record<string, { score: number; used: number }> = {};

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<CalendarPrimitive.Root
  bind:value
  bind:placeholder
  {weekdayFormat}
  class={cn("p-3", className)}
  {...$$restProps}
  on:keydown
  let:months
  let:weekdays
>
  <Calendar.Header>
    <Calendar.PrevButton />
    <Calendar.Heading />
    <Calendar.NextButton />
  </Calendar.Header>
  <Calendar.Months>
    {#each months as month}
      <Calendar.Grid>
        <Calendar.GridHead>
          <Calendar.GridRow>
            {#each weekdays as weekday}
              <Calendar.HeadCell>
                {weekday.slice(0, 2)}
              </Calendar.HeadCell>
            {/each}
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody>
          {#each month.weeks as weekDates}
            <Calendar.GridRow class="mt-2 w-full">
              {#each weekDates as date}
                <Calendar.Cell {date}>
                  <Calendar.Day
                    {date}
                    month={month.value}
                    data={data[date.day] || { score: 0, used: 0 }}
                  />
                </Calendar.Cell>
              {/each}
            </Calendar.GridRow>
          {/each}
        </Calendar.GridBody>
      </Calendar.Grid>
    {/each}
  </Calendar.Months>
</CalendarPrimitive.Root>
