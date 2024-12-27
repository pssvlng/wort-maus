document.addEventListener("DOMContentLoaded", function () {
  const wortInput = document.getElementById("wort-input");
  const wortArtInput = document.getElementById("wortart-input");
  const wortInputButton = document.getElementById("wort-input-button");
  const wort_query = 'https://lehrplan.yovisto.com/sparql?default-graph-uri=&query=select distinct * where {?s a <https://w3id.org/lehrplan/ontology/LP_00000001> .?s rdfs:label ?label FILTER(CONTAINS(LCASE(?label), "__SUBJECT__"))}';
  wortInputButton.addEventListener("click", async function () {
      const wort = wortInput.value.trim();     
      const wortArt = wortArtInput.value.trim();
      
      if (wort) {
        const endpoint = "https://kaiko.getalp.org/sparql";

        const sparqlQuery = `
            PREFIX ontolex: <http://www.w3.org/ns/lemon/ontolex#>
            PREFIX lexinfo: <http://www.lexinfo.net/ontology/3.0/lexinfo#>
            PREFIX dbnary: <http://kaiko.getalp.org/dbnary#>
            PREFIX dcterms: <http://purl.org/dc/terms/>
    
            SELECT DISTINCT ?lemma ?partOfSpeech ?gloss WHERE {
              ?lexicalEntry ontolex:canonicalForm/ontolex:writtenRep ?lemma ;
                             lexinfo:partOfSpeech ?partOfSpeech ;
                             dbnary:definition/dbnary:gloss ?gloss .
              FILTER(lang(?lemma) = "de" && ?lemma = "${wort}" && ?partOfSpeech = lexinfo:${wortArt})
            }
        `;
    
        const url = endpoint + "?query=" + encodeURIComponent(sparqlQuery) + "&format=json";
    
        try {
            const response = await fetch(url, { method: "GET" });
            if (!response.ok) throw new Error("Error querying SPARQL endpoint");
            const json = await response.json();
            console.log(json.results.bindings);
        } catch (error) {
            console.error("Error:", error);
        }
        
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //url = wort_query.replace('__SUBJECT__', wort.toLowerCase())  
        //chrome.tabs.update(tabs[0].id, { url: url });
        });
      } else {
          alert("Bitte Wort eintragen");
      }
  });

  wortInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {  
        event.preventDefault();    
        const subjectSearchText = wortInput.value.trim();      
        if (subjectSearchText) {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          url = wort_query.replace('__SUBJECT__', subjectSearchText.toLowerCase())  
          chrome.tabs.update(tabs[0].id, { url: url });
          });
        } else {
          alert("Bitte Schulfach eintragen");
        }
    }
  });

  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
      header.addEventListener('click', function() {
          const content = this.nextElementSibling;
          const symbol = this.querySelector('.symbol');          
          if (content.style.display === 'block') {
              content.style.display = 'none';
              symbol.textContent = '+';
          } else {
              content.style.display = 'block';
              symbol.textContent = '-';
          }
      });
  });

});