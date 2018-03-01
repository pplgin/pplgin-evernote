/**
 * 变量类型
 */
export const type = obj =>  {
  return Array.isArray(obj) ? 'array' : (obj === null) ? 'null' : typeof obj;
}

/**
 * isObject
 * @param      {[type]} obj                      [description]
 * @return     {[type]}                          [description]
 * @author  johnnyjiang
 * @email               johnnyjiang813@gmail.com
 * @createTime          2018-02-19T13:26:43+0800
 */
export const isObject = obj => obj === Object(obj)

/**
 * isFuction
 * @param      {[type]} obj                      [description]
 * @return     {[type]}                          [description]
 * @author  johnnyjiang
 * @email               johnnyjiang813@gmail.com
 * @createTime          2018-02-19T13:27:46+0800
 */
export const isFunction = obj => {
    return Object.prototype.toString.call(obj) === '[object Function]';
};