// lib/supabase-image.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type ImageSize = "thumbnail" | "medium" | "full";

const SIZE_MAP: Record<ImageSize, { width: number; quality: number }> = {
  thumbnail: { width: 200, quality: 60 },
  medium:    { width: 800, quality: 75 },
  full:      { width: 1920, quality: 85 },
};

export const getImageUrl = (
  bucket: string,
  path: string,
  size: ImageSize = "medium"
) => {
  const { width, quality } = SIZE_MAP[size];

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path, {
      transform: { width, quality, format: "origin" },
    });

  return data.publicUrl;
};