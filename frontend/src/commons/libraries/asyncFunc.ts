import type { ChangeEvent, FormEvent } from "react";
export const wrapAsync =
  <E>(func: (e: E) => Promise<void>) => (e: E) => {
      void func(e);
    };


export const wrapFormAsync =
  (func: () => Promise<void>) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    void func();
  };
