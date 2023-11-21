const fs = require('fs');
console.clear()
let prompt = require('prompt-sync')();

const persons = {
    name: '',
    birthdate: '',
    phonenumber: '',
    email: '',
};

enterPersonalInfo();

function enterPersonalInfo() {
    const userInputName = prompt("Уведіть ваше прізвище та ім'я через пробіл: ");
    const userInputEmail = prompt("Уведіть вашу електронну пошту: ");
    const userInputNumber = prompt("Уведіть ваш номер, типу (+380956471834): ");
    const userInputBirth = prompt("Уведіть ваш день народження через пробіл(день, місяць, рік): ");

    const [lastName, firstName] = userInputName.split(' ');
    persons.name = `${firstName || 'no name'} ${lastName || 'no surname'}`;
    persons.email = userInputEmail;
    persons.birthdate = userInputBirth.split(' ');
    persons.phonenumber = userInputNumber;

    let chooseAct;
    do {
        console.log(persons);
        
        chooseAct = prompt("Виберіть, що хочете зробити:\n1 -- змінити, 2 -- видалити,  3 -- додати, 4 -- зберегти, 5 -- вийти: ");

        if (chooseAct === '1') {
            const propToChange = prompt("Введіть назву властивості, яку хочете змінити: ");
            const newValue = prompt("Введіть нове значення для властивості: ");
            persons[propToChange] = newValue;
        }
        if (chooseAct === '2') {
            const propToDelete = prompt("Введіть назву властивості, яку хочете видалити: ");
            delete persons[propToDelete];        
        }if (chooseAct === '3') {
            const newPropertyName = prompt("Введіть назву нової властивості: ");
            const newValue = prompt("Введіть значення для нової властивості: ");
            persons[newPropertyName] = newValue;
        }if (chooseAct === '4') {
            fs.writeFileSync('persons.txt', JSON.stringify(persons, null, 2));
            console.log('Інформацію збережено у файл persons.txt');
}} while (chooseAct !== '5');
    }
