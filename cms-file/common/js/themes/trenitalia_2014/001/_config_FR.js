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



/*** TESTI LINGUA FRANCESE***/

var _labels = {
    en: {
        msg1 : "La gare de départ est obligatoire \nLa gare d'arrivée est obligatoire",
        msg2 : "La gare de départ est obligatoire",
        msg3 : "La gare d'arrivée est obligatoire",
        msg4 : "La ville de départ n'est pas disponible",
        msg5 : "La ville de retour n'est pas disponible",
        msg6 : "Vous avez dépassé le nombre maximum de places pouvant être réservées (max. 5)",
        msg7 : "La date de départ est obligatoire",
        msg8 : "Le format correct pour la date est jj-mm-aaaa",
        msg9 : "La date de retour est obligatoire",
        msg10 : "Le format correct pour la date est jj-mm-aaaa",
        msg11 : "La date de retour n'est pas correcte",
        msg12 : "Vous devez sélectionner au moins un passager",
        msg13 : "La date insérée n'est pas correcte. Veuillez réessayer",
        msg14 : "L'heure insérée n'est pas correcte. Veuillez réessayer",
        msg15 : "Attention la date du voyage de retour doit être la même ou postérieure à celle de l'aller.",
        msg16 : "La gare de départ insérée est erronée ou n'est pas desservie par les trains Frecce. \nVérifiez en sélectionnant la gare dans la liste déroulante ou, si elle n'est pas présente, sélectionnez TOUS LES TRAINS",
        msg17 : "La gare d'arrivée insérée est erronée ou n'est pas desservie par les trains Frecce. \nVérifiez en sélectionnant la gare dans la liste déroulante ou, si elle n'est pas présente, sélectionnez TOUS LES TRAINS",
        msg18 : "Attention l'heure du voyage de retour doit être postérieure à celle de l'aller",
        msg19 : "La gare de départ insérée est erronée. \nVérifiez en sélectionnant la gare dans la liste déroulante.",
        msg20 : "La gare d'arrivée insérée est erronée. \nVérifiez  en sélectionnant la gare dans la liste déroulante.",
        msg21 : "La gare de départ n'est pas valide",
        msg22 : "La gare d'arrivée n'est pas valide",
        monthNames : ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
        dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
        dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
        buttonCal: "Ouvrir le calendrier",
        textLinkFooterClose : "Fermer",
        textLinkFooterOpen : "Ouvrir",
        titleLinkFooterClose : "Fermer le pied de page",
        titleLinkFooterOpen : "Ouvrir le pied de page"
    },
    it: {
        msg1 : "La gare de départ est obligatoire \nLa gare d'arrivée est obligatoire",
        msg2 : "La gare de départ est obligatoire",
        msg3 : "La gare d'arrivée est obligatoire",
        msg4 : "La ville de départ n'est pas disponible",
        msg5 : "La ville de retour n'est pas disponible",
        msg6 : "Vous avez dépassé le nombre maximum de places pouvant être réservées (max. 5)",
        msg7 : "La date de départ est obligatoire",
        msg8 : "Le format correct pour la date est jj-mm-aaaa",
        msg9 : "La date de retour est obligatoire",
        msg10 : "Le format correct pour la date est jj-mm-aaaa",
        msg11 : "La date de retour n'est pas correcte",
        msg12 : "Vous devez sélectionner au moins un passager",
        msg13 : "La date insérée n'est pas correcte. Veuillez réessayer",
        msg14 : "L'heure insérée n'est pas correcte. Veuillez réessayer",
        msg15 : "Attention la date du voyage de retour doit être la même ou postérieure à celle de l'aller.",
        msg16 : "La gare de départ insérée est erronée ou n'est pas desservie par les trains Frecce. \nVérifiez en sélectionnant la gare dans la liste déroulante ou, si elle n'est pas présente, sélectionnez TOUS LES TRAINS",
        msg17 : "La gare d'arrivée insérée est erronée ou n'est pas desservie par les trains Frecce. \nVérifiez en sélectionnant la gare dans la liste déroulante ou, si elle n'est pas présente, sélectionnez TOUS LES TRAINS",
        msg18 : "Attention l'heure du voyage de retour doit être postérieure à celle de l'aller",
        msg19 : "La gare de départ insérée est erronée. \nVérifiez en sélectionnant la gare dans la liste déroulante.",
        msg20 : "La gare d'arrivée insérée est erronée. \nVérifiez  en sélectionnant la gare dans la liste déroulante.",
        msg21 : "La gare de départ n'est pas valide",
        msg22 : "La gare d'arrivée n'est pas valide",
        monthNames : ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
        dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
        dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
        buttonCal: "Ouvrir le calendrier",
        textLinkFooterClose : "Fermer",
        textLinkFooterOpen : "Ouvrir",
        titleLinkFooterClose : "Fermer le pied de page",
        titleLinkFooterOpen : "Ouvrir le pied de page"
    }
}