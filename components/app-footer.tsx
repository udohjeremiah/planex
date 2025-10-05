export default function AppFooter() {
  return (
    <footer>
      <p className="text-muted-foreground w-full p-4 text-center text-xs leading-loose sm:text-sm">
        Built by{" "}
        <a
          href="https://www.spaceappschallenge.org/2025/find-a-team/silicon-benin"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Silicon Benin
        </a>
        . The source code is available on{" "}
        <a
          href="https://github.com/udohjeremiah/planex"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
