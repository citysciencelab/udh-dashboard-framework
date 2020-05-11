export const messages = {
    de: {
        udpc: {
            newDatassets: 'Neueste Datensätze',
            sensors: 'Sensoren',
            visitors: 'Besucher',
            access: 'Karte',
            countBy: 'Anzahl nach',
            countTotal: 'Anzahl total',
            includeDevPlan: 'Bebauungspläne mit einbeziehen',
            includeMapHits: 'Hintergrundkarte mit einbeziehen',
            map: 'Karte',
            top5: 'Top 10 des Monats',
            download: 'Downloads',
            accessTopicData: 'Zugriffe Fachdaten',
            accessApps: 'Zugriffe Apps',
            didYouKNow: 'Wussten Sie schon?',
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
            themeFilter: 'Nach Thema filtern',
            orgFilter: 'Nach Organisation filtern',
            clearFilter: 'Filter zurücksetzen',

            sliderEarlier: '< früher',
            sliderLater: 'später >',

            tooltipDidYouKnow: 'In dieser Kachel präsentieren wir ein paar Fakten rund um die Urban Data Platform Hamburg. \n' +
             'Weitere Informationen finden Sie hier: <a href="www.urbandataplatform.hamburg" target="_blank">urbandataplatform.hamburg</a>',
            tooltipLatestDataSets: '',
            tooltipGeneralLink: 'Link in neuem Tab öffnen',
            tooltipHdmkLink: 'Zum Eintrag im Hamburger Metadaten Katalog',
            tooltipSensors: 'Anzahl der Sensoren, die in der SensorThingsAPI als Thing definiert wurden.\n' +
             'Die Zahl bezieht sich auf den jeweils vorherigen Kalendermonat.\n' +
             'Quelle: <a href="https://iot.hamburg.de/v1.0/Datastreams?$count=true" target="_blank">iot.hamburg.de</a>',
            tooltipVisitorsToday: 'Hier wird die Gesamtanzahl an eindeutigen Besucher von <a href="http://www.geoportal-hamburg.de/geo-online/" target="_blank">Geo-Online</a> und Geodaten Hamburg (FHH-Atlas im Intranet der FHH) des jeweils vorherigen Kalendermonats angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipBackgroundAccess: 'Diese Kachel gibt die Zugriffe auf die Hintergrundkarten des jeweils vorherigen abgeschlossenen Kalendermonats an. \n' +
             'Die Hintergrundkarten  sind:  \n' +
             'Bsp. name [Link zum Layer in Geo-Online/Metaver]; \n' +
             'Quelle: Auswertung der awstats',
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
            tooltipTopX: 'Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.\n' +
             'Die Top 10 Datensätze sind:\n' +
             'Platzhalter:\n',
            tooltipDownloads: 'Es wird die Anzahl der monatlichen bzw. jährlichen Downloads in einem historischen Zeitverlauf angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessData: 'Hier werden die monatlichen bzw. jährlichen Zugriffe auf die Fachdaten im Internet und Intranet der FHH mit Historie angegeben. Fachdaten sind alle Datensätze, die keine Hintergrundkarten sind.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessApps: 'Es werden die monatlichen bzw. jährlichen Gesamtzugriffe auf die Internet- und Intranet-Anwendungen (Apps) des LGV in einem historischen Zeitverlauf angezeigt.\n' +
             'Welche Apps dazu gehören erfahren Sie in den Metadatenkatalogen:\n' +
             'Link für Internet-Apps: <a href="https://metaver.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">metaver.de/freitextsuche</a> \n' +
             'Link für Intranet-Intranet-Apps: <a href="http://hmdk.fhhnet.stadt.hamburg.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">hmdk.fhhnet.stadt.hamburg.de</a> \n' +
             'Quelle: Auswertung der awstats',
        }
    },
    en: {
        udpc: {
            newDatassets: 'Latest datasets',
            sensors: 'Sensors',
            visitors: 'Visitors today',
            access: 'Map',
            countBy: 'Datasets by',
            countTotal: 'Count total',
            includeDevPlan: 'Include development plans',
            includeMapHits: 'Include background map',
            map: 'Map',
            top5: 'Monthly top 10',
            download: 'Downloads',
            accessTopicData: 'Access application data',
            accessApps: 'Access Apps',
            didYouKNow: 'Did you know?',
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
            themeFilter: 'Filter by theme',
            orgFilter: 'Filter by organization',
            clearFilter: 'Reset filters',

            sliderEarlier: '< earlier',
            sliderLater: 'later >',

            tooltipDidYouKnow: 'In dieser Kachel präsentieren wir ein paar Fakten rund um die Urban Data Platform Hamburg. \n' +
             'Weitere Informationen finden Sie hier: <a href="www.urbandataplatform.hamburg" target="_blank">urbandataplatform.hamburg</a>',
            tooltipLatestDataSets: '',
            tooltipGeneralLink: 'Open Link to new tab',
            tooltipHdmkLink: 'To the Hamburg Meta-Data Catalogue',
            tooltipSensors: 'Anzahl der Sensoren, die in der SensorThingsAPI als Thing definiert wurden.\n' +
             'Die Zahl bezieht sich auf den jeweils vorherigen Kalendermonat.\n' +
             'Quelle: <a href="https://iot.hamburg.de/v1.0/Datastreams?$count=true" target="_blank">iot.hamburg.de</a>',
            tooltipVisitorsToday: 'Hier wird die Gesamtanzahl an eindeutigen Besucher von <a href="http://www.geoportal-hamburg.de/geo-online/" target="_blank">Geo-Online</a> und Geodaten Hamburg (FHH-Atlas im Intranet der FHH) des jeweils vorherigen Kalendermonats angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipBackgroundAccess: 'Diese Kachel gibt die Zugriffe auf die Hintergrundkarten des jeweils vorherigen abgeschlossenen Kalendermonats an. \n' +
             'Die Hintergrundkarten  sind:  \n' +
             'Bsp. name [Link zum Layer in Geo-Online/Metaver]; \n' +
             'Quelle: Auswertung der awstats',
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
            tooltipTopX: 'Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen und die Downloads mit den meisten Hits aus dem letzten abgeschlossenen Monat an. \n' +
             'Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. \n' +
             'Ein Datensatz ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei.\n' +
             'Die Top 10 Datensätze sind:\n' +
             'Platzhalter:\n',
            tooltipDownloads: 'Es wird die Anzahl der monatlichen bzw. jährlichen Downloads in einem historischen Zeitverlauf angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessData: 'Hier werden die monatlichen bzw. jährlichen Zugriffe auf die Fachdaten im Internet und Intranet der FHH mit Historie angegeben. Fachdaten sind alle Datensätze, die keine Hintergrundkarten sind.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessApps: 'Es werden die monatlichen bzw. jährlichen Gesamtzugriffe auf die Internet- und Intranet-Anwendungen (Apps) des LGV in einem historischen Zeitverlauf angezeigt.\n' +
             'Welche Apps dazu gehören erfahren Sie in den Metadatenkatalogen:\n' +
             'Link für Internet-Apps: <a href="https://metaver.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">metaver.de/freitextsuche</a> \n' +
             'Link für Intranet-Intranet-Apps: <a href="http://hmdk.fhhnet.stadt.hamburg.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">hmdk.fhhnet.stadt.hamburg.de</a> \n' +
             'Quelle: Auswertung der awstats',
        }
    }
};