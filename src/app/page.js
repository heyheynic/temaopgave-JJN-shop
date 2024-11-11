import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  return <div>
    <Link href={`./products/page.jsx`}>
    <PrimaryButton />
    </Link>
  </div>;
}
