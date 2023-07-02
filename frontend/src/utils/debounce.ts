export default function debounce<Params extends any[]>(fn: (...args: Params) => any, ms: number) {
  let cooltime: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(cooltime);
    cooltime = setTimeout(() => {
      fn.apply(null, args);
    }, ms);
  };
}
