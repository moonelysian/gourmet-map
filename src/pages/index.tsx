import { useState } from "react";
import Map from "./components/Map";
import Markers from "./components/Markers";
import StoreBox from "./components/StoreBox";
import { StoreType } from "@/interface";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState();
  const [currentStore, setCurrentStore] = useState();

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        map={map}
        storeDatas={stores}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: {
      stores,
    },
    revalidate: 60 * 60,
  };
}
