'use client'

import { Hero } from "@/components/hero";
import { Leva } from "leva";
import { Header } from "@/components/header";


export default function Home() {
  return (
    <>
            <Header />

      <Hero />
      <Leva hidden />
    </>
  );
}
