'use client'

import Character from "./components/Character"
import gameManager from "./hooks/gameManager"

export default function Home() {

    const {hero, villain, handleHeroAction, heroTurn} = gameManager()

    return (
      <div>
        <h1>Game Heroes and Villains</h1>
        <Character data={hero} isHero onAction={handleHeroAction} isHeroTurn={heroTurn}></Character>
        <Character data={villain} isHero={false}></Character>
      </div>
    )

}