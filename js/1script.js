// SETTINGS
// SETTINGS
// SETTINGS
let WPM = 0
let TargetWPM = 150
let SpeedTransitionIncrement = 50
let Text = '„Maale? Missugusele maale – kas Hispaaniasse, Egiptusesse või kusagile mujale?“ küsisin isalt. Muidugi tean ma veel paljusid maailma maid, aga enamjagu meie klassi lastest on oma vanematega käinud puhkamas ikka kas Hispaanias või Egiptuses. Ega mul poleks midagi selle vastu, et üllatan esimesel septembril oma klassikaaslasi lõunamaa päevituse ja mõne klaaskaanega karbis pesitseva põrnikaga! Isa muigas: „Küllap me kunagi läheme välismaalegi, aga seekord teeme väikese puhkuse siinsamas Eestimaal, vanatädi Õie talus. Ära tee midagi haput nägu! Sa mõtle: värske õhk, soe vast lüpstud piim, lihtne, aga maitsev talutoit, linnud-loomad…“ „Mammutid ja mõõkhambulised tiigrid! Kiviaeg…“ jätkasin tusaselt isa loetelu. „Egiptusest saaks vähemalt mõne skarabeuse koju tuua, aga selle sooja maapiima sees ukerdavad kindlasti ainult sitasitikad!“ Isa silmad hakkasid pahaselt välkuma: „Kui sa arvad, et skarabeus on sitasitikast millegi poolest parem, siis võta teatavaks, et oled eksiteel. Muide, vanad eestlased ütlesid, et kes aitab selili kukkunud sitasitika jalule, see saab üheksa pattu andeks. Seda esiteks. Ja teiseks on vanatädi Õie puhtust armastav inimene, kelle lüpstud piimas pole eluilmaski mingeid võõrkehasid olnud. Võib-olla sa ei mäleta teda, sest viimati käisime kogu perega Kaasiku talus siis, kui sa olid alles titevankris, aga maapiimast oskasid sa küll juba siis lugu pidada.“'
// i dont think this is gonna work out

// SCRIPT
// SCRIPT
// SCRIPT

let Playing = false
let index = 0

let formattedText = Text.split(" ");
var Length = formattedText.length

//console.log("Word count : " + Length)

let pause = document.getElementById("pause");
let play = document.getElementById("play");

let wordDisplay = document.getElementById("changetext"); // waa waaa, this isnt proper variable naming, waa waa 😭😭

wordDisplay.Content = ""

function UpdateButtonVisuals() {

    if (Playing === false) {
        pause.style.display = "none";
        play.style.display = "contents";
    } else {
        pause.style.display = "contents";
        play.style.display = "none";
    }
}
function clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
  }

function PlayPause(TryToStart) {
    console.log("Index: " + index)
    if (TryToStart === undefined || TryToStart === null) {
        TryToStart = true;
    }

    Playing = !Playing
    UpdateButtonVisuals()
    if (TryToStart && Playing) {
       if (index >= (Length-1)) {
        index = 0
       }
       WPM = 100
       function iterate() {

           if (index < Length && Playing) {

               let wordToDisplay = formattedText[index];
               let wordLength = wordToDisplay.length;

               // Calculate the number of characters to show on the left and right of the optimal recognition point
               let charactersToShow = Math.ceil(wordLength / 2);

               // Extract characters for left and right parts
               let leftPart = wordToDisplay.substring(0, charactersToShow);
               let rightPart = wordToDisplay.substring(charactersToShow + 1); // Exclude the character at the optimal recognition point

               // Extract the character at the optimal recognition point
               let recognitionPoint = wordToDisplay.charAt(charactersToShow);

               // Calculate the total width of the displayed word
               let wordWidth = leftPart.length + rightPart.length + 1; // Adding 1 for the highlighted character

               // Calculate padding for both sides of the highlighted character
               let padding = Math.floor((wordWidth - 1) / 2);

               // Combine left part, optimal recognition point, and right part with padding
               let formattedWord = 
                   "<span style='color: black;'>" + leftPart + "</span>" +
                   "<span style='color: red;'>" + recognitionPoint + "</span>" +
                   "<span style='color: black;'>" + rightPart + "</span>";

               // Apply padding for both sides of the formatted word
               formattedWord = formattedWord.padStart(formattedWord.length + padding, ' ');
               formattedWord = formattedWord.padEnd(formattedWord.length + padding, ' ');

               // Display the word
               wordDisplay.innerHTML = formattedWord;
               
               let OldWPM = WPM
               if (Math.abs(WPM-TargetWPM) > SpeedTransitionIncrement){
                   let Dir = clamp(TargetWPM-WPM,-1,1)
                   WPM = WPM + Dir*SpeedTransitionIncrement
               } else {
                   WPM = TargetWPM
               }
               if (OldWPM != WPM){
                   console.log(WPM)
               }
               
               let element = document.getElementById("progress")
               element.style.width = ((index/(Length-1))*100) + "%";

               // Calculate the duration to display the word based on the number of characters
               
             index++;
             if (index < Length && Playing) {
               setTimeout(iterate, (60/WPM)*1000 + wordLength*10);
             } else {
               if (Playing) {
                   //index = 0
                   PlayPause(false)
               }
           }
           } 
       }
       iterate()
    }
}
function ChangeSpeed(Speed) {
    var buttons = document.querySelectorAll('.button')
    let buttonNumber = (Speed-150)/100
    buttons.forEach(function(button, index) {
        if (index === buttonNumber) {
          button.classList.add('blue');
        } else {
          button.classList.remove('blue');
        }
      });
    
    TargetWPM = Speed
}
function OffsetIndex(Num) {
    index = clamp(index+Num,0,Length)

    let wordToDisplay = formattedText[index];
    let wordLength = wordToDisplay.length;

    // Calculate the number of characters to show on the left and right of the optimal recognition point
    let charactersToShow = Math.ceil(wordLength / 2);

    // Extract characters for left and right parts
    let leftPart = wordToDisplay.substring(0, charactersToShow);
    let rightPart = wordToDisplay.substring(charactersToShow + 1); // Exclude the character at the optimal recognition point

    // Extract the character at the optimal recognition point
    let recognitionPoint = wordToDisplay.charAt(charactersToShow);

    // Calculate the total width of the displayed word
    let wordWidth = leftPart.length + rightPart.length + 1; // Adding 1 for the highlighted character

    // Calculate padding for both sides of the highlighted character
    let padding = Math.floor((wordWidth - 1) / 2);

    // Combine left part, optimal recognition point, and right part with padding
    let formattedWord = 
        "<span style='color: black;'>" + leftPart + "</span>" +
        "<span style='color: red;'>" + recognitionPoint + "</span>" +
        "<span style='color: black;'>" + rightPart + "</span>";

    // Apply padding for both sides of the formatted word
    formattedWord = formattedWord.padStart(formattedWord.length + padding, ' ');
    formattedWord = formattedWord.padEnd(formattedWord.length + padding, ' ');

    // Display the word
    wordDisplay.innerHTML = formattedWord;
    
    let OldWPM = WPM
    if (Math.abs(WPM-TargetWPM) > SpeedTransitionIncrement){
        let Dir = clamp(TargetWPM-WPM,-1,1)
        WPM = WPM + Dir*SpeedTransitionIncrement
    } else {
        WPM = TargetWPM
    }
    if (OldWPM != WPM){
        console.log(WPM)
    }
    let element = document.getElementById("progress")
    element.style.width = ((index/(Length-1))*100) + "%";
}
ChangeSpeed(150);
UpdateButtonVisuals()