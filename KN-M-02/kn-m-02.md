## Aufgabe A)
![konzeptionellesModell.png](konzeptionellesModell.png)

### Kurze textuelle Erklärungen zu den Entitäten und Beziehungen.
Ein Investor kann mehrere Aktien haben, aber eine Aktie kann nur von einem Investor gehalten werden.
Eine Aktie kann mehrere Orders haben und ein Order kann aus mehreren Aktien bestehen.
Eine Börse kann mehrere Orders haben und ein Order kann nur auf einer Börse plaziert werden.
Ein Investor kann nur einen Order auf eine bestimmte Aktie machen und derselbe Order kann von mehreren Investoren getätigt werden.

## Aufgabe B)
### Ein Bild des logischen Datenmodells.
![logischesModell.png](logischesModell.png)

### Erklärung zu Verschachtelungen. wieso haben Sie Ihre Variante gewählt.
Man möchte ziemlich oft wissen, welche Order von einem Investor getätigt werden. Deshalb ist Order in Investor enthalten.
Orders gehören zu einem Investor, deshalb ist Order in Investor enthalten.
Da ein stock auch einzel abgefragt werden kann, ist er in einer einzelnen Tabelle. Er ist in order referenziert, da ein stock oft orders besitzt.
Ein stockExchange ist unabhängig von einem stock, deshalb ebenfalls eine weitere Tabelle gewählt und referenziert, um festzustellen, welche stockes an welcher Börse getradet werden. 

## Aufgabe C)
### Script mit den Befehlen zur Erstellung der Collections.
```javascript
use stockMarket;

db.createCollection("investor");
db.createCollection("stock");
db.createCollection("order");
db.createCollection("stockExchange");
```
