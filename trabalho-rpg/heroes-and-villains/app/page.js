'use client';

import Character from './components/Character';
import gameManager from './hooks/gameManager';

export default function Home() {
  const {
    hero,
    villain,
    isHeroTurn,
    showItemMenu,
    inventory,
    setInventory,
    handleAction,
    handleItemUse,
    resetGame,
    currentDialogue,
    advanceDialogue,
    actionLocked,
    isItemMenuOpen,
    setIsItemMenuOpen
  } = gameManager();

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
          if (!isItemMenuOpen) advanceDialogue();
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
                {item.name}
              </div>
            ))}
            <div className="item-option cancel" onClick={() => setIsItemMenuOpen(false)}>
              Cancelar
            </div>
          </div>
        ) : (
          <>
            <span className="dialogue-text">{currentDialogue}</span>
            {actionLocked && <span className="dialogue-arrow">▼</span>}
          </>
        )}
      </div>



      {/* Menu com ações ou submenu */}
      <div className="menu">
        {showItemMenu ? (
          <div className="submenu">
            {inventory.map((item, index) => (
              <button key={index} onClick={() => handleItemUse(item)}>
                {item.name}
              </button>
            ))}
            <button onClick={() => handleAction("cancel")}>Cancelar</button>
          </div>
        ) : (
          <>
            <button className="action-button" disabled={!isHeroTurn || actionLocked} onClick={() => handleAction("fight")}><span className="icon"></span> FIGHT</button>
            <button className="action-button" disabled={!isHeroTurn || actionLocked} onClick={() => handleAction("act")}><span className="icon"></span> ACT</button>
            <button className="action-button" disabled={!isHeroTurn || actionLocked} onClick={() => handleAction("item")}><span className="icon"></span> ITEM</button>
            <button className="action-button" disabled={!isHeroTurn || actionLocked} onClick={() => handleAction("mercy")}><span className="icon"></span> MERCY</button>
          </>
        )}
      </div>

      <button className="reset-button" onClick={resetGame}>🔁 Reiniciar</button>
    </div>
  );
}
