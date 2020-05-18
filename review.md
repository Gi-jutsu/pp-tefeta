# _______ Tefeta - Correction _______
## Author : `Dylan De Sousa`
## Corrector : `Pierre Hérissé`

### `|` ✨ Amazing! `|` ✔️ Good `|` :bell: Could be better `|` ⛔️ Not good `|`

---

## :beginner: Introduction

Le but ici a été d'implémenter l'algorithme **`A*`**, un algorithme de recherche de chemin dans un graphe entre un noeud initial et un noeud final.

## :beginner: Steps
- :diamond_shape_with_a_dot_inside: **Initialisation de la map**
  - Lecture du fichier `.map`
  - Interprétation des dimensions de la map:
  ```js
  const { groups } = line.match(/(?<width>\d+)x(?<height>\d+)/) || {}
  ```
  - Formattage du tableau en Grille: 
  ```js
  new Grid({ width: parseInt(width), height: parseInt(height) })
  ```
  - Initialisation de la Grille: 
  ```js
  gridMap.initialize()
  ```
  - Interprétation des noeuds, avec pour chacun :
    - Définition des coordonnées: 
    ```js
    const nodePosition: Point = { x: columnCount, y: rowCount - 1 }
    ```
    - Si c'est un mur (`'*'`), on le définit comme non-accessible: 
    ```js
    node.setIsWalkable(false)
    ```
    - Si c'est une entrée/sortie, on le garde en mémoire: 
    ```js
    startPosition = nodePosition
    ```
- :diamond_shape_with_a_dot_inside: **Recherche du chemin**
  - Création du chemin de la Grille: 
  ```js
  const aStar = new AStar({ grid: gridMap })
  ```
  - Recherche du chemin de cette Grille: 
  ```js
  aStar.findPath(startPosition, endPosition)
  ```
  - Affichage du chemin écrit dans la Grille: 
  ```js
  gridMap.print(path)
  ```

## :beginner: Detailed classes

### :diamond_shape_with_a_dot_inside: Initialisation de la map

Une map est traduite en instance de la classe **`Grid`** (`/core/Grid.ts`).
Chaque instance possède une `width` et une `height`, ainsi que d'une matrice de **`Nodes`** (`/core/Node.ts`)

### :diamond_shape_with_a_dot_inside: Node
Chaque **Node** possède ces propriétés :
```ts
  readonly position: Point
  private fValue: number
  private gValue: number
  private hValue: number
  private parent: Node | null
  private isOnClosedList: boolean
  private isOnOpenList: boolean
  private isWalkable: boolean
```
Chacune de ces valeurs est **settable** et **gettable** via des méthodes associées, hormis 2 d'entre elles :
  - `position` : définie précédemment lors de la lecture du fichier `.map`
  - `isWalkable`: gettable, mais son setting est défini lors de la lecture du fichier `.map`, s'il s'agit d'un mur ou pas.

Ces 2 valeurs sont nécessaires à l'instanciation d'un **`Node`**
```js
constructor({ position, isWalkable }: NodeParameters)
```

### :diamond_shape_with_a_dot_inside: Grid
Chaque **`Grid`** est défini par la `width` et la `height` recues en paramètre
```js
constructor({ height, width }: GridParameters)
```
Une instance de **`Grid`** possède plusieurs méthodes :
- `public initialize(): void`: parcours chaque caractère de chaque ligne pour en faire des **`Node`**
- `public print(path?: Node[]): void`: parcours chaque caractère de chaque ligne et imprime soit:
   - un carré de couleur s'il fait partie du `path` :
   ```js
   if (path?.includes(node)) process.stdout.write('\x1b[42m \x1b[49m')
   ```
   - un espace s'il ne fait pas partie du `path` mais est accessible :
   ```js
   else if(node.getIsWalkable()) process.stdout.write(' ')
   ```
   - une `'*'` s'il n'est ni dans le `path` ni n'est accessible :
   ```js
   else process.stdout.write('*')
   ```
- `public getNodeAt({ x, y }: Point): Node`: renvoie le noeud aux coordonnées passées en paramètres
- `public getNeighbours(node: Node): Node[]`: définit les voisins (↑→↓←) du noeud passé en paramètre, s'ils sont dans la grille et sont accessibles
- `private isOnGrid({ x, y }: Point): boolean`: retourne `true` si les coordonnées sont comprises dans la **`Grid`**, sinon `false`

### :diamond_shape_with_a_dot_inside: AStar
Cette classe représente l'algorithme de **pathfinding** utilisé. Elle possède ces propritétés :
```ts
  private grid: Grid
  private closedList: Node[] = []
  private openList: Node[] = []
  private heuristic: Heuristic
  private weight: number = 1
```
- `grid` représente la Map sur laquelle rechercher le chemin
- `closedList` représente les suites de **`Node`** dont l'inspection a déjà été faite
- `openList` représente les suites de **`Node`** dont l'inspection n'a pas encore été faite
- `heuristic` représente la fonction mathématique utilisée pour calculer le coût heuristique du chemin, c'est à dire le voisin accessible le plus proche
- `weight` représente la complexité de recherche dans la fonction heuristique, soit 1 soit ^2

Cette classe possède une unique méthode `public findPath(startPosition: Point, endPosition: Point): Node[]`, qui va :
- Définir les deux points de **départ** et d'**arrivée**
- Considérer que le noeud de départ est une `openList`
- Parcourir la grille, et pour chaque caractère :
   - Récupérer le **Node** dans la **Grid** aux coordonnées du caractère
   - S'il n'est pas accessible (mur), l'ajouter aux `closedList` et mettre ses values (F, G, H) à 0
   - S'il est accessible, set sa valeur H égale au résultat de la fonction heuristique entre sa position et la position finale
- Tant qu'il y a des valeurs dans `openList` :
   - On récupère la **`FValue`** de la plus petite valeur dans `openList`
   - On la retire des `openList`
   - S'il s'agit du dernier noeud, on renvoie tous ses noeuds parents
   - Sinon, on récupère les neighbours et pour chacun :
      - Si le voisin est dans les `closedList`, on sort de la boucle
      - Sinon :
         - On récupère sa position
         - On récupère la **`GValue`** du noeud courant et on lui additionne le poids, 1 si **`GValue`** est égale au noeud courant, sinon ^2
         - Si cette nouvelle **`GValue`** est inférieure à celle de son voisin, on la duplique dans celle du voisin et on définit le noeud courant comme parent du voisin
         - Si le voisin n'est pas dans `openList`, on l'y rajoute
         - Si cette nouvelle **`GValue`** est inférieure à celle du voisin, on ne définit que le noeud comme parent du voisin

Ces boucles vont définir point par point la suite du chemin à suivre.


## :beginner: Install Steps
- Clone https://github.com/Gi-jutsu/pp-tefeta.git : ✔️
- Running Docker (`cd docker && docker-compose up --build`) : ⛔️
  ```console
  ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?

  If it's at a non-standard location, specify the URL with the DOCKER_HOST environment variable.
  ```
  
## :beginner: Coding Steps

Rien à redire, le code est impeccable ! ✔️

Dommage qu'on ne puisse pas définir la map à utiliser en input, ni qu'on n'aie pas d'affichage du `time`

## :beginner: Maps paths checking :
- rect.01.map :
   - **`path`** ✔️
   - **`time`** : 9ms
- rect.02.map :
   - **`path`** ✔️
   - **`time`** : 20ms
- rect.03.map :
   - **`path`** ✔️
   - **`time`** : 18ms
- rect.04.map :
   - **`path`** ✔️
   - **`time`** : 17ms
- rect.05.map :
   - **`path`** ✔️
   - **`time`** : 10ms
- rect.06.map :
   - **`path`** ✔️
   - **`time`** : 13ms
- rect.07.map :
   - **`path`** ✔️
   - **`time`** : 19ms   
- rect.08.map :
   - **`path`** ✔️
   - **`time`** : 17ms

- oval.01.map :
   - **`path`** ⛔️
   - **`time`** : ⛔️

