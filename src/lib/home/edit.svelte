<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { toast } from "svelte-sonner";
  import type { Reward } from "$database/type";
  import { formatDate } from "../utils";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  import { goto } from "$app/navigation";

  export let mode: "add" | "use" | "delete" = "add";
  export let className = "";
  export let reward: Partial<Reward>;

  let score = reward.score || 1;
  let loading = false;
  const isAdd = mode === "add";
  let reason = reward.reason || isAdd ? "Eating well" : "";
  let date = formatDate(reward.date || new Date());
  let password = "";
  let open = false;

  const handleSubmit = () => {
    loading = true;
    fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: reward.user_id,
        score: isAdd ? +score : -score,
        password,
        reason,
        date,
        mode: mode === "delete" ? "delete" : "add",
        id: reward.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(`Score ${mode} successfully`);
          open = false;
          goto(window.location.href, { replaceState: true });
        } else {
          toast.error(res.error);
        }
      })
      .finally(() => {
        loading = false;
      });
  };
  const upFirst = (str: string) => {
    if (!str[0]) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
</script>

<Dialog.Root {open}>
  <Dialog.Trigger
    class={buttonVariants({
      variant: "outline",
      class: className,
      size: mode === "delete" ? "icon" : "default",
    })}
    on:click={() => (open = true)}
  >
    <slot />
  </Dialog.Trigger>
  <Dialog.Content class="mx-auto w-5/6">
    <Dialog.Header>
      <Dialog.Title>{upFirst(mode)} Stars</Dialog.Title>
    </Dialog.Header>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="score" class="text-right">Stars</Label>
          <Input
            id="score"
            name="score"
            bind:value={score}
            class="col-span-3"
            type="number"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="reason" class="text-right">Reason</Label>
          <Input
            id="reason"
            name="reason"
            bind:value={reason}
            class="col-span-3"
            placeholder="Please input"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="date" class="text-right">Date</Label>
          <Input
            id="date"
            name="date"
            class="col-span-3"
            type="date"
            bind:value={date}
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="password" class="text-right">Password</Label>
          <Input
            id="password"
            name="password"
            bind:value={password}
            class="col-span-3"
            type="password"
          />
        </div>
        <Dialog.Footer class="items-end">
          <Button
            type="submit"
            disabled={loading}
            class="w-1/3"
            variant="outline"
          >
            {#if loading}
              <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
            {/if}
            Save
          </Button>
        </Dialog.Footer>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>
