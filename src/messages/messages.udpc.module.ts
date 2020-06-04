export const messages = {
    de: {
        udpc: {
            newDatassets: 'Neueste Datensätze',
            sensors: 'Sensoren',
            visitors: 'Besucher',
            access: 'Karte',
            access_overlay_head: 'Karten Zugriffe',
            countBy: 'Anzahl Datensätze nach',
            countTotal: 'Anzahl Datensätze total',
            includeDevPlan: 'Bebauungspläne mit einbeziehen',
            includeMapHits: 'Hintergrundkarte mit einbeziehen',
            map: 'Karte',
            top10: 'Top 10 des Monats',
            top10_datasets: 'Top 10 Datensätze des Monats',
            top10_apps: 'Top 10 Apps des Monats',
            top10_downloads: 'Top 10 Downloads des Monats',
            download: 'Downloads',
            accessTopicData: 'Zugriffe gesamt',
            accessApps: 'Zugriffe Apps',
            didYouKnow: 'Wussten Sie schon?',
            facts: 'Wussten Sie schon: %{fact}',
            tabTopics: 'Themen',
            tabOrganisations: 'Organisationen',
            tabSensors: 'Sensordatensätze',
            tabYear: 'Jahr',
            tabMonth: 'Monat',
            tabDay: 'Tag',
            tabDatasets: 'Datensätze',
            tabApps: 'Apps',
            tabDownloads: 'Downloads',
            filter: 'Filter',
            themeFilter: 'Nach Thema filtern',
            orgFilter: 'Nach Organisation filtern',
            clearFilter: 'Filter zurücksetzen',

            sliderEarlier: '< früher',
            sliderLater: 'später >',

            tooltipDidYouKnow: '<p>In dieser Kachel präsentieren wir ein paar Fakten rund um die Urban Data Platform Hamburg.</p>' +
             'PLATZHALTER \n' +
             '<p>Weitere Informationen finden Sie hier: <a href="www.urbandataplatform.hamburg" target="_blank">urbandataplatform.hamburg</a></p>',
            tooltipLatestDataSets: 'PLATZHALTER',
            tooltipGeneralLink: 'Link in neuem Tab öffnen',
            tooltipHdmkLink: 'Zum Eintrag im Hamburger Metadaten Katalog',
            tooltipSensors: 'Anzahl der Sensoren, die in der SensorThingsAPI als Thing definiert wurden.\n' +
             'Die Zahl bezieht sich auf den jeweils vorherigen Kalendermonat.\n' +
             'Quelle: <a href="https://iot.hamburg.de/v1.0/Datastreams?$count=true" target="_blank">iot.hamburg.de</a>',
            tooltipVisitorsToday: 'Hier wird die Gesamtanzahl an eindeutigen Besucher von <a href="http://www.geoportal-hamburg.de/geo-online/" target="_blank">Geo-Online</a> und Geodaten Hamburg (FHH-Atlas im Intranet der FHH) des jeweils vorherigen Kalendermonats angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipBackgroundAccess: '<p>Diese Kachel gibt die Zugriffe auf die Hintergrundkarten des jeweils vorherigen abgeschlossenen Kalendermonats an. \n' +
             'Die Hintergrundkarten  sind:</p>' +
             'PLATZHALTER \n' +
             '<p>Quelle: Auswertung der awstats</p>',
            tooltipDatasetsBy: 'Zeigt die Anzahl der Datensätze des jeweils vorherigen abgeschlossenen Kalendermonats nach Thema oder Organisation, die im Hamburger Metadatenkatalog zuletzt beschrieben wurden und mit produktiven Internet- und Intranet-Diensten (WFS/WMS) gekoppelt sind. \n' +
             'Da die Bebauungspläne einen Großteil der Datensätze ausmachen, gibt es eine Möglichkeit diese aus der Ansicht herauszufiltern. \n' +
             'Die Metadatensatzbeschreibungen von im Internet veröffentlichten Datensätzen finden Sie unter <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Ein Klick auf ein Thema oder eine Organisation filtert auf die jeweils zugehörigen Datensätze.\n' +
             'Quelle: Metadaten der Datensätze (Hamburger Metadatenkatalog – HMDK)',
            tooltipCountTotal: 'Zeigt die Anzahl der Datensätze, Anwendungen (Apps) und Sensordatensätze pro Monat oder Jahr in einem historischen Zeitverlauf an.\n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei. Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen.\n' +
             'Eine Checkbox mit/ohne Bebauungspläne ermöglicht das Einbeziehen und Herausfiltern von Datensätzen, die zu den Bebauungsplänen gehören.\n' +
             'Unter Apps wird die Gesamtzahl von allen im Internet und Intranet erreichbaren Anwendungen des LGV in einem monatlichen oder jährigen Zeitverlauf aufgeführt.  \n' +
             'Sensordatensätze beschreiben alle Datensätze, die mittels Sensoren in bzw. nahezu in Echtzeit erstellt und aktualisiert werden. Sie sind eine Teilmenge der Datensätze.\n' +
             'Checkbox mit/ohne Bebauungspläne ermöglicht das Einbeziehen und Herausfiltern von Datensätzen, die zu den Bebauungsplänen gehören.\n' +
             'Quelle: Metadaten der Datensätze, Sensordatensätze und Anwendungen (Hamburger Metadatenkatalog – HMDK)',
            tooltipMap: 'Ein Klick auf den Datensatznamen in der Rubrik „Neuste Datensätze“ führt zu einer Vorschau des Datensatzes in der Karte.\n' +
             'Neuste Datensätze sind die 10 Datensätze, die im Hamburger Metadatenkatalog zuletzt beschrieben wurden (create date) und mit produktiven Diensten (WFS/WMS) gekoppelt sind. \n' +
             'Ein Klick auf den Vergrößerungsbutton stoppt den Durchlauf der „Neusten Datensätze“ und zeigt den aktuellen Datensatz in der vergrößerten Karte an.\n' +
             'Die Metadatensatzbeschreibungen von im Internet veröffentlichten Datensätzen finden Sie unter <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Quelle: Metadaten der Datensätze (Hamburger Metadatenkatalog – HMDK)',
            tooltipTop_datasets: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.</p>' +
             '<h6>Die Top 10 Datensätze sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Bei den Apps werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.\n' +
             'Bei den Downloads werden alle Daten berücksichtigt, die über den Server: <a href="http://daten-hamburg.de" target="_blank">daten-hamburg.de</a> heruntergeladen wurden. \n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipTop_apps: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.</p>' +
             '<h6>Die Top 10 Apps sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Bei den Apps werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.\n' +
             'Bei den Downloads werden alle Daten berücksichtigt, die über den Server: <a href="http://daten-hamburg.de" target="_blank">daten-hamburg.de</a> heruntergeladen wurden. \n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipTop_downloads: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.</p>' +
             '<h6>Die Top 10 Downloads sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Bei den Apps werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.\n' +
             'Bei den Downloads werden alle Daten berücksichtigt, die über den Server: <a href="http://daten-hamburg.de" target="_blank">daten-hamburg.de</a> heruntergeladen wurden. \n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipDownloads: 'Es wird die Anzahl der monatlichen bzw. jährlichen Downloads in einem historischen Zeitverlauf angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessData: 'Hier werden die monatlichen bzw. jährlichen Zugriffe auf die Fachdaten im Internet und Intranet der FHH mit Historie angegeben. Fachdaten sind alle Datensätze, die keine Hintergrundkarten sind.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessApps: 'Es werden die monatlichen bzw. jährlichen Gesamtzugriffe auf die Internet- und Intranet-Anwendungen (Apps) des LGV in einem historischen Zeitverlauf angezeigt.\n' +
             'Welche Apps dazu gehören erfahren Sie in den Metadatenkatalogen:\n' +
             'Link für Internet-Apps: <a href="https://metaver.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">metaver.de/freitextsuche</a> \n' +
             'Link für Intranet-Apps: <a href="http://hmdk.fhhnet.stadt.hamburg.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">hmdk.fhhnet.stadt.hamburg.de</a> \n' +
             'Quelle: Auswertung der awstats',


            privacy: 'Datenschutz',
            legal: 'Impressum'
        }
    },
    en: {
        udpc: {
            newDatassets: 'Latest datasets',
            sensors: 'Sensors',
            visitors: 'Visitors today',
            access: 'Map',
            access_overlay_head: 'Map access',
            countBy: 'Datasets by',
            countTotal: 'Count total',
            includeDevPlan: 'Include development plans',
            includeMapHits: 'Include background map',
            map: 'Map',
            top10: 'Monthly top 10',
            top10_datasets: 'Monthly top 10 Datasets',
            top10_apps: 'Monthy top 10 Apps',
            top10_downloads: 'Monthly top 10 Downloads',
            download: 'Downloads',
            accessTopicData: 'Total access',
            accessApps: 'Access Apps',
            didYouKnow: 'Did you know?',
            facts: 'Did you know: %{fact}',
            tabTopics: 'Topics',
            tabOrganisations: 'Organisations',
            tabSensors: 'Sensors',
            tabYear: 'Year',
            tabMonth: 'Month',
            tabDay: 'Day',
            tabDatasets: 'Datasets',
            tabApps: 'Apps',
            tabDownloads: 'Downloads',
            filter: 'Filter',
            themeFilter: 'Filter by theme',
            orgFilter: 'Filter by organization',
            clearFilter: 'Reset filters',

            sliderEarlier: '< earlier',
            sliderLater: 'later >',

            tooltipDidYouKnow: '<p>In dieser Kachel präsentieren wir ein paar Fakten rund um die Urban Data Platform Hamburg.</p>' +
             'PLATZHALTER \n' +
             '<p>Weitere Informationen finden Sie hier: <a href="www.urbandataplatform.hamburg" target="_blank">urbandataplatform.hamburg</a></p>',
            tooltipLatestDataSets: 'PLATZHALTER',
            tooltipGeneralLink: 'Open Link to new tab',
            tooltipHdmkLink: 'To the Hamburg Meta-Data Catalogue',
            tooltipSensors: 'Anzahl der Sensoren, die in der SensorThingsAPI als Thing definiert wurden.\n' +
             'Die Zahl bezieht sich auf den jeweils vorherigen Kalendermonat.\n' +
             'Quelle: <a href="https://iot.hamburg.de/v1.0/Datastreams?$count=true" target="_blank">iot.hamburg.de</a>',
            tooltipVisitorsToday: 'Hier wird die Gesamtanzahl an eindeutigen Besucher von <a href="http://www.geoportal-hamburg.de/geo-online/" target="_blank">Geo-Online</a> und Geodaten Hamburg (FHH-Atlas im Intranet der FHH) des jeweils vorherigen Kalendermonats angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipBackgroundAccess: '<p>Diese Kachel gibt die Zugriffe auf die Hintergrundkarten des jeweils vorherigen abgeschlossenen Kalendermonats an. \n' +
             'Die Hintergrundkarten  sind:</p>' +
             'PLATZHALTER \n' +
             '<p>Quelle: Auswertung der awstats</p>',
            tooltipDatasetsBy: 'Zeigt die Anzahl der Datensätze des jeweils vorherigen abgeschlossenen Kalendermonats nach Thema oder Organisation, die im Hamburger Metadatenkatalog zuletzt beschrieben wurden und mit produktiven Internet- und Intranet-Diensten (WFS/WMS) gekoppelt sind. \n' +
             'Da die Bebauungspläne einen Großteil der Datensätze ausmachen, gibt es eine Möglichkeit diese aus der Ansicht herauszufiltern. \n' +
             'Die Metadatensatzbeschreibungen von im Internet veröffentlichten Datensätzen finden Sie unter <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Ein Klick auf ein Thema oder eine Organisation filtert auf die jeweils zugehörigen Datensätze.\n' +
             'Quelle: Metadaten der Datensätze (Hamburger Metadatenkatalog – HMDK)',
            tooltipCountTotal: 'Zeigt die Anzahl der Datensätze, Anwendungen (Apps) und Sensordatensätze pro Monat oder Jahr in einem historischen Zeitverlauf an.\n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei. Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen.\n' +
             'Eine Checkbox mit/ohne Bebauungspläne ermöglicht das Einbeziehen und Herausfiltern von Datensätzen, die zu den Bebauungsplänen gehören.\n' +
             'Unter Apps wird die Gesamtzahl von allen im Internet und Intranet erreichbaren Anwendungen des LGV in einem monatlichen oder jährigen Zeitverlauf aufgeführt.  \n' +
             'Sensordatensätze beschreiben alle Datensätze, die mittels Sensoren in bzw. nahezu in Echtzeit erstellt und aktualisiert werden. Sie sind eine Teilmenge der Datensätze.\n' +
             'Checkbox mit/ohne Bebauungspläne ermöglicht das Einbeziehen und Herausfiltern von Datensätzen, die zu den Bebauungsplänen gehören.\n' +
             'Quelle: Metadaten der Datensätze, Sensordatensätze und Anwendungen (Hamburger Metadatenkatalog – HMDK)',
            tooltipMap: 'Ein Klick auf den Datensatznamen in der Rubrik „Neuste Datensätze“ führt zu einer Vorschau des Datensatzes in der Karte.\n' +
             'Neuste Datensätze sind die 10 Datensätze, die im Hamburger Metadatenkatalog zuletzt beschrieben wurden (create date) und mit produktiven Diensten (WFS/WMS) gekoppelt sind. \n' +
             'Ein Klick auf den Vergrößerungsbutton stoppt den Durchlauf der „Neusten Datensätze“ und zeigt den aktuellen Datensatz in der vergrößerten Karte an.\n' +
             'Die Metadatensatzbeschreibungen von im Internet veröffentlichten Datensätzen finden Sie unter <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Quelle: Metadaten der Datensätze (Hamburger Metadatenkatalog – HMDK)',
            tooltipTop_datasets: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.</p>' +
             '<h6>Die Top 10 Datasets sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Bei den Apps werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.\n' +
             'Bei den Downloads werden alle Daten berücksichtigt, die über den Server: <a href="http://daten-hamburg.de" target="_blank">daten-hamburg.de</a> heruntergeladen wurden. \n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipTop_apps: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.</p>' +
             '<h6>Die Top 10 Apps sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Bei den Apps werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.\n' +
             'Bei den Downloads werden alle Daten berücksichtigt, die über den Server: <a href="http://daten-hamburg.de" target="_blank">daten-hamburg.de</a> heruntergeladen wurden. \n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipTop_downloads: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.</p>' +
             '<h6>Die Top 10 Downloads sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Bei den Apps werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.\n' +
             'Bei den Downloads werden alle Daten berücksichtigt, die über den Server: <a href="http://daten-hamburg.de" target="_blank">daten-hamburg.de</a> heruntergeladen wurden. \n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipDownloads: 'Es wird die Anzahl der monatlichen bzw. jährlichen Downloads in einem historischen Zeitverlauf angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessData: 'Hier werden die monatlichen bzw. jährlichen Zugriffe auf die Fachdaten im Internet und Intranet der FHH mit Historie angegeben. Fachdaten sind alle Datensätze, die keine Hintergrundkarten sind.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessApps: 'Es werden die monatlichen bzw. jährlichen Gesamtzugriffe auf die Internet- und Intranet-Anwendungen (Apps) des LGV in einem historischen Zeitverlauf angezeigt.\n' +
             'Welche Apps dazu gehören erfahren Sie in den Metadatenkatalogen:\n' +
             'Link für Internet-Apps: <a href="https://metaver.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">metaver.de/freitextsuche</a> \n' +
             'Link für Intranet-Apps: <a href="http://hmdk.fhhnet.stadt.hamburg.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">hmdk.fhhnet.stadt.hamburg.de</a> \n' +
             'Quelle: Auswertung der awstats',

            privacy: 'Data privacy',
            legal: 'Legal notice'
        }
    }
};