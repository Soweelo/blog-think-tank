export default function findNewItemInArray(array,arrayWithOneMoreItem){
//    this function is used to compare  two arrays with just one item different and to return it
    let difference = arrayWithOneMoreItem.filter(x => !array.includes(x));
    return(difference);
}