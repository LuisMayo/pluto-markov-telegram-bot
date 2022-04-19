/**
 * Most of this code has been taken from https://github.com/maximumdata/markov-generator . Distributed under ISC license.
 */

/** Class representing a Markov Chain generator */
class Markov {
    /**
     * Builds the generator
     * @param {object} props - The configuration options and input data
     */
    constructor (props) {
      const defaultConfig = {
        minLength: 10,
        /**
         * Defines whether to use probability for the first word. If true more common words on the learning set
         * are more likely to be the first word. If false all words have equal chance
         *  */ 
        probabilityForFirstWord: false
      }
  
      this.props = Object.assign(defaultConfig, props);
      if (!this.props.input) {
        throw new Error('input was empty!')
      }
      this.startWords = []
      this.wordStats = new Map();
  
      this.props.input.forEach((learningElement) => {
        let words = learningElement.split(' ')
        let firstWord = words[0]
  
  
        // this function tests to see if this.startWords already contains the first word or not
        // we can't use Array.prototype.includes, because when comparing each element in this.startWords to the first word, we need to compare them as lowercase
        let checkWordNotInStartWords = () =>{
          if (this.props.probabilityForFirstWord) {
            return true;
          }
          this.startWords.forEach((elem) => {
            if (elem.toLowerCase() === firstWord.toLowerCase()) {
              return false;
            }
          });
          return true;
        }
  
        // if the first word is not a space, and if this.startWords does not already contain the first word, add it
        if (firstWord.length && checkWordNotInStartWords()) {
          this.startWords.push(firstWord)
        }
  
        // loop through each word in current sentence
        words.forEach((currentWord, it, ar) => {
          const nextWord = ar[it + 1];
          const previousWord = ar[it - 1];
  
          // if this.wordStats already contains the current word in the sentence as a property, push the next word in the sentence to it's array
          // otherwise, create the property on this.startWords and set it to an array containing the next word in the sentence
          // first check to see if there even IS a next word
          // we store all of the keys in this.wordStats as lowercase to make the function makeChain case insensitive
          if (this.wordStats.has(currentWord.toLowerCase())) {
            this.wordStats.get(currentWord.toLowerCase()).push(nextWord)
          } else {
            this.wordStats.set(currentWord.toLowerCase(), [nextWord]);
          }
          // TODO change for order n
          if (previousWord) {
            const orderTwoWord = (previousWord + ' ' + currentWord).toLowerCase();
            if (this.wordStats.has(orderTwoWord)) {
              this.wordStats.get(orderTwoWord).push(nextWord);
            } else {
              this.wordStats.set(orderTwoWord, [nextWord]);
            }
          }
        })
      })
  
      this.wordStats.delete('');
    }
  
    /**
     * Choose a random element in a given array
     * @param {array} a - An array to randomly choose an element from
     * @return {string} The selected element of the array
     */
    choice (a) {
      return a[Math.floor(a.length * Math.random())];
    }
  
    /**
     * Creates a new string via a Markov chain based on the input array from the constructor
     * @param {number} minLength - The minimum number of words in the generated string
     * @return {string} The generated string
     */
    makeChain (startWord, minLength = this.props.minLength || 10, deepness = 1) {
      if (deepness >= 5) {
        throw new Error("Sorry, I'm not able to generate a chain");
      }
      if (deepness > 3) {
          startWord = null;
      }
      if (startWord && !Array.isArray(startWord)) {
          startWord = [startWord];
      }
      let word = this.choice(startWord || this.startWords);
      let chain = [];
      let previousWord = null;
      let possibleNextWords;
      while (word != null && this.wordStats.has(word.toLowerCase())) {
        let orderTwoWord = (previousWord + ' ' + word).toLowerCase();
        chain.push(word);
        // If we are too deep we dont want to keep trying order 2 since its harder
        // also if we dont have that combo registeted we obviously won't use it and we fall bsck to order 1
        // Finally if the order 2 choices are too few we can't use them anymore
        if (deepness <= 3 && previousWord && this.wordStats.has(orderTwoWord) && new Set(this.wordStats.get(orderTwoWord)).size > 2) {
          console.log('Order 2 logic achieved');
          possibleNextWords = this.wordStats.get(orderTwoWord.toLowerCase());
        } else {
          possibleNextWords = this.wordStats.get(word.toLowerCase());
        }
        previousWord = word;
        word = this.choice(possibleNextWords);
      }
      if (this.props.input.includes(chain.join(' '))) {
        return this.makeChain(startWord, minLength, deepness + 1);
      }
      if (chain.length < minLength) {
        return this.makeChain(startWord, minLength, deepness + 1);
      }
      return chain.join(' ');
    }
  
  }
  
  module.exports = Markov
  