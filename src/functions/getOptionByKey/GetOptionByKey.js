export default function getOptionByKey(keyName, allOptions) {
  let result = "";
  allOptions.map((option) => {
    if (option.key === keyName) {
      result = option.value;
      return;
    }
    return;
  });
  return result;
}
