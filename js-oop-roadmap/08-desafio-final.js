/*************************************************************
 🧠 Desafío Final: Sistema Bancario con JavaScript POO
**************************************************************/

/*
🎯 Objetivo:
Crear un sistema bancario simple utilizando únicamente JavaScript puro
(sin bibliotecas externas), aplicando los pilares de la Programación
Orientada a Objetos (POO):

- Clases / funciones constructoras
- Getters y setters
- Encapsulamiento
- Herencia
- Polimorfismo
- Métodos estáticos
*/

/*************************************************************
🏦 Requisitos del Sistema
**************************************************************/

/*
1. Clase Account (Clase base)
--------------------------------------------------------

🔹 Propiedades:
- owner: titular de la cuenta
- balance: saldo de la cuenta (por defecto 0)
- #password: contraseña de la cuenta (privada, usando encapsulamiento real)

🔹 Métodos:
- deposit(amount): añade dinero al saldo
- withdraw(amount): retira dinero del saldo (con validaciones)
- getter balance: devuelve el saldo actual
- setter password: verifica que la contraseña tenga al menos 6 caracteres
*/

// EXTRA - Utilizar Object.defineProperty para personalizar getters/setters
const BankConfig = Object.freeze({
    bankName: "JavaScript National Bank",
    founded: 2024,
    defaultInterestRate: 0.03,   // 3%
    defaultOverdraftLimit: 200   // 200€
  })
  

// EXTRA - Usar encapsulamiento real con # o Symbol para propiedades privadas
const transactionsKey = Symbol("transactions") // esto permite encapsular el historial de transacciones

class Account {
    #password
    // Nuevas propiedades privadas
   /*  #transactions = []  */
   #failedAttemps = 0 
   #isLocked = false
   
   constructor(owner, password){
       this.owner = owner;
       this.balance = this.balance;
       this.#password = password;
       this[transactionsKey] = [] // usamos el encapsulamiento
    }
    
    // EXTRA - Implementar bloqueo de cuenta después de 3 intentos de contraseña incorrecta
    
    #checkPassword(password) {
        if (this.#isLocked) {
            throw new Error("Account is locked due to multiple failed attemps")
        }
        
        if (password !== this.#password){
            this.#failedAttemps++
            
            if (this.#failedAttemps >= 3) {
                this.#isLocked = true
                throw new Error("Account locked after 3 failed attempts")
            }
            
        throw new Error("Incorrect password")
        
    }
    
    // Si es correcta, reinicia intentos
    this.#failedAttemps = 0
    return true
}

// MÉTODO PRIVADO para registrar transacciones
#addTransaction(type, amount, description = "") {
    const tx = new Transaction(type, amount, description)
    this[transactionsKey].push(tx)
}

deposit(amount, password){
    this.#checkPassword(password)
    
    if(amount <= 0){
        throw new Error("Deposit amount must be greater than 0")
    }
    this.balance += amount
    this.#addTransaction("deposit", amount)
}

withdraw (amount){
    this.#checkPassword(password)
    
    if (amount <= 0){
        throw new Error ("Withdraw amount must be greater than 0")
    }
    if (amount > this.balance){
        throw new Error("Insufficient funds")
    }
    this.balance -= amount
    this.#addTransaction("withdraw", amount)
} 

get balanceAmount(){
    return this.balance
}

set password(newPassword){
    if (newPassword.lenght < 6 ){
        throw new Error("Password must be at least 6 characters long");
    }
    this.#password = newPassword
}

// EXTRA- Método getStatement() que muestra el extracto de movimientos de la cuenta
getStatement() {
    return this[transactionsKey.map](tx => {
        const date = tx.date.toLocaleString()
        return `[${date}] ${tx.type}: ${tx.amount}€ ${tx.description}`
    })
}
}


/*
2. SavingsAccount (Cuenta Ahorro)
----------------------------------

🔹 Hereda de: Account

🔹 Propiedad adicional:
- interestRate: tasa de interés

🔹 Método extra:
- applyInterest(): aplica la tasa de interés al saldo
*/

class SavingsAccount extends Account { 
    constructor(owner, password, interestRate = BankConfig.defaultInterestRate){
        super(owner, password)
        this.interestRate = interestRate
    }

    applyInterest(){
        const interest = this.balance * this.interestRate
        this.balance += interest
    }
}

/*
3. CurrentAccount (Cuenta Corriente)
----------------------------------

🔹 Hereda de: Account

🔹 Propiedad adicional:
- overdraftLimit: límite de sobregiro

🔹 Sobrescritura de método:
- withdraw(): permite saldo negativo hasta el límite de sobregiro
*/

//- EXTRA Usar Object.freeze() para proteger objetos contra modificaciones
class CurrentAccount extends Account {
    constructor(owner, password, overdraftLimit = BankConfig.defaultOverdraftLimit){
        super(owner, password)
        this.overdraftLimit = overdraftLimit
    }

    withdraw(amount){
        if (amount <= 0){
            throw new Error("Withdraw amount must be greater than 0")
        }

        const newBalance = this.balance - amount
        
        if (newBalance < -this.overdraftLimit){
            throw new Error("Overdraft limit exceeded")
        }
        
        this.balance = newBalance
    }
}

/*
4. Clase Bank
--------------

🔹 Propiedad:
- accounts: lista de cuentas registradas en el banco

🔹 Métodos:
- addAccount(account): agrega una cuenta a la lista
- findAccountByOwner(name): busca una cuenta por el nombre del titular
- transfer(from, to, amount): transfiere saldo entre cuentas

🔹 Método estático:
- static bankInfo(): devuelve un nombre ficticio del banco y año de fundación
*/

class Bank {
    constructor(){
        this.accounts = []
    }
    
    addAccount(account){
        if (!(account instanceof Account)){
            throw new Error("Only Account instances can be added")
        }
        this.accounts.push(account)
    }

    findAccountByOwner(ownerName){
        return this.accounts.find(acc => acc.owner === ownerName) || null
    }

    transfer(fromOwner, toOwner, amount) {
        const fromAccount = this.findAccountByOwner(fromOwner)
        const toAccount = this.findAccountByOwner(toOwner)

        if (!fromAccount || !toAccount){

            throw new Error("One or both accounts not found")
        }

        fromAccount.withdraw(amount)
        toAccount.deposit(amount)
    }

    static bankInfo(){
        return "JavaScript National Bank - Founded 2024"
    }

}

/*************************************************************
💡 Extras (desafío opcional para aumentar la complejidad)
**************************************************************/

//- Crear una clase Transaction para registrar el historial de transacciones

class Transaction {
    constructor(type, ammount, description = "") {
        this.type = type
        this.ammount = ammount
        this.date = new Date()
        this.description = description
    }   
}



/*************************************************************
✅ Qué se debe evaluar / verificar
**************************************************************/

/*
1. POO básica:
- Creación de clases y objetos
- Uso de constructor y this

2. Getters y setters:
- balance debe leerse con getter
- password debe validarse con setter

3. Encapsulamiento:
- #password u otra forma de proteger datos
- No acceder directamente desde fuera de la clase

4. Herencia y polimorfismo:
- SavingsAccount y CurrentAccount heredan de Account
- CurrentAccount.withdraw() se comporta diferente (sobregiro permitido)

5. Métodos estáticos:
- Bank.bankInfo() funciona sin crear instancias

6. Comportamiento real:
- depositar, retirar, transferir y aplicar intereses funcionan correctamente
- Se manejan errores correctamente (saldo insuficiente, password inválida)
*/