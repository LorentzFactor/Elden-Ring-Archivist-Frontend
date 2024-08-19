// See: https://stackoverflow.com/questions/1144783/how-do-i-replace-all-occurrences-of-a-string-in-javascript
// This approach should allow for backwards compatibility with older browsers

function escapeRegExp(str:string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  
const replaceAll = (str:string, find:string, replace:string)  => {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

export default replaceAll;
