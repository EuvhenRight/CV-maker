"use client";

import * as React from "react";
import { Camera, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCVStore } from "@/lib/store";
import { useT } from "@/lib/i18n";

const MAX_DIM = 480;

async function fileToResizedDataUrl(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = dataUrl;
  });
  const ratio = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
  const w = Math.round(img.width * ratio);
  const h = Math.round(img.height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.85);
}

export function PhotoUpload() {
  const photo = useCVStore((s) => s.cv.personal.photo);
  const update = useCVStore((s) => s.updatePersonal);
  const t = useT();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const data = await fileToResizedDataUrl(file);
      update({ photo: data });
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#e8e6df] bg-[#F8F8F8]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={t("personal.photo.alt")}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#bfbfbf]">
            <User className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFile}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          <Camera className="h-3.5 w-3.5" />
          {busy
            ? t("personal.photo.uploading")
            : photo
              ? t("personal.photo.replace")
              : t("personal.photo.upload")}
        </Button>
        {photo && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => update({ photo: "" })}
            className="text-[#6b6b6b]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t("personal.photo.remove")}
          </Button>
        )}
        <span className="text-[11px] text-[#9a9a9a]">
          {t("personal.photo.help")}
        </span>
      </div>
    </div>
  );
}
