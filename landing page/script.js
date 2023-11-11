const bgAnimation = document.getElementById('bgAnimation');

const numberOfColorBoxes = 400;

for (let i = 0; i < numberOfColorBoxes; i++) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    bgAnimation.append(colorBox)
}


const nav = document.querySelector( '.navbar' )
fetch( './navbar.html')
.then(res => res.text())
.then(data =>{
    nav.innerHTML=data;
})

    
    
    
    
    
  

    const gameData = [
        // { 
        // imgSrc: "game1.jpg",
        // altText: "Game 1",
        // name: "Game 1"
        // },
        // { 
        // imgSrc: "game2.jpg",
        // altText: "Game 2",
        // name: "Game 2"
        // },
        // { 
        //     imgSrc: "game3.jpg",
        //     altText: "Game 3",
        //     name: "Game 3"
        //     },
        // Add more game data as needed
    ];
    
    // Function to create a game card element
    function createGameCard(game) {
        const card = document.createElement('div');
        card.classList.add('card');
    
        const img = document.createElement('img');
        img.src = game.imgSrc;
        img.alt = game.altText;
    
        const title = document.createElement('h3');
        title.textContent = game.name;
    
        card.appendChild(img);
        card.appendChild(title);
    
        return card;
    }
    
    // Function to load game cards
    function loadGameCards() {
        const cardContainer = document.getElementById('game-cards');
    
        // Load the first 2 game cards
        for (let i = 0; i < 2; i++) {
        if (gameData[i]) {
            const gameCard = createGameCard(gameData[i]);
            cardContainer.appendChild(gameCard);
        }
        }
    }
    
    // Function to load more game cards
    function loadMoreGameCards() {
        const cardContainer = document.getElementById('game-cards');
        const loadMoreButton = document.getElementById('load-more-button');
    
        // Load the next 2 game cards
        const startIndex = cardContainer.childElementCount;
        for (let i = startIndex; i < startIndex + 2; i++) {
        if (gameData[i]) {
            const gameCard = createGameCard(gameData[i]);
            cardContainer.appendChild(gameCard);
        }
        }
    
        // Hide the load more button if there are no more game cards
        if (startIndex + 2 >= gameData.length) {
        loadMoreButton.style.display = 'none';
        }
    }
    
    // Function to handle menu click events
    function handleMenuClick(event) {
        event.preventDefault();
        const target = event.currentTarget.getAttribute('data-target');
        const targetSection = document.getElementById(target);
        
        // Scroll to the target section with smooth animation
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Function to initialize the page
    function initializePage() {
        const menuItems = document.querySelectorAll('#menu li a');
        menuItems.forEach(item => {
        item.addEventListener('click', handleMenuClick);
        });
    
        loadGameCards();
        const loadMoreButton = document.getElementById('load-more-button');
        loadMoreButton.addEventListener('click', loadMoreGameCards);
    }
    
    // Call the initialization function when the page finishes loading
    window.addEventListener('load', initializePage);