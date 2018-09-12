const painHistoryData = {
  text:
        "Now are going to ask questions about your pain as well as what makes it better or worse and how you currently treated so we can come up with the best ideas for additional pain",
  otherPainCondition: "If you have been diagnosed with other condition, you can add it when you edit your profile.",
  sections: {
    painCondition: {
      title: "What pain condition have you been diagnosed with?",
      name: "painCondition"
    },
    medication: {
      title:
        "We want to know what you have tried for your pain and how it worked.",
      haveTried: "Have you tried some medication for ",
      whatHaveTried: "Medication you have tried",
      name: "medication"
    },
    procedure: {
      haveTried: "Have you tried any procedures for ",
      whatHaveTried: "Procedure you have tried"
    },
    nonPharma: {
      haveTried: "Have you tried non pharmacological treatments for ",
      whatHaveTried: "Non pharmacological treatments you have tried"
    }
  },
  painConditionData: [
    { value: "postSurgicalPain", label: "Post - surgical pain" },
    { value: "kidneyStones", label: "Kidney stones" },
    { value: "chronicalLowerBackPain", label: "Chronical lower-back pain" },
    { value: "peripheralNeuropathy", label: "Peripheral neuropathy" },
    { value: "cancerPain", label: "Cancer pain" },
    { value: "posherpeticNeuralgia", label: "Posherpetic Neuralgia" },
    { value: "trigeminalNeuralgia", label: "Trigeminal Neuralgia" },
    { value: "interstitialCystitis", label: "Interstitial Cystitis" },
    {
      value: "complexRegionalPainSyndrome",
      label: "Complex Regional Pain Syndrome"
    },
    { value: "clusterHeadaches", label: "Cluster headaches" },
    { value: "abdominalPain", label: "Abdominal pain" },
    { value: "neckPain", label: "Neck pain" },
    { value: "chestPain", label: "Chest pain" }
  ],

  medicationData: [
    { value: "medication1", label: "medication 1" },
    { value: "medication2", label: "medication 2" },
    { value: "medication3", label: "medication 3" },
    { value: "medication4", label: "medication 4" },
    { value: "medication5", label: "medication 5" },
    { value: "medication6", label: "medication 6" }
  ],

  efficacyLevel: ["Effective", "Worked OK", "Did not worked"],

  proceduresData: ["surgery", "injections"],

  nonPharmaData: [
    { value: "massage", label: "Massage" },
    { value: "relaxationTechniques", label: "Relaxation techniques" },
    { value: "acupunture", label: "Acupunture" },
    { value: "physicalTherapy", label: "Physical therapy" },
    { value: "petTherapy", label: "Pet therapy" },
    { value: "gelPacks", label: "Gel packs" },
    { value: "meditation", label: "Meditation" },
    { value: "magnets", label: "Magnets" },
    { value: "chiropracticServices", label: "Chiropractic services" },
    { value: "homeopathy", label: "Homeopathy" },
    { value: "reiki", label: "Reiki" },
    { value: "musicTherapy", label: "Music therapy" },
    { value: "prayer", label: "Prayer" },
    { value: "acupressure", label: "Acupressure" },
    { value: "deepBreathing", label: "Deep breathing" },
    { value: "distraction", label: "Distraction" },
    { value: "guidedImagery", label: "Guided imagery" },
    { value: "hypnosisAndSelfHypnosis", label: "Hypnosis and self hypnosis" },
    {
      value: "herbsAndDietarySupplements",
      label: "Herbs and dietary supplements"
    }
  ]
};

export default painHistoryData;
