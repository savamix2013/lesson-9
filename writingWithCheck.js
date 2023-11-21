const fs = require('fs');
console.clear();
let prompt = require('prompt-sync')();

const persons = {
    name: '',
    birthdate: '',
    phonenumber: '',
    email: '',
};

enterPersonalInfo();

function enterPersonalInfo() {
    let userInputName = prompt("Уведіть ваше прізвище та ім'я через пробіл: ");
    const [lastName, firstName] = userInputName.split(' ');
    persons.name = `${firstName || 'no name'} ${lastName || 'no surname'}`;

    function validateEmail(email) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    }

    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\+\d{12}$/;
        return phoneRegex.test(phoneNumber);
    }

    function validateDate(date) {
        const dateRegex = /^\d{1,2}\s\d{1,2}\s\d{4}$/;
        return dateRegex.test(date);
    }

    let userInputEmail = prompt("Уведіть вашу електронну пошту: ");
    while (!validateEmail(userInputEmail)) {
        console.log("Будь ласка, введіть коректний формат електронної пошти.");
        userInputEmail = prompt("Уведіть вашу електронну пошту: ");
    }
    persons.email = userInputEmail;

    let userInputPhoneNumber = prompt("Уведіть ваш номер телефону (формат: +380XXXXXXXXX): ");
    while (!validatePhoneNumber(userInputPhoneNumber)) {
        console.log("Будь ласка, введіть коректний формат номеру телефону (+380XXXXXXXXX).");
        userInputPhoneNumber = prompt("Уведіть ваш номер телефону (формат: +380XXXXXXXXX): ");
    }
    persons.phonenumber = userInputPhoneNumber;

    let userInputBirthdate = prompt("Уведіть ваш день народження через пробіл (день місяць рік): ");
    while (!validateDate(userInputBirthdate)) {
        console.log("Будь ласка, введіть коректний формат дати народження (день місяць рік).");
        userInputBirthdate = prompt("Уведіть ваш день народження через пробіл (день місяць рік): ");
    }
    persons.birthdate = userInputBirthdate;

   

    let chooseAct;
    do {
        console.log(persons);

        chooseAct = prompt("Виберіть, що хочете зробити:\n1 -- змінити, 2 -- видалити,  3 -- додати, 4 -- зберегти, 5 -- вийти: ");

        if (chooseAct === '1') {
            const newPropertyName = prompt("Введіть назву властивості, яку хочете змінити: ");
            if (persons.hasOwnProperty(newPropertyName)) {
                switch (newPropertyName) {
                    case "birthdate":
                        persons.birthdate = validateDate(prompt("Введіть нову дату народження: "));
                        break;
                    case "phonenumber":
                        persons.phonenumber = validatePhoneNumber(prompt("Введіть новий номер телефону: "));
                        break;
                    case "email":
                        persons.email = validateEmail(prompt("Введіть нову електронну пошту: "));
                        break;
                }
                        const newValue = prompt("Введіть значення для нової властивості: ");
                        persons[newPropertyName] = newValue;
                
            } else {
                console.log(`Властивість ${propToChange} не існує.`);
            }
        } else if (chooseAct === '2') {
            const propToDelete = prompt("Введіть назву властивості, яку хочете видалити: ");
            if (persons.hasOwnProperty(propToDelete)) {
                delete persons[propToDelete];
                console.log(`Властивість ${propToDelete} успішно видалена.`);
            } else {
                console.log(`Властивість ${propToDelete} не існує.`);
            }
        } else if (chooseAct === '3') {
            const newPropertyName = prompt("Введіть назву нової властивості: ");
            const newValue = prompt(`Введіть значення для нової властивості ${newPropertyName}: `);
            persons[newPropertyName] = newValue;
            console.log(`Властивість ${newPropertyName} успішно додана.`);
        } else if (chooseAct === '4') {
            fs.writeFileSync('persons.txt', JSON.stringify(persons, null, 2));
            console.log('Інформацію збережено у файл persons.txt');
        }
    } while (chooseAct !== '5');
}
