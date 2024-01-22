const message = "i am feeling sad today";

const determine_nature_of_message = (message: string): ("happy" | "sad") => {

  // if the legnth of the string is even, then we can safely say that the string is a "happy string, and honestly, should have good vibes to it
  // however, if the length of the string is odd, we can say that the string is sad, and should have some negative connatations attached to it;



  return "sad";
}

console.log(determine_nature_of_message(message));
