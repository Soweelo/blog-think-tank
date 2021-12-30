import "./menu.scss"
import MenuItem from "../menuItem/MenuItem"
import {useState} from 'react'
export default function Menu(){
    const[menuOpen, setMenuOpen] = useState(0)
    let menuArray = [
        {   id:1,
            title:'HOW IT WORKS',
            entries:['join','say yes','think hard']
        },
        {
            id:2,
            title:'Read for free',
            entries:['join','say yes','think hard']
        },
        {
            id:3,
            title:'my favorite tags',
            entries:['#education','#inclusive','#habiter']
        },
        {
            id:4,
            title:'Create',
            entries:['doyougreen','arch']
        }

    ]
    return(
        <ul className="menu-1">
            { menuArray.map((p) =>
                <MenuItem  key={p.id} id={p.id} title={p.title} entries={p.entries} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            )}

        </ul>
    )
}