export default function Character({ data, alignment }) {
    const lifePercent = `${Math.max(0, data.life)}%`;
  
    return (
      <div className={`character ${alignment}`}>
          <div className="sprite">
              <img
                  src={`/sprites/${data.name.toLowerCase()}.gif`}
                  alt={data.name}
                  className="character-image"
              />
          </div>
        <div className="life-bar">
          <div className="life-fill" style={{ width: lifePercent }}></div>
        </div>
          <div className="life-text">{data.life} HP</div>
      </div>
    );
  }
  