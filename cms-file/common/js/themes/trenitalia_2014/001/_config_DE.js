/**** Configurazione ****/

var _cfg = {
    /* URL */
    stations : "/cms-file/common/js/themes/trenitalia_2014/001/list_json.js", /* OLD_URL list.json */
    /* img calendar */
    calImg : "/cms-file/common/css/themes/trenitalia_2014/001/i/ico_cal.gif",
    /* 1o giorno settimana, 0 domenica */
    firstDayCalendar : 1,
    /* path emotional image */
    blank : "/cms-file/common/css/themes/trenitalia_2014/001/i/blank.gif",
    advSearch : "https://www.lefrecce.it/B2CWeb/advanceSearchSubscription.do?parameter=initAdvanceSearchSubscription&amp;lang=it",
    /* stations do not replace */
    notReplaceSAN : ['San Benedetto Sambro-Castiglione P.', 'San Donato Milanese', 'San Gennaro', 'San Gottardo', 'San Lazzaro di Savena', 'San Maurizio Canavese', 'San Paolo', 'San Remo', 'San Secondo'],
    /* all stations */
    frAllStaz : ["Roma ( Tutte Le Stazioni )","Milano ( Tutte Le Stazioni )","Firenze ( Tutte Le Stazioni )","Napoli ( Tutte Le Stazioni )","Bologna ( Tutte Le Stazioni )","Venezia ( Tutte Le Stazioni )","Torino ( Tutte Le Stazioni )"],

    repName : {"Venezia Mestre Ospedale":"Ve.Mestre Ospedale", "Santarcangelo  di Romagna":"S. Arcangelo di Romagna", "Reggio di Calabria  ( Tutte Le Stazioni )":"Reggio di Calabria ( T. Stazioni )", "Parigi Gare De Lyon":"Paris Gare De Lyon", "Digione":"Dijon Ville", "Vienna Meidling":"Wien Meidling", "Vienna Neustadt":"Wiener Neustadt", "Vienna":"Wien (city)", "Wiener Neustadt":"Wien (city)", "Wien Meidling":"Wien (city)", "Monaco Hbf":"Muenchen Hbf", "Monaco Ost":"Muenchen Ost PBF", "Monaco di Baviera":"Muenchen (City)", "Salisburgo":"Salzburg Hbf", "Zurigo":"Zuerich Hb", "Ginevra":"Geneve", "Losanna":"Lausanne", "Basilea":"Basel Sbb", "Santa Margherita Ligure-Portofino":"S. Margherita Ligure-Portofino", "S. Croce del Lago":"Santa Croce del Lago", "S. Croce di Trieste":"Santa Croce di Trieste", "S. Domenica":"Santa Domenica", "S. Luce":"Santa Luce", "S. Maria la Bruna":"Santa Maria la Bruna", "S. Severa":"Santa Severa", "Santa Margherita di Calabria":"S. Margherita di Calabria", "Formia":"Formia-Gaeta", "Cava De' Tirreni" : "Cava dei Tirreni", "Roma":"Roma ( Tutte Le Stazioni )", "Milano":"Milano ( Tutte Le Stazioni )", "Firenze":"Firenze ( Tutte Le Stazioni )", "Napoli":"Napoli ( Tutte Le Stazioni )", "Bologna":"Bologna ( Tutte Le Stazioni )", "Venezia":"Venezia ( Tutte Le Stazioni )", "Torino":"Torino ( Tutte Le Stazioni )", "Sanremo":"San Remo", "Santa Marinella":"S. Marinella", "Sant'Alessio Siculo-Forza D'Agro":"S. Alessio Siculo-Forza D'Agro", "Reggio di Calabria":"Reggio di Calabria ( T. Stazioni )", "Nizza":"Nice ville", "Marsiglia":"Marseille-Saint-Charles","Vienna Hauptbahnhof":"Wien Hauptbahnhof","Saint Raphael":"St Raphael Valescure"}
}


/*** TESTI LINGUA TEDESCA ***/
var _labels = {
    en: {
        msg1 : "Der Abfahrtsbahnhof ist obligatorisch auszufüllen\nLDer Ankunftsbahnhof ist obligatorisch auszufüllen",
        msg2 : "Der Abfahrtsbahnhof ist obligatorisch auszufüllen",
        msg3 : "Der Ankunftsbahnhof ist obligatorisch auszufüllen",
        msg4 : "Die Stadt des Abfahrtsbahnhofs ist nicht verfügbar",
        msg5 : "Die Stadt des Rückkunftbahnhofs ist nicht verfügbar",
        msg6 : "Sie haben die Höchstanzahl der reservierbaren Sitzplätze überschritten (max. 5)",
        msg7 : "Das Abfahrtsdatum ist obligatorisch auszufüllen",
        msg8 : "Das korrekte Datumsformat lautet 'tt-mm-jjjj'",
        msg9 : "Das Rückreisedatum ist obligatorisch auszufüllen",
        msg10 : "Das korrekte Datumsformat lautet 'tt-mm-jjjj'",
        msg11 : "Das Rückreisedatum ist nicht korrekt",
        msg12 : "Sie müssen mindestens einen Fahrgast auswählen",
        msg13 : "Das eingegebene Datum ist nicht korrekt. Versuchen Sie es bitte noch einmal",
        msg14 : "Die eingegebene Uhrzeit ist nicht korrekt. Versuchen Sie es bitte noch einmal",
        msg15 : "Achtung! Das Datum der Rückreise muss mit dem Datum der Hinreise übereinstimmen oder nachfolgend sein.",
        msg16 : "Der eingegebene Abfahrtsbahnhof ist falsch oder wird von den Frecce-Zügen nicht angefahren. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus oder wählen Sie, wenn dieser nicht vorhanden ist, die Option ALLE ZÜGE aus",
        msg17 : "Der eingegebene Ankunftsbahnhof ist falsch oder wird von den Frecce-Zügen nicht angefahren. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus oder wählen Sie, wenn dieser nicht vorhanden ist, die Option ALLE ZÜGE aus",
        msg18 : "Achtung: Die Uhrzeit der Rückreise muss nach der Uhrzeit der Hinreise liegen",
        msg19 : "Der eingegebene Abfahrtsbahnhof ist falsch. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus.",
        msg20 : "Der eingegebene Ankunftsbahnhof ist falsch. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus.",
        msg21 : "Der Abfahrtsbahnhof ist ungültig",
        msg22 : "Der Ankunftsbahnhof ist ungültig",
        monthNames : ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
        dayNames: [ "Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag" ],
        dayNamesMin : ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
        buttonCal: "Kalender öffnen",
        textLinkFooterClose : "Schließen",
        textLinkFooterOpen : "Öffnen",
        titleLinkFooterClose : "Footer schließen",
        titleLinkFooterOpen : "Footer öffnen"
    },
    it: {
        msg1 : "Der Abfahrtsbahnhof ist obligatorisch auszufüllen\nLDer Ankunftsbahnhof ist obligatorisch auszufüllen",
        msg2 : "Der Abfahrtsbahnhof ist obligatorisch auszufüllen",
        msg3 : "Der Ankunftsbahnhof ist obligatorisch auszufüllen",
        msg4 : "Die Stadt des Abfahrtsbahnhofs ist nicht verfügbar",
        msg5 : "Die Stadt des Rückkunftbahnhofs ist nicht verfügbar",
        msg6 : "Sie haben die Höchstanzahl der reservierbaren Sitzplätze überschritten (max. 5)",
        msg7 : "Das Abfahrtsdatum ist obligatorisch auszufüllen",
        msg8 : "Das korrekte Datumsformat lautet 'tt-mm-jjjj'",
        msg9 : "Das Rückreisedatum ist obligatorisch auszufüllen",
        msg10 : "Das korrekte Datumsformat lautet 'tt-mm-jjjj'",
        msg11 : "Das Rückreisedatum ist nicht korrekt",
        msg12 : "Sie müssen mindestens einen Fahrgast auswählen",
        msg13 : "Das eingegebene Datum ist nicht korrekt. Versuchen Sie es bitte noch einmal",
        msg14 : "Die eingegebene Uhrzeit ist nicht korrekt. Versuchen Sie es bitte noch einmal",
        msg15 : "Achtung! Das Datum der Rückreise muss mit dem Datum der Hinreise übereinstimmen oder nachfolgend sein.",
        msg16 : "Der eingegebene Abfahrtsbahnhof ist falsch oder wird von den Frecce-Zügen nicht angefahren. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus oder wählen Sie, wenn dieser nicht vorhanden ist, die Option ALLE ZÜGE aus",
        msg17 : "Der eingegebene Ankunftsbahnhof ist falsch oder wird von den Frecce-Zügen nicht angefahren. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus oder wählen Sie, wenn dieser nicht vorhanden ist, die Option ALLE ZÜGE aus",
        msg18 : "Achtung: Die Uhrzeit der Rückreise muss nach der Uhrzeit der Hinreise liegen",
        msg19 : "Der eingegebene Abfahrtsbahnhof ist falsch. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus.",
        msg20 : "Der eingegebene Ankunftsbahnhof ist falsch. \n Überprüfen Sie bitte die Richtigkeit und wählen Sie den Bahnhof aus dem eigenen Verzeichnis aus.",
        msg21 : "Der Abfahrtsbahnhof ist ungültig",
        msg22 : "Der Ankunftsbahnhof ist ungültig",
        monthNames : ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
        dayNames: [ "Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag" ],
        dayNamesMin : ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
        buttonCal: "Kalender öffnen",
        textLinkFooterClose : "Schließen",
        textLinkFooterOpen : "Öffnen",
        titleLinkFooterClose : "Footer schließen",
        titleLinkFooterOpen : "Footer öffnen"
    }
}