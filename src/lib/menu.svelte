<script>
  import { Menu } from "lucide-svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Menu />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Hi, xxx</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Login out</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
