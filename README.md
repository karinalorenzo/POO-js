# 🧠 javascript-POO

Guia con ejercicios, conceptos y ejemplos prácticos sobre **Programación Orientada a Objetos (POO)** usando **JavaScript** moderno (ES6+).

El objetivo de este proyecto es aprender de forma clara y progresiva los fundamentales de la programacion orientada a objetos (POO), entendiendo cómo JavaScript implementa conceptos como: **Abstracción, Encapsulamiento, Herencia y Polimorfismo** además de reforzar fundamentos como  **getters/setters**, **métodos estáticos** entre otros.

---

## 📚 ¿Qué es la Programación Orientada a Objetos?

La Programación Orientada a Objetos (POO) en JavaScript es una forma de organizar y estructurar tu código usando objetos, clases, propiedades y métodos. 

**La idea central:** modelar cosas del mundo real dentro del código.

---


# 🚀 Conceptos clave de la POO
### ¿Qué es un objeto?
Un objeto es una colección de propiedades (datos) y métodos (funciones que actúan sobre esos datos).
<details>
<summary>Ver ejemplo</summary>

```javascript
const persona = {
  nombre: "Ana",
  edad: 25,

  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

persona.saludar();
```
👉 Aquí:
- `nombre` y `edad` → datos (propiedades)
- `saludar()` → acción (método)
- `this.nombre` → accede al propio objeto

</details>


### ¿Qué es una clase?
Una clase es un molde para crear objetos. Piensa en ella como una receta: a partir de la misma receta puedes crear muchos pasteles.
<details>
<summary>Ver ejemplo</summary>

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
}

const user1 = new Person("Ana", 25);
const user2 = new Person("Carlos", 30);

user1.greet();
user2.greet();
```

👉 Aquí:
- La clase define cómo serán los objetos
- `new` crea objetos reales
- Cada objeto tiene sus propios datos
</details>


### ¿Qué es encapsulacion?
Agrupar datos y funciones dentro de un mismo objeto para mantenerlos organizados y protegidos controlar asi cómo se accede a ellos.
<details>
<summary>Ver ejemplo</summary>

```javascript
class Person {
  #phone;

  constructor(name, phone) {
    this.name = name;
    this.#phone = phone;
  }

  getPhone() {
    return this.#phone;
  }
}

const user = new Person("Ana", 123456);
console.log(user.getPhone());
```

👉 El dato `#phone` no se puede acceder directamente.
</details>


---

## 📁 Estructura de los archivos

| Archivo                         | Contenido                                                                 |
|---------------------------------|--------------------------------------------------------------------------|
| `01-creando-clases.js`         | Introducción a la sintaxis de clases, constructores y creación de objetos. |
| `02-getters-y-setters.js`       | Uso de get y set para controlar el acceso y el formato de las propiedades. |
| `03-encapsulamiento_real.js`     | Aplicación del encapsulamiento con propiedades privadas (#) y validaciones.|
| `04-herencia-y-polimorfismo.js`  | Demostración de herencia entre clases y sobrescritura de métodos.          |
| `05-metodos-de-instancia-vs-estaticos.js` | Diferencia entre métodos de instancia y métodos estáticos.       |
| `06-abstraccion.js`               | Simulación de abstracción mediante clases y métodos base no implementados. |
| `07-recordando-prototypes-y-prototype-chain.js` |Repaso sobre prototype, herencia y la chain nativa de JavaScript. |
| `08-desafio-final.js`           | Desafío práctico utilizando todos los conceptos de POO aplicados.          |


---

## 📚 ¿Qué es la Programación Orientada a Objetos?

- ✔️ Creacion de clases eh instancias

---

## 💡 Observaciones

- Este repositorio fue creado con fines **educativos**.
- Todo el código fue escrito con **JavaScript moderno (ES6+)**.
- No se utilizó TypeScript, precisamente para explorar las **limitaciones y convenciones** de JavaScript puro en la POO.
