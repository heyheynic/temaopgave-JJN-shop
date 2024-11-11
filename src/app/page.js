import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  return <div className="h-screen grid place-content-center bg-teal-300">
    <h1 className="text-4xl font-bold font-sans">Greatest online shopping experience!</h1>
    <Link href={`./products/`}>
    <PrimaryButton btnText="Go to products"/>
    </Link>
  </div>;
}
