# Penguin Image API
Created to get random images of Penguins

API Link: [https://penguin.sjsharivker.workers.dev/api](https://penguin.sjsharivker.workers.dev/api)

### Example Response:
```json
{

"img":"https://raw.githubusercontent.com/code2cube/PenguinImageAPI/main/img/magellanic/3.jpg",
"species":"magellanic"

}
```

### Custom Parameters!:
You can select one of the following parameters to get only 1 species of Penguin:

* emperor
* chinstrap,
* magellanic
* humboldt
* erect_crested
* royal

Example: [https://penguin.sjsharivker.workers.dev/api?species=emperor](https://penguin.sjsharivker.workers.dev/api?species=emperor) <br>
Output:
```json
{

"img":"https://raw.githubusercontent.com/code2cube/PenguinImageAPI/main/img/emperor/0.jpg",
"species":"emperor"

}
```