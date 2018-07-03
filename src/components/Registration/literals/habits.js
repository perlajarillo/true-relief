const habitsData = {
  title: "The next questions are related to your health habits.",
  smokeTitle: "Do you smoke?",
  physicalActivity: {
    title: "Level of physical activity you do",
    activityLevel: [
      { value: "sedentary", label: "Sedentary (little or no exercise)" },
      {
        value: "lightly",
        label: "Lightly active (little exercise, sports 1-3 days/week)"
      },
      {
        value: "moderate",
        label: "Moderate (moderate exercise, sports 3-5 days/week)"
      },
      {
        value: "very active",
        label: "Very active (hard exercise, sports 6-7 days/week)"
      },
      {
        value: "extra active",
        label: "Extra active (very hard exercise, sports and physical job)"
      }
    ]
  },
  sleep: {
    titleHours: "How many hours do you sleep per day?",
    titleQuality: "In general, how do you consider the quality of your sleep?",
    sleepHours: [
      { value: "lessThan5", label: "Less than 5 hours" },
      { value: "5-7", label: "5-7 hours" },
      { value: "more than 8", label: "More than 8 hours" }
    ],
    sleepQuality: [
      { value: "well rested", label: "Well - rested" },
      { value: "trouble falling asleep", label: "Trouble falling asleep" },
      { value: "trouble staying asleep", label: "Trouble staying asleep" },
      { value: "lack of sleep", label: "Negatively impacted by lack of sleep" },
      { value: "dozed unintentionally", label: "Dozed unintentionally" }
    ]
  },
  alcohol: {
    title: "Do you drink alcohol?",
    frequencyTitle: "How often do you drink alcohol?",
    alcoholFrequency: [
      { value: "occasionally", label: "Occasionally" },
      { value: "1 per week", label: "1 per week" },
      { value: "2-3 per week", label: "2-3 per week" },
      { value: "Almost everyday", label: "Almost everyday" },
      { value: "Everyday", label: "Everyday" }
    ],
    quantityTitle:
      'Considering one "standard" drink contains roughly 14 grams of pure alcohol, how many drinks of alcohol do you drink per day?',
    kindOfDrinkTitle: "What kind of alcoholic beverage do you usually drink?",
    kindOfDrink: [
      {
        value: "beer",
        label: "12 ounces of regular beer, which is usually about 5% alcohol"
      },
      {
        value: "wine",
        label: "5 ounces of wine, which is typically about 12% alcohol"
      },
      {
        value: "spirits",
        label: "1.5 ounces of distilled spirits, which is about 40% alcohol"
      },
      {
        value: "malt liquor",
        label: "8-9 oz of Malt Liquor, which is usually 7% of alcohol"
      }
    ]
  },
  coffee: {
    title: "Do you drink coffee?",
    frequencyTitle: "How often do you drink coffee?",
    quantityTitle:
      'Considering an "standard" size of 12oz, how many cups of coffee do you drink per day?',
    kindOfCoffeeTitle: "What kind of coffee do you regularly drink?",
    coffeeFrequency: [
      { value: "occasionally", label: "Occasionally" },
      { value: "1 per week", label: "1 per week" },
      { value: "2-3 per week", label: "2-3 per week" },
      { value: "4-5 per week", label: "4-5 per week" },
      { value: "Almost everyday", label: "Almost everyday" },
      { value: "Everyday", label: "Everyday" }
    ],
    kindOfCoffee: [
      { value: "espresso", label: "Espresso" },
      { value: "americano", label: "Americano" },
      { value: "machiato", label: "Machiato" },
      { value: "cappuccino", label: "Cappuccino" },
      { value: "latte", label: "Latte" }
    ]
  },
  health: {
    title: "How do you consider your health status in general?",
    status: [
      { value: "excellent", label: "Excellent" },
      { value: "veryGood", label: "Very Good" },
      { value: "good", label: "Good" },
      { value: "fair", label: "Fair" },
      { value: "poor", label: "Poor" }
    ]
  }
};

export default habitsData;
