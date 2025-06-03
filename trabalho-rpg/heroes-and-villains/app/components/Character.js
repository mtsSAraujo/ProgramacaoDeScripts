export default function Character({ data, alignment }) {
    const lifePercent = `${Math.max(0, data.life)}%`;
  
    return (
      <div className={`character ${alignment}`}>
        <div className="sprite">🎮 {data.name}</div>
        <div className="life-bar">
          <div className="life-fill" style={{ width: lifePercent }}></div>
          <div className="life-text">{data.life} HP</div>
        </div>
      </div>
    );
  }
  