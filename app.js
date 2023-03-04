const loadCardData = (limit) => {
    toggleSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => showCardData(data.data.tools))
}

const showCardData = (tools) => {

    for (const tool of tools) {
        // console.log(tool)

        const cardList = document.getElementById('card-list');
        const showAll = document.getElementById('show-all');
        if (tools.length > 6) {
            tools = tools.slice(0, 6);
            showAll.classList.remove('hidden');
        }
        else {
            showAll.classList.add('hidden');
        }


        const cardDiv = document.createElement('div');

        cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl')
        cardDiv.innerHTML = `
                    <figure><img src="${tool.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">Features</h2>
                        
                        <ul>
                        <li>1.${tool.features[0]}<li/>
                        <li>2.${tool.features[1]}<li/>
                        <li>3.${tool.features[2]}<li/>
                        <ul/>
                    <div>
                    <hr> 
                  <div class= justify-end items-center >
                  <div> 
                  <div>
                      <div class="card-title">
                              ${(tool.name)}
                      </div>
                      <div>
                          <i class="fa-regular fa-calendar-days"></i>
                          ${tool.published_in}
                      </div>
                  </div>
              </div>
              <div class='flex justify-end'>
                  <div>
                  <label for="my-modal-5"><i class="fa-solid fa-arrow-right" onclick="loadModalData('${tool.id}')"></i></label>
                  </div>
              </div>
                  </div>
                    
                      
        `;
        cardList.appendChild(cardDiv)
        // console.log(tool.features.id)
        // loadModalData(tool.id)

    }
    toggleSpinner(false)
}
function showAll(id) {
    if (id.length > 6) {
        id = id.slice(0, 6)
    }

}


const loadModalData = (id) => {
    toggleSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => showModalData(data.data))
}

const showModalData = (dataAll) => {
    console.log(dataAll)
    const modalCard = document.getElementById('modal-card');
    modalCard.textContent = '';
    const modalDiv = document.createElement('div')
    modalDiv.classList.add('flex', 'gap-10')
    modalDiv.innerHTML = `
    <div class="border-solid border-2 border-sky-500 p-10">
        <h2 class="font-semibold">${dataAll.description}</h2>
        <div class="grid grid-cols-3 gap-5 text-center">
            <div>                               
                <h3 class="px-2 py-10 text-green-500 font-semibold"><span>${dataAll.pricing ? dataAll.pricing[0].price : "Faul"}</span> <br> <span>${dataAll.pricing[0].plan}</span></h3>
             </div>
            <div>
                <h3 class="px-2 py-10 text-yellow-500 font-semibold"><span>${dataAll.pricing[1].price}</span> <br> <span>${dataAll.pricing[1].plan}</span></h3>
            </div>
            <div>
                <h3 class="px-2 py-10 text-red-500 font-semibold"><span>${dataAll.pricing[2].price}</span> <br> <span>${dataAll.pricing[2].plan}</span></h3>
            </div>
        </div>
    <div class="flex gap-20">
        <div>
            <h3 class= "font-semibold text-2xl mb-4">Features</h3>
            <ul>
            <li>${dataAll.features[1].feature_name}</li>
            <li>${dataAll.features[2].feature_name}</li>
            <li>${dataAll.features[3].feature_name}</li>
            </ul>
        </div>
        <div>
         <h3 class= "font-semibold text-2xl mb-4">Integrations</h3>
            <ol>
                <li>${dataAll.integrations[0]}</li>
                <li>${dataAll.integrations[1]}</li>
                <li>${dataAll.integrations[2]}</li>
            </ol>
        </div>
    </div>
</div>
<div class="border-solid border-2 border-sky-500 p-10">
<div >
<img class="" src="${dataAll.image_link[0]}">
<button class="btn btn-error text-white absolute top-8 right-20">${dataAll.accuracy.score * 100} % accuracy</button>
</div>  
    <h3 class=font-semibold text-5xl>"${dataAll.input_output_examples[0].input}"</h3>
    <p>"${dataAll.input_output_examples[0].output}"</p>
</div>
<div class="modal-action">
    <label for="my-modal-5" class="btn">X</label>
</div>
    `;
    modalCard.appendChild(modalDiv)
    toggleSpinner(false);
}
// console.log(detailsData)

const toggleSpinner = isLoading => {
    const loader = document.getElementById('spinner');
    if (isLoading) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden')
    }
}




// loadCardData()
// loadModalData()