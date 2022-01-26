import "./menu.scss"
import MenuItem from "../menuItem/MenuItem"
import {useState,useRef} from 'react'


export default function Menu({favorites, setFavorites, allTags, selectedTags, setSelectedTags}){
    const[menuOpen, setMenuOpen] = useState(0)
    let menuArray = [
        {   id:1,
            title:'HOW IT WORKS',

        },
        {
            id:2,
            title:'Read by tag',

        },
        {
            id:3,
            title:'My favorite tags'
        },
        {
            id:4,
            title:'Create'
        }

    ]




    return(
        <ul className="menu-1"  >
            { menuArray.map((p) =>
                <MenuItem  key={p.id} id={p.id} menuOpen={menuOpen} setMenuOpen={setMenuOpen} favorites={favorites} setFavorites={setFavorites} allTags={allTags} selectedTags={selectedTags} title={p.title} setSelectedTags={setSelectedTags}/>
            )}

        </ul>
    )
}