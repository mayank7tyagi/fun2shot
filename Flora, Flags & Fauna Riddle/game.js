//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");



//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

  //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //If optionValur matches the button innerText then highlight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
        }
        button.disabled = true;
    });

  //initially hide letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputSection.innerText = " ";

    let optionArray = options[optionValue];
    //choose random word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes"> - </span>');

    //Display each element as span
    userInputSection.innerHTML = displayItem;
    };

    //Initial Function (Called when page loads/user presses new game)
    const initializer = () => {
    winCount = 0;
    count = 0;

    //Initially erase all content and hide letters and new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //character button click
        button.addEventListener("click", () => {
        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");
        //if array contains clicked value replace the matched dash with letter else dram on canvas
        if (charArray.includes(button.innerText)) {
            charArray.forEach((char, index) => {
            //if character in array is same as clicked button
            if (char === button.innerText) {
                //replace dash with letter
                dashes[index].innerText = char;
                //increment counter
                winCount += 1;
                playSound("right");
                //if winCount equals word length
                if (winCount == charArray.length) {
                resultText.innerHTML = `<h2 class='win-msg'>Congratulations !!🏆🎊<br>You guessed it right...</h2><p>   The word was <span>${chosenWord}...</span></p>`;
                playSound("success");
                //block all buttons
                blocker();
                }
            }
            });
        } else {
            //lose count
            count += 1;
            //for drawing man
            drawMan(count);
            playSound("incorrect");
            //Count==6 because head,body,left arm, right arm,left leg,right leg
            if (count == 6) {
            resultText.innerHTML = `<h2 class='lose-msg'>OOOPPPPSSS👎<br>You Lose!!</h2><p>       The word was <span>${chosenWord}...</span></p>`;
            playSound("defeat");
            blocker();
            }
        }
        //disable clicked button
        button.disabled = true;
        });
        letterContainer.append(button);
    }

    displayOptions();
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
    };

    //Canvas
    const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //bottom line
        drawLine(10, 130, 130, 130);
        //left line
        drawLine(10, 10, 10, 131);
        //top line
        drawLine(10, 10, 70, 10);
        //small top line
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
    };

    //draw the man
    const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
        head();
        break;
        case 2:
        body();
        break;
        case 3:
        leftArm();
        break;
        case 4:
        rightArm();
        break;
        case 5:
        leftLeg();
        break;
        case 6:
        rightLeg();
        break;
        default:
        break;
    }
    };
//for sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;



//Options values for buttons
let options = {
    fruits: [
        "Apple",
        "Blueberry",
        "Mandarin",
        "Pineapple",
        "Pomegranate",
        "Watermelon",
    ],
    animals: [
        "Aardvark",
        "Albatross",
        "Alligator",
        "Alpaca",
        "Ant",
        "Anteater",
        "Antelope",
        "Ape",
        "Armadillo",
        "Donkey",
        "Baboon",
        "Badger",
        "Barracuda",
        "Bat",
        "Bear",
        "Beaver",
        "Bee",
        "Bison",
        "Boar",
        "Buffalo",
        "Butterfly",
        "Camel",
        "Capybara",
        "Caribou",
        "Cassowary",
        "Cat",
        "Caterpillar",
        "Cattle",
        "Chamois",
        "Cheetah",
        "Chicken",
        "Chimpanzee",
        "Chinchilla",
        "Chough",
        "Clam",
        "Cobra",
        "Cockroach",
        "Cod",
        "Cormorant",
        "Coyote",
        "Crab",
        "Crane",
        "Crocodile",
        "Crow",
        "Curlew",
        "Deer",
        "Dinosaur",
        "Dog",
        "Dogfish",
        "Dolphin",
        "Dotterel",
        "Dove",
        "Dragonfly",
        "Duck",
        "Dugong",
        "Dunlin",
        "Eagle",
        "Echidna",
        "Eel",
        "Eland",
        "Elephant",
        "Elk",
        "Emu",
        "Falcon",
        "Ferret",
        "Finch",
        "Fish",
        "Flamingo",
        "Fly",
        "Fox",
        "Frog",
        "Gaur",
        "Gazelle",
        "Gerbil",
        "Giraffe",
        "Gnat",
        "Gnu",
        "Goat",
        "Goldfinch",
        "Goldfish",
        "Goose",
        "Gorilla",
        "Goshawk",
        "Grasshopper",
        "Grouse",
        "Guanaco",
        "Gull",
        "Hamster",
        "Hare",
        "Hawk",
        "Hedgehog",
        "Heron",
        "Herring",
        "Hippopotamus",
        "Hornet",
        "Horse",
        "Human",
        "Hummingbird",
        "Hyena",
        "Ibex",
        "Ibis",
        "Jackal",
        "Jaguar",
        "Jay",
        "Jellyfish",
        "Kangaroo",
        "Kingfisher",
        "Koala",
        "Kookabura",
        "Kouprey",
        "Kudu",
        "Lapwing",
        "Lark",
        "Lemur",
        "Leopard",
        "Lion",
        "Llama",
        "Lobster",
        "Locust",
        "Loris",
        "Louse",
        "Lyrebird",
        "Magpie",
        "Mallard",
        "Manatee",
        "Mandrill",
        "Mantis",
        "Marten",
        "Meerkat",
        "Mink",
        "Mole",
        "Mongoose",
        "Monkey",
        "Moose",
        "Mosquito",
        "Mouse",
        "Mule",
        "Narwhal",
        "Newt",
        "Nightingale",
        "Octopus",
        "Okapi",
        "Opossum",
        "Oryx",
        "Ostrich",
        "Otter",
        "Owl",
        "Oyster",
        "Panther",
        "Parrot",
        "Partridge",
        "Peafowl",
        "Pelican",
        "Penguin",
        "Pheasant",
        "Pig",
        "Pigeon",
        "Pony",
        "Porcupine",
        "Porpoise",
        "Quail",
        "Quelea",
        "Quetzal",
        "Rabbit",
        "Raccoon",
        "Rail",
        "Ram",
        "Rat",
        "Raven",
        "Red deer",
        "Red panda",
        "Reindeer",
        "Rhinoceros",
        "Rook",
        "Salamander",
        "Salmon",
        "Sand Dollar",
        "Sandpiper",
        "Sardine",
        "Scorpion",
        "Seahorse",
        "Seal",
        "Shark",
        "Sheep",
        "Shrew",
        "Skunk",
        "Snail",
        "Snake",
        "Sparrow",
        "Spider",
        "Spoonbill",
        "Squid",
        "Squirrel",
        "Starling",
        "Stingray",
        "Stinkbug",
        "Stork",
        "Swallow",
        "Swan",
        "Tapir",
        "Tarsier",
        "Termite",
        "Tiger",
        "Toad",
        "Trout",
        "Turkey",
        "Turtle",
        "Viper",
        "Vulture",
        "Wallaby",
        "Walrus",
        "Wasp",
        "Weasel",
        "Whale",
        "Wildcat",
        "Wolf",
        "Wolverine",
        "Wombat",
        "Woodcock",
        "Woodpecker",
        "Worm",
        "Wren",
        "Yak",
        "Zebra"
    ],
    countries : [
        "Afghanistan",
        // "Åland Islands",
        "Albania",
        "Algeria",
        // "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        // "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        // "Bonaire Sint Eustatius and Saba",
        // "Bosnia and Herzegovina",
        "Botswana",
        // "Bouvet Island",
        "Brazil",
        // "British Indian Ocean Territory",
        // "Brunei Darussalam",
        "Bulgaria",
        // "Burkina Faso",
        "Burundi",
        //"Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        //"Cayman Islands  ",
        //"Central African Republic",
        "Chad",
        "Chile",
        "China",
        //"Christmas Island",
        //"Cocos Islands  ",
        "Colombia",
        "Comoros  ",
        "Congo",
        "Congo  ",
         //"Cook Islands",
         //"Costa Rica",
        "Croatia",
        "Cuba",
        "Curacao",
        "Cyprus",
        "Czechia",
         //"Cote dIvoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        //"Dominican Republic",
        "Ecuador",
        "Egypt",
        //"El Salvador",
        //"Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        // "Falkland Islands",
        // "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        // "French Guiana",
        // "French Polynesia",
        // "French Southern Territories",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        // "Heard Island and McDonald Islands",
        "Holy See",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea",
        "Korea",
        "Kuwait",
        "Kyrgyzstan",
        //"Lao Peoples Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands ",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        // "New Caledonia",
        // "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        // "Norfolk Island",
        // "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        //"Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        //"Puerto Rico",
        "Qatar",
        //"Republic of North Macedonia",
        "Romania",
        //"Russian Federation  ",
        "Rwanda",
        "Réunion",
        // "Saint Barthélemy",
        // "Saint Helena Ascension and Tristan da Cunha",
        // "Saint Kitts and Nevis",
        // "Saint Lucia",
        // "Saint Martin",
        // "Saint Pierre and Miquelon",
        // "Saint Vincent and the Grenadines",
        "Samoa",
        // "San Marino",
        // "Sao Tome and Principe",
        // "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        // "Sierra Leone",
        "Singapore",
        //"Sint Maarten",
        "Slovakia",
        "Slovenia",
        //"Solomon Islands",
        "Somalia",
        // "South Africa",
        // "South Georgia and the South Sandwich Islands",
        // "South Sudan",
        "Spain",
        //"Sri Lanka",
        "Sudan",
        "Suriname",
        //"Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        //"Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "TimorLeste",
        "Togo",
        "Tokelau",
        "Tonga",
        //"Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        //"Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        // "United Arab Emirates",
        // "United Kingdom of Great Britain and Northern Ireland",
        // "United States Minor Outlying Islands",
        // "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        // "Virgin Islands",
        // "Virgin Islands",
        // "Wallis and Futuna",
        // "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ],
};