const trackPainData = {
  moodState: [
    { value: "normal", label: "Normal" },
    { value: "sadness", label: "Sad" },
    { value: "anger", label: "Angry" },
    { value: "frustration", label: "Frustrated" }
  ],
  painDescription: [
    { value: "aching", label: "Aching" },
    { value: "cramping", label: "Cramping" },
    { value: "fearful", label: "Fearful" },
    { value: "gnawing", label: "Gnawing" },
    { value: "heavy", label: "Heavy" },
    { value: "sharp", label: "Sharp" },
    { value: "hot", label: "Hot" }
  ],
  /*The human body parts where included in general terms. More information
  can be founded in:
   https://training.seer.cancer.gov/anatomy/muscular/groups/trunk.html
*/
  humanBodyData: [
    { bodyPart: "head", xStart: "122", yStart: "35", xEnd: "160", yEnd: "47" },
    { bodyPart: "forehead", xStart: "140", yStart: "51", xEnd: "164", yEnd: "50" },
    { bodyPart: "right ear", xStart: "168", yStart: "74", xEnd: "170", yEnd: "86" },
    { bodyPart: "left ear", xStart: "126", yStart: "74", xEnd: "128", yEnd: "86" },
    { bodyPart: "chin", xStart: "146", yStart: "97", xEnd: "146", yEnd: "97" },
    { bodyPart: "neck", xStart: "132", yStart: "103", xEnd: "162", yEnd: "110" },
    { bodyPart: "left ear", xStart: "126", yStart: "74", xEnd: "128", yEnd: "86" },
    { bodyPart: "left shoulder", xStart: "83", yStart: "132", xEnd: "107", yEnd: "169" },
    { bodyPart: "right shoulder", xStart: "195", yStart: "132", xEnd: "212", yEnd: "169" },
    { bodyPart: "chest", xStart: "120", yStart: "146", xEnd: "163", yEnd: "187" },
    { bodyPart: "umbilicus", xStart: "152", yStart: "226", xEnd: "152", yEnd: "226" },
    { bodyPart: "abdomen", xStart: "131", yStart: "216", xEnd: "166", yEnd: "248" },
    { bodyPart: "groin", xStart: "135", yStart: "279", xEnd: "164", yEnd: "286" },
    { bodyPart: "left tigh", xStart: "107", yStart: "291", xEnd: "145", yEnd: "359" },
    { bodyPart: "right tigh", xStart: "152", yStart: "291", xEnd: "188", yEnd: "359" },
    { bodyPart: "left knee", xStart: "116", yStart: "369", xEnd: "140", yEnd: "393" },
    { bodyPart: "right knee", xStart: "155", yStart: "369", xEnd: "186", yEnd: "393" },
    { bodyPart: "left calf", xStart: "116", yStart: "408", xEnd: "146", yEnd: "433" },
    { bodyPart: "right calf", xStart: "157", yStart: "408", xEnd: "184", yEnd: "433" },
    { bodyPart: "left leg", xStart: "117", yStart: "437", xEnd: "141", yEnd: "456" },
    { bodyPart: "right leg", xStart: "158", yStart: "437", xEnd: "176", yEnd: "456" },
    { bodyPart: "left ankle", xStart: "130", yStart: "475", xEnd: "146", yEnd: "483" },
    { bodyPart: "right ankle", xStart: "160", yStart: "475", xEnd: "172", yEnd: "483" },
    { bodyPart: "left foot", xStart: "129", yStart: "497", xEnd: "143", yEnd: "512" },
    { bodyPart: "right foot", xStart: "157", yStart: "497", xEnd: "182", yEnd: "507" },
    { bodyPart: "left toes", xStart: "120", yStart: "513", xEnd: "142", yEnd: "513" },
    { bodyPart: "right toes", xStart: "166", yStart: "516", xEnd: "184", yEnd: "509" },
    { bodyPart: "left arm", xStart: "90", yStart: "170", xEnd: "109", yEnd: "205" },
    { bodyPart: "right arm", xStart: "208", yStart: "170", xEnd: "109", yEnd: "205" },
    { bodyPart: "left elbow", xStart: "94", yStart: "208", xEnd: "101", yEnd: "210" },
    { bodyPart: "right elbow", xStart: "198", yStart: "208", xEnd: "207", yEnd: "210" },
    { bodyPart: "left forearm", xStart: "78", yStart: "217", xEnd: "97", yEnd: "281" },
    { bodyPart: "right forearm", xStart: "190", yStart: "217", xEnd: "224", yEnd: "281" },
    { bodyPart: "left wrist", xStart: "76", yStart: "281", xEnd: "89", yEnd: "284" },
    { bodyPart: "right wrist", xStart: "212", yStart: "281", xEnd: "224", yEnd: "284" },
    { bodyPart: "left hand", xStart: "66", yStart: "283", xEnd: "86", yEnd: "309" },
    { bodyPart: "right hand", xStart: "214", yStart: "289", xEnd: "237", yEnd: "311" },
    { bodyPart: "left hand fingers", xStart: "54", yStart: "294", xEnd: "82", yEnd: "328" },
    { bodyPart: "right hand fingers", xStart: "221", yStart: "294", xEnd: "249", yEnd: "328" },
    { bodyPart: "face", xStart: "135", yStart: "58", xEnd: "159", yEnd: "97" }
    /*
    We need to include this parts

    "back",
    "low back",
    "kidney"*/
  ],
}
export default trackPainData;
