import Calculator from ".//components/Calculator";

export default function Home() {
  return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#e0e0e0'
      }}>
        <Calculator />
      </div>
  );
}
