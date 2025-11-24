function handleChange(setState) {
  return (e) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
}

export { handleChange };
