export function validateString(nameControl, stringToValidate) {
  const trimmedStringToValidate = stringToValidate.trim();
  const isWrongHeight =
    nameControl === "height" &&
    (trimmedStringToValidate < 4 || trimmedStringToValidate > 8);
  const isWrongWeight =
    nameControl === "weight" &&
    (trimmedStringToValidate < 65 || trimmedStringToValidate > 800);
  const isWrongCuporDrinkNumber =
    (nameControl === "drinksOfAlcohol" || nameControl === "cupsOfCoffee") &&
    (trimmedStringToValidate < 0 || trimmedStringToValidate > 30);

  if (!trimmedStringToValidate.localeCompare("")) {
    return "Please introduce a " + nameControl;
  } else {
    if (isWrongHeight || isWrongWeight) {
      return "Please introduce a valid " + nameControl;
    } else if (isWrongCuporDrinkNumber) {
      return "Please introduce a number between 1 and 30";
    } else if (nameControl === "name") {
      return validName(trimmedStringToValidate);
    } else {
      return "";
    }
  }
}

export function validateFreeInput(nameControl, stringToValidate) {
  const trimmedStringToValidate = stringToValidate.trim();
  const isWrongHeight =
    nameControl === "height" &&
    (trimmedStringToValidate < 4 || trimmedStringToValidate > 8);
  const isWrongWeight =
    nameControl === "weight" &&
    (trimmedStringToValidate < 65 || trimmedStringToValidate > 800);
  const isWrongCuporDrinkNumber =
    (nameControl === "drinksOfAlcohol" || nameControl === "cupsOfCoffee") &&
    (trimmedStringToValidate < 0 || trimmedStringToValidate > 30);
  const mustBeANumber =
    nameControl === "weight" ||
    nameControl === "height" ||
    nameControl === "drinksOfAlcohol" ||
    nameControl === "cupsOfCoffee";

  if (!trimmedStringToValidate.localeCompare("")) {
    return "Please introduce a " + nameControl;
  } else {
    if (mustBeANumber && isNaN(trimmedStringToValidate)) {
      return "Please introduce a number";
    } else if (nameControl === "name") {
      return validName(trimmedStringToValidate);
    } else if (
      ((isWrongWeight || isWrongCuporDrinkNumber) &&
        trimmedStringToValidate.length > 1) ||
      isWrongHeight
    ) {
      return "Please introduce a valid " + nameControl;
    } else {
      return "";
    }
  }
}

function validName(name) {
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Only letters and spaces are allowed";
  } else {
    return "";
  }
}

function isPainHistoryCompleted(category, effectiveness) {
  const isValueCompleted = category !== "" && effectiveness !== "";
  if (isValueCompleted) return true;
  else return false;
}

export function validateAge(birthday) {
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const today = new Date();
  const age = (today - birthday) / days / 365;
  if (age > 16) {
    return true;
  } else {
    return false;
  }
}

export function validateDemographicData(demographicData) {
  const errors =
    !demographicData.name ||
    !demographicData.weight ||
    !demographicData.height ||
    !demographicData.gender ||
    !demographicData.selectedDate ||
    demographicData.errorweight !== "" ||
    demographicData.errorheight !== "" ||
    demographicData.errorname !== "";
  return errors;
}

export function validateHabitsData(habitsData) {
  const errors =
    !habitsData.smoke ||
    !habitsData.physicalActivity ||
    !habitsData.sleepHours ||
    !habitsData.sleepQuality ||
    !habitsData.alcohol ||
    !habitsData.coffee ||
    !habitsData.healthStatus ||
    (habitsData.alcohol === "yes" && !habitsData.alcoholFrequency) ||
    (habitsData.coffee === "yes" && !habitsData.coffeeFrequency) ||
    ((habitsData.alcoholFrequency === "Almost everyday" ||
      habitsData.alcoholFrequency === "Everyday") &&
      (!habitsData.kindOfDrink || !habitsData.drinksOfAlcohol)) ||
    ((habitsData.coffeeFrequency === "Almost everyday" ||
      habitsData.coffeeFrequency === "Everyday") &&
      (!habitsData.kindOfCoffee || !habitsData.cupsOfCoffee)) ||
    habitsData.errorcupsOfCoffee !== "" ||
    habitsData.errordrinksOfAlcohol !== "";
  return errors;
}

export function validateThereIsAtLeastOneNeed(numberOfNeeds) {
  return numberOfNeeds === 0;
}

export function validateThereIsAtLeastOneChallenge(numberOfChallenges) {
  return numberOfChallenges === 0;
}

export function validatePainConditionData(
  numberOfPainConditions,
  painConditionData
) {
  const medicationIncomplete =
    numberOfPainConditions &&
    (painConditionData.medication === "" ||
      (painConditionData.medication === "yes" &&
        !isPainHistoryCompleted(
          painConditionData.medicationName,
          painConditionData.medicationEffectiveness
        )));
  const procedureIncomplete =
    numberOfPainConditions &&
    (painConditionData.medication === "" ||
      (painConditionData.procedures === "yes" &&
        !isPainHistoryCompleted(
          painConditionData.procedureName,
          painConditionData.procedureEffectiveness
        )));
  const nonPharmaIncomplete =
    numberOfPainConditions &&
    (painConditionData.nonPharma === "" ||
      (painConditionData.nonPharma === "yes" &&
        !isPainHistoryCompleted(
          painConditionData.nonPharmaName,
          painConditionData.nonPharmaEffectiveness
        )));
  const errors =
    numberOfPainConditions === 0 ||
    medicationIncomplete ||
    procedureIncomplete ||
    nonPharmaIncomplete;
  let msg = "";
  if (numberOfPainConditions === 0) {
    msg = "Please select at least one pain condition";
  }
  if (medicationIncomplete || procedureIncomplete || nonPharmaIncomplete) {
    msg = "Please complete the pain history treatments";
  }
  const errorsAndMsg = [errors, msg];
  return errorsAndMsg;
}

export function validateTrackPainData(trackPainData) {
  const errors =
    !trackPainData.startDate ||
    !trackPainData.endDate ||
    !trackPainData.eventDuration ||
    !trackPainData.painIntensity ||
    !trackPainData.description ||
    !trackPainData.mood;
  return errors;
}

export function validateSelectedValue(stringToValidate) {
  stringToValidate = stringToValidate.toString();
  if (stringToValidate === "" || stringToValidate === "0") {
    return "Please select a value.";
  }
  else {
    return "";
  }
}