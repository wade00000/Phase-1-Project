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

    // filter drobdown event listener
    const genderFilter = document.querySelector("#gender-filter");
    genderFilter.addEventListener("change", handleFilter);

    // function to render each character into a card in the HTML
    function renderCharacter(character){
        const div = document.querySelector("#character-container")
         const charDiv = document.createElement("div")
         charDiv.classList.add("character-card")

        // below we create details for the card
         const h2 = document.createElement("h2")
         h2.textContent = character.name

         const p1 = document.createElement("p")
         p1.textContent = character.species

         const p2 = document.createElement("p")
         p2.classList.add("gender")
         p2.textContent = character.gender

         const img = document.createElement("img")
         img.src = character.image
         img.alt = character.name

         const likeCount = document.createElement("p")

         const btn = document.createElement("button")
         btn.type = "button"
         btn.textContent= "❤️"

         let count = 0

         btn.addEventListener("click",()=>{
            count ++
            likeCount.textContent = `Likes :${count}`
         })

         
         

         // places the details into the card
         charDiv.appendChild(h2)
         charDiv.appendChild(p1)
         charDiv.appendChild(p2)
         charDiv.appendChild(img)
         charDiv.appendChild(btn)
         charDiv.appendChild(likeCount)

        //  places card into container
         div.appendChild(charDiv)

        };

     // function for form submission functionality
     function handleFormSubmit(event){
        event.preventDefault() // prevent default reload
        
        // gets user input values from the form
        const name = document.querySelector("#charname").value;
        const species = document.querySelector("#species").value;
        const gender = document.querySelector("#gender").value;
        const image = document.querySelector("#img").value;

        const newChar = {
            name : name,
            species : species,
            gender : gender,
            image : image
        }

        renderCharacter(newChar)

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

     function handleFilter (event) {
        const option = event.target.value.toLowerCase() // gets dropdown selection
        const cards = document.querySelectorAll(".character-card") // selects all character cards

        cards.forEach(card=>{
           const genderInfo =  card.querySelector(".gender").textContent.toLowerCase()

           if(option === "all" || option === genderInfo){
            card.style.display = "block"
           }else{
            card.style .display = "none"
           }
        })

        search.value = ""


     };

        
     })

    
    






