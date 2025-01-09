import { Button } from "@/components/ui/Button";

export function FilterBar() {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center gap-2">
        <Button variant="ghost" size="default">
          General
        </Button>
        <Button variant="ghost" size="default">
          Anime
        </Button>
        <Button variant="ghost" size="default">
          People
        </Button>
        <Button variant="ghost" size="default">
          AI Art
        </Button>
        <Button variant="ghost" size="default">
          SFW
        </Button>
        <Button variant="ghost" size="default">
          Sketchy
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="default">
            Resolution
          </Button>
          <Button variant="outline" size="default">
            Ratio
          </Button>
          <Button variant="outline" size="default">
            Color
          </Button>
          <Button variant="outline" size="default">
            Random
          </Button>
        </div>
      </div>
    </div>
  );
}
