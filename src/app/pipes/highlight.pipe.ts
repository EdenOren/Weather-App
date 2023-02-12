import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
/**
 * This pipe is used to highlight text in a string.
 * @param {string} text text to be searched
 * @param {any} search text to be highlighted
 * @returns {string} text with highlighted words
 */
  transform(text: string, search:any): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter((t:any) => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, match => `<b>${match}</b>`) : text;
  }
}