function Header({ title, CreateButton }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <CreateButton />
    </div>
  );
}

export default Header;
