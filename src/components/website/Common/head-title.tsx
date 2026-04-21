import React from "react";

export default function HeaderTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <h2 className="text-4xl md:text-5xl text-center font-bold text-primary-foreground tracking-tight leading-tight ">
        {title}
      </h2>
      <p className="text-center text-primary-foreground">{description}</p>
    </>
  );
}
