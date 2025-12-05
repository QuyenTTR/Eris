function handleChange(setState) {
  return (e, fieldName) => {
    if (fieldName) {
      setState((prev) => ({
        ...prev,
        [fieldName]: e,
      }));
      return;
    }

    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
}

export { handleChange };
