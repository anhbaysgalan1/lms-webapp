import _ from 'lodash';

export function deEmpty(x, defaultValue="") {
  return x ? x : defaultValue;
}

export function stripHTML(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, "").trim() ;
}

export function elipsis(text, maxLength=100) {
  if(text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

export function tryGet(obj, key, defaultValue) {
  if(obj[key]) return obj[key];
  return defaultValue;
}


export function checkFields(obj, paths) {
  if (typeof(paths) === 'string') {
    return _.get(obj, paths) && true;
  }
  else {
    return paths.reduce((currentCheck, path) => {
      return _.get(obj, path) && currentCheck;
    }, true);
  }
}

export function fieldsNotEmpty(obj, ...paths) {
  if (typeof(paths) === 'string') {
    return _.get(obj, paths) && true;
  }
  else {
    return paths.reduce((currentCheck, path) => {
      return _.get(obj, path) && currentCheck;
    }, true);
  }
}

export function plainText(text) {
  var unicodeText = text;

  unicodeText = unicodeText.toLowerCase();
  unicodeText = unicodeText.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
  unicodeText = unicodeText.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
  unicodeText = unicodeText.replace(/ì|í|ị|ỉ|ĩ/g,"i");
  unicodeText = unicodeText.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
  unicodeText = unicodeText.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
  unicodeText = unicodeText.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
  unicodeText = unicodeText.replace(/đ/g,"d");
  unicodeText = unicodeText.replace(/!|@|\$|%|\^|\*|∣|\+|\=|\<|\>|\?|\/|,|\.|\:|\'|\"|\&|\#|\[|\]|~/g,"-");
  unicodeText = unicodeText.replace(/-+-/g,"-");  //thay thế 2- thành 1-
  unicodeText = unicodeText.replace(/^\-+|\-+$/g,"");  //cắt bỏ ký tự - ở đầu và cuối chuỗi

  return unicodeText.trim().toLowerCase();
}
