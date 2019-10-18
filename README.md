# fms-logviewer-frontend

## Table of Contents

- [About the Project](#about-the-project)
- [Instructions](#instructions)
  - [Setup](#setup)
  - [Additional Info](#additional-info)
- [License](#license)
- [Contact](#contact)
- [Anleitung](#anleitung)
  - [Inbetriebnahme](#inbetriebnahme)
  - [Allgemeine Infos](#allgemeine-infos)

## About the Project

The Project is the frontend for the FileMaker Server LogViewer.

Since FileMaker Server 17 there is no convenient way for reading the log files. This project helps to overcome this circumstance.

## Instructions

### Setup

1. Download project as zip-file from here and unpack locally
2. In the file "LogTabelle.vue" adjust the variable "serverAddressen". This variable lists all servers on which the package fms-logviewer-backend runs. (For example: https://fms.meine-domain.de)
3. In the terminal, the following commands are executed in the project directory
   - Install all dependencies with "npm install"
   - Optional: with "npm run start" you can test the frontend or use it locally
   - With "npm run build" the project is compiled for use on any web server. The content of the subdirectory "dist" must be uploaded to the your web server

### Additional Info

- Normally the frontend communicates with the backend on port 3050. In case the backend cannot be used on this port, the appropriate port in the file "LogTabelle.vue" must be defined

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Adam Augustin - [@agametis](https://twitter.com/agametis) - mail.github@agametis.de

Project Link: [https://github.com/agametis/fms-logviewer-frontend](https://github.com/agametis/fms-logviewer-frontend)

## Anleitung

### Inbetriebnahme

1. Projekt als Zip-Datei von hier herunterladen und lokal entpaken
2. In der Datei "LogTabelle.vue" die Variable "serverAdressen" anpassen. In dieser Variablen werden alle Server aufgeführt, auf denen das Paket fms-logviewer-backend läuft. (Zum Beispiel: https://fms.meine-domain.de)
3. Im Terminal werden im Projektverzeichnis folgende Befehle ausgeführt
   - Mit "npm install" alle Abhängigkeiten installieren
   - Optional: mit "npm run start" kann das Frontend getestet oder auch direkt lokal genutzt werden
   - Mit "npm run build" wird das Projekt für den Einsatz auf einem beliebigen Webserver kompiliert. Der Inhalt des Unterverzeichnisses "dist" wird auf den Webserver hochgeladen

### Allgemeine Infos

- Normalerweise kommuniziert das Frontend mit dem Backend auf Port 3050. Wenn aber das Backend auf diesem Port nicht genutzt werden kann, muss der passende Port in der Datei "LogTabelle.vue" angepasst werden
