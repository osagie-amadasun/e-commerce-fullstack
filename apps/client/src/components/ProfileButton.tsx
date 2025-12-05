"use client";

import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileButton() {
    const router = useRouter();

  return (
    <div className="">
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="See orders"
            labelIcon={<ShoppingBag width={15} height={15}/>}
            onClick={() => router.push("/orders")}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}
