const decodeHTMLEntities = (str) => {
    if (typeof str !== 'string') return '';
  
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&copy;/g, '©')
      .replace(/&reg;/g, '®')
      .replace(/&euro;/g, '€')
      .replace(/&pound;/g, '£')
      .replace(/&cent;/g, '¢')
      .replace(/&yen;/g, '¥')
      .replace(/&hellip;/g, '…')
      .replace(/&ndash;/g, '–')
      .replace(/&mdash;/g, '—');
  };
  
  export default decodeHTMLEntities;
  