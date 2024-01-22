"use server";
import words from "./words";

const random_word = (array: string[]): string => {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  if (!randomElement) {
    console.log("reroll ig");
    return "";
  }
  return randomElement;
};

export default async function fetchQuestions() {
  const word = random_word(words);
  return word;
}
