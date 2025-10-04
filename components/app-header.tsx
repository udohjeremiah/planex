import ModeToggle from "./mode-toggle";

export default function AppHeader() {
  return (
    <header className="flex shrink-0 gap-2 border-b px-4 py-2">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
        <h1 className="text-lg font-medium">Planex</h1>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
