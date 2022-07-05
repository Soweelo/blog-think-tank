export default function getTagId (tagName,allTags){
let tagName_id = 0
allTags.map((tag)=>{
    if(tagName[0] === tag.name){
        tagName_id =  tag.id
        return
    }
    return
})
    return tagName_id
}