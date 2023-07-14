export function hey(name: string) {
  const greeting = "hello,";

  if (!name) throw new Error("name is required");

  return `${greeting} ${name}`;
}

export function bye(name: string) {
  const greeting = "bye,";

  if (!name) throw new Error("name is required");

  return `${greeting} ${name}`;
}
