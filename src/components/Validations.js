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

        else
        {
            return "";
        }
    }
}
