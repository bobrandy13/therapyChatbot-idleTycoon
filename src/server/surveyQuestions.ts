"use server";
import words from "./words";

const random_word = (array: string[]): string => {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  if (!randomElement) return " ";
  return randomElement;
};

export default async function fetchQuestions() {
  const word = random_word(words);

  console.log("What are you opinions on ", word);

  return word;
}
