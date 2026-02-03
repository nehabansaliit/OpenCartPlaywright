import { faker, Faker } from "@faker-js/faker";

export class RandomDataUtil{

    static getFirstName(){
        return faker.person.firstName();
    }

    static getLastName(){
        return faker.person.lastName();
    }

    static getEmail(){
        return faker.internet.email();
    }

    static getTelephone(){
        return faker.phone.number();
    }

    static getPassword(){
        return faker.internet.password();
    }
}