/* Typically transform '[[[voiture#1]]]'
 * into '<span style="color: #0D8050">voiture</span>'
*/
export const colorQueryTokens = (text) => {
  const regex = /\[\[\[(\w+)#\d+\]\]\]/gi
  return text.replace(regex, '<span style="color: #0D8050">$1</span>');
}

export const createParagraph = (text) => {
  return text.replace(/(.+)/, '<p>$1</p>');
}

export const prepString = (text) => {
  let newText = createParagraph(text);
  newText = colorQueryTokens(newText);
  return newText;
}

export const prepDangerouslySetInnerHTMLString = (text) => {
  return {__html: prepString(text)};
}
