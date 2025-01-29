"use client";

import { useCategories } from "@/contexts/CategoriesContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export default function TopCategories() {
  const { topCategories, getTopCategories } = useCategories();

  useIsomorphicLayoutEffect(() => {
    if (topCategories.length === 0) {
      getTopCategories();
    }

    const intervalId = setInterval(() => {
      getTopCategories();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className="w-full p-5 rounded-md flex flex-col gap-4 dark:bg-gray-800 bg-white">
      <h3 className="font-bold text-lg dark:text-white text-black">Top Categories</h3>
      <ul className="flex flex-col gap-4">
        {topCategories?.map((category, index) => (
          <li key={category.name + index} className="flex justify-between">
            <h3 className="font-semibold dark:text-white text-black">{category.name}</h3>
            <p className="text-sm dark:text-white text-black">{category._count.wallpapers} wallpapers</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
