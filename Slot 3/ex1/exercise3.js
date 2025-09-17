console.log("=== Exercise 3: Destructuring Nested Objects ===\n");

const person = {
    name: "John",
    age: 30,
    address: {
        street: "123 Main St",
        city: "New York",
        zipCode: "10001"
    }
};

const person2 = {
    name: "Jane",
    age: 25,
    address: {
        street: "456 Oak Ave"
        
    }
};

const person3 = {
    name: "Bob",
    age: 35
    
};


const { address: { street, city = "Unknown City" } = {} } = person;
console.log("Required Results:");
console.log(`Street: ${street}, City: ${city}`);

console.log("\nTesting with different scenarios:");
const { address: { street: street2, city: city2 = "Unknown City" } = {} } = person2;
console.log(`Person 2 - Street: ${street2}, City: ${city2}`);

const { address: { street: street3, city: city3 = "Unknown City" } = {} } = person3;
console.log(`Person 3 - Street: ${street3}, City: ${city3}`);

console.log("\n" + "=".repeat(50));
console.log("ADVANCED APPROACHES & EXPLANATIONS:\n");


function getAddressInfo(person) {
    const { 
        address: { 
            street = "Unknown Street", 
            city = "Unknown City" 
        } = {} 
    } = person;
    
    return { street, city };
}

console.log("\n2. Using Function for Address Extraction:");
console.log("Person 1:", getAddressInfo(person));
console.log("Person 2:", getAddressInfo(person2));
console.log("Person 3:", getAddressInfo(person3));


const extractAddress = (person) => {
    const { address: { street = "Unknown Street", city = "Unknown City" } = {} } = person;
    return `Street: ${street}, City: ${city}`;
};

console.log("\n3. Arrow Function Approach:");
console.log("Person 1:", extractAddress(person));
console.log("Person 2:", extractAddress(person2));
console.log("Person 3:", extractAddress(person3));


const personComplex = {
    name: "Alice",
    contact: {
        address: {
            home: {
                street: "789 Pine St",
                city: "San Francisco"
            },
            work: {
                street: "321 Business Blvd"
                
            }
        }
    }
};

console.log("\n4. Complex Nested Destructuring:");
const { 
    contact: { 
        address: { 
            home: { 
                street: homeStreet, 
                city: homeCity = "Unknown City" 
            } = {},
            work: { 
                street: workStreet = "Unknown Street", 
                city: workCity = "Unknown City" 
            } = {}
        } = {} 
    } = {} 
} = personComplex;

console.log(`Home - Street: ${homeStreet}, City: ${homeCity}`);
console.log(`Work - Street: ${workStreet}, City: ${workCity}`);


console.log("\n5. Optional Chaining (Modern Approach):");
const getAddressModern = (person) => {
    const street = person?.address?.street ?? "Unknown Street";
    const city = person?.address?.city ?? "Unknown City";
    return { street, city };
};

console.log("Person 1:", getAddressModern(person));
console.log("Person 2:", getAddressModern(person2));
console.log("Person 3:", getAddressModern(person3));
