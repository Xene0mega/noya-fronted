// src/lib/navigate.ts
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
export const navigate = (to: string) => history.push(to);
