"use client";

import { useEffect, useState } from "react";
import Ping from "@/components/Ping";
import { formatNumber } from "@/lib/utils";

const View = ({ id }: { id: string }) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    // Increment views and fetch the updated count
    fetch(`/api/views?id=${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch((err) => console.error("Failed to update views:", err));
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">
          {views !== null ? formatNumber(views) : "…"}
        </span>{" "}
        views
      </p>
    </div>
  );
};

export default View;
