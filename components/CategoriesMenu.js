import { categories } from "@/app/globals";
import Link from "next/link";

const CategoriesMenu = () => {
  return (
    <ul className="flex gap-2">
      {categories.map((c) => (
        <Link href={c.route}>
          <li className="border px-3 py-1 rounded bg-cyan-300">{c.name}</li>
        </Link>
      ))}
    </ul>
  );
};

export default CategoriesMenu;
