import { createContext, useContext } from 'react';

const {{pascalCase}} = createContext();

export function A({ children }) {
	return <{{pascalCase}}.Provider>{children}</{{pascalCase}}.Provider>;
}

export function useB() {
	const context = useContext({{pascalCase}});

	if (context !== undefined && context) return context;
}
