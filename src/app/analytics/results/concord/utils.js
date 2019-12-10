/* Color search tokens, examples:
 * [[[voiture#1]]] -> <span style="color: #0D8050">voiture</span>
 * [[[voiture blindée#1]]] -> <span style="color: #0D8050">voiture blindée</span>
 * [[[peu à peu#3]]] -> <span style="color: #0D8050">peu à peu</span>
 *
 * Inspiration for the regex: https://stackoverflow.com/a/26900132
*/
export const colorQueryTokens = (text) => {
  const regex = /\[\[\[([A-zÀ-ú_ -]+)#\d+\]\]\]/gi;
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
