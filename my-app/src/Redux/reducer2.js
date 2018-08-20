/*  主reducer对象
 */
var reducer = {};

/* 正则匹配 src/components 下所有的 reducer.js 文件 ,
 * 然后把每个文件的 export 出来的对象存入数组 reducerList
 */
var reducerList = (r => {
  console.log(r.keys());
  return r.keys().map(key => {
    return r(key).default;
  });
})(
  require.context("../", true, /^\.\/components\/((?!\/)[\s\S])+\/reducer\.js$/)
);

/* 
 * 把 reducerList 每一项对象全部  reducer = {...reducer , ...item}
 */
reducerList.forEach(item => {
    reducer = {...reducer , ...item}
});

export default reducer;
