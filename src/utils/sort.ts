function parallel<T>(...args: T[][]): T[][] {
  const len = Math.max(...args.map((arg) => arg.length));
  const result: T[][] = [];
  for (let index = 0; index < len; index += 1) {
    result.push(
      args.reduce((r, c) => {
        r.push(c[index]);
        return r;
      }, [] as T[]),
    );
  }
  return result;
}

/**
 * 为数组 sort 方法生成排序函数， 根据根据参数一函数返回的数组依次排序
 * @param calKey 生成能够直接比较大小的值
 * @param order
 * @returns 排序函数
 *
 * @example
 * ```ts
 * // 先按年龄升序，同年龄的按名字降序
 * [{age: 12, name: 'Tom'}].sort(sorter(person => [person.age, person.name], ['asc', 'desc']))
 * ```
 */
export default function sorter<T>(
  calKey: (a: T) => (number | string)[],
  order: string | string[] = 'asc',
) {
  return (a: T, b: T) => {
    const akeys = calKey(a);
    const bkeys = calKey(b);
    const orders = Array.isArray(order) ? order : Array(akeys.length).fill(order);
    const keys = parallel(akeys, bkeys);
    const index = keys.findIndex(([ak, bk]) => String(ak) !== String(bk));
    if (index !== -1) {
      const [ak, bk] = keys[index];
      return ak > bk !== (orders[index] === 'desc') ? 1 : -1;
    }
    return 0;
  };
}
