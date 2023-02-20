import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe is used to highlight text in given string.
 * @param {string} text given string to be searched
 * @param {any} search text to be highlighted
 * @returns {string} text with highlighted words
 */
@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
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