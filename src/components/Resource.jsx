function Resource({ title, children }) {
  return (
    <section>
      <div className="section-head">
        <h1>{title}</h1>
      </div>

      {children}
    </section>
  );
}

export default Resource;