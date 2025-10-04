import Link from "next/link";

export default function AppFooter() {
  return (
    <footer>
      <p className="text-muted-foreground w-full px-4 text-center text-xs leading-loose sm:text-sm">
        Built by{" "}
        <Link
          href="#"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Silicon Benin
        </Link>
        . The source code is available on
        <Link
          href="https://github.com/udohjeremiah/planex"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
}
