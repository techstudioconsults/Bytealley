"use client";

import Link from "next/link";

import { useSession } from "~/hooks/use-session";

const Funnel = () => {
  const { user } = useSession();
  return <Link href={`/dashboard/${user?.id}/funnels/editor`}>Editor</Link>;
};

export default Funnel;
