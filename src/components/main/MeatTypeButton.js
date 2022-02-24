import React from "react";
import { MyButton } from "../../commons/MyButtons";



function MeatTypeButton({meatType, removeMeatType}) {
    
    let icon = ""
    switch (meatType) {
        case "ryba":
            icon="fas fa-fish";
            break;
        case "vege":
            icon="fas fa-seedling";
            break;
        case "wołowina" : 
        case "wieprzowina" :
        case "kurczak":
            icon="fas fa-drumstick-bite";
            break;
        default:
            icon = ""
    }

    return (
        <MyButton
            buttonStyle='btn--primary'
            buttonShape='btn--square'
            buttonSize='btn--small'
            onClick={()=>removeMeatType(meatType)}
            aria-label='Rodzaj mięsa'
        >
            <i className={icon}></i> 
            &nbsp;{meatType}&nbsp;<i className="fas fa-times"></i>
        </MyButton>
    )

}
export default MeatTypeButton

