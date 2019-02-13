//Hämtar elementen från textfälten som placeras sedan i länken efter användaren klickat på skicka
var title = document.getElementsByName('title').value
var date = document.getElementsByName('date').value
var startTid = document.getElementsByName('startTid').value
var slutTid = document.getElementsByName('slutTid').value
var plats = document.getElementsByName('plats').value
var beskrivning = document.getElementsByName('beskrivning').value

//scriptet som skickar POST Request(lägger till i kalender) i Canvas, kräver xhr2(fick inte de och fungera annars)
//kräver även nodejs och XMLHttpRequest
//Denna implementering var simpel i Java med hjälp av OKHttp, men i Javascript blev de problematiskt
//tills jag laddade ner xhr2, tror den andra är utdaterad. Jquery Ajax fungerade heller inte
//läste att de berodde på att webbläsaren blockerade requests om de inte är från en trusted-source/extern app(tex Postman)
//fanns inte heller något sätt för att implementera cURL i JS(baserat på Google-sökningar)
var data = null;


var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
//anger att vi måste authenticera
xhr.withCredentials = true;

//consolen respondar med status(så man ser strängen som skickas)
xhr.addEventListener("readystatechange", function() {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

//userID och auth token hann jag inte implementera i html sidan så de fungerar. Istället specificeras dessa två nedan
//man kan byta ut värdena (vid User_49026 i länken) och Authorization så själva POST requesten fungerar, resten är dynamiska från textfälten

//xhr.open("POST", "https://ltu.instructure.com/api/v1/calendar_events.json?calendar_event[context_code]=User_49026&calendar_event[start_at]=2019-01-15T13:00:00Z&calendar_event[end_at]=2019-01-159T15:00:00Z&calendar_event[location_name]=zoom&calendar_event[description]=en%20vanlig%20lektion&calendar_event[title]=lektion");
xhr.open("POST", "https://ltu.instructure.com/api/v1/calendar_events.json?calendar_event[context_code]=User_49026&calendar_event[start_at]=" + date + "T" + startTid + "&calendar_event[end_at]=" + date + "T" + slutTid + "&calendar_event[location_name]=" + plats + "&calendar_event[description]=" + beskrivning + "&calendar_event[title]="title");

xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Authorization", "");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Postman-Token", "");

xhr.send(data);
