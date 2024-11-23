import {useContext} from "react"

export const ContextBridge = ({ contexts, children }) => {
  const values = contexts.map((context) => useContext(context));

  return values.reduceRight((acc, value, index) => {
    const Context = contexts[index];
    return <Context.Provider value={value}>{acc}</Context.Provider>;
  }, children);
};