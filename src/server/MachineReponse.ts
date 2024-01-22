interface QuoteReponse {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

function get_random(list: string[]): string | undefined {
  return list[Math.floor(Math.random() * list.length)];
}

const possible_response = [
  "did you order a yappacino?",
  "stop yapping your fine",
  "yaawwwnn hmm? whatd you say?",
  "unluggy bruh back in my day we didnt have any of these problems",
  "Mental health issues? what is that?",
  "thats craaazyyy",
  "who? who asked.",
  "skill issue",
  "wow im so happy for you, or dang sorry that happened",
  "mmmm i see i see... okm that will be $500",
  "im sorry you feel that way",
  "let's unpack that",
  "have you considered going outside and touching grass???",
  "LMAO????",
];

const getMachineReponse = async () => {
  const random_item = get_random(possible_response);
  const quote = await fetch("https://api.quotable.io/random");
  const response = (await quote.json()) as QuoteReponse;
  console.log(response);


  return {
    prefix: random_item,
    content: response.content,
    author: response.author,
  };
};

export default getMachineReponse;

