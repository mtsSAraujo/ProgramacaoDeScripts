import { useState } from "react";

export default function gameManager() {
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

  const [inventory, setInventory] = useState(initialInventory);

  const queueDialogue = (messages, triggerVillain = false) => {
    const list = Array.isArray(messages) ? messages : [messages];
    setDialogueQueue(prev => [...prev, ...list]);
    setActionLocked(true);

    if (currentDialogue === "O que Frisk vai fazer?" && list[0]) {
      // Mostra a primeira mensagem imediatamente (sem clique inicial)
      const [first, ...rest] = list;
      setCurrentDialogue(first.text);
      if (first.effect) first.effect();
      setDialogueQueue(rest);
    }

    if (triggerVillain) {
      setPendingVillainTurn(true);
    }
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

  const modifyLife = (target, amount) => {
    const setter = target === "hero" ? setHero : setVillain;
    setter(prev => ({
      ...prev,
      life: Math.max(0, Math.min(100, prev.life + amount))
    }));
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

  const handleAction = (type) => {
    if (!isHeroTurn || actionLocked) return;

    if (type === "cancel") {
        setIsItemMenuOpen(false);
        return;
    }

    if (type === "item") {
        setIsItemMenuOpen(true);
        return;
    }

    let messages = [];

    switch (type) {
      case "fight":
        messages = [
          { text: "🗡️ Frisk avança com determinação..." },
          { text: "Sans sofreu 15 de dano!", effect: () => modifyLife("villain", -15) }
        ];
        break;

      case "act":
        messages = [
          { text: "😐 Frisk fez uma careta engraçada." },
          { text: "Sans pareceu levemente divertido." }
        ];
        break;

      case "mercy":
        if (villain.intimacy >= 100) {
          messages = [{ text: "✨ Você poupou Sans. Vitória pacifista!" }];
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
  };

  return {
    hero,
    villain,
    isHeroTurn,
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
  };  
}
