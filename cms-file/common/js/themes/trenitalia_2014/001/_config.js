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
    repName : {"Venezia Mestre Ospedale":"Ve.Mestre Ospedale", "Reggio di Calabria  ( Tutte Le Stazioni )":"Reggio di Calabria ( T. Stazioni )", "Parigi Gare De Lyon":"Paris", "Paris-Gare-De-Lyon":"Paris", "Digione":"Dijon", "Vienna Meidling":"Wien Meidling", "Vienna Neustadt":"Wiener Neustadt", "Vienna":"Wien (city)", "Wiener Neustadt":"Wien (city)", "Wien Meidling":"Wien (city)", "Monaco Hbf":"Muenchen Hbf", "Monaco Ost":"Muenchen Ost PBF", "Monaco di Baviera":"Muenchen (City)", "Salisburgo":"Salzburg Hbf", "Zurigo":"Zuerich Hb", "Ginevra":"Geneve", "Losanna":"Lausanne", "Basilea":"Basel Sbb", "Santa Margherita Ligure-Portofino":"S. Margherita Ligure-Portofino", "S. Croce del Lago":"Santa Croce del Lago", "S. Croce di Trieste":"Santa Croce di Trieste", "S. Domenica":"Santa Domenica", "S. Luce":"Santa Luce", "S. Maria la Bruna":"Santa Maria la Bruna", "S. Severa":"Santa Severa", "Santa Margherita di Calabria":"S. Margherita di Calabria", "Formia":"Formia-Gaeta", "Roma":"Roma ( Tutte Le Stazioni )", "Milano":"Milano ( Tutte Le Stazioni )", "Firenze":"Firenze ( Tutte Le Stazioni )", "Napoli":"Napoli ( Tutte Le Stazioni )", "Bologna":"Bologna ( Tutte Le Stazioni )", "Venezia":"Venezia ( Tutte Le Stazioni )", "Torino":"Torino ( Tutte Le Stazioni )", "Sanremo":"San Remo", "Santa Marinella":"S. Marinella", "Roma San Pietro":"Roma S. Pietro", "Sant'Alessio Siculo-Forza D'Agro":"S. Alessio Siculo-Forza D'Agro", "Reggio di Calabria":"Reggio di Calabria ( T. Stazioni )", "Nizza":"Nice-Ville", "Marsiglia":"Marseille-Saint-Charles","Vienna Hauptbahnhof":"Wien Hauptbahnhof","Saint Raphael":"Saint-Raphael-Valescure","Lucerna":"Luzern"}
}



/*** TESTI ***/

var _labels = {
    it: {
        msg1 : "La stazione di partenza e' obbligatoria \nLa stazione d'arrivo e' obbligatoria",
        msg2 : "La stazione di partenza e' obbligatoria",
        msg3 : "La stazione d'arrivo e' obbligatoria",
        msg4 : "La citta' di partenza non e' disponibile",
        msg5 : "La citta' di ritorno non e' disponibile",
        msg6 : "Hai superato il limite massimo di posti prenotabili (max. 5)",
        msg7 : "La data di partenza e' obbligatoria",
        msg8 : "Il formato corretto della data e' gg-mm-aaaa",
        msg9 : "La data di ritorno e' obbligatoria",
        msg10 : "Il formato corretto della data e' gg-mm-aaaa",
        msg11 : "La data di ritorno non e' corretta",
        msg12 : "Devi selezionare almeno un passeggero",
        msg13 : "La data inserita non e' corretta. Riprova, per favore",
        msg14 : "L'ora inserita non e' corretta. Riprova, per favore",
        msg15 : "Attenzione la data del viaggio di ritorno deve essere uguale o successiva a quella di andata.",
        msg16 : "La stazione di partenza inserita e' errata o non servita dalle Frecce. \nVerifica la correttezza selezionando la stazione dall'apposito elenco o, se non presente, seleziona l'opzione TUTTI I TRENI",
        msg17 : "La stazione di arrivo inserita e' errata o non servita dalle Frecce. \nVerifica la correttezza selezionando la stazione dall'apposito elenco o, se non presente, seleziona l'opzione TUTTI I TRENI",
        msg18 : "Attenzione l'ora  del viaggio di ritorno deve essere successiva a quella dell'andata",
        msg19 : "La stazione di partenza inserita e' errata. \nVerifica la correttezza selezionando la stazione dall'apposito elenco.",
        msg20 : "La stazione di arrivo inserita e' errata. \nVerifica la correttezza selezionando la stazione dall'apposito elenco.",
        msg21 : "La stazione di partenza non e' valida",
        msg22 : "La stazione di arrivo non e' valida",
        monthNames : ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
        dayNames: [ "Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato" ],
        dayNamesMin : ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
        buttonCal: "Apri il calendario",
        textLinkFooterClose : "Chiudi",
        textLinkFooterOpen : "Apri",
        titleLinkFooterClose : "Chiudi il footer",
        titleLinkFooterOpen : "Apri il footer"
    },
    en: {
        msg1 : "You have to state Departure station/Arrival station",
        msg2 : "You have to state Departure station",
        msg3 : "You have to state Arrival station",
        msg4 : "The Departure station is not available",
        msg5 : "The Arrival station is not available",
        msg6 : "You exceeded the maximum number of seats you can book (max. 5)",
        msg7 : "You have to state the date of departure",
        msg8 : "Date format must be wrong. Please, state it: dd/mm/YYYY",
        msg9 : "You have to state the return date",
        msg10 : "Date format must be wrong. Please, state it: dd/mm/YYYY",
        msg11 : "Return date is not correct",
        msg12 : "You have to state a passenger",
        msg13 : "The date you entered is not correct! Please select again",
        msg14 : "The time you entered is not correct! Please select again",
        msg15 : "Please note the date of the return journey must be equal to or later than departure date.",
        msg16 : "The departure station entered is not correct or not served by Le FRECCE. \nPlease select the station form the list, or, if not present, select the option All Trains",
        msg17 : "The arrival station entered is not correct or not served by Le FRECCE. \nPlease select the station form the list, or, if not present, select the option All Trains",
        msg18 : "Please note the return time must be later than the departure time",
        msg19 : "The departure station you entered is incorrect. \nPlease select the station from the list. ",
        msg20 : "The arrival station entered is incorrect. \nPlease select the station from the list. ",
        msg21 : "The departure station is not valid",
        msg22 : "The destination station is not valid",
        monthNames : ["January","February","March","April","May","June","July","August","September","October","November","December"],
        dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        dayNamesMin : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri ", "Sat "],
        buttonCal: "Open the calendar",
        textLinkFooterClose : "Close",
        textLinkFooterOpen : "Open",
        titleLinkFooterClose : "Close footer",
        titleLinkFooterOpen : "Open footer"
    }
}