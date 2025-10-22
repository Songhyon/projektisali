# Projektin nimi ja tekijät
**Projektin nimi:** NordFit Workout List  
**Tekijät:** [Anthony, Santeri]

---

# Verkkolinkit
- Julkaistu sovellus: [NordFit Workout List](https://nordfit.netlify.app)  
- Projektin videoesittelyt:  
  - [Anthony Video](https://video.laurea.fi/media/sali+sovellus/0_6wf4cj8e)  
  - [Santerin Video](#)

---

# Työn jakautuminen
**Työmäärän jako:**  
- Anthony: [esim. front-end ja harjoitusvideot ja exercise valikon vaihto ja clear button ja päivien järjestys]  
- Santeri: [esim. localStorage-tallennus ja lomakkeiden toteutus ja checkbox]  
- Yhteistyö sujui hyvin, työtehtävät jaettiin selkeästi ja kommunikaatio oli toimivaa.

---

# Oma arvio työstä ja oman osaamisen kehittymisestä
Anthony
- Mielestäni onnistuin: toteuttamaan toimivan interaktiivisen treenilistan ja videon upotukset.  
- Parantamista olisi: käyttöliittymän hiominen ja mobiiliystävällisyys.  
- Sovelluksesta jäi puuttumaan: mahdollisuus muokata lisättyjä harjoituksia jälkikäteen.  
- Koen, että olen oppinut: JavaScriptin DOM-manipulaatiota, localStoragea ja web-sovellusten perusrakenteen.    

Santeri
-

---

# Palaute opettajalle kurssista sekä itse opetuksesta tähän saakka
- Kurssi sekä lähiopetus ovat tuntuneet hyödyllisiltä ja selkeiltä.  

---

# Sisällysluettelo
1. [Tietoja sovelluksesta](#tietoja-sovelluksesta)  
2. [Tunnetut virheet/bugit](#tunnetut-virheetbugit)  
3. [Teknologiat](#teknologiat)  
4. [Asennus](#asennus)  
5. [Lähestymistapa](#lähestymistapa)  
6. [Kiitokset](#kiitokset)  
7. [Lisenssi](#lisenssi)

---

# Tietoja sovelluksesta
**NordFit Workout List** on yksinkertainen web-sovellus, jonka avulla käyttäjät voivat suunnitella viikoittaisen treeniohjelmansa, lisätä harjoituksia eri päiville, seurata toistoja ja sarjoja sekä katsella harjoitusvideoita.

**Ominaisuudet:**
- Valitse päivä ja treenityyppi (Leg Day, Arm Day, Chest Day, Back Day, Cardio, Rest).  
- Lisää useita harjoituksia kerralla yhdelle päivälle.  
- Anna sarjojen (sets) ja toistojen (reps) määrät.  
- Harjoitukset tallennetaan paikallisesti selaimeen (localStorage), joten ne pysyvät tallessa sivun päivityksestä huolimatta.  
- Klikkaa harjoitusta nähdäksesi siihen liittyvän videon.  
- Väritetty lista auttaa hahmottamaan treenipäivät visuaalisesti.  
- Mahdollisuus tyhjentää koko treenilista yhdellä napilla.

---

# Tunnetut virheet/bugit
- Sovelluksessa ei voi muokata jo lisättyjä harjoituksia.  
- Pieniä visuaalisia ongelmia mobiilinäytöillä.  
- Videon upotus ei aina päivity heti uuden harjoituksen lisäämisen jälkeen.

---

# Teknologiat
- **HTML** – sivuston rakenne  
- **CSS** – ulkoasu ja tyylittely  
- **JavaScript** (vanilla JS) – interaktiot, lomakkeet, localStorage  
- **LocalStorage** – tietojen tallennus selaimessa  
- **YouTube upotetut videot** – harjoitusvideoiden näyttäminen

---

# Asennus
1. Lataa kaikki tiedostot ja avaa `index.html` selaimessasi  
2. Tai kloonaa repositorio: `git clone [https://github.com/Songhyon/projektisali.git]`  
3. Suorita tarvittaessa: `npm install`  
4. Käynnistä sovellus ja käytä lomakkeita normaalisti

---

# Lähestymistapa
- Sovellus rakennettiin käyttäen modulaarista JavaScriptiä ja DOM-manipulaatiota.  
- Harjoitusten tallennus toteutettiin localStorageen, jotta tiedot säilyvät sivun päivityksen jälkeen.  
- Projektin aikana keskityimme helppokäyttöiseen UI:hin ja selkeään värikoodaukseen eri treenipäiville.

---

# Kiitokset
- Ws3 school
- Kurssin materiaalit 
- Käytimme ChatGPT:tä ja Co pilottia apuna koodin rakenteen suunnittelussa ja virheiden korjaamisessa.
