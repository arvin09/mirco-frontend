import type { ReactNode } from 'react';

export type ToDoProps = {
  children?: ReactNode;
};

export function ToDo({ children }: ToDoProps) {
  return (
    <div>
      {children}
    </div>
  );
}
