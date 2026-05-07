# 🧠 javascript-POO

Guia con ejercicios, conceptos y ejemplos prácticos sobre **Programación Orientada a Objetos (POO)** usando **JavaScript** moderno (ES6+).

El objetivo de este proyecto es aprender de forma clara y progresiva los fundamentales de la programacion orientada a objetos (POO), entendiendo cómo JavaScript implementa conceptos como: **Abstracción, Encapsulamiento, Herencia y Polimorfismo** además de reforzar fundamentos como  **getters/setters**, **métodos estáticos** entre otros.

---

## 📚 ¿Qué es la Programación Orientada a Objetos?

La Programación Orientada a Objetos (POO) en JavaScript es una forma de organizar y estructurar tu código usando objetos, clases, propiedades y métodos. 

**La idea central:** modelar cosas del mundo real dentro del código.

---


# 🚀 Conceptos clave de la POO
### 🔹 ¿Qué es un objeto?
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


### 🔹 ¿Qué es una clase?
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


### 🔹 ¿Qué es encapsulacion?
Agrupar datos y funciones dentro de un mismo objeto para mantenerlos organizados y protegidos controlando asi cómo se accede a ellos.

Piensa en un mando a distancia:
- Tú puedes apretar botones (interfaz pública).
- No puedes tocar los circuitos internos (parte privada).

En código:
- Lo **“público”** es lo que el usuario del objeto puede usar.
- Lo **“privado”** es lo que solo la clase debe tocar.
  
<details>
<summary>Ver ejemplo</summary>

```javascript
class Cuenta {
  #saldo = 0; // Parte privada

  depositar(monto) { // Parte pública
    if (monto <= 0) return;
    this.#saldo += monto;
  }

  verSaldo() { // Parte pública
    return this.#saldo;
  }
}

const c = new Cuenta();
c.depositar(100);
console.log(c.verSaldo()); // 100
c.#saldo; // ❌ Error: no puedes tocar lo privado

```

👉 El dato `#saldo` no se puede acceder directamente.
</details>

### 🔹 ¿Qué es la Herencia?
La herencia permite que una clase tome propiedades y métodos de otra clase, evitando repetir código.

- La clase **“padre”** tiene propiedades y métodos.
- La clase **“hija”** recibe todo eso automáticamente evitando repetir codigo

  
<details>
<summary>Ver ejemplo</summary>

```javascript
class Persona {
  constructor(nombre) {
    this.nombre = nombre;   // Parte del padre
  }

  saludar() {
    console.log("Hola, soy " + this.nombre);
  }
}

class Empleado extends Persona {
  constructor(nombre, sueldo) {
    super(nombre);          // 1. Llama al constructor del padre
    this.sueldo = sueldo;   // 2. Añade lo propio del hijo
  }
}

const emp = new Empleado("Carlos", 3000);
emp.saludar();

```
👉 Aquí:
- Creas un `Empleado`.
- JavaScript ve que `Empleado` extiende a `Persona`. (extends indica que hereda.)
- Antes de crear el `Empleado`, debe crear la parte Persona.
- **super(nombre)** llama al constructor de `Persona`.
- Después de **super()**, ya puedes usar **this** para añadir cosas del hijo.
- `this` siempre apunta al objeto final que estás creando (emp)

</details>


### 🔹 ¿Qué es Polimorfismo?
El polimorfismo permite que una clase hija reemplace un método de la clase padre con su propia versión. **Mismo método, comportamiento diferente según la clase.**

Piensa en que si dices “haz sonido” a distintos animales:
- un perro ladra
- un gato maúlla
- un pájaro canta

El método es el mismo **(hacerSonido())**, pero el comportamiento cambia según la clase.
  
<details>
<summary>Ver ejemplo</summary>

```javascript
class Animal {
  hacerSonido() {
    console.log("Sonido genérico...");
  }
}

class Perro extends Animal {
  hacerSonido() {
    console.log("Guau!");
  }
}

class Gato extends Animal {
  hacerSonido() {
    console.log("Miau!");
  }
}

class Pajaro extends Animal {
  hacerSonido() {
    console.log("Pío pío!");
  }
}

const animales = [
  new Perro(),
  new Gato(),
  new Pajaro()
];

animales.forEach(a => a.hacerSonido());

```

👉 Aqui:
- Todas las clases tienen el mismo método: **hacerSonido()**.
- Cada clase lo **redefine** con su propio comportamiento.
- Puedes tratar a todos los objetos como “animales”, aunque cada uno responda distinto.
</details>


### 🔹 ¿Metodos Getters y Setters?
Son metodos que sirven para controlar cómo se lee o modifica una propiedad. Son como “puertas” para acceder a un valor.

Piensa en una casa:
- No entras por la ventana o rompiendo la pared (espero).
- Entras por la puerta (getter/setter).

  
<details>
<summary>Ver ejemplo</summary>

```javascript
class Usuario {
  constructor(nombre) {
    this._nombre = nombre; // Propiedad "protegida" por convención
  }

  get nombre() {
    // Se ejecuta cuando lees: u.nombre
    return this._nombre.toUpperCase();
  }

  set nombre(nuevo) {
    // Se ejecuta cuando asignas: u.nombre = "..."
    if (nuevo.length < 3) {
      console.log("Nombre demasiado corto");
      return;
    }
    this._nombre = nuevo;
  }
}

const u = new Usuario("Ana");
console.log(u.nombre); // Ana
u.nombre = "Li";       // ❌ No permitido
```
👉 Aquí:
- **_nombre** es la propiedad interna que queremos controlar.
- El **getter** devuelve el nombre en mayúsculas.
- El **setter** valida que el nombre tenga al menos 3 letras.
- Si el valor no es válido, no se cambia.
- Cuando usas **u.nombre**, parece una propiedad normal, pero en realidad estás llamando a un método.

</details>

### 🔹 ¿Qué son los Métodos Estáticos?
Un método estático es una función que pertenece a la clase, no a los objetos creados a partir de ella.
Se usa cuando quieres realizar una operación que tiene sentido para la clase en general, pero no para un objeto en concreto.

Eso significa:

- No necesitas crear un objeto (new)
- Se llama directamente desde la clase
- No puede usar **this** del objeto, porque no existe ningún objeto
- Se utiliza para funciones “generales” o utilidades relacionadas con la clase

  
<details>
<summary>Ver ejemplo</summary>

```javascript
class Calculadora {
  static sumar(a, b) {
    return a + b;
  }
}

console.log(Calculadora.sumar(2, 3));
```
👉 Aquí:
- **static** indica que el método pertenece a la clase
- Se llama con **Clase.metodo()**
- No hace falta crear un objeto con **new**

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

## 💡 Observaciones

- Este repositorio fue creado con fines **educativos**.
- Todo el código fue escrito con **JavaScript moderno (ES6+)**.
- No se utilizó TypeScript, precisamente para explorar las **limitaciones y convenciones** de JavaScript puro en la POO.
