import React from "react";
import Link from "next/link";

const Pokemon = () => {
  return (
    <div>
      We're pokemons
      <ul >here are our profiles :</ul>
      <li><Link href="pokemons/1">Dio Brando</Link></li>
      <li><Link href="pokemons/2">Funny Valentine</Link></li>
      <li><Link href="pokemons/3">Johnny Joestar</Link></li>
    </div>
  );
};

export default Pokemon;
