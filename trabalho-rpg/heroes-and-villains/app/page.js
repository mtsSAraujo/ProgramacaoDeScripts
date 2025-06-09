'use client';

import Character from './components/Character';
import useGameManager from "./hooks/gameManager";

export default function Home() {
    const {
        hero,
        villain,
        isHeroTurn,
        inventory,
        setInventory,
        handleAction,
        handleItemUse,
        handleActOption,
        resetGame,
        currentDialogue,
        advanceDialogue,
        actionLocked,
        isItemMenuOpen,
        setIsItemMenuOpen,
        isActMenuOpen,
        setIsActMenuOpen,
        isGameOver,
        canSpare
    } = useGameManager();

  return (
    <div className="battle-screen">
      {/* Personagens lado a lado */}
      <div className="characters">
        <Character data={villain} alignment="left" />
        <Character data={hero} alignment="right" />
      </div>

      <div
          className="dialogue-box"
          onClick={() => {
            if (!isItemMenuOpen && !isGameOver && !isActMenuOpen) advanceDialogue()
        }}
          style={{ cursor: actionLocked || isItemMenuOpen ? "pointer" : "default", position: "relative" }}
      >
        {isItemMenuOpen ? (
          <div className="item-menu">
            {inventory.map((item, index) => (
              <div
                key={index}
                className="item-option"
                onClick={() => handleItemUse(item)}
              >
                {item.name} ({item.quantity})
              </div>
            ))}
            <div className="item-option cancel" onClick={() => setIsItemMenuOpen(false)}>Cancelar</div>
          </div>
        ) : isActMenuOpen ? (
            <div className="item-menu">
                <div className="item-option" onClick={() => handleActOption("elogiar")}>Elogiar</div>
                <div className="item-option" onClick={() => handleActOption("dancar")}>Dançar</div>
                <div className="item-option" onClick={() => handleActOption("piada")}>Contar piada</div>
                <div className="item-option" onClick={() => handleActOption("provocar")}>Provocar</div>
                <div className="item-option cancel" onClick={() => handleAction("cancel")}>Cancelar</div>
            </div>
        ) : (
            <>
                <span className="dialogue-text">{currentDialogue}</span>
                {(actionLocked || currentDialogue !== "O que Frisk vai fazer?") && <span className="dialogue-arrow">▼</span>}
            </>
        )}
      </div>

      <div className="menu">
        {(
          <>
              <button className="action-button" disabled={!isHeroTurn || actionLocked || isGameOver} onClick={() => handleAction("fight")}><span className="icon"></span> FIGHT</button>
              <button className="action-button" disabled={!isHeroTurn || actionLocked || isGameOver}  onClick={() => handleAction("act")}><span className="icon"></span> ACT</button>
              <button className="action-button" disabled={!isHeroTurn || actionLocked || isGameOver}  onClick={() => handleAction("item")}><span className="icon"></span> ITEM</button>
              <button
                  className={`action-button ${canSpare ? 'mercy-available' : ''}`}
                  disabled={!isHeroTurn || actionLocked || isGameOver}
                  onClick={() => handleAction("mercy")}
              >
                  <span className="icon"></span> MERCY
              </button>
          </>
        )}
      </div>

      <button className="reset-button" onClick={resetGame}>🔁 Reiniciar</button>
    </div>
  );
}
