import CardPanel from "@/components/CardPanel";
import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
export default function Venue() {
  const venues =  getVenues();
  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium"> Select Your Travel Partner</h1>
      <Suspense fallback={<p> Loading... <LinearProgress /></p>}>
        <VenueCatalog venuesJson={venues} />
      </Suspense>
      
      <hr className="my-10"/>
      <h1> Trying.... </h1>
      <CardPanel/>

    </main>
  );
}
