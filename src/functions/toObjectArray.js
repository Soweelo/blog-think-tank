export default function toObjectArray(array) {
  let result = [];
  array.map((each, i) => {
    result.push(each);
  });
  return result;
}
