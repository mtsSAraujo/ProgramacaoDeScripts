import { useState } from "react";

export default function useGameManager() {
  const initialHero = { life: 100, name: "Frisk", baseAttack: 5 };
  const initialVillain = { life: 100, name: "Sans", intimacy: 0, baseAttack: 10 };
  const initialInventory = [
        { name: "Butterscotch Pie", heal: 40, quantity: 2 },
        { name: "Spider Donut", heal: 25, quantity: 2 },
        { name: "Nice Cream", heal: 30, quantity: 3 }
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

      if (prev.intimacy < 200 && newIntimacy >= 200) {
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
            effect: () => modifyIntimacy(25)
          },
          { text: "Sans corou levemente."}
        ];
        break;

      case "provocar":
        messages = [
          { text: "😤 Frisk provocou Sans com sarcasmo. Seu ataque aumenta drasticamente!",
            effect: () => {
              modifyIntimacy(-20);
              hero.baseAttack =  hero.baseAttack + 5;
            }
          },
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
          { text: "Sans sofreu " + (hero.baseAttack + 5) + " de dano!", effect: () => {
              modifyLife("villain", -(hero.baseAttack + 5));
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
    const attackType = Math.floor(Math.random() * 5) + 1;  // sorteio de 1 a 5
    let messages = [];

    switch (attackType) {
      case 1:
        messages = [
          { text: "💀 Sans invoca ossos mágicos do chão..." },
          { text: "Frisk tropeça e perde " + (villain.baseAttack + 5) + " HP!", effect: () => modifyLife("hero", -(villain.baseAttack + 5)) }
        ];
        break;

      case 2:
        messages = [
          { text: "🔥 Sans lança uma rajada de Gaster Blasters!" },
          { text: "Frisk levou um grande dano! (" + (villain.baseAttack + 8) + " HP)", effect: () => modifyLife("hero", -(villain.baseAttack + 8)) }
        ];
        break;

      case 3:
        messages = [
          { text: "🌀 Sans distorce o espaço ao redor..." },
          { text: "Frisk ficou tonto e perdeu " + (villain.baseAttack + 3) + " HP!", effect: () => modifyLife("hero", -(villain.baseAttack + 3)) }
        ];
        break;

      case 4:
        messages = [
          { text: "😈 Sans ri com sarcasmo." },
          { text: "Frisk se assusta com tamanha ousadia!", effect: () => modifyLife("hero", -5) }
        ];
        break;

      default:
        messages = [
          { text: "Sans está indeciso..." },
          { text: "Mas resolve comer um pouco." },
          { text: "🍰 Sans tomou o elixir dos herois! Seu ataque aumentou!", effect: () => {
              villain.life = villain.life+20 < 100 ? villain.life + 20 : 100;
              villain.baseAttack = villain.baseAttack + 5 >= 25 ? 25 : villain.baseAttack + 5;
            }
          }
        ];
    }

    messages.push({
      text: "O que Frisk vai fazer?",
      effect: () => {
        setActionLocked(false);
        setIsHeroTurn(true);
      }
    });

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
