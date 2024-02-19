import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ProfileForm } from "./post/signin";

export default function Home() {
  return (
    <div className="container p-10">
      <ProfileForm />
    </div>
  );
}
