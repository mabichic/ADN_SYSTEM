import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layers from '../component/Layers';
import dynamic from 'next/dynamic';
import Bottom from '../component/Bottom';
const HdMap = dynamic(() => import('../component/HdMap'), { ssr: false });

function Home() {
  return (
    <HdMap zoom={10} center={[234075, 419607]}>
      <Layers>
      </Layers>
    </HdMap>
  );
};

export default Home;
