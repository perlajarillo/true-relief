export function validatingString(nameControl, stringToValidate){
    const isWrongHeight = nameControl === "height" && (stringToValidate <4 || stringToValidate >8);
    const isWrongWeight = nameControl === "weight" && (stringToValidate <65 || stringToValidate >800);
    const isWrongCuporDrinkNumber = (nameControl === "drinksOfAlcohol" || nameControl ==="cupsOfCoffee") && (stringToValidate <0 || stringToValidate >30);
    
    if (!stringToValidate.localeCompare("")) {
        return "Please introduce a "+nameControl;
    }
    else 
    {
        if (isWrongHeight || isWrongWeight){
            return "Please introduce a valid "+nameControl;
        }
        else if (isWrongCuporDrinkNumber){
            return "Please introduce a number between 1 and 30";
        }
        else if (nameControl==="name")
        {
            return validName(stringToValidate);
        }
        else
        {
            return "";
        }
    }
}

export function validatingFreeInput(nameControl, stringToValidate){
    const isWrongHeight = nameControl === "height" && (stringToValidate <4 || stringToValidate >8);
    const isWrongWeight = nameControl === "weight" && (stringToValidate <65 || stringToValidate >800);
    const isWrongCuporDrinkNumber = (nameControl === "drinksOfAlcohol" || nameControl ==="cupsOfCoffee") && (stringToValidate <0 || stringToValidate >30);
    const mustBeANumber = nameControl==="weight" || nameControl==="height" || nameControl==="drinksOfAlcohol" 
    || nameControl==="cupsOfCoffee";

    if (!stringToValidate.localeCompare("")) {
        return "Please introduce a "+nameControl;
    }
    else 
    {
        if (mustBeANumber && isNaN(stringToValidate))
        {
            return "Please introduce a number";
        }
        else if (nameControl==="name")
        {
            return validName(stringToValidate);
        }
        else if(((isWrongWeight || isWrongCuporDrinkNumber) && (stringToValidate.length>1) ) || isWrongHeight)
        {
            return "Please introduce a valid "+nameControl;
        }
        else
        {
            return "";
        }
    }
}

function validName(name){
    if (!(/^[a-zA-Z\s]+$/.test(name))){
        return "Only letters and spaces are allowed";
    } 
    else {
        return "";
    }
}

export function isPainHistoryCompleted(category, effectiveness){
    const isValueCompleted = category !== "" &&  effectiveness !== "";
    if (isValueCompleted )
        return true;
    else
        return false;  
}