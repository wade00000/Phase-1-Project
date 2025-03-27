document.addEventListener("DOMContentLoaded",()=>{
    fetch("https://rickandmortyapi.com/api/character") // fetches all characters
    .then(res=>res.json())
    .then(data=>data.results.forEach(renderCharacter)) // calls the function on each character 
   
    // form submission event listener
    const form = document.querySelector("#form")
    form.addEventListener("submit",handleFormSubmit)

    // search field event listener
    const search = document.querySelector("#search-input")
    search.addEventListener("input",handleSearch)

    // gender filter dropdown event listener
    const genderFilter = document.querySelector("#gender-filter");
    genderFilter.addEventListener("change", handleGenderFilter);

    // species filter dropdown event listener
    const speciesFilter = document.querySelector("#species-filter")
    speciesFilter.addEventListener("change",handleSpeciesFilter)

    // clear-search button event listener
    const clearSearch = document.querySelector("#clear-search")
    clearSearch.addEventListener("click",handleClrSearch)

    // show form button event listener
    const showFormBtn = document.querySelector("#show-form-btn")
    showFormBtn.addEventListener("click",handleShowBtn)

    const darkModeToggle = document.querySelector("#dark-mode")
    darkModeToggle.addEventListener("click",handleDark)

    
    
    
    
   // Function to render each character into a card in the HTML
function renderCharacter(character) {
    const div = document.querySelector("#character-container");
    const charDiv = document.createElement("div");
    charDiv.classList.add("character-card");

    // Create details for the card
    const h2 = document.createElement("h2");
    h2.textContent = character.name;

    const p1 = document.createElement("p");
    p1.classList.add("species");
    p1.textContent = character.species.charAt(0).toUpperCase() + character.species.slice(1); // Title Case

    const p2 = document.createElement("p");
    p2.classList.add("gender");
    p2.textContent = character.gender.charAt(0).toUpperCase() + character.gender.slice(1); // Title Case

    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;

    const remove = document.createElement("button");
    remove.innerHTML = "&times;"; // Renders ❌ correctly

    const likeCount = document.createElement("p");
    likeCount.textContent = "Likes: 0"; // Initial Like Count

    const like = document.createElement("button");
    like.type = "button";
    like.textContent = "❤️";

    // Like character event (fix: count scoped to each card)
    let count = 0;
    like.addEventListener("click", () => {
        count++;
        likeCount.textContent = `Likes: ${count}`;
    });

    // Delete character event
    remove.addEventListener("click", () => {
        charDiv.remove();
    });

    // Place details into the card
    charDiv.append(remove, h2, p1, p2, img, like, likeCount);

    // Place card into container
    div.appendChild(charDiv);
}





     // function for form submission functionality
     function handleFormSubmit(event){
        event.preventDefault() // prevent default reload
        
        // gets user input values from the form
        const name = document.querySelector("#charname").value;
        const species = document.querySelector("#species").value;
        const gender = document.querySelector("#gender").value;
        const image = document.querySelector("#img").value;
       
        // creates new character adding input values
        const newChar = {
            name : name,
            species : species,
            gender : gender,
            image : image
        }

        renderCharacter(newChar)

        //resets filter when new character is added 
        genderFilter.value = "all";
        speciesFilter.value = "all";
        handleGenderFilter({ target: genderFilter });
        handleSpeciesFilter({ target: speciesFilter });

        form.reset()
       };

    

     function handleSearch(event){
       const input = event.target.value.toLowerCase() // gets search input
       const cards = document.querySelectorAll(".character-card") // selects all character cards

        // loop through card names and compare them to search input value
       cards.forEach(card=>{
        const name = card.querySelector("h2").textContent.toLowerCase()

        if(name.includes(input)){
            card.style.display = "block"
        }else{
            card.style.display = "none"
        }
       })
       };



     function handleGenderFilter (event) {
        const option = event.target.value.toLowerCase() // gets dropdown selection
        const cards = document.querySelectorAll(".character-card") // selects all character cards

        cards.forEach(card=>{
           const genderInfo =  card.querySelector(".gender").textContent.toLowerCase()

           if(option === "all" || option === genderInfo){
            card.style.display = "block" // show cards
           }else{
            card.style .display = "none" // hide cards
           }
        })

        

        
        };



     function handleSpeciesFilter(event){
        const option = event.target.value.toLowerCase()
        const cards = document.querySelectorAll(".character-card")

        cards.forEach(card=>{
           const speciesInfo = card.querySelector(".species").textContent.toLowerCase()

        if(option === "all" || option === speciesInfo ){
            card.style.display = "block" // show cards
        }else{
            card.style.display = "none" // hide cards
        }
        })

        
        };


    
     function handleClrSearch(){
        search.value = "" // clears search field

        const cards = document.querySelectorAll(".character-card");
        cards.forEach(card => {
           card.style.display = "block"; // reshows cards
       });

       };

     function handleShowBtn(){
        const formContainer = document.querySelector("#form-container");
        formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
     }



     function handleDark(){
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')){
            darkModeToggle.textContent = "Light Mode";
        } else {
            darkModeToggle.textContent = "Dark Mode";
        }
     }

     })

    
    



         
         





