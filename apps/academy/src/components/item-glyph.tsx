import type { SortItem, Stream } from "@/lib/academy/types";
import { cn } from "@/lib/utils";
import {
  Apple,
  Battery,
  Box,
  Cable,
  CupSoda,
  Cylinder,
  Lightbulb,
  Milk,
  Monitor,
  Newspaper,
  PaintBucket,
  Shirt,
  ShoppingBag,
  TreePine,
  Wine,
} from "lucide-react";

const FILL: Record<Stream, string> = {
  recycle: "bg-bin-recycle/15 text-bin-recycle",
  compost: "bg-bin-compost/15 text-bin-compost",
  trash: "bg-bin-trash/10 text-bin-trash",
  special: "bg-bin-special/15 text-bin-special",
};

export function ItemGlyph({
  item,
  reveal,
  size = "md",
}: {
  item: SortItem;
  reveal?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "sm" ? "size-10" : size === "lg" ? "size-20" : "size-14";
  return (
    <span
      className={cn(
        "inline-grid place-items-center rounded-md",
        dim,
        reveal ? FILL[item.stream] : "bg-muted text-asphalt-soft",
      )}
      aria-hidden
    >
      {mark(item.icon, size)}
    </span>
  );
}

function mark(icon: SortItem["icon"], size: "sm" | "md" | "lg") {
  const cls = size === "lg" ? "size-9" : size === "sm" ? "size-5" : "size-6";
  const props = { className: cls, strokeWidth: 1.75 };
  switch (icon) {
    case "can":
      return <Cylinder {...props} />;
    case "bottle":
      return <Wine {...props} />;
    case "paper":
      return <Newspaper {...props} />;
    case "food":
      return <Apple {...props} />;
    case "bag":
      return <ShoppingBag {...props} />;
    case "battery":
      return <Battery {...props} />;
    case "wood":
      return <TreePine {...props} />;
    case "foam":
      return <Box {...props} />;
    case "glass":
      return <Wine {...props} />;
    case "device":
      return <Monitor {...props} />;
    case "textile":
      return <Shirt {...props} />;
    case "bulb":
      return <Lightbulb {...props} />;
    case "paint":
      return <PaintBucket {...props} />;
    case "tangler":
      return <Cable {...props} />;
    case "carton":
      return <Milk {...props} />;
    case "cup":
      return <CupSoda {...props} />;
    default:
      return <Box {...props} />;
  }
}
