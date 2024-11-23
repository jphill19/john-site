import React from 'react';

export const ContextBridge = ({ children, contexts }) => {
  const values = contexts.map((Context) => ({
    Context,
    value: React.useContext(Context),
  }));

  return values.reduceRight((acc, { Context, value }) => {
    return <Context.Provider value={value}>{acc}</Context.Provider>;
  }, children);
};