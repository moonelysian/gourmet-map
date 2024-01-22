import { useState } from "react";
import Layout from "./components/Layout";
import Map from "./components/Map";
import Markers from "./components/Markers";
import StoreBox from "./components/StoreBox";

import * as stores from "@/data/store_data.json";

export default function Home() {
  const [map, setMap] = useState();
  const [currentStore, setCurrentStore] = useState();
  const storeDatas = stores["DATA"];

  return (
    <Layout>
      <Map setMap={setMap} />
      <Markers
        map={map}
        storeDatas={storeDatas}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </Layout>
  );
}
