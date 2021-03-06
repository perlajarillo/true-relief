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
  humanBodyFrontData: [
    { bodyPart: "front of the head", xStart: "96", yStart: "5", xEnd: "139", yEnd: "16" },
    { bodyPart: "forehead", xStart: "92", yStart: "17", xEnd: "145", yEnd: "25" },
    { bodyPart: "left ear", xStart: "90", yStart: "46", xEnd: "96", yEnd: "66" },
    { bodyPart: "right ear", xStart: "139", yStart: "46", xEnd: "147", yEnd: "66" },
    { bodyPart: "face", xStart: "92", yStart: "25", xEnd: "147", yEnd: "78" },
    { bodyPart: "chin", xStart: "116", yStart: "76", xEnd: "121", yEnd: "78" },
    { bodyPart: "neck", xStart: "100", yStart: "78", xEnd: "137", yEnd: "90" },
    { bodyPart: "front left shoulder", xStart: "48", yStart: "107", xEnd: "72", yEnd: "147" },
    { bodyPart: "front right shoulder", xStart: "169", yStart: "107", xEnd: "193", yEnd: "147" },
    { bodyPart: "chest", xStart: "72", yStart: "93", xEnd: "168", yEnd: "174" },
    { bodyPart: "umbilicus", xStart: "118", yStart: "212", xEnd: "126", yEnd: "220" },
    { bodyPart: "abdomen", xStart: "75", yStart: "178", xEnd: "167", yEnd: "270" },
    { bodyPart: "left groin", xStart: "89", yStart: "264", xEnd: "113", yEnd: "287" },
    { bodyPart: "right groin", xStart: "132", yStart: "264", xEnd: "158", yEnd: "287" },
    { bodyPart: "front left tigh", xStart: "67", yStart: "267", xEnd: "121", yEnd: "390" },
    { bodyPart: "front right tigh", xStart: "123", yStart: "267", xEnd: "174", yEnd: "390" },
    { bodyPart: "left knee", xStart: "83", yStart: "392", xEnd: "117", yEnd: "411" },
    { bodyPart: "right knee", xStart: "129", yStart: "392", xEnd: "164", yEnd: "411" },
    { bodyPart: "left shin", xStart: "82", yStart: "413", xEnd: "120", yEnd: "504" },
    { bodyPart: "right shin", xStart: "126", yStart: "413", xEnd: "164", yEnd: "504" },
    { bodyPart: "front left ankle", xStart: "99", yStart: "508", xEnd: "118", yEnd: "515" },
    { bodyPart: "front right ankle", xStart: "128", yStart: "508", xEnd: "148", yEnd: "515" },
    { bodyPart: "left foot", xStart: "89", yStart: "517", xEnd: "120", yEnd: "541" },
    { bodyPart: "right foot", xStart: "127", yStart: "517", xEnd: "158", yEnd: "534" },
    { bodyPart: "left toes", xStart: "85", yStart: "535", xEnd: "113", yEnd: "546" },
    { bodyPart: "right toes", xStart: "136", yStart: "537", xEnd: "161", yEnd: "546" },
    { bodyPart: "left heel", xStart: "329", yStart: "525", xEnd: "346", yEnd: "536" },
    { bodyPart: "right heel", xStart: "356", yStart: "525", xEnd: "377", yEnd: "537" },
    { bodyPart: "left arm", xStart: "49", yStart: "149", xEnd: "77", yEnd: "203" },
    { bodyPart: "right arm", xStart: "164", yStart: "147", xEnd: "192", yEnd: "203" },
    { bodyPart: "front left elbow", xStart: "52", yStart: "200", xEnd: "78", yEnd: "218" },
    { bodyPart: "front right elbow", xStart: "164", yStart: "196", xEnd: "192", yEnd: "214" },
    { bodyPart: "front left forearm", xStart: "43", yStart: "209", xEnd: "78", yEnd: "283" },
    { bodyPart: "front right forearm", xStart: "166", yStart: "217", xEnd: "197", yEnd: "275" },
    { bodyPart: "front left wrist", xStart: "37", yStart: "278", xEnd: "55", yEnd: "288" },
    { bodyPart: "front right wrist", xStart: "189", yStart: "277", xEnd: "208", yEnd: "287" },
    { bodyPart: "front left hand", xStart: "26", yStart: "283", xEnd: "55", yEnd: "313" },
    { bodyPart: "front right hand", xStart: "189", yStart: "282", xEnd: "222", yEnd: "313" },
    { bodyPart: "front left hand fingers", xStart: "21", yStart: "313", xEnd: "48", yEnd: "335" },
    { bodyPart: "front right hand fingers", xStart: "197", yStart: "310", xEnd: "225", yEnd: "334" },
    { bodyPart: "front left hand thumb", xStart: "11", yStart: "290", xEnd: "27", yEnd: "297" },
    { bodyPart: "front right hand thumb", xStart: "210", yStart: "287", xEnd: "236", yEnd: "293" }
  ],
  humanBodyBackData: [
    { bodyPart: "back of the head", xStart: "95", yStart: "5", xEnd: "149", yEnd: "65" },
    { bodyPart: "back of left ear", xStart: "91", yStart: "47", xEnd: "98", yEnd: "66" },
    { bodyPart: "back of right ear", xStart: "145", yStart: "47", xEnd: "150", yEnd: "66" },
    { bodyPart: "nape", xStart: "101", yStart: "67", xEnd: "142", yEnd: "90" },
    { bodyPart: "back left shoulder", xStart: "50", yStart: "110", xEnd: "71", yEnd: "157" },
    { bodyPart: "back right shoulder", xStart: "172", yStart: "110", xEnd: "195", yEnd: "157" },
    { bodyPart: "back left tigh", xStart: "70", yStart: "310", xEnd: "123", yEnd: "396" },
    { bodyPart: "back right tigh", xStart: "124", yStart: "310", xEnd: "176", yEnd: "396" },
    { bodyPart: "back left knee", xStart: "85", yStart: "397", xEnd: "120", yEnd: "416" },
    { bodyPart: "back right knee", xStart: "130", yStart: "397", xEnd: "409", yEnd: "416" },
    { bodyPart: "left calf", xStart: "84", yStart: "417", xEnd: "122", yEnd: "508" },
    { bodyPart: "right calf", xStart: "127", yStart: "417", xEnd: "167", yEnd: "508" },
    { bodyPart: "back left ankle", xStart: "101", yStart: "509", xEnd: "125", yEnd: "530" },
    { bodyPart: "back right ankle", xStart: "129", yStart: "509", xEnd: "150", yEnd: "530" },
    { bodyPart: "left heel", xStart: "101", yStart: "532", xEnd: "121", yEnd: "542" },
    { bodyPart: "right heel", xStart: "130", yStart: "532", xEnd: "151", yEnd: "542" },
    { bodyPart: "back left arm", xStart: "52", yStart: "157", xEnd: "80", yEnd: "211" },
    { bodyPart: "back right arm", xStart: "165", yStart: "157", xEnd: "192", yEnd: "217" },
    { bodyPart: "left elbow", xStart: "52", yStart: "202", xEnd: "79", yEnd: "227" },
    { bodyPart: "right elbow", xStart: "169", yStart: "207", xEnd: "198", yEnd: "232" },
    { bodyPart: "left forearm", xStart: "42", yStart: "215", xEnd: "77", yEnd: "287" },
    { bodyPart: "right forearm", xStart: "172", yStart: "221", xEnd: "205", yEnd: "282" },
    { bodyPart: "back left wrist", xStart: "35", yStart: "282", xEnd: "53", yEnd: "292" },
    { bodyPart: "back right wrist", xStart: "194", yStart: "275", xEnd: "212", yEnd: "286" },
    { bodyPart: "back left hand", xStart: "24", yStart: "287", xEnd: "53", yEnd: "317" },
    { bodyPart: "back right hand", xStart: "195", yStart: "279", xEnd: "227", yEnd: "315" },
    { bodyPart: "back left hand fingers", xStart: "18", yStart: "316", xEnd: "47", yEnd: "338" },
    { bodyPart: "back right hand fingers", xStart: "203", yStart: "307", xEnd: "229", yEnd: "331" },
    { bodyPart: "back left hand thumb", xStart: "8", yStart: "291", xEnd: "23", yEnd: "306" },
    { bodyPart: "back right hand thumb", xStart: "219", yStart: "282", xEnd: "249", yEnd: "292" },
    { bodyPart: "back", xStart: "71", yStart: "91", xEnd: "173", yEnd: "181" },
    { bodyPart: "low back", xStart: "76", yStart: "182", xEnd: "170", yEnd: "266" },
    { bodyPart: "buttock", xStart: "73", yStart: "268", xEnd: "177", yEnd: "308" }
  ],
}
export default trackPainData;
