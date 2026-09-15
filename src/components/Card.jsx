function Card({ title, value }) {
  return (
    <div className="card">
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

export default Card;