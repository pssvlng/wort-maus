if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        modifyLinks();
    });
} else {
    modifyLinks();
}

function modifyLinks() {
    const startString = "https://w3id.org/lehrplan/ontology/";
    const newBaseURL = "https://lehrplan.yovisto.com/sparql?default-graph-uri=&query=SELECT DISTINCT * WHERE { <__SUBJECT__> ?predicate ?object . } ORDER BY (isIRI(?object)) ASC(?object)";
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith(startString)) {
            newHref = newBaseURL
            newHref = newHref.replace('__SUBJECT__', href)
            link.setAttribute('href', newHref);
        }
    });
}

