## Nachfolgend sind einige Schritte beschrieben die beim erstellen einer neuen Version mittels Git-Tags berücksichtigt werden sollten.


### Schritt 1:

Prüfe ob der aktuelle Stand wirklich fertig ist (Source & Dist-Files).


### Schritt 2:

Neue Versionsnummer sollte in die package.json (falls vorhanden) und oder in die  bower.json (falls vorhanden) geschrieben werden.


### Schritt 3:

Erstelle einen neuen Git-Tag, mit der vorhandenen Versionsnummer: $ git tag 1.0.0

Optional: Fehlerhafter Git-Tag kann hiermit wieder entfernt werden: $ git tag 1.0.0 -d


### Schritt 4:

Veröffentliche die neue Version mittels: $ git push --tags

Optional: Fehlerhaften Git-Tag auf dem Git-Server löschen/veröffentlichen: $ git push origin :1.0.0

