"use client";

import Image from "next/image";

function ImageComponent({ url, alt }: { url: string, alt: string }) {
  return (
    <Image
      src={url}
      alt={alt}
      width={300}
      height={300}
    />
  )
}

export default ImageComponent;