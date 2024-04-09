<script lang="ts">
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import { buttonVariants } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";

  type $$Props = CalendarPrimitive.DayProps & {
    data: { score: number; used: number };
  };
  type $$Events = CalendarPrimitive.DayEvents;

  export let date: $$Props["date"];
  export let month: $$Props["month"];
  export let data: $$Props["data"] = { score: 0, used: 0 };
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<CalendarPrimitive.Day
  on:click
  {date}
  {month}
  class={cn(
    buttonVariants({ variant: "ghost" }),
    "h-8 w-full p-0 font-normal",
    // Today
    "",
    // Selected
    // "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground",
    "[&[data-today]]:font-bold [&[data-today]:not([data-selected])]:text-accent-foreground",
    // Disabled
    "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
    // Unavailable
    "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
    // Outside months
    "data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30",
    className,
  )}
  {...$$restProps}
  let:selected
  let:disabled
  let:unavailable
  let:builder
>
  <slot {selected} {disabled} {unavailable} {builder}>
    {#if data?.score > 0 && !disabled}
      <span class="absolute top-0 right-1 text-xs text-green-500"
        >+{data.score}</span
      >
    {/if}
    {date?.day}
    {#if data?.used > 0 && !disabled}
      <span
        class={`absolute ${
          data.score > 0 ? "bottom-0 left-1" : "top-0 right-1"
        } text-xs text-red-500`}>-{data.used}</span
      >
    {/if}
  </slot>
</CalendarPrimitive.Day>
