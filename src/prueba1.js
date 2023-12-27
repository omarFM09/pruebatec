function findSubstring(s, words) {
    const result = [];
    const wordLen = words[0].length;
    const totalLen = wordLen * words.length;
  
    if (s.length < totalLen) {
      return result;
    }
  
    const wordCountMap = {};
    for (const word of words) {
      wordCountMap[word] = (wordCountMap[word] || 0) + 1;
    }
  
    for (let i = 0; i <= s.length - totalLen; i++) {
      const substring = s.substr(i, totalLen);
      const wordSeenMap = {};
  
      for (let j = 0; j < totalLen; j += wordLen) {
        const word = substring.substr(j, wordLen);
        wordSeenMap[word] = (wordSeenMap[word] || 0) + 1;
      }
  
      if (isPermutation(wordCountMap, wordSeenMap)) {
        result.push(i);
      }
    }
  
    return result;
  }
  
  function isPermutation(map1, map2) {
    for (const key in map1) {
      if (map1[key] !== map2[key]) {
        return false;
      }
    }
    return true;
  }
  
  // Ejemplos de uso
  console.log(findSubstring("barfoothefoobarman", ["foo", "bar"])); // Output: [0, 9]
  console.log(findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"])); // Output: []
  console.log(findSubstring("barfoofoobarthefoobarman", ["bar", "foo", "the"])); // Output: [6, 9, 12]
  //require('./database');