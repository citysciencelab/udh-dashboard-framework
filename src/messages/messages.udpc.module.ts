export const messages = {
    de: {
        udpc: {
            newDatassets: 'Neueste Datensätze',
            sensors: 'Sensoren',
            visitors: 'Besucher Geoportal',
            access: 'Zugriffe Basiskarten',
            access_overlay_head: 'Karten Zugriffe',
            countBy: 'Anzahl Datensätze nach',
            countTotal: 'Anzahl total',
            includeDevPlan: 'Bebauungspläne u.a. mit einbeziehen',
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
            langCode: 'de-DE',
            dateTag: 'Stand: ',

            sliderEarlier: '< früher',
            sliderLater: 'später >',

            tooltipDidYouKnow: '<p>In dieser Kachel präsentieren wir ein paar Fakten rund um die Urban Data Platform Hamburg.</p>' +
             'PLATZHALTER \n' +
             '<p>Weitere Informationen finden Sie hier: <a href="http://www.urbandataplatform.hamburg" target="_blank">urbandataplatform.hamburg</a></p>',
            tooltipLatestDataSets: 'Hier zeigen wir die zuletzt veröffentlichten Datensätze, die mit einem produktiven Dienst (WFS/WMS) gekoppelt sind.\n' +
            'PLATZHALTER \n' +
            '<p>Quelle: CSW-Schnittstelle des HMDK (Hamburger Metadatenkatalog)</p>',
            tooltipGeneralLink: 'Link in neuem Tab öffnen',
            tooltipHdmkLink: 'Metadaten in MetaVer ansehen',
            tooltipSensors: 'Anzahl der Sensoren, die in der SensorThingsAPI als Datastream definiert wurden.\n' +
             'Quelle: <a href="https://iot.hamburg.de/v1.0/Datastreams?$count=true" target="_blank">iot.hamburg.de</a>',
            tooltipVisitorsToday: 'Hier wird die monatliche Gesamtanzahl an eindeutigen Besucher von <a href="http://www.geoportal-hamburg.de/geo-online/" target="_blank">Geo-Online</a> und Geodaten Hamburg (FHH-Atlas im Intranet der FHH) angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipBackgroundAccess: '<p>Diese Kachel gibt die monatlichen Zugriffe auf die Hintergrundkarten (auch Basiskarten) an.\n' +
             'Die Hintergrundkarten sind:</p>' +
             'PLATZHALTER \n' +
             '<p>Quelle: Auswertung der awstats</p>',
            tooltipDatasetsBy: 'Zeigt die Anzahl der Datensätze nach Thema oder Organisation, die im Hamburger Metadatenkatalog zuletzt beschrieben wurden und mit produktiven Internet- und Intranet-Diensten (WFS/WMS) gekoppelt sind. Ein Klick auf ein Thema oder eine Organisation filtert auf die jeweils zugehörigen Datensätze.\n' +
             'Mit dem zusätzlichen Filter "Bebauungspläne u.a. mit einbeziehen" haben Sie die Möglichkeit auch die zahlreichen Bebauungspläne und einige nicht mit produktiven Internet- und Intranet-Diensten (WFS/WMS) gekoppelte Datensätze anzuzeigen. \n' +
             'Die Themen sind die vom Dateneigentümer zugewiesenen Open Data Kategorien eines Datensatzes. Der Name der Organisation entstammt der Herausgeberinformation in den Metadaten des Datensatzes. Die Metadatensatzbeschreibungen von im Internet veröffentlichten Datensätzen finden Sie unter <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Quelle: CSW-Schnittstelle des HMDK (Hamburger Metadatenkatalog)',
            tooltipCountTotal: 'Zeigt die Anzahl der Datensätze, Anwendungen (Apps) oder Sensordatensätze pro Monat oder Jahr in einem historischen Zeitverlauf an.\n' +
             'Im folgenden wird erklärt, was sich hinter Datensätzen, Apps und Sensordatensätzen verbirgt:\n' +
             'Ein <b>Datensatz</b> ist eine, vom Dateneigentümer definierte, inhaltlich und/oder räumlich zusammengehörige Gruppe von Daten in einer Datei. Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen.\n' +
             'Mit dem zusätzlichen Filter "Bebauungspläne u.a. mit einbeziehen" haben Sie die Möglichkeit auch die zahlreichen Bebauungspläne und einige nicht mit produktiven Internet- und Intranet-Diensten (WFS/WMS) gekoppelte Datensätze anzuzeigen.\n' +
             'Unter <b>Apps</b> wird die Gesamtzahl von allen im Internet und Intranet erreichbaren Anwendungen des LGV in einem monatlichen oder jährigen Zeitverlauf aufgeführt.  \n' +
             '<b>Sensordatensätze</b> beschreiben alle Datensätze, die mittels Sensoren in bzw. nahezu in Echtzeit erstellt und aktualisiert werden. Sie sind eine Teilmenge der Datensätze.\n' +
             'Quelle: CSW-Schnittstelle des HMDK (Hamburger Metadatenkatalog)',
            tooltipMap:  'Ein Klick auf den Datensatznamen in der Rubrik „Neueste Datensätze“ führt zu einer Vorschau des Datensatzes in der Karte.\n' +
             'Neueste Datensätze sind die 10 Datensätze, die im Hamburger Metadatenkatalog zuletzt beschrieben wurden (create date) und mit produktiven Diensten (WFS/WMS) gekoppelt sind. \n' +
             'Ein Klick auf den Vollbildbutton stoppt den Durchlauf der „Neuesten Datensätze“ und zeigt den aktuellen Datensatz in der vergrößerten Karte an.\n' +
             'Mit einem Klick auf den Namen des Datensatzes in der Karte gelangen Sie zu den Metadatensatzbeschreibungen von im Internet veröffentlichten Datensätzen <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Quelle: CSW-Schnittstelle des HMDK (Hamburger Metadatenkatalog)',
            tooltipTop_datasets: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen oder die Downloads mit den meisten Hits an. \n' +
             'Mit einem Klick auf den jeweiligen Balken gelangen Sie zur Metadatensatzbeschreibung in <a href="https://metaver.de" target="_blank">MetaVer</a> \n' +
             '<h6>Die Top 10 Datensätze sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Ein <b>Datensatz</b> ist eine, vom Dateneigentümer definierte, inhaltlich und/oder räumlich zusammengehörige Gruppe von Daten in einer Datei. Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. Der Zusatz FHHNET zeigt an, dass der Datensatz nur im Intranet der FHH verfügbar ist, daher gibt es auch keinen Eintrag in MetaVer. \n' +
             'Bei den <b>Apps</b> werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.  \n' +
             'Bei den <b>Downloads</b> werden alle Daten berücksichtigt, die über den Downloadserver der UDP heruntergeladen wurden. \n\n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipTop_apps: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen oder die Downloads mit den meisten Hits an. \n' +
             'Mit einem Klick auf den jeweiligen Balken gelangen Sie zur Metadatensatzbeschreibung in <a href="https://metaver.de" target="_blank">MetaVer</a> \n' +
             '<h6>Die Top 10 Apps sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Ein <b>Datensatz</b> ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei. Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. Der Zusatz FHHNET zeigt an, dass der Datensatz nur im Intranet der FHH verfügbar ist, daher gibt es auch keinen Eintrag in MetaVer. \n' +
             'Bei den <b>Apps</b> werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.  \n' +
             'Bei den <b>Downloads</b> werden alle Daten berücksichtigt, die über den Downloadserver der UDP heruntergeladen wurden. \n\n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipTop_downloads: '<p>Zeigt Datensätze, Anwendungen (Apps) mit den meisten Zugriffen oder die Downloads mit den meisten Hits an. \n' +
             'Mit einem Klick auf den jeweiligen Balken gelangen Sie zur Metadatensatzbeschreibung in <a href="https://metaver.de" target="_blank">MetaVer</a> \n' +
             '<h6>Die Top 10 Downloads sind:</h6>' +
             'PLATZHALTER\n'+
             '<p>Ein <b>Datensatz</b> ist eine, vom Dateneigentümer definierter, inhaltlich und/oder räumlich zusammengehöriger Gruppe von Daten in einer Datei. Bei den Datensätzen werden nur die Fachdaten also nur Datensätze, die keine Hintergrundkarten sind, einbezogen. Der Zusatz FHHNET zeigt an, dass der Datensatz nur im Intranet der FHH verfügbar ist, daher gibt es auch keinen Eintrag in MetaVer. \n' +
             'Bei den <b>Apps</b> werden die Anwendungen des LGV berücksichtigt, die im Internet und über das Intranet verfügbar sind.  \n' +
             'Bei den <b>Downloads</b> werden alle Daten berücksichtigt, die über den Downloadserver der UDP heruntergeladen wurden. \n\n' +
             'Quelle: Auswertung der awstats</p>',
            tooltipDownloads: 'Es wird die Anzahl der monatlichen bzw. jährlichen Downloads von Dokumenten (z.B. PDF, JPEG, usw.) vom Downloadserver der UDP aufsummiert und im Zeitverlauf angezeigt.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessData: 'Hier werden die monatlichen bzw. jährlichen Zugriffe auf die Fachdaten im Internet und Intranet der FHH mit Historie angegeben. Fachdaten sind alle Datensätze, die keine Hintergrundkarten sind. \n' + 
            'Der starke Anstieg der Zugriffe von 2018 zu 2019 ist damit zu erklären, dass erst seit November 2018 alle Zugriffe automatisiert ermittelt werden. Vorher war dies nur teilweise möglich.\n' +
             'Quelle: Auswertung der awstats',
            tooltipAccessApps: 'Es werden die monatlichen bzw. jährlichen Gesamtzugriffe auf die Internet- und Intranet-Anwendungen (Apps) des Landesbetriebes Geoinformation und Vermessung (LGV) im Zeitverlauf angezeigt.\n' +
             'Welche Apps dazu gehören erfahren Sie in den Metadatenkatalogen:\n' +
             'Link für Internet-Apps: <a href="https://metaver.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">metaver.de/freitextsuche</a> \n' +
             'Link für Intranet-Apps (FHHNET): <a href="http://hmdk.fhhnet.stadt.hamburg.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">hmdk.fhhnet.stadt.hamburg.de</a> \n' +
             'Quelle: Auswertung der awstats',
            privacy: 'Datenschutz',
            legal: 'Impressum',
            legalEU: 'Dieses Projekt wurde im Rahmen der Finanzhilfevereinbarung Nr. 731297 vom Forschungs- und Innovationsprogramm Horizont 2020 der Europäischen Union teilfinanziert.',
            tooltipInternalNetwork: '<p>Sie haben einen <strong>FHHNet</strong> internen Link angeklickt.<br />' +
            'Wenn Sie entsprechende Zugriffsberechtigungen haben klicken sie <strong>auf den Button unten</strong> um dem Link zu folgen.' +
            'Ansonsten schließen Sie dieses Fenster.</p>'
        }
    },
    en: {
        udpc: {
            newDatassets: 'Latest datasets',
            sensors: 'Sensors',
            visitors: 'Visitors Geoportal',
            access: 'Map hits',
            access_overlay_head: 'Map hits',
            countBy: 'Datasets by',
            countTotal: 'Count total',
            includeDevPlan: 'Include development plans etc.',
            includeMapHits: 'Include background map',
            map: 'Map',
            top10: 'Monthly top 10',
            top10_datasets: 'Monthly top 10 datasets',
            top10_apps: 'Monthy top 10 apps',
            top10_downloads: 'Monthly top 10 downloads',
            download: 'Downloads',
            accessTopicData: 'Total hits',
            accessApps: 'App hits',
            didYouKnow: 'Did you know?',
            facts: 'Did you know: %{fact}',
            tabTopics: 'Topics',
            tabOrganisations: 'Organisations',
            tabSensors: 'sensor datasets',
            tabYear: 'Year',
            tabMonth: 'Month',
            tabDay: 'Day',
            tabDatasets: 'Datasets',
            tabApps: 'Apps',
            tabDownloads: 'Downloads',
            filter: 'Filter',
            themeFilter: 'Filter by topic',
            orgFilter: 'Filter by organization',
            clearFilter: 'Reset filters',
            langCode: 'en-US',
            dateTag: 'Updated: ',

            sliderEarlier: '< earlier',
            sliderLater: 'later >',

            tooltipDidYouKnow: '<p> Facts about the Urban Data Platform Hamburg.</p>' +
             'PLATZHALTER \n' +
             '<p>Find out more: <a href="http://www.urbandataplatform.hamburg" target="_blank">urbandataplatform.hamburg</a></p>',
            tooltipLatestDataSets: 'The most recently published datasets that are linked to a productive service (WFS/WMS).\n' +
            'PLATZHALTER \n' +
            '<p>Source: CSW interface of the HMDK (Hamburg Metadata Catalogue)</p>',
            tooltipGeneralLink: 'Open link to new tab',
            tooltipHdmkLink: 'See metadata in MetaVer',
            tooltipSensors: 'Number of sensors defined as a datastream in the SensorThingsAPI\n' +
             'Source: <a href="https://iot.hamburg.de/v1.0/Datastreams?$count=true" target="_blank">iot.hamburg.de</a>',
            tooltipVisitorsToday: 'Monthly Number of visitors to <a href="http://www.geoportal-hamburg.de/geo-online/" target="_blank">Geo-Online</a> and Geodaten Hamburg (FHH-Atlas, Intranet of the Free and Hanseatic City of Hamburg)\n' +
             'Source: Analysis of awstats',
            tooltipBackgroundAccess: '<p>Monthly hits of background maps (also called base maps\n' +
             'Base maps are: </p>' +
             'PLATZHALTER \n' +
             '<p>Source: Analysis of awstats</p>',
            tooltipDatasetsBy: 'This tile shows the number of records by topic or organization that were last described in the Hamburg Metadata Catalogue (HMDK) and are linked to productive internet and intranet services (WFS/WMS). A click on a topic or organization filters the corresponding records.\n' +
             'With the additional filter "Include development plans etc." you can also display the numerous development plans and select datasets that are not linked to productive internet and intranet services (WFS/WMS). \n' +
             'The topics are open data categories of a dataset assigned by the data owner. The name of the organization is taken from the publisher information in the metadata. Metadata record descriptions of datasets published on the internet can be found at <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Source: CSW-API of HMDK (Hamburg Metadata Catalogue)',
            tooltipCountTotal: 'Shows the number of datasets, applications (apps) or sensor datasets per month or per year over a historical time period.\n' +
             'The following explains datasets, apps and sensor datasets:\n' +
             'A <b>dataset</b> is a group of data in a file, defined by the data owner, which are related in content and/or location. In the case of datasets, only specialist data is included, i.e. only datasets that are not background maps.\n' +
             'With the additional filter "Include development plans etc." you can also display the numerous development plans and some datasets that are not linked to productive internet and intranet services (WFS/WMS).\n' +
             'The tab <b>Apps</b> shows the total number of all LGV applications accessible on the internet and intranet, listed in a monthly or yearly timeline.  \n' +
             '<b>Sensor datasets</b> describe all datasets that are created and updated by sensors in real time. They are a subset of datasets.  \n' +
             'Source: CSW-API of HMDK (Hamburger Hamburg Metadata Catalogue)',
            tooltipMap: 'Clicking on the record name in the "Recent records" section will display a preview of the record in the map.\n' +
             'Newest records are the 10 datasets which were last described in the Hamburg Metadata Catalogue (create date) and are linked to productive services (WFS/WMS). \n' +
             'Clicking on the full screen button stops the run of the "Newest datasets" and shows the current data set in the enlarged map.\n' +
             'By clicking on the name of the dataset in the map you can access the metadata descriptions of datasets published on the internet <a href="https://metaver.de/" target="_blank">metaver.de</a>.\n' +
             'Source: CSW interface of the HMDK (Hamburg Metadata Catalogue)',
            tooltipTop_datasets: '<p>Shows datasets, applications (apps) with the most hits or downloads. \n' +
             'By clicking on the respective bar, you can access the metadata description in <a href="https://metaver.de" target="_blank">MetaVer</a> \n' +
             '<h6>The top 10 datasets are:</h6>' +
             'PLATZHALTER\n'+
             '<p>a <b>dataset</b> is a group of data in a file, defined by the data owner, which are related in content and/or location. In the case of datasets, only the specialist data is included, i.e. only datasets that are not background maps. FHHNET  indicates that the dataset is only available on the FHH intranet, so there is no entry in MetaVer. \n' +
             'For the <b>Apps</b> only applications from LGV are considered, which are available on the internet and via the intranet.  \n' +
             'For the <b>Downloads</b>, all data downloaded via the download server of the UDP is taken into account. \n\n' +
             'Source: Analysis of awstats</p>',
            tooltipTop_apps: '<p>Shows datasets, applications (apps) with the most hits or downloads. \n' +
             'By clicking on the respective bar, you can access the metadata description in <a href="https://metaver.de" target="_blank">MetaVer</a> \n' +
             '<h6>The top 10 Apps are:</h6>' +
             'PLATZHALTER\n'+
             '<p>a <b>dataset</b> is a group of data in a file, defined by the data owner, which are related in content and/or location. In the case of datasets, only the specialist data is included, i.e. only datasets that are not background maps. FHHNET  indicates that the dataset is only available on the FHH intranet, so there is no entry in MetaVer. \n' +
             'For the <b>Apps</b> the applications of the LGV are considered, which are available on the internet and via the intranet.  \n' +
             'For the <b>Downloads</b>, all data downloaded via the download server of the UDP is taken into account. \n\n' +
             'Source: Analysis of awstats</p>',
            tooltipTop_downloads: '<p>Shows datasets, applications (apps) with the most hits or downloads. \n' +
             'By clicking on the respective bar, you can access the metadata description in <a href="https://metaver.de" target="_blank">MetaVer</a> \n' +
             '<h6>The top 10 Downloads are:</h6>' +
             'PLATZHALTER\n'+
             '<p>a <b>dataset</b> is a group of data in a file, defined by the data owner, which are related in content and/or location. In the case of datasets, only the specialist data is included, i.e. only datasets that are not background maps. FHHNET  indicates that the dataset is only available on the FHH intranet, so there is no entry in MetaVer. \n' +
             'For the <b>Apps</b> the applications of the LGV are considered, which are available on the internet and via the intranet.  \n' +
             'For the <b>Downloads</b>, all data downloaded via the download server of the UDP is taken into account. \n\n' +
             'Source: Analysis of awstats</p>',
            tooltipDownloads: ' The number of monthly or annual downloads of documents (e.g. PDF, JPEG, etc.) from the UDP download server is summed up and displayed over time.\n' +
             'Source: Analysis of awstats',
            tooltipAccessData: 'Here the monthly and annual views of the specalist data on the internet and intranet of the FHH are indicated with history.\n' +
            'Specialist data are all datasets that are not background maps. \n' + 
            'The strong increase in the number of hits from 2018 to 2019 is explained by the fact that only since November 2018 all hits have been determined automatically. Before this was only partially possible.\n' +
             'Source: Analysis of awstats',
            tooltipAccessApps: 'The monthly or annual total hits to internet and intranet applications (Apps)of the Agency for Geoinformation and Surveying (LGV) are displayed over time.\n' +
             'You can find out which apps are included in the metadata catalogues:\n' +
             'Link for internet Apps: <a href="https://metaver.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">metaver.de/freitextsuche</a> \n' +
             'Link for intranet-Apps (FHHNET): <a href="http://hmdk.fhhnet.stadt.hamburg.de/freitextsuche?action=doSearch&q=iplugs%3A%22%2Fingrid-group%3Aige-iplug-HH%22+t01_object.obj_class%3A6&grouping=domain" target="_blank">hmdk.fhhnet.stadt.hamburg.de</a> \n' +
             'Source: Analysis of awstats',
            privacy: 'Data privacy',
            legal: 'Legal notice',
            legalEU: 'This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 731297.',
            tooltipInternalNetwork: '<p>You have clicked on an <strong>FHHNet</strong> internal link.<br />' +
            'If you have the appropriate access rights click on the <strong>button below</strong> to follow the link.' +
            'Otherwise close this window.</p>'
        }
    }
};