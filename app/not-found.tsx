import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <div className="container text-center">
        <div className="mb-4 font-mono text-xs text-accent">404</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-balance leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8">
          <Button variant="accent" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
