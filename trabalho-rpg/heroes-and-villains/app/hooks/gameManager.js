import { useState } from "react";

export default function useGameManager() {
  const initialHero = { life: 100, name: "Frisk" };
  const initialVillain = { life: 100, name: "Sans", intimacy: 0 };
  const initialInventory = [
        { name: "Butterscotch Pie", heal: 30, quantity: 1 },
        { name: "Spider Donut", heal: 15, quantity: 2 },
        { name: "Nice Cream", heal: 20, quantity: 3 }
  ];


  const [hero, setHero] = useState(initialHero);
  const [villain, setVillain] = useState(initialVillain);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [showItemMenu, setShowItemMenu] = useState(false);
  const [dialogueQueue, setDialogueQueue] = useState([]);
  const [currentDialogue, setCurrentDialogue] = useState("O que Frisk vai fazer?");
  const [actionLocked, setActionLocked] = useState(false);
  const [pendingVillainTurn, setPendingVillainTurn] = useState(false);
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);
  const [isActMenuOpen, setIsActMenuOpen] = useState(false);
  const [inventory, setInventory] = useState(initialInventory);

  const canSpare = villain.intimacy >= 100;

  const [isGameOver, setIsGameOver] = useState(false);

  const endGame = (message) => {
    setIsGameOver(true);
    queueDialogue({ text: message });
  };

  const queueDialogue = (messages, triggerVillain = false) => {
    const list = Array.isArray(messages) ? messages : [messages];
    if (list.length === 0) return;

    const [first, ...rest] = list;

    setActionLocked(true);
    setPendingVillainTurn(triggerVillain);

    // Atualiza fila e diálogo em conjunto
    setDialogueQueue(() => {
      setCurrentDialogue(first.text);
      if (first.effect) first.effect();
      return rest;
    });
  };

  const advanceDialogue = () => {
    if (dialogueQueue.length > 0) {
      const [next, ...rest] = dialogueQueue;
      if (next.effect) next.effect();
      setCurrentDialogue(next.text);
      setDialogueQueue(rest);
    } else {
        if (pendingVillainTurn) {
          setPendingVillainTurn(false);
          triggerVillainTurn();
        } else {
          setCurrentDialogue("O que Frisk vai fazer?");
          setActionLocked(false);
        }
      }
  };

  const modifyIntimacy = (amount) => {
    setVillain(prev => {
      const newIntimacy = Math.min(100, Math.max(0, prev.intimacy + amount));
      const updated = { ...prev, intimacy: newIntimacy };

      if (prev.intimacy < 100 && newIntimacy >= 100) {
        setDialogueQueue([]);
        setActionLocked(false);
        setIsHeroTurn(true);
        queueDialogue({ text: "❗ Você se sente cheio de determinação!" });
      }

      return updated;
    });
  };

  const modifyLife = (target, amount) => {
    const setter = target === "hero" ? setHero : setVillain;

    setter(prev => {
      const updatedLife = Math.max(0, Math.min(100, prev.life + amount));
      const updated = { ...prev, life: updatedLife };

      if (updatedLife <= 0 && !isGameOver) {
        if (target === "hero") {
          endGame("💀 Frisk caiu em batalha... Fim de jogo.");
        } else {
          endGame("🏆 Sans foi derrotado. Vitória por combate!");
        }
      }

      return updated;
    });
  };

  const handleItemUse = (item) => {
    if (!isHeroTurn || actionLocked) return;

    if (item.quantity <= 0) return;

    setInventory(prev =>
        prev.map(i =>
          i.name === item.name
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ).filter(i => i.quantity > 0) // remove itens com quantidade 0
      );
  
    const messages = [
      { text: `🍰 Frisk usou ${item.name}.` },
      { text: `Recuperou ${item.heal} HP!`, effect: () => modifyLife("hero", item.heal) }
    ];

    setIsItemMenuOpen(false);           // fecha o menu imediatamente
    queueDialogue(messages, true);     // adiciona mensagens na fila
    setIsHeroTurn(false);              // fim do turno do herói
  };

  const handleActOption = (option) => {
    if (!isHeroTurn || actionLocked) return;

    let messages = [];

    switch (option) {
      case "elogiar":
        messages = [
          { text: "💬 Frisk elogiou Sans sinceramente.",
            effect: () => modifyIntimacy(125)
          },
          { text: "Sans corou levemente."}
        ];
        break;

      case "provocar":
        messages = [
          { text: "😤 Frisk provocou Sans com sarcasmo.",
            effect: () => modifyIntimacy(-20)},
          {
            text: "Sans pareceu irritado."
          }
        ];
        break;

      case "dancar":
        messages = [
          { text: "💃 Frisk começou a dançar animadamente.",
            effect: () => modifyIntimacy(15)
          },
          {
            text: "Sans riu sem querer."
          }
        ];
        break;

      case "piada":
        messages = [
          { text: "😂 Frisk contou uma piada ruim.",
            effect: () => modifyIntimacy(12)
          },
          {
            text: "Sans deixou escapar um sorriso de canto."
          }
        ];
        break;

      default:
        return;
    }

    setIsActMenuOpen(false);
    queueDialogue(messages, true);
    setIsHeroTurn(false);
  };

  const handleAction = (type) => {
    if (!isHeroTurn || actionLocked) return;

    if (type === "cancel") {
      setIsItemMenuOpen(false);
      setIsActMenuOpen(false)
      return;
    }

    if (type === "item") {
      setIsItemMenuOpen(true);
      return;
    }

    if (type === "act") {
      setIsActMenuOpen(true);
      return;
    }

    let messages = [];

    switch (type) {
      case "fight":
        messages = [
          { text: "🗡️ Frisk avança com determinação..." },
          { text: "Sans sofreu 15 de dano!", effect: () => {
              modifyLife("villain", -15);
              modifyIntimacy(-20);
            }
          }
        ];
        break;

      case "mercy":
        if (villain.intimacy >= 100) {
          messages = [{ text: "✨ Você poupou Sans. Vitória pacifista!", effect: () => endGame("✨ Vitória pacifista conquistada! Fim de jogo.") }];
        } else {
          messages = [{ text: "⚠️ Sans não está pronto para ser poupado." }];
        }
        break;

      default:
        return;
    }

    queueDialogue(messages, true);
    setIsHeroTurn(false);
  };

  const triggerVillainTurn = () => {
    const messages = [
      { text: "💀 Sans prepara um ataque sombrio..." },
      {
        text: "Frisk perdeu 12 HP!",
        effect: () => modifyLife("hero", -12)
      },
      {
        text: "O que Frisk vai fazer?",
        effect: () => {
          setActionLocked(false);
          setIsHeroTurn(true);
        }
      }
    ];
    queueDialogue(messages, false);
  };

  const resetGame = () => {
    setHero(initialHero);
    setVillain(initialVillain);
    setCurrentDialogue("O que Frisk vai fazer?");
    setDialogueQueue([]);
    setInventory(initialInventory);
    setIsHeroTurn(true);
    setShowItemMenu(false);
    setActionLocked(false);
    setPendingVillainTurn(false);
    setIsItemMenuOpen(false);
    setIsActMenuOpen(false);
    setIsGameOver(false);
  };

  return {
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
  };  
}
