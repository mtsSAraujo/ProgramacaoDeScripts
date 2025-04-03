export default function HistoryIcon({ onClick }) {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: 12,
                left: 16,
                fontSize: 20,
                cursor: 'pointer',
                color: '#ccc',
                background: 'transparent',
                padding: '4px 6px',
                borderRadius: '6px',
                transition: 'background 0.2s',
            }}
            title="Histórico"
            onClick={onClick}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#444')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
            🕒
        </div>
    );
}
